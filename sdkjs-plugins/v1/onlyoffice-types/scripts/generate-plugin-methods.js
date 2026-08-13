// Generates the executeMethod surface (<Editor>MethodArgs/<Editor>MethodName/<Editor>MethodReturn)
// from sdkjs's own JSDoc, the same way generate-types.js generates the Api.* object model from
// apiBuilder.js - reuses that script's type-parsing utilities (`require`d, not duplicated) so the
// two generators can't silently diverge on how a JSDoc type name maps to TypeScript.
//
// Source: `Api.prototype["pluginMethod_<Name>"]` doclets in common/apiBase_plugins.js (shared across
// editors, filtered by `@typeofeditors`) plus each editor's own <editor>/api_plugins.js /
// sdkjs-forms/apiPlugins.js / sdkjs-ext/<editor>/api_plugins.js. jsdoc applies `@alias` itself (the
// doclet's `.name` is already the real executeMethod name, not the `pluginMethod_` wrapper), and
// `@undocumented` becomes `doclet.undocumented === true` - both handled by jsdoc, not regexed here.
//
// Deliberately excludes `@undocumented` methods: they're excluded from ONLYOFFICE's own docs, and a
// couple (CloseWindow, ShowButton) already have their own hardcoded overload directly on
// AscPlugin.executeMethod, independent of these generated *MethodArgs types.

const fs = require('fs');
const path = require('path');
const {
  resolveSdkjsPaths, runJsdoc, parseType, collectCustomTypeRefs, renderJsDoc,
  splitDescription, htmlToMarkdown, cleanProse,
} = require('./generate-types.js');
const { mergeApiIndex } = require('./api-index.js');

// jsdoc signals "may be omitted" three different ways depending on how the comment was written:
// `[name]` bracket syntax -> `optional: true`; `[name=default]` -> also `defaultvalue`; and a
// `{?Type}` nullable type prefix -> a separate `nullable: true` (not folded into `optional`).
// `common/apiBase_plugins.js` uses all three inconsistently for what's really the same intent.
function isEffectivelyOptional(p) {
  return Boolean(p.optional || p.nullable || p.defaultvalue !== undefined);
}

const PACKAGE_ROOT = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(PACKAGE_ROOT, 'src', 'generated');

const EDITOR_CODES = { word: 'CDE', cell: 'CSE', slide: 'CPE', pdf: 'PDFE', forms: 'CFE' };
const NAME_PREFIX = { word: 'Word', cell: 'Cell', slide: 'Slide', pdf: 'Pdf', forms: 'Forms' };

// Supporting typedefs that real code outside this package already imports from the root
// (`onlyoffice-plugins-api`/`@onlyoffice/plugins-types`) - everything else stays file-local.
// `ContentControl`/`comment`/`TextAnnotation`/`TextAnnotationRange` are also imported by
// `src/plugin/events.d.ts`, whose `PluginEventMap` reuses these canonical shapes for Word's
// content-control/comment/annotation event payloads instead of duplicating them by hand.
const EXTRA_EXPORTS = {
  word: ['ContentControlProperties', 'AddinFieldData', 'ContentControl', 'comment', 'TextAnnotation', 'TextAnnotationRange'],
};

// Typedef properties sdkjs's own JSDoc marks required with no optional/nullable/defaultvalue signal
// at all (nothing for isEffectivelyOptional to detect), but real, tested usage - the hand-verified
// signatures this generator replaces - routinely omits them. No static analysis of the comment text
// finds these; they're recorded here specifically because a previous verification pass caught the
// mismatch against real executeMethod examples. `'*'` means every property in the typedef is optional.
const OPTIONAL_PROPERTY_OVERRIDES = {
  CommentData: ['QuoteText', 'Time', 'UserId', 'Solved', 'Replies'],
  OLEProperties: '*',
  OLEObjectData: '*',
  ContentControlProperties: ['Id', 'Alias', 'Appearance', 'Border', 'Color', 'InternalId', 'Lock', 'PlaceHolderText', 'Shd', 'FormKey', 'RadioGroup', 'FormValue'],
};

