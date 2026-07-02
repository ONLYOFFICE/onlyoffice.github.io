/*
 * (c) Copyright Ascensio System SIA 2010-2026
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-6 Ernesta Birznieka-Upish
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const root = path.resolve(__dirname, '..');
const deployDir = path.join(root, 'deploy');
const outputPath = path.join(deployDir, 'antidote.plugin');

const INCLUDE = ['config.json', 'index.html', 'dist', 'resources', 'translations', 'NOTICE'];

if (!fs.existsSync(path.join(root, 'dist'))) {
  console.error('dist/ not found — run "npm run build" first.');
  process.exit(1);
}

fs.mkdirSync(deployDir, { recursive: true });

const output = fs.createWriteStream(outputPath);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(`${archive.pointer()} total bytes`);
  console.log(`Plugin zip ready: deploy/antidote.plugin`);
});

archive.pipe(output);

for (const entry of INCLUDE) {
  const entryPath = path.join(root, entry);
  if (!fs.existsSync(entryPath)) continue;
  if (fs.statSync(entryPath).isDirectory()) archive.directory(entryPath, entry);
  else archive.file(entryPath, { name: entry });
}

archive.finalize();
