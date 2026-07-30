const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'generated');
const EDITORS = {
  word: { code: 'CDE', sources: ['word/apiBuilder.js'] },
  cell: { code: 'CSE', sources: ['word/apiBuilder.js', 'slide/apiBuilder.js', 'cell/apiBuilder.js'] },
  slide: { code: 'CPE', sources: ['word/apiBuilder.js', 'slide/apiBuilder.js'] },
  forms: { code: 'CFE', sources: ['word/apiBuilder.js', '../sdkjs-forms/apiBuilder.js'] },
};
const NAMESPACE_MAP = {
  word: 'Word',
  cell: 'Cell',
  slide: 'Slide',
  forms: 'Forms',
};

function readOption(name) {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? undefined : process.argv[index + 1];
}

function resolveSdkjsPaths() {
  const sdkjs = readOption('sdkjs') || process.env.SDKJS_PATH;
  if (!sdkjs) throw new Error('Set SDKJS_PATH or pass --sdkjs <path-to-sdkjs>.');

  const resolvedSdkjs = path.resolve(sdkjs);
  if (!fs.existsSync(resolvedSdkjs)) throw new Error(`sdkjs directory does not exist: ${resolvedSdkjs}`);

  const sdkjsForms = readOption('sdkjs-forms') || process.env.SDKJS_FORMS_PATH || path.resolve(resolvedSdkjs, '..', 'sdkjs-forms');
  const resolvedSdkjsForms = path.resolve(sdkjsForms);
  if (!fs.existsSync(resolvedSdkjsForms)) throw new Error(`sdkjs-forms directory does not exist: ${resolvedSdkjsForms}`);

  return { sdkjs: resolvedSdkjs, sdkjsForms: resolvedSdkjsForms };
}

function getSourcePaths(editor, paths) {
  return EDITORS[editor].sources.map((source) => (source.startsWith('../sdkjs-forms/')
    ? path.join(paths.sdkjsForms, source.slice('../sdkjs-forms/'.length))
    : path.join(paths.sdkjs, source)));
}

function runJsdoc(sources) {
  const jsdoc = require.resolve('jsdoc/jsdoc.js');
  const result = spawnSync(process.execPath, [jsdoc, '-X', ...sources], {
    encoding: 'utf8',
    maxBuffer: 100 * 1024 * 1024,
  });

  if (result.status !== 0) throw new Error(result.stderr || 'JSDoc failed to generate doclets.');
  return JSON.parse(result.stdout);
}

function cleanName(name) {
  return name ? name.replace('<anonymous>~', '').replaceAll('"', '') : name;
}

function hasEditorTag(item, editorCode) {
  return item.tags?.some((tag) => tag.title === 'typeofeditors' && tag.value.includes(editorCode));
}

function filterDoclets(doclets, editorCode) {
  return doclets.filter((item) => {
    if (item.kind === 'typedef' || item.kind === 'class') return !item.name?.startsWith('_');
    if (item.kind !== 'function' && item.kind !== 'method') return false;
    return item.scope !== 'inner' && !item.longname?.includes('private') && hasEditorTag(item, editorCode);
  }).map((item) => ({
    ...item,
    name: cleanName(item.name),
    memberof: cleanName(item.memberof),
    longname: cleanName(item.longname),
  }));
}

function fetchApiDefinitions() {
  const paths = resolveSdkjsPaths();
  const results = {};

  for (const [editor, config] of Object.entries(EDITORS)) {
    const sources = getSourcePaths(editor, paths);
    console.log(`Reading ${editor} JSDoc from ${sources.join(', ')}...`);
    results[editor] = filterDoclets(runJsdoc(sources), config.code);
  }

  return results;
}