// A handful of typedef properties need their *type* corrected too, not just optionality - sdkjs's
// JSDoc for `ContentControlProperties.Id` says `string` (matching the unrelated `ContentControl`
// typedef used for read results), but every real AddContentControl* example passes a number as a
// caller-chosen temporary tracking id, not the final assigned string id `ContentControl.Id` returns.
const TYPE_OVERRIDES = {
  ContentControlProperties: { Id: 'number' },
  // `ContentControl.Tag` is consistently documented as `string` everywhere it's declared (both
  // word/api_plugins.js and sdkjs-forms/apiPlugins.js), but ONLYOFFICE's own GetAllContentControls
  // and GetAllForms doc examples compare it against a numeric literal (`data[i].Tag == 11`) - a
  // loose-equality artifact in the example itself, not a real alternate wire type. Widened just
  // enough for that comparison to type-check without losing the rest of ContentControl's shape.
  ContentControl: { Tag: 'string | number' },
};

// A plain (non-object) typedef whose own union is missing a value real code checks for -
// `SelectionType` is documented as `"none" | "text" | "drawing" | "slide"`, but GetSelectionType
// can also return `"image"` in practice.
const TYPEDEF_TYPE_OVERRIDES = {
  SelectionType: '"none" | "text" | "drawing" | "slide" | "image"',
};

// Same idea as the two tables above, but for methods rather than typedefs: a param's own
// optionality/type, or the method's return type, corrected against real executeMethod examples
// rather than what sdkjs's JSDoc literally states. Applied to every editor a method appears in.
const METHOD_OVERRIDES = {
  // No `[bracket]` marking, but every real GetCurrentContentControlPr call passes zero args.
  GetCurrentContentControlPr: { paramOptional: [0] },
  // `@param {string} isclear` contradicts its own description ("true/false") - a mistake in
  // sdkjs's own JSDoc, not an intentional stringly-typed boolean.
  UnShowInputHelper: { paramTypes: { 1: 'boolean' } },
  // GetMacros/SetMacros both reference the `Macros` typedef in JSDoc, but the wire format is a
  // raw JSON string the caller must JSON.parse()/JSON.stringify() themselves - matches the
  // long-standing doc note on GetMacros elsewhere in this package. sdkjs's own JSDoc also declares
  // GetMacros with zero params, but real doc examples for both cell and slide call it as
  // `executeMethod("GetMacros", [JSON.stringify(Content)], ...)` - add the optional arg the old
  // hand-maintained signatures already carried (`data?: any` / `oContent?: string`) so those
  // examples still type-check.
  GetMacros: { returnType: 'string', addParams: [{ name: 'oContent', type: 'string', optional: true }] },
  SetMacros: { paramTypes: { 0: 'string' } },
  // Every real GetSelectedText() call omits the options object entirely - the JSDoc @param has no
  // `[bracket]` marking, but it's optional in practice for the same reason its own sub-fields are.
  GetSelectedText: { paramOptional: [0] },
  // Real usage keys this array's objects by `Props`, not `ContentControlProperties` - the property
  // name `@typedef ContentControlPropertiesAndContent` documents. Modeling the object precisely
  // would encode a key the runtime doesn't accept; `any[]` matches what this was typed as before.
  InsertAndReplaceContentControls: { paramTypes: { 0: 'any[]' } },
  // The doc example's `[Uint8Array]` (the constructor itself, not an instance) doesn't satisfy a
  // real `Uint8Array` parameter type under strict checking - `any` here isn't a precision loss
  // introduced by this generator, the previous hand-maintained signature already used it.
  OpenFile: { paramTypes: { 0: 'any' } },
  RemoveContentControls: { paramTypes: { 0: 'any[]' } },
  RemoveOleObjects: { paramTypes: { 0: 'any[]' } },
  // sdkjs's own JSDoc types this param against the shared `ContentControlType` typedef (1|2|3|4:
  // block/inline/row/cell), but AddContentControlList's own description says it's actually
  // 0 (dropdown list) or 1 (combo box) - a different, unrelated 0/1 enum that happens to share a
  // param name with the real ContentControlType. Real calls pass 0, which the shared typedef
  // rejects; that mismatch is what causes TS to misreport the error against the last intersected
  // overload (FormsMethodArgs) instead of AddContentControlList's own signature.
  AddContentControlList: { paramTypes: { 0: '0 | 1' } },
};

