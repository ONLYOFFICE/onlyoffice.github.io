"""
Updates the bundled draw.io (vendor/drawio/webapp) to a given release.

    python update.py 32.6.10
    python update.py 32.6.10 --war path/to/draw.war   # use a downloaded war
    python update.py 32.6.10 --force                  # after reviewing PreConfig.js

The script downloads draw.war of the release from GitHub, copies it into
vendor/drawio/webapp without the files the plugin never loads (EXCLUDES) and
puts our PreConfig.js (next to this script) in place of draw.io's own. It then
losslessly recompresses the PNGs with oxipng (https://github.com/oxipng/oxipng,
`scoop install oxipng` / `cargo install oxipng`) when that is installed, or
prints a reminder and skips it otherwise.

PreConfig.upstream.js is draw.io's PreConfig.js our copy is based on. When a
release changes it (e.g. math moved to math4 after 22.1.18), the script prints
the diff and stops without touching the plugin: port the change to PreConfig.js,
then rerun with --force, which also stores the new upstream copy.

Afterwards: bump the plugin version and CHANGELOG.md, test the plugin.
"""

import argparse
import difflib
import fnmatch
import os
import re
import shutil
import subprocess
import sys
import tempfile
import urllib.request
import zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
PLUGIN_DIR = os.path.normpath(os.path.join(HERE, '..', '..'))
WEBAPP_DIR = os.path.join(PLUGIN_DIR, 'vendor', 'drawio', 'webapp')
PRECONFIG = os.path.join(HERE, 'PreConfig.js')
PRECONFIG_UPSTREAM = os.path.join(HERE, 'PreConfig.upstream.js')

WAR_URL = 'https://github.com/jgraph/drawio/releases/download/v{0}/draw.war'

# Paths inside the war (fnmatch patterns) the plugin does not need
EXCLUDES = [
	# server part of the war: servlets, placeholder keys
	'WEB-INF', 'META-INF',
	'*.map',
	# unminified sources, loaded only with dev=1
	'js/diagramly', 'js/grapheditor', 'mxgraph/src',
	# Confluence/Jira integrations
	'js/integrate.min.js',
	# viewers for exported HTML: PreConfig.js points DRAWIO_VIEWER_URL to viewer.diagrams.net
	'js/viewer.min.js', 'js/viewer-static.min.js',
	# pages of the Teams, OneDrive and monday.com integrations
	'teams.html', 'onedrive3.html', 'connect', 'monday-app-association.json',
	# service worker: draw.io enables it on its own domains only
	'service-worker.js', 'workbox-*.js',
	# cache reset page
	'clear.html',
	# draw.io's own repo docs, not used at runtime
	'resources/CONTRIBUTING.md', 'resources/README.md',
]

# Of draw.io's own UI translations (resources/dia_<lang>.txt, ~60 of them),
# only these can ever be requested: the plugin passes the primary subtag of
# its own UI language (scripts/drawio.js does lang.split('-')[0], so e.g.
# pt-BR becomes pt and sr-Cyrl-RS/sr-Latn-RS become sr), and draw.io only
# fetches a dia_<lang>.txt when that code is in its own supported-languages
# list (app.min.js: isLanguageSupported/getSpecialBundle) - never the plugin's
# raw tag, so an unmatched one (e.g. sq, see translations/sq-AL.json) falls
# back to English instead of a 404. resources/dia.txt (English) always stays:
# it is the base bundle, loaded regardless of language.
DRAWIO_LANGS = {'cs', 'de', 'es', 'fr', 'it', 'ja', 'pt', 'ru', 'sr', 'zh'}
DIA_LANG_RE = re.compile(r'^resources/dia_([a-z0-9-]+)\.txt$')

# Files the plugin depends on: their absence means the war layout changed
REQUIRED = [
	'index.html',
	'js/bootstrap.js',
	'js/main.js',
	'js/app.min.js',
	'js/PreConfig.js',
	'js/PostConfig.js',
	'js/jquery/jquery-3.6.0.min.js',  # loaded by the plugin's index.html
	'mxgraph/css/common.css',
	'resources/dia.txt',
	'math4/es5',                       # DRAW_MATH_URL in PreConfig.js
]


def is_excluded(rel_path):
	rel_path = rel_path.replace(os.sep, '/')

	m = DIA_LANG_RE.match(rel_path)
	if m is not None:
		return m.group(1) not in DRAWIO_LANGS

	for pattern in EXCLUDES:
		if fnmatch.fnmatch(rel_path, pattern) or fnmatch.fnmatch(os.path.basename(rel_path), pattern):
			return True
	return False


