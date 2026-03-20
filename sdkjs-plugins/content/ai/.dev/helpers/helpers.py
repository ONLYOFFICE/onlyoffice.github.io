import os
import glob
import re

content_license = ""
editors = {
    "word": [],
    "slide": [],
    "cell": []
}

# Map: editor -> { function name -> human-readable text }
names_map = {
    "word": {},
    "slide": {},
    "cell": {}
}

for editor in editors:
    files = glob.glob("./" + editor + "/**/*.js", recursive=True)
    for file in files:
        with open(file, 'r', encoding='utf-8') as f:
            file_content = f.read()
            if file_content.startswith("/*"):
                end_license = file_content.find("*/") + 2
                if content_license == "":
                    content_license = file_content[:end_license]
                file_content = file_content[end_license:].strip()

            # Extract "name" and "text" fields from RegisteredFunction
            name_match = re.search(r'"name"\s*:\s*"([^"]+)"', file_content)
            text_match = re.search(r'"text"\s*:\s*"([^"]+)"', file_content)

            if name_match and text_match:
                names_map[editor][name_match.group(1)] = text_match.group(1)

            # Strip "text" field from output (keep OpenAI tools format clean)
            file_content = re.sub(r'\s*"text"\s*:\s*"[^"]*",?\n', '\n', file_content)

            editors[editor].append(file_content)

content = "var HELPERS = {};\n\n"
for editor in editors:
    content += "HELPERS." + editor + " = [];\n"
    for h in editors[editor]:
        if h.endswith(";"):
            h = h[:-1]
        content += "HELPERS." + editor + ".push(" + h + ");\n"

    content += "\n\n"

# Generate per-editor names maps
content += "HELPERS.names = {};\n"
for editor in editors:
    content += "HELPERS.names." + editor + " = {\n"
    items = list(names_map[editor].items())
    for i, (name, text) in enumerate(items):
        comma = "," if i < len(items) - 1 else ""
        content += '\t"' + name + '": "' + text + '"' + comma + '\n'
    content += "};\n"

content = content_license + "\n\n" + content
with open("./../../scripts/helpers/helpers.js", 'w', encoding='utf-8') as f:
    f.write(content)