function applyMethodOverrides(name, method) {
  const override = METHOD_OVERRIDES[name];
  if (!override) return method;
  const params = method.params.map((p, i) => ({
    ...p,
    optional: p.optional || (override.paramOptional || []).includes(i),
    type: (override.paramTypes && override.paramTypes[i]) || p.type,
  }));
  // Once param i is optional, every later param must be too (a required param can't follow an
  // optional one in a tuple) - matches the same cascading rule extractMethods applies going forward.
  // `addParams`: sdkjs's own JSDoc documents zero params for this method, but a real doc example
  // passes one anyway (GetMacros) - append synthetic optional params rather than overriding an
  // index that doesn't exist in `method.params`.
  for (const extra of override.addParams || []) {
    params.push({ name: extra.name, type: extra.type, optional: true });
  }
  let sawOptional = false;
  for (const p of params) {
    if (sawOptional) p.optional = true;
    if (p.optional) sawOptional = true;
  }
  return {
    ...method,
    params,
    returnType: override.returnType || method.returnType,
  };
}

function resolveSdkjsExt(paths) {
  const sdkjsExt = process.argv.includes('--sdkjs-ext')
    ? process.argv[process.argv.indexOf('--sdkjs-ext') + 1]
    : process.env.SDKJS_EXT_PATH || path.resolve(paths.sdkjs, '..', 'sdkjs-ext');
  return path.resolve(sdkjsExt);
}

function methodSources(paths, editor) {
  const common = path.join(paths.sdkjs, 'common', 'apiBase_plugins.js');
  switch (editor) {
    case 'word':
      // Matches tools/docs/plugins/config/methods/word.json in the ONLYOFFICE super-repo: Word
      // also picks up sdkjs-forms/apiPlugins.js's methods (GetAllForms, SetFormValue, ...), since a
      // Word document can itself contain form fields.
      return [common, path.join(paths.sdkjs, 'word', 'api_plugins.js'), path.join(paths.sdkjsForms, 'apiPlugins.js'), path.join(paths.sdkjsExt, 'word', 'api_plugins.js')];
    case 'cell':
      return [common, path.join(paths.sdkjs, 'cell', 'api_plugins.js')];
    case 'slide':
      return [common, path.join(paths.sdkjs, 'slide', 'api_plugins.js'), path.join(paths.sdkjsExt, 'slide', 'api_plugins.js')];
    case 'pdf':
      return [common, path.join(paths.sdkjs, 'pdf', 'api_plugins.js')];
    case 'forms':
      return [common, path.join(paths.sdkjs, 'word', 'api_plugins.js'), path.join(paths.sdkjsForms, 'apiPlugins.js')];
    default:
      throw new Error(`Unknown editor: ${editor}`);
  }
}

function hasEditorTag(doclet, editorCode) {
  const tag = (doclet.tags || []).find((t) => t.title === 'typeofeditors');
  // No `@typeofeditors` tag at all means "applies to every editor" (e.g. GetVersion, PasteHtml) -
  // only a *present* tag actually restricts which editors a method applies to.
  if (!tag) return true;
  try {
    return JSON.parse(tag.value).includes(editorCode);
  } catch {
    return false;
  }
}