def download(version, target):
	url = WAR_URL.format(version)
	print('Downloading ' + url)
	with urllib.request.urlopen(url) as response, open(target, 'wb') as out:
		shutil.copyfileobj(response, out)


def read_text(path):
	with open(path, encoding='utf-8') as f:
		return f.read()


def check_preconfig(upstream_path, force):
	"""Returns True when PreConfig.js can be installed."""
	new_upstream = read_text(upstream_path)
	old_upstream = read_text(PRECONFIG_UPSTREAM)

	if new_upstream == old_upstream:
		return True

	print('draw.io changed its PreConfig.js:')
	sys.stdout.writelines(difflib.unified_diff(
		old_upstream.splitlines(True), new_upstream.splitlines(True),
		'PreConfig.upstream.js', 'new PreConfig.js'))
	print()

	if not force:
		print('Port the change to .dev/drawio-update/PreConfig.js and rerun with --force.')
		return False

	shutil.copyfile(upstream_path, PRECONFIG_UPSTREAM)
	print('Stored the new PreConfig.upstream.js.')
	return True


def copy_webapp(source):
	if os.path.isdir(WEBAPP_DIR):
		shutil.rmtree(WEBAPP_DIR)

	for root, dirs, files in os.walk(source):
		rel_root = os.path.relpath(root, source)
		rel_root = '' if rel_root == '.' else rel_root
		dirs[:] = [d for d in dirs if not is_excluded(os.path.join(rel_root, d))]

		for name in files:
			rel_path = os.path.join(rel_root, name)
			if is_excluded(rel_path):
				continue
			target = os.path.join(WEBAPP_DIR, rel_path)
			os.makedirs(os.path.dirname(target), exist_ok=True)
			shutil.copyfile(os.path.join(root, name), target)

	shutil.copyfile(PRECONFIG, os.path.join(WEBAPP_DIR, 'js', 'PreConfig.js'))


def compress_images():
	"""Losslessly recompresses the PNGs draw.io ships (icon sets, sidebar
	previews): they come without any size optimization applied."""
	oxipng = shutil.which('oxipng')
	if oxipng is None:
		print('oxipng not found (scoop install oxipng / cargo install oxipng): skipped PNG compression.')
		return

	pngs = []
	for root, _, files in os.walk(WEBAPP_DIR):
		for name in files:
			if name.lower().endswith('.png'):
				pngs.append(os.path.join(root, name))

	if not pngs:
		return

	before = sum(os.path.getsize(p) for p in pngs)
	# batches: Windows caps a single command line length
	batch = 200
	for i in range(0, len(pngs), batch):
		subprocess.run([oxipng, '-o', 'max', '--strip', 'safe', '-q'] + pngs[i:i + batch], check=True)
	after = sum(os.path.getsize(p) for p in pngs)

	print('oxipng: {0} PNGs, {1:.1f} MB -> {2:.1f} MB'.format(len(pngs), before / 1e6, after / 1e6))


def main():
	parser = argparse.ArgumentParser(description='Update the bundled draw.io.')
	parser.add_argument('version', help='draw.io release, e.g. 32.6.10')
	parser.add_argument('--war', help='use this draw.war instead of downloading it')
	parser.add_argument('--force', action='store_true',
		help='install PreConfig.js although draw.io changed its own')
	args = parser.parse_args()

	with tempfile.TemporaryDirectory() as temp:
		war = args.war or os.path.join(temp, 'draw.war')
		if not args.war:
			download(args.version, war)

		unpacked = os.path.join(temp, 'war')
		with zipfile.ZipFile(war) as archive:
			archive.extractall(unpacked)

		missing = [p for p in REQUIRED if not os.path.exists(os.path.join(unpacked, p))]
		if missing:
			print('The war has no ' + ', '.join(missing) + ': check the plugin against this release.')
			return 1

		if not check_preconfig(os.path.join(unpacked, 'js', 'PreConfig.js'), args.force):
			return 1

		copy_webapp(unpacked)

	compress_images()

	count = 0
	size = 0
	for root, _, files in os.walk(WEBAPP_DIR):
		for name in files:
			count += 1
			size += os.path.getsize(os.path.join(root, name))

	print('draw.io {0}: {1} files, {2:.1f} MB in {3}'.format(
		args.version, count, size / 1e6, os.path.relpath(WEBAPP_DIR, PLUGIN_DIR)))
	print('Now bump the plugin version, add a CHANGELOG.md entry and test the plugin.')
	return 0


if __name__ == '__main__':
	sys.exit(main())