function splitTopLevel(str, sep) {
  const parts = [];
  let depth = 0;
  let current = '';
  for (const ch of str) {
    if (ch === '<') depth++;
    else if (ch === '>') depth--;
    if (ch === sep && depth === 0) {
      parts.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

function parseTypeName(n) {
  if (!n || n === 'null') return 'null';
  if (n.startsWith('?')) return parseTypeName(n.slice(1));  // JSDoc nullable: ?Type -> Type
  if (n.endsWith(')[]') && n.startsWith('(')) return `(${parseTypeName(n.slice(1, -3))})[]`;
  if (n.endsWith('[]')) return `${parseTypeName(n.slice(0, -2))}[]`;
  if (n.startsWith('(') && n.endsWith(')')) return `(${parseTypeName(n.slice(1, -1))})`;
  if (n.startsWith('Array.<') && n.endsWith('>')) return `${parseTypeName(n.slice(7, -1))}[]`;
  if (n.startsWith('Array.')) return `${parseTypeName(n.slice(6))}[]`;
  if (n.includes('|')) return splitTopLevel(n, '|').map(parseTypeName).join(' | ');
  if (n === 'undefined') return 'undefined';
  if (n === 'Number') return 'number';
  if (n === 'String') return 'string';
  if (n === 'Boolean') return 'boolean';
  if (n === 'bool') return 'boolean';
  if (n === 'Array' || n === 'array') return 'any[]';
  if (n === 'Object') return 'object';
  if (n === 'any') return 'any';
  if (n === 'function' || n === 'Function') return '(...args: any[]) => any';
  if (n === 'byte') return 'number';
  if (n === 'twips') return 'number';
  if (n === 'EMU') return 'number';
  if (n === 'pt') return 'number';
  if (n === 'mm') return 'number';
  if (n === 'rad') return 'number';
  if (n === 'JSON') return 'object';
  if (n === 'base64img') return 'string';
  if (n === 'range') return 'any';
  if (n.startsWith('"') && n.endsWith('"')) return n;
  if (n.startsWith('Array.<') && n.endsWith('>')) {
    const inner = n.slice(7, -1);
    return `${parseTypeName(inner)}[]`;
  }
  if (n.startsWith('Object.<') && n.endsWith('>')) {
    const inner = n.slice(8, -1);
    const parts = splitTopLevel(inner, ',');
    const keyType = parts[0] ? parseTypeName(parts[0]) : 'string';
    const valType = parts[1] ? parseTypeName(parts[1]) : 'any';
    return `Record<${keyType}, ${valType}>`;
  }
  return n;
}

function parseType(typeObj) {
  if (!typeObj || !typeObj.names) return 'any';
  return typeObj.names.map(parseTypeName).join(' | ');
}

function extractClasses(data) {
  const classes = {};

  for (const item of data) {
    if (item.kind === 'class' && item.name && !item.name.startsWith('_')) {
      const className = item.name;
      classes[className] = {
        description: item.description || '',
        methods: {},
        properties: {}
      };
    }
  }

  for (const item of data) {
    if ((item.kind === 'function' || item.kind === 'method') && item.name && item.memberof) {
      const className = item.memberof.replace('#', '');
      if (classes[className]) {
        // office-js-api-declarations sometimes lists the same method twice for a class — once with
        // a properly parsed @returns tag, once more with a malformed one (parsedType: null) whose
        // type was actually scraped from an unrelated method (e.g. ApiRun#GetClassType's second
        // entry claims "textPr", copied from ApiTextPr#GetClassType, instead of the real "run").
        // The malformed duplicate always comes second, so once a method has a good entry recorded,
        // skip any further entry whose return type didn't parse cleanly rather than let it clobber
        // the correct one.
        const alreadyRecorded = classes[className].methods[item.name];
        const firstReturnType = item.returns && item.returns[0] && item.returns[0].type;
        const parsedCleanly = !firstReturnType || firstReturnType.parsedType != null;
        if (alreadyRecorded && !parsedCleanly) continue;

        const seenNames = new Set();
        let hasOptional = false;
        const params = item.params ? item.params.map(p => {
          let name = p.name.replace(/[^a-zA-Z0-9_$]/g, '_');
          if (seenNames.has(name)) {
            let i = 2;
            while (seenNames.has(`${name}_${i}`)) i++;
            name = `${name}_${i}`;
          }
          seenNames.add(name);
          const acceptsUndefined = p.type?.names?.includes('undefined');
          if (p.optional || p.defaultvalue !== undefined || acceptsUndefined) hasOptional = true;
          const names = acceptsUndefined ? p.type.names.filter(type => type !== 'undefined') : p.type?.names;
          return {
            name,
            type: parseType(names?.length ? { ...p.type, names } : p.type),
            optional: hasOptional,
            defaultValue: p.defaultvalue,
          };
        }) : [];

        const returnType = item.returns && item.returns.length > 0
          ? parseType(item.returns[0].type)
          : 'void';

        classes[className].methods[item.name] = {
          params,
          returnType,
          description: item.description || ''
        };
      }
    }

    if (item.kind === 'member' && item.name && item.memberof) {
      const className = item.memberof.replace('#', '');
      if (classes[className]) {
        classes[className].properties[item.name] = {
          type: item.type ? parseType(item.type) : 'any',
          description: item.description || '',
          optional: item.optional || false
        };
      }
    }
  }

  return classes;
}

function extractTypedefs(data) {
  const typedefs = {};
  for (const item of data) {
    if (item.kind === 'typedef' && item.name && !item.name.startsWith('_')) {
      const hasProps = item.properties && item.properties.length > 0;
      typedefs[item.name] = {
        description: item.description || '',
        type: hasProps ? null : parseType(item.type),
        properties: hasProps ? item.properties.map(p => ({
          name: p.name,
          type: parseType(p.type),
          optional: p.optional || false,
          description: p.description || ''
        })) : []
      };
    }
  }
  return typedefs;
}

function generateInterface(className, classData) {
  let output = '';

  if (classData.description) {
    output += `/** ${classData.description.replace(/\n/g, ' ')} */\n`;
  }
  output += `export interface ${className} {\n`;

  const propertyNames = Object.keys(classData.properties).sort();
  for (const propName of propertyNames) {
    const prop = classData.properties[propName];
    const optional = prop.optional ? '?' : '';
    output += `  ${propName}${optional}: ${prop.type};\n`;
  }

  if (propertyNames.length > 0 && Object.keys(classData.methods).length > 0) {
    output += '\n';
  }

  const methodNames = Object.keys(classData.methods).sort();
  for (const methodName of methodNames) {
    const method = classData.methods[methodName];
    const params = method.params
      .map(p => p.optional ? `${p.name}?: ${p.type}` : `${p.name}: ${p.type}`)
      .join(', ');

    output += `  ${methodName}(${params}): ${method.returnType};\n`;
  }

  output += '}\n';
  return output;
}

function generateTypedef(name, typedefData) {
  let output = '';
  if (typedefData.description) {
    output += `/** ${typedefData.description.replace(/\n/g, ' ')} */\n`;
  }
  if (typedefData.properties.length > 0) {
    output += `export interface ${name} {\n`;
    for (const prop of typedefData.properties) {
      const opt = prop.optional ? '?' : '';
      output += `  ${prop.name}${opt}: ${prop.type};\n`;
    }
    output += '}\n';
  } else {
    output += `export type ${name} = ${typedefData.type || 'any'};\n`;
  }
  return output;
}

const TS_BUILTINS = new Set([
  'Array', 'Record', 'Object', 'Function', 'Promise', 'Date', 'Map', 'Set',
  'Error', 'RegExp', 'Symbol', 'ReadonlyArray', 'Partial', 'Required', 'Readonly',
  'Pick', 'Omit', 'Exclude', 'Extract', 'NonNullable', 'ReturnType', 'JSON'
]);

function collectCustomTypeRefs(str) {
  const refs = [];
  for (const m of (str.match(/\b[A-Z][a-zA-Z0-9]+\b/g) || [])) {
    if (!TS_BUILTINS.has(m)) refs.push(m);
  }
  return refs;
}

function collectReferencedApiTypes(classes, typedefs) {
  const refs = new Set();
  for (const classData of Object.values(classes)) {
    for (const method of Object.values(classData.methods)) {
      collectCustomTypeRefs(method.returnType).forEach(t => refs.add(t));
      for (const p of method.params) collectCustomTypeRefs(p.type).forEach(t => refs.add(t));
    }
    for (const prop of Object.values(classData.properties)) {
      collectCustomTypeRefs(prop.type).forEach(t => refs.add(t));
    }
  }
  for (const td of Object.values(typedefs)) {
    if (td.type) collectCustomTypeRefs(td.type).forEach(t => refs.add(t));
    for (const prop of td.properties) collectCustomTypeRefs(prop.type).forEach(t => refs.add(t));
  }
  return refs;
}

function generateDtsFile(data, typeName, namespaceName) {
  const editorName = typeName === 'forms' ? 'form' : typeName;
  let body = '';

  const typedefs = extractTypedefs(data);
  const typedefNames = Object.keys(typedefs).sort();
  for (const name of typedefNames) {
    body += generateTypedef(name, typedefs[name]);
    body += '\n';
  }

  const classes = extractClasses(data);
  const classNames = Object.keys(classes).sort();

  const definedNames = new Set([...classNames, ...typedefNames]);
  const referenced = collectReferencedApiTypes(classes, typedefs);
  const stubs = [...referenced].filter(t => !definedNames.has(t)).sort();
  if (stubs.length > 0) {
    body += `// Cross-file type stubs\n`;
    for (const stub of stubs) {
      body += `export type ${stub} = any;\n`;
    }
    body += '\n';
  }

  // The entry-point class is always literally named "Api" in the source data
  // (e.g. Api.GetDocument(), Api.GetActiveSheet(), Api.GetPresentation()).
  // Namespacing per editor (Word.Api, Cell.Api, ...) keeps it and every other
  // type reachable and disambiguated across editors - same-named classes like
  // ApiParagraph exist in every editor with a different shape, so a flat export
  // would collide; nesting them under Word/Cell/Slide/Forms makes every type
  // importable from every editor without ambiguity.
  for (const className of classNames) {
    body += generateInterface(className, classes[className]);
    body += '\n';
  }

  let output = `// Auto-generated from ONLYOFFICE/sdkjs JSDoc\n`;
  output += `// Editor type: ${editorName}\n\n`;
  output += `export namespace ${namespaceName} {\n`;
  output += body
    .split('\n')
    .map(line => (line ? `  ${line}` : line))
    .join('\n');
  output += '}\n';

  return output;
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const apiData = await fetchApiDefinitions();

  for (const [typeName, data] of Object.entries(apiData)) {
    const content = generateDtsFile(data, typeName, NAMESPACE_MAP[typeName]);
    const filename = `${typeName}.ts`;
    fs.writeFileSync(path.join(OUTPUT_DIR, filename), content);
    console.log(`Generated ${filename} with ${Object.keys(extractClasses(data)).length} classes`);
  }

  console.log('Done!');
}

main().catch(console.error);