function extractMethods(doclets, editorCode) {
  const methods = {};
  for (const item of doclets) {
    // A chained assignment (`Api.prototype["pluginMethod_X"] = Api.prototype["pluginMethod_Y"] =
    // function() {...}`, e.g. IsFillingForm/IsFillingFormMode) makes jsdoc classify the doclet as
    // 'member' rather than 'function' - it still carries the same params/returns/alias, so treat it
    // the same way.
    if (!['function', 'method', 'member'].includes(item.kind)) continue;
    if (item.memberof !== 'Api' || !item.name) continue;
    if (item.undocumented) continue;
    if (!hasEditorTag(item, editorCode)) continue;
    if (methods[item.name]) continue; // first (real) source wins if a name repeats across files

    // `@param {object} obj` followed by `@param {string} obj.type`/`@param {number} obj.x` (dotted
    // names) documents obj's own inline shape, the same way `@property` does for a typedef - fold
    // the dotted entries into their parent's type instead of treating each as its own positional
    // parameter (that would turn a 1-arg call like `OnDropEvent({type, x, y})` into a 5-arg one).
    const rawParams = item.params || [];
    const topLevelParams = rawParams.filter((p) => !p.name.includes('.'));
    const nestedParams = rawParams.filter((p) => p.name.includes('.'));

    const seenNames = new Set();
    let hasOptional = false;
    const params = topLevelParams.map((p) => {
      let name = p.name.replace(/[^a-zA-Z0-9_$]/g, '_');
      if (seenNames.has(name)) {
        let i = 2;
        while (seenNames.has(`${name}_${i}`)) i += 1;
        name = `${name}_${i}`;
      }
      seenNames.add(name);
      if (isEffectivelyOptional(p)) hasOptional = true;

      const ownNested = nestedParams.filter((np) => np.name.startsWith(`${p.name}.`) && np.name.split('.').length === 2);
      const baseType = parseType(p.type);
      // Every sub-field is optional regardless of its own `[bracket]` marking: sdkjs documents a
      // dotted @param's sub-fields far less consistently than a top-level param's own optionality
      // (real callers routinely supply a partial options object - see the "## Try it" examples for
      // OnDropEvent/OnEncryption/GetSelectedText - required-by-default would reject those calls).
      const inlineProps = ownNested.length > 0
        ? `{ ${ownNested.map((np) => `${np.name.slice(p.name.length + 1)}?: ${parseType(np.type)}`).join('; ')} }`
        : null;
      // `@param {TextAnnotation} annotation` + `@param {boolean} [annotation.all]` documents
      // BOTH a real typedef reference AND extra inline sub-fields on top of it - a generic
      // `{object}`/`{Object}` base has nothing worth keeping, but a real named type does, so it's
      // intersected with the inline properties instead of being discarded in favor of them.
      const isGenericBase = /^(?:object|Object|any|unknown)$/.test(baseType);
      let type;
      if (!inlineProps) type = baseType;
      else if (isGenericBase) type = inlineProps;
      else type = `${baseType} & ${inlineProps}`;

      return {
        name,
        type,
        optional: hasOptional,
        description: p.description || '',
      };
    });

    // `any`, not `void`, when sdkjs documents no `@returns` at all: several such methods (Undo,
    // CoAuthoringChatSendMessage, ...) still pass a real value to the executeMethod callback in
    // practice - `void` can't be truthiness-checked (`if (result)`), which real callback code does.
    // The hand-maintained signatures this generator replaces defaulted to `any` for the same reason.
    const returnType = item.returns && item.returns.length > 0 ? parseType(item.returns[0].type) : 'any';

    methods[item.name] = {
      params,
      returnType,
      description: item.description || '',
      returnDescription: (item.returns && item.returns[0] && item.returns[0].description) || '',
      since: item.since || '',
      deprecated: item.deprecated || '',
    };
  }
  return methods;
}

function extractTypedefs(doclets) {
  const typedefs = {};
  for (const item of doclets) {
    if (item.kind !== 'typedef' || !item.name || item.name.startsWith('_') || item.undocumented) continue;
    const hasProps = item.properties && item.properties.length > 0;
    const merged = hasProps ? mergeNestedProperties(item.properties) : [];
    const override = OPTIONAL_PROPERTY_OVERRIDES[item.name];
    if (override === '*') merged.forEach((p) => { p.optional = true; });
    else if (override) merged.forEach((p) => { if (override.includes(p.name)) p.optional = true; });
    const typeOverride = TYPE_OVERRIDES[item.name];
    if (typeOverride) merged.forEach((p) => { if (typeOverride[p.name]) p.type = typeOverride[p.name]; });

    typedefs[item.name] = {
      description: item.description || '',
      type: hasProps ? null : (TYPEDEF_TYPE_OVERRIDES[item.name] || parseType(item.type)),
      properties: merged,
    };
  }
  return typedefs;
}

// `@property {number} Color.R` (a dotted name) documents a nested field of an object-typed sibling
// property (`@property {Object} Color`) - jsdoc keeps both as flat, separate entries in `properties`,
// so a dotted name emitted as a literal TS property key (`Color.R: number;`) would be a syntax
// error. Fold every dotted entry into its parent's type as an inline object instead.
function mergeNestedProperties(rawProperties) {
  const topLevel = rawProperties.filter((p) => !p.name.includes('.'));
  const nested = rawProperties.filter((p) => p.name.includes('.'));

  return topLevel.map((p) => {
    const ownNested = nested.filter((np) => np.name.startsWith(`${p.name}.`) && np.name.split('.').length === 2);
    const base = {
      name: p.name,
      optional: isEffectivelyOptional(p),
      description: p.description || '',
    };
    if (ownNested.length === 0) return { ...base, type: parseType(p.type) };
    const props = ownNested
      .map((np) => `${np.name.slice(p.name.length + 1)}${isEffectivelyOptional(np) ? '?' : ''}: ${parseType(np.type)}`)
      .join('; ');
    return { ...base, type: `{ ${props} }` };
  });
}

