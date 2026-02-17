const fs = require('fs');
const path = require('path');
const https = require('https');

const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'generated');
const API_REPO = 'ONLYOFFICE/office-js-api-declarations';
const API_BRANCH = 'master';
const API_FILES = ['word.json', 'cell.json', 'slide.json'];
const FILE_MAP = {
  'word': 'word',
  'cell': 'cell',
  'slide': 'slide'
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

function parseType(typeObj) {
  if (!typeObj || !typeObj.names) return 'any';
  const names = typeObj.names.map(n => {
    if (n === 'null') return 'null';
    if (n === 'undefined') return 'undefined';
    if (n === 'Number') return 'number';
    if (n === 'String') return 'string';
    if (n === 'Boolean') return 'boolean';
    if (n === 'Array') return 'any[]';
    if (n === 'Object') return 'object';
    if (n === 'any') return 'any';
    if (n.startsWith('Array.<')) return n.replace('Array.<', '').replace('>', '[]');
    if (n === 'byte') return 'number';
    if (n === 'twips') return 'number';
    if (n === 'EMU') return 'number';
    if (n === 'pt') return 'number';
    if (n === 'mm') return 'number';
    if (n === 'rad') return 'number';
    if (n.startsWith('"') && n.endsWith('"')) return n;
    return n;
  });
  return names.join(' | ');
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
        const params = item.params ? item.params.map(p => ({
          name: p.name.replace(/[^a-zA-Z0-9_$]/g, '_'),
          type: parseType(p.type),
          optional: p.optional || false,
          defaultValue: p.defaultvalue
        })) : [];
        
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

function generateInterface(className, classData) {
  let output = '';
  
  if (classData.description) {
    output += `/** ${classData.description.replace(/\n/g, ' ')} */\n`;
  }
  output += `interface ${className} {\n`;
  
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

function generateDtsFile(data, typeName) {
  const editorName = typeName === 'forms' ? 'form' : typeName;
  let output = 'export {};\n\n';
  output += `// Auto-generated from ${API_REPO}\n`;
  output += `// Editor type: ${editorName}\n\n`;
  
  const classes = extractClasses(data);
  const classNames = Object.keys(classes).sort();
  
  for (const className of classNames) {
    output += generateInterface(className, classes[className]);
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
