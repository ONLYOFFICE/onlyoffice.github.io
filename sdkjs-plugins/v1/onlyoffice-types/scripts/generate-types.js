const fs = require('fs');
const path = require('path');
const https = require('https');

const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'generated');
const API_REPO = 'ONLYOFFICE/office-js-api-declarations';
const API_BRANCH = 'master';
const API_FILES = ['word.json', 'cell.json', 'slide.json', 'forms.json'];
const FILE_MAP = {
  'word': 'word',
  'cell': 'cell',
  'slide': 'slide',
  'forms': 'forms'
};

function downloadFile(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function fetchApiDefinitions() {
  const results = {};
  for (const file of API_FILES) {
    const url = `https://raw.githubusercontent.com/${API_REPO}/${API_BRANCH}/office-js-api/${file}`;
    console.log(`Fetching ${file}...`);
    results[file.replace('.json', '')] = await downloadFile(url);
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
    if (item.kind === 'function' && item.name && item.memberof) {
      const className = item.memberof.replace('#', '');
      if (classes[className]) {
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
          if (p.optional || p.defaultvalue !== undefined) hasOptional = true;
          return { name, type: parseType(p.type), optional: hasOptional, defaultValue: p.defaultvalue };
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

function generateInterface(className, classData, isExported = false) {
  let output = '';
  
  if (classData.description) {
    output += `/** ${classData.description.replace(/\n/g, ' ')} */\n`;
  }
  const exportKw = isExported ? 'export ' : '';
  output += `${exportKw}interface ${className} {\n`;
  
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
    output += `interface ${name} {\n`;
    for (const prop of typedefData.properties) {
      const opt = prop.optional ? '?' : '';
      output += `  ${prop.name}${opt}: ${prop.type};\n`;
    }
    output += '}\n';
  } else {
    output += `type ${name} = ${typedefData.type || 'any'};\n`;
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

function generateDtsFile(data, typeName) {
  const editorName = typeName === 'forms' ? 'form' : typeName;
  const mainClassName = `Api${editorName.charAt(0).toUpperCase() + editorName.slice(1)}`;
  let output = 'export {};\n\n';
  output += `// Auto-generated from ${API_REPO}\n`;
  output += `// Editor type: ${editorName}\n\n`;
  
  const typedefs = extractTypedefs(data);
  const typedefNames = Object.keys(typedefs).sort();
  for (const name of typedefNames) {
    output += generateTypedef(name, typedefs[name]);
    output += '\n';
  }

  const classes = extractClasses(data);
  const classNames = Object.keys(classes).sort();

  const definedNames = new Set([...classNames, ...typedefNames]);
  const referenced = collectReferencedApiTypes(classes, typedefs);
  const stubs = [...referenced].filter(t => !definedNames.has(t)).sort();
  if (stubs.length > 0) {
    output += `// Cross-file type stubs\n`;
    for (const stub of stubs) {
      output += `type ${stub} = any;\n`;
    }
    output += '\n';
  }

  for (const className of classNames) {
    const isExported = className === mainClassName;
    output += generateInterface(className, classes[className], isExported);
    output += '\n';
  }
  
  return output;
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  const apiData = await fetchApiDefinitions();
  
  for (const [typeName, data] of Object.entries(apiData)) {
    const content = generateDtsFile(data, typeName);
    const filename = `${typeName}.ts`;
    fs.writeFileSync(path.join(OUTPUT_DIR, filename), content);
    console.log(`Generated ${filename} with ${Object.keys(extractClasses(data)).length} classes`);
  }
  
  console.log('Done!');
}

main().catch(console.error);