// A `@property` name isn't guaranteed to be a valid TS identifier (sdkjs documents at least one
// CSS-variable-style dashed name, `stroke-width`) - quote it when it isn't one, the same way a
// dashed key needs quoting in any object type.
const VALID_IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
function propertyKey(name) {
  return VALID_IDENTIFIER.test(name) ? name : `"${name}"`;
}

function generateTypedef(name, data) {
  let output = renderJsDoc({ description: data.description }, '');
  if (data.properties.length > 0) {
    output += `interface ${name} {\n`;
    data.properties.forEach((prop, index) => {
      const doc = renderJsDoc({ description: prop.description }, '  ');
      if (doc && index > 0) output += '\n';
      output += `${doc}  ${propertyKey(prop.name)}${prop.optional ? '?' : ''}: ${prop.type};\n`;
    });
    output += '}\n';
  } else {
    output += `type ${name} = ${data.type || 'unknown'};\n`;
  }
  return output;
}

// `collectCustomTypeRefs` (shared with generate-types.js) only catches PascalCase identifiers - sdkjs
// occasionally references a type by a camelCase/lowercase name without ever declaring a matching
// `@typedef` for it (e.g. `@property {localeTranslate} ...`, `@returns {comment[]}`) - a gap in
// sdkjs's own JSDoc, not something a stricter regex would find a real definition for. This catches
// those too so they get stubbed as `unknown` instead of failing as an undefined-name compile error.
const TS_KEYWORDS = new Set([
  'string', 'number', 'boolean', 'object', 'void', 'any', 'unknown', 'never', 'null', 'undefined', 'this',
]);
function collectLowercaseTypeRefs(str) {
  // Same exclusions as collectCustomTypeRefs: strip string-literal content, then strip identifiers in
  // property-name position (`align:`, `fill?:`) - those are object-literal keys, not type references.
  const withoutStrings = String(str || '')
    .replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, '')
    .replace(/\b[a-z][a-zA-Z0-9]*\b(?=\??\s*:)/g, '');
  const refs = [];
  for (const m of (withoutStrings.match(/\b[a-z][a-zA-Z0-9]*\b/g) || [])) {
    if (!TS_KEYWORDS.has(m)) refs.push(m);
  }
  return refs;
}

function generateMethodFile(editor, methods, typedefs) {
  const prefix = NAME_PREFIX[editor];
  let body = `// Auto-generated from ONLYOFFICE/sdkjs JSDoc (common/apiBase_plugins.js + per-editor api_plugins.js).\n`;
  body += `// executeMethod names/args/returns for ${prefix}. Run \`npm run generate-plugin-methods\` to regenerate.\n\n`;

  const definedNames = new Set(Object.keys(typedefs));
  const referenced = new Set();
  const collectFrom = (type) => {
    // `collectCustomTypeRefs` (shared with generate-types.js) excludes PascalCase identifiers in
    // property-name position, but only for `Name:` - not `Name?:` (an optional property, which is
    // exactly the shape a merged dotted-@param object produces, e.g. `TableCellSeparator?: string`).
    // Strip those first so an optional property's PascalCase *name* doesn't get mistaken for an
    // undefined type reference and stubbed as `unknown` right next to its own real type.
    const withoutOptionalKeys = String(type || '').replace(/\b[A-Za-z_$][A-Za-z0-9_$]*\b(?=\?\s*:)/g, '');
    collectCustomTypeRefs(withoutOptionalKeys).forEach((t) => referenced.add(t));
    collectLowercaseTypeRefs(withoutOptionalKeys).forEach((t) => referenced.add(t));
  };
  for (const method of Object.values(methods)) {
    collectFrom(method.returnType);
    for (const p of method.params) collectFrom(p.type);
  }
  for (const typedef of Object.values(typedefs)) {
    if (typedef.type) collectFrom(typedef.type);
    for (const prop of typedef.properties) collectFrom(prop.type);
  }
  const stubs = [...referenced].filter((t) => !definedNames.has(t)).sort();

  for (const name of Object.keys(typedefs).sort()) {
    body += generateTypedef(name, typedefs[name]);
    body += '\n';
  }
  if (stubs.length > 0) {
    body += '// Cross-file type stubs\n';
    for (const stub of stubs) body += `type ${stub} = unknown;\n`;
    body += '\n';
    console.warn(`[${prefix}] unresolved method types (${stubs.length}): ${stubs.join(', ')}`);
  }

  const methodNames = Object.keys(methods).sort();
  body += `type ${prefix}MethodArgs = {\n`;
  for (const name of methodNames) {
    const method = methods[name];
    const doc = renderJsDoc(method, '  ');
    const tuple = method.params.map((p) => `${p.name}${p.optional ? '?' : ''}: ${p.type}`).join(', ');
    body += `${doc}  ${name}: [${tuple}];\n`;
  }
  body += '};\n\n';

  body += `type ${prefix}MethodName = keyof ${prefix}MethodArgs;\n\n`;

  body += `type ${prefix}MethodReturnMap = {\n`;
  for (const name of methodNames) {
    body += `  ${name}: ${methods[name].returnType};\n`;
  }
  body += '};\n\n';
  body += `type ${prefix}MethodReturn<T extends ${prefix}MethodName> = ${prefix}MethodReturnMap[T];\n\n`;

  // Only the 3 method-registry types are exported by default: the supporting typedefs
  // (CommentData, OLEProperties, ...) come from the shared common/apiBase_plugins.js and would
  // otherwise be duplicated - and therefore ambiguous - across all 5 generated files once
  // index.d.ts re-exports all of them with `export type * from`. EXTRA_EXPORTS carves out the
  // handful that real external code already imports from the package root.
  const extraExports = (EXTRA_EXPORTS[editor] || []).filter((name) => typedefs[name]);
  body += `export type { ${prefix}MethodArgs, ${prefix}MethodName, ${prefix}MethodReturn${extraExports.length ? `, ${extraExports.join(', ')}` : ''} };\n`;

  return body;
}

// Same shape of prose the object-model index carries (description vs examples kept apart), keyed by
// the executeMethod name a caller passes as a string - that string is what an agent or a search tool
// actually looks up, so it leads the entry rather than being buried in a signature.
function buildExecuteMethodIndex(methods) {
  const index = {};
  for (const [name, method] of Object.entries(methods)) {
    const { summary, examples } = splitDescription(method.description);
    const paramsTuple = method.params
      .map((p) => `${p.name}${p.optional ? '?' : ''}: ${p.type}`)
      .join(', ');
    index[name] = {
      signature: `executeMethod("${name}", [${paramsTuple}], callback?): ${method.returnType}`,
      ...(summary ? { description: htmlToMarkdown(cleanProse(summary)) } : {}),
      ...(examples.length > 0 ? { examples } : {}),
      ...(method.since ? { since: method.since } : {}),
      ...(method.deprecated ? { deprecated: typeof method.deprecated === 'string' ? method.deprecated : true } : {}),
      params: method.params.map((p) => ({
        name: p.name,
        type: p.type,
        ...(p.optional ? { optional: true } : {}),
        ...(p.description ? { description: htmlToMarkdown(cleanProse(p.description)) } : {}),
      })),
      returns: {
        type: method.returnType,
        ...(method.returnDescription
          ? { description: htmlToMarkdown(cleanProse(method.returnDescription)) }
          : {}),
      },
    };
  }
  return index;
}

function main() {
  const sdkjsPaths = resolveSdkjsPaths();
  const paths = { ...sdkjsPaths, sdkjsExt: resolveSdkjsExt(sdkjsPaths) };

  for (const editor of Object.keys(EDITOR_CODES)) {
    const sources = methodSources(paths, editor).filter((f) => fs.existsSync(f));
    console.log(`Reading ${editor} plugin-method JSDoc from ${sources.join(', ')}...`);
    const doclets = runJsdoc(sources);
    const methods = extractMethods(doclets, EDITOR_CODES[editor]);
    for (const [name, method] of Object.entries(methods)) methods[name] = applyMethodOverrides(name, method);
    const typedefs = extractTypedefs(doclets);
    const content = generateMethodFile(editor, methods, typedefs);
    const outPath = path.join(OUTPUT_DIR, `${editor}-methods.ts`);
    fs.writeFileSync(outPath, content);
    mergeApiIndex(editor, { executeMethods: buildExecuteMethodIndex(methods) });
    console.log(`Generated ${path.relative(PACKAGE_ROOT, outPath)} with ${Object.keys(methods).length} methods, ${Object.keys(typedefs).length} typedefs`);
  }
}

main();
