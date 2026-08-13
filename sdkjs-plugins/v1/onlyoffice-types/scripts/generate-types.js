const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawnSync } = require('child_process');
const { mergeApiIndex } = require('./api-index.js');

const PACKAGE_ROOT = path.join(__dirname, '..');
const LEGACY_DECLARATIONS_REPO = 'ONLYOFFICE/office-js-api-declarations';
const LEGACY_DECLARATIONS_COMMIT = '7ab23357042d8cc2510a9b4c84f3f0e5e99626a3';

const OUTPUT_DIR = path.join(PACKAGE_ROOT, 'src', 'generated');
const LEGACY_SNAPSHOT_DIR = path.join(__dirname, 'legacy-api');
const EDITORS = {
  word: { code: 'CDE', sources: ['word/apiBuilder.js', 'word/plugin-events.js'] },
  cell: { code: 'CSE', sources: ['word/apiBuilder.js', 'slide/apiBuilder.js', 'cell/apiBuilder.js', 'cell/plugin-events.js'] },
  slide: { code: 'CPE', sources: ['word/apiBuilder.js', 'slide/apiBuilder.js', 'slide/plugin-events.js'] },
  forms: { code: 'CFE', sources: ['word/apiBuilder.js', '../sdkjs-forms/apiBuilder.js', '../sdkjs-forms/plugin-events.js'] },
  pdf: { code: 'PDFE', sources: ['word/apiBuilder.js', 'pdf/apiBuilder.js', 'pdf/plugin-events.js'] },
};
const NAMESPACE_MAP = {
  word: 'Word',
  cell: 'Cell',
  slide: 'Slide',
  forms: 'Forms',
  pdf: 'Pdf',
};

// A handful of real, working editor events aren't documented via a `@event` JSDoc block anywhere
// (unlike everything plugin-events.js does document) - confirmed instead against the exact sdkjs
// call site that dispatches each one via `window.g_asc_plugins.onPluginEvent(name, ...)`.
const MANUAL_EVENTS = {
  word: {
    // word/Editor/Document.js CDocument.prototype.OnAttachParagraph/OnDetachParagraph
    onParagraphAdd: { params: [{ name: 'data', type: '{ InternalId: string }' }], description: 'Fired when a paragraph is added to the document.' },
    onParagraphRemove: { params: [{ name: 'data', type: '{ InternalId: string }' }], description: 'Fired when a paragraph is removed from the document.' },
    // word/Editor/Document.js CDocument.prototype.OnAttachContentControl/OnDetachContentControl
    onContentControlAdd: { params: [{ name: 'control', type: 'ContentControl' }], description: 'Fired when a content control is added to the document.' },
    onContentControlRemove: { params: [{ name: 'control', type: 'ContentControl' }], description: 'Fired when a content control is removed from the document.' },
  },
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
    if (item.kind === 'event') return hasEditorTag(item, editorCode);
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

function buildLegacyLookup(data) {
  const classes = {};
  const typedefs = {};

  const describedParams = (item) => Object.fromEntries(
    (item.params || []).filter((p) => p.name && p.description).map((p) => [p.name, p.description])
  );

  for (const item of data) {
    if (item.kind === 'class' && item.name && item.description) {
      classes[item.name] = classes[item.name] || { description: '', methods: {} };
      classes[item.name].description = item.description;
    }
    if (item.kind === 'typedef' && item.name && item.description) {
      typedefs[item.name] = {
        description: item.description,
        properties: Object.fromEntries(
          (item.properties || []).filter((p) => p.name && p.description).map((p) => [p.name, p.description])
        ),
      };
    }
  }
  for (const item of data) {
    if ((item.kind === 'function' || item.kind === 'method') && item.name && item.memberof && item.description) {
      const className = item.memberof.replace('#', '');
      classes[className] = classes[className] || { description: '', methods: {} };
      // office-js-api-declarations has the same duplicate-entry quirk sdkjs does (see the comment
      // in extractClasses) - keep whichever description was recorded first for a given method.
      if (!classes[className].methods[item.name]) {
        classes[className].methods[item.name] = {
          description: item.description,
          params: describedParams(item),
          returnDescription: (item.returns && item.returns[0] && item.returns[0].description) || '',
          docsUrl: methodDocsUrl(item.see),
        };
      }
    }
  }

  return { classes, typedefs };
}

// office-js-api-declarations (a periodically-regenerated snapshot of ONLYOFFICE's public API docs
// site) has richer prose than sdkjs's own JSDoc comments - notably a "## Try it" runnable example
// in almost every description. sdkjs is still the structural source of truth (it's the one place
// that can't drift from the actual runtime), but its descriptions are enriched from the local pinned
// snapshots keyed by the same class/method names, wherever a match exists.
async function fetchLegacyDescriptions(editor) {
  // PDF has no office-js-api-declarations snapshot. Its descriptions come directly from sdkjs.
  if (editor === 'pdf') return null;

  const snapshotPath = path.join(LEGACY_SNAPSHOT_DIR, `${editor}.json`);
  if (!fs.existsSync(snapshotPath)) {
    throw new Error(`Missing legacy API snapshot: ${snapshotPath}`);
  }

  try {
    return buildLegacyLookup(JSON.parse(fs.readFileSync(snapshotPath, 'utf8')));
  } catch (err) {
    throw new Error(`Could not read legacy API snapshot ${snapshotPath}: ${err.message}`);
  }
}

function applyLegacyDescriptions(classes, typedefs, legacy) {
  if (!legacy) return;

  for (const [className, classData] of Object.entries(classes)) {
    const legacyClass = legacy.classes[className];
    if (legacyClass && legacyClass.description) classData.description = legacyClass.description;
    for (const [methodName, method] of Object.entries(classData.methods)) {
      const legacyMethod = legacyClass && legacyClass.methods[methodName];
      if (!legacyMethod) continue;
      method.description = legacyMethod.description;
      if (legacyMethod.returnDescription) method.returnDescription = legacyMethod.returnDescription;
      if (!method.docsUrl) method.docsUrl = legacyMethod.docsUrl;
      // Param descriptions are matched by name, not position: the snapshot occasionally documents a
      // different arity than the current sdkjs signature does, and a positional merge would then
      // attach one parameter's prose to another.
      for (const param of method.params) {
        const legacyParamDescription = legacyMethod.params[param.name];
        if (legacyParamDescription) param.description = legacyParamDescription;
      }
    }
  }
  for (const [name, typedefData] of Object.entries(typedefs)) {
    const legacyTypedef = legacy.typedefs[name];
    if (!legacyTypedef) continue;
    typedefData.description = legacyTypedef.description;
    for (const prop of typedefData.properties) {
      const legacyPropDescription = legacyTypedef.properties[prop.name];
      if (legacyPropDescription) prop.description = legacyPropDescription;
    }
  }
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
  // JSDoc's "any type" wildcard (`@property {*} FormValue`) - `unknown` keeps the package's no-`any`
  // guarantee while still accepting every value the runtime can put there.
  if (n === '*') return 'unknown';
  if (n === 'Number') return 'number';
  if (n === 'String') return 'string';
  if (n === 'Boolean') return 'boolean';
  if (n === 'bool') return 'boolean';
  if (n === 'Array' || n === 'array') return 'unknown[]';
  if (n === 'Object') return 'object';
  // Same reasoning as `*` just above - `@param {any}` is JSDoc's other spelling of "unconstrained",
  // and passing it through as literal `any` would be the one place left that could reintroduce it
  // into otherwise `any`-free output.
  if (n === 'any') return 'unknown';
  if (n === 'function' || n === 'Function') return '(...args: unknown[]) => unknown';
  // `twips`/`EMU`/`pt`/`mm`/`rad`/`percentage` are NOT collapsed to `number` here on purpose: sdkjs
  // declares each as a real `@typedef {number}` with prose explaining the unit ("Twentieths of a
  // point (equivalent to 1/1440th of an inch)"), and the generator emits those typedefs - collapsing
  // every use site to bare `number` shipped a documented alias that nothing referenced (`EMU` had 0
  // uses, `twips` 1) and dropped the unit from every hover. They all resolve to `number`, so keeping
  // the alias is purely additive. `byte` has no such typedef in the sources, so it still maps
  // directly.
  if (n === 'byte') return 'number';
  if (n === 'JSON') return 'object';
  if (n === 'base64img') return 'string';
  if (n === 'range') return 'unknown';
  if (n.startsWith('"') && n.endsWith('"')) return n;
  if (n.startsWith('Array.<') && n.endsWith('>')) {
    const inner = n.slice(7, -1);
    return `${parseTypeName(inner)}[]`;
  }
  if (n.startsWith('Object.<') && n.endsWith('>')) {
    const inner = n.slice(8, -1);
    const parts = splitTopLevel(inner, ',');
    const keyType = parts[0] ? parseTypeName(parts[0]) : 'string';
    const valType = parts[1] ? parseTypeName(parts[1]) : 'unknown';
    return `Record<${keyType}, ${valType}>`;
  }
  return n;
}

function parseType(typeObj) {
  if (!typeObj || !typeObj.names) return 'unknown';
  return typeObj.names.map(parseTypeName).join(' | ');
}

// Every documented sdkjs member carries a `@see office-js-api/Examples/<Editor>/<Class>/Methods/<Method>.js`
// tag pointing at its runnable example in ONLYOFFICE's docs repository. Those same three segments
// address the public reference page for that member, so a stable api.onlyoffice.com link can be
// derived from data already in the doclet - no per-class URL table to maintain and nothing to guess
// (a hand-built URL for an undocumented member would be a 404 in every hover tooltip).
const DOCS_BASE = 'https://api.onlyoffice.com/docs/office-api/usage-api';
const DOCS_SECTIONS = {
  Word: 'document-api',
  Cell: 'spreadsheet-api',
  Slide: 'presentation-api',
  Forms: 'form-api',
  Form: 'form-api',
  Pdf: 'pdf-api',
};

function parseSeeEntry(see) {
  for (const entry of (Array.isArray(see) ? see : [see])) {
    const match = /Examples\/([A-Za-z]+)\/([A-Za-z0-9_]+)\/Methods\/([A-Za-z0-9_]+)\.js/
      .exec(String(entry || ''));
    // "Enumerations" is a real segment here, but typedefs have no per-editor reference page.
    if (match && DOCS_SECTIONS[match[1]]) {
      return { section: DOCS_SECTIONS[match[1]], className: match[2], methodName: match[3] };
    }
  }
  return null;
}

function methodDocsUrl(see) {
  const parsed = parseSeeEntry(see);
  // A `constructor.js` example documents the class itself, not a callable member - the reference
  // site has no /Methods/constructor/ page for it.
  if (!parsed || parsed.methodName === 'constructor') return '';
  return `${DOCS_BASE}/${parsed.section}/${parsed.className}/Methods/${parsed.methodName}/`;
}

function classDocsUrl(see) {
  const parsed = parseSeeEntry(see);
  return parsed ? `${DOCS_BASE}/${parsed.section}/${parsed.className}/` : '';
}

// A single flattened signature ("every param from the first optional one onward is optional") is
// correct whenever a method's own per-param optionality is monotonic (once optional, stays
// optional) - the common case, and the only shape a plain `extends`-free TS signature can express
// anyway. Real sdkjs methods occasionally break that: `ApiDrawing#SetRelativeHeight(relativeFrom?,
// percent)` takes an optional leading param followed by a required one, so real calls come in two
// shapes - `SetRelativeHeight(50)` and `SetRelativeHeight(relativeFromH, 50)` - that the flattened
// `(relativeFrom?, percent?)` signature can't distinguish (it wrongly also accepts zero args).
// Exactly one such "optional run closed by a later required param" is a well-defined, common
// pattern (a skippable leading/middle argument) with an unambiguous two-overload fix: one signature
// with just the required params, one with everything (the previously-optional run pinned back to
// required, since this specific call shape needs it). Two or more such gaps (e.g. two independent
// optional flag+value pairs) don't have an unambiguous decomposition into two overloads without
// knowing which combinations the implementation actually accepts - those keep the single flattened
// signature rather than risk generating an incomplete or wrong overload set.
function buildOverloadParams(params, ownOptional) {
  let gapRegions = 0;
  let inOptionalRun = false;
  for (const isOpt of ownOptional) {
    if (isOpt) inOptionalRun = true;
    else if (inOptionalRun) { gapRegions += 1; inOptionalRun = false; }
  }
  if (gapRegions !== 1) return null;

  const lastRequiredIndex = ownOptional.reduce((last, isOpt, i) => (isOpt ? last : i), -1);
  // Params retain the flattened/cascaded `optional` value from `params` (true for a required param
  // that merely comes after an earlier optional one) - both overloads below need to override it
  // explicitly rather than trust that value, which is exactly the ambiguity being resolved here.
  const requiredOnly = params.filter((_, i) => !ownOptional[i]).map((p) => ({ ...p, optional: false }));
  const anchored = params.map((p, i) => ({ ...p, optional: i > lastRequiredIndex && ownOptional[i] }));
  return [requiredOnly, anchored];
}

function extractClasses(data) {
  const classes = {};

  for (const item of data) {
    if (item.kind === 'class' && item.name && !item.name.startsWith('_')) {
      const className = item.name;
      classes[className] = {
        description: item.description || '',
        since: item.since || '',
        deprecated: item.deprecated || '',
        docsUrl: classDocsUrl(item.see),
        // sdkjs classes commonly do `ApiOleObject.prototype = Object.create(ApiDrawing.prototype)`
        // and JSDoc-tag the relationship with `@extends {ApiDrawing}` (-> `augments` here) -
        // without modeling that as a real TS `extends`, every method tagged `@memberof ApiDrawing`
        // (there are dozens, shared across every drawing-like class in each editor) would silently
        // be missing from ApiOleObject/ApiShape/ApiImage/etc.
        extends: item.augments || [],
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
        const ownOptional = [];
        const params = item.params ? item.params.map(p => {
          let name = p.name.replace(/[^a-zA-Z0-9_$]/g, '_');
          if (seenNames.has(name)) {
            let i = 2;
            while (seenNames.has(`${name}_${i}`)) i++;
            name = `${name}_${i}`;
          }
          seenNames.add(name);
          const acceptsUndefined = p.type?.names?.includes('undefined');
          // JSDoc's `?type` nullable prefix (e.g. `@param {?number} nIndex`) is how sdkjs marks
          // "may be omitted, behaves sensibly if so" in practice (see ApiPresentation#AddSlide:
          // "@param {?number} nIndex - ... If not specified, the slide will be added to the end"),
          // even though strict JSDoc semantics would call that "nullable", not "optional".
          const isNullable = p.type?.names?.some(n => typeof n === 'string' && n.startsWith('?'));
          const isOwnOptional = Boolean(p.optional || p.defaultvalue !== undefined || acceptsUndefined || isNullable);
          ownOptional.push(isOwnOptional);
          if (isOwnOptional) hasOptional = true;
          const names = acceptsUndefined ? p.type.names.filter(type => type !== 'undefined') : p.type?.names;
          return {
            name,
            type: parseType(names?.length ? { ...p.type, names } : p.type),
            optional: hasOptional,
            defaultValue: p.defaultvalue,
            description: p.description || '',
          };
        }) : [];

        const returnType = item.returns && item.returns.length > 0
          ? parseType(item.returns[0].type)
          : 'void';

        classes[className].methods[item.name] = {
          params,
          overloadParams: buildOverloadParams(params, ownOptional),
          returnType,
          description: item.description || '',
          returnDescription: (item.returns && item.returns[0] && item.returns[0].description) || '',
          since: item.since || '',
          deprecated: item.deprecated || '',
          docsUrl: methodDocsUrl(item.see),
          see: item.see || [],
        };
      }
    }

    if (item.kind === 'member' && item.name && item.memberof) {
      const className = item.memberof.replace('#', '');
      if (classes[className]) {
        classes[className].properties[item.name] = {
          // `unknown`, not `any`: a property with no `@type` tag at all is exactly as unknown as a
          // documented `{*}`/`{any}` one (see parseTypeName) - defaulting to `any` here would be a
          // silent, untested way for real `any` to reappear in otherwise `any`-free output.
          type: item.type ? parseType(item.type) : 'unknown',
          description: item.description || '',
          optional: item.optional || false
        };
      }
    }
  }

  // A class doclet itself rarely carries a `@see` example path, but every one of its members does,
  // and each such path names the class - so its reference page can be derived from any member.
  for (const classData of Object.values(classes)) {
    if (classData.docsUrl) continue;
    for (const method of Object.values(classData.methods)) {
      const url = classDocsUrl(method.see);
      if (url) {
        classData.docsUrl = url;
        break;
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
        since: item.since || '',
        deprecated: item.deprecated || '',
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

function extractEvents(data, manualEvents) {
  const events = { ...manualEvents };

  for (const item of data) {
    if (item.kind !== 'event' || !item.name) continue;

    // A nested field of an object param shows up two different ways depending on which JSDoc tag
    // documented it: a repeated `@param {number} data.slideIndex` lands in `params` (dotted name),
    // while `@property {string} data.paragraphId` (used alongside a single `@param {Object} data`)
    // lands in the separate `properties` array instead - merge both before grouping.
    const allParams = [...(item.params || []), ...(item.properties || [])];
    const topLevel = allParams.filter((p) => !p.name.includes('.'));
    const nested = allParams.filter((p) => p.name.includes('.'));

    const params = topLevel.map((p) => {
      const ownNested = nested.filter((np) => np.name.startsWith(`${p.name}.`));
      if (ownNested.length > 0) {
        const props = ownNested
          .map((np) => `${np.name.slice(p.name.length + 1)}: ${parseType(np.type)}`)
          .join('; ');
        return { name: p.name, type: `{ ${props} }` };
      }
      return { name: p.name, type: parseType(p.type) };
    });

    events[item.name] = { params, description: item.description || '' };
  }

  return events;
}

const DOC_WIDTH = 100;

// Both prose sources are HTML-flavored (`<b>"tile"</b> - if the image is smaller...`), while editors
// render a JSDoc block as markdown. Only known inline tags are translated - nothing else is stripped,
// so type-ish text such as `Array.<ApiRun>` inside a description survives untouched.
function htmlToMarkdown(text) {
  return text
    // sdkjs writes site-relative inline links (`{@link /docs/plugins/... AddComment}`), which resolve
    // to nothing in an editor tooltip.
    .replace(/\{@link\s+(\/docs\/)/g, '{@link https://api.onlyoffice.com$1')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?(?:b|strong)>/gi, '**')
    .replace(/<\/?(?:i|em)>/gi, '_')
    .replace(/<\/?code>/gi, '`')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}

// The "## Try it" section carrying a fenced runnable snippet is the most valuable part of the
// office-js-api-declarations prose, and it's unreadable when flattened into a one-line `/** ... */`
// comment - it becomes a real `@example` tag instead. The fence's info string carries a
// document-builder directive (```js document-builder={"documentType": "word"}) that means nothing
// outside the docs site, so only the language survives.
function splitDescription(raw) {
  const examples = [];
  const text = String(raw || '')
    .replace(/\r\n?/g, '\n')
    .replace(/```[^\n]*\n([\s\S]*?)```/g, (_, code) => {
      examples.push(code.trim());
      return '';
    })
    .replace(/^[ \t]*#+[ \t]*Try it[ \t]*$/gim, '')
    .replace(/\n{3,}/g, '\n\n');
  return { summary: text.trim(), examples };
}

// An inline `{@link url Label}` tag must stay on one line - split across two, editors render the
// literal text instead of a link - so it is wrapped as a single (possibly over-long) word.
function toWords(paragraph) {
  const words = [];
  for (const word of paragraph.trim().split(/\s+/)) {
    const pending = words.length > 0 ? words[words.length - 1] : '';
    if (pending.includes('{@link') && !pending.includes('}')) words[words.length - 1] = `${pending} ${word}`;
    else words.push(word);
  }
  return words;
}

function wrapText(text, width) {
  const lines = [];
  for (const paragraph of text.split('\n')) {
    if (!paragraph.trim()) {
      if (lines.length > 0 && lines[lines.length - 1] !== '') lines.push('');
      continue;
    }
    let line = '';
    for (const word of toWords(paragraph)) {
      if (line && `${line} ${word}`.length > width) {
        lines.push(line);
        line = word;
      } else {
        line = line ? `${line} ${word}` : word;
      }
    }
    if (line) lines.push(line);
  }
  while (lines.length > 0 && lines[lines.length - 1] === '') lines.pop();
  return lines;
}

// sdkjs writes `@returns {?ApiComment} - Returns null if the comment was not added.`, and jsdoc keeps
// that separator hyphen in the description for `@returns` (unlike `@param`, where it strips it) -
// re-emitted as-is it would read as a stray bullet right after the tag.
function cleanProse(text) {
  return String(text || '').replace(/^\s*-\s+/, '').trimEnd();
}

// Continuation lines of a wrapped tag are indented so the tag's own text stays visually attached to
// it rather than reading as the start of a new tag.
function taggedLines(tag, text) {
  const wrapped = text ? wrapText(text, DOC_WIDTH - 4) : [];
  if (wrapped.length === 0) return [tag];
  return wrapped.map((line, index) => (index === 0 ? `${tag} ${line}` : `  ${line}`));
}

function renderJsDoc(doc, indent) {
  const { summary, examples } = splitDescription(doc.description);
  const blocks = [];

  if (summary) blocks.push(wrapText(htmlToMarkdown(cleanProse(summary)), DOC_WIDTH));

  const tags = [];
  for (const param of doc.params || []) {
    if (param.description) {
      tags.push(...taggedLines(`@param ${param.name} -`, htmlToMarkdown(cleanProse(param.description))));
    }
  }
  // sdkjs records a parameter's default in `[name=value]` form, which jsdoc hands back as
  // `defaultvalue` - previously parsed and then dropped. Emitted per parameter (rather than as a
  // single bare `@default`) because a method can document several, and an editor renders the tag
  // verbatim, so naming the parameter is what makes it readable.
  for (const param of doc.params || []) {
    if (param.defaultValue !== undefined && param.defaultValue !== '') {
      tags.push(`@default ${param.name} = ${String(param.defaultValue).trim()}`);
    }
  }
  if (doc.returnDescription) {
    tags.push(...taggedLines('@returns', htmlToMarkdown(cleanProse(doc.returnDescription))));
  }
  if (doc.since) tags.push(`@since ${String(doc.since).trim()}`);
  if (doc.deprecated) {
    tags.push(...taggedLines('@deprecated', typeof doc.deprecated === 'string' ? htmlToMarkdown(cleanProse(doc.deprecated)) : ''));
  }
  if (tags.length > 0) blocks.push(tags);

  for (const example of examples) {
    blocks.push(['@example', '```js', ...example.split('\n').map((line) => line.trimEnd()), '```']);
  }
  if (doc.docsUrl) blocks.push([`@see ${doc.docsUrl}`]);

  if (blocks.length === 0) return '';

  // A `*/` anywhere in the prose or in an example would end the comment early and turn the rest of
  // the file into syntax errors.
  const escape = (line) => line.replace(/\*\//g, '*\\/');
  const lines = blocks.flatMap((block, index) => (index === 0 ? block : ['', ...block]));
  if (lines.length === 1) return `${indent}/** ${escape(lines[0])} */\n`;
  const body = lines.map((line) => (line ? `${indent} * ${escape(line)}` : `${indent} *`)).join('\n');
  return `${indent}/**\n${body}\n${indent} */\n`;
}

function generateEventArgsType(events) {
  const eventNames = Object.keys(events).sort();
  if (eventNames.length === 0) return '';

  let output = 'export type EditorEventArgs = {\n';
  eventNames.forEach((name, index) => {
    const event = events[name];
    const doc = renderJsDoc({ description: event.description }, '  ');
    if (doc.includes('\n *') && index > 0) output += '\n';
    const tuple = event.params.map((p) => `${p.name}: ${p.type}`).join(', ');
    output += `${doc}  ${name}: [${tuple}];\n`;
  });
  output += '};\n\nexport type EditorEventName = keyof EditorEventArgs;\n';
  return output;
}

// A type-only signature (param types/optionality + return type, no param names) so two
// documentations of "the same" method that merely spell a parameter differently
// (`nIndex` vs `index`) don't get flagged as a conflict - only an actual type difference does.
function methodTypeSignature(method) {
  const params = method.params.map((p) => `${p.optional ? '?' : ''}${p.type}`).join(', ');
  return `(${params}) => ${method.returnType}`;
}

function propertyTypeSignature(prop) {
  return `${prop.optional ? '?' : ''}${prop.type}`;
}

// sdkjs's own JSDoc frequently re-documents an inherited member under the subclass's own
// `@memberof` (e.g. ApiChart's doc page lists `GetContent`/`SetSize`/... alongside its own
// `GetClassType`, even though only `GetClassType` actually behaves differently from
// ApiDrawing's) - so a name appearing in both `classData` and `base` is not by itself evidence
// of a real override. Compare the two declared signatures and only treat it as conflicting (and
// worth `Omit`-ting from the `extends` clause) when they actually differ.
function findConflictingMembers(classData, base) {
  const conflicts = [];
  const ownMemberNames = new Set([...Object.keys(classData.methods), ...Object.keys(classData.properties)]);
  for (const name of ownMemberNames) {
    const baseMethod = base.methods[name];
    const ownMethod = classData.methods[name];
    if (baseMethod && ownMethod) {
      if (methodTypeSignature(baseMethod) !== methodTypeSignature(ownMethod)) conflicts.push(name);
      continue;
    }
    const baseProp = base.properties[name];
    const ownProp = classData.properties[name];
    if (baseProp && ownProp) {
      if (propertyTypeSignature(baseProp) !== propertyTypeSignature(ownProp)) conflicts.push(name);
      continue;
    }
    // Same name, but a method on one side and a plain property on the other - always a real
    // conflict (a callable can't also be assignable as a data property of the same name).
    if ((baseMethod && ownProp) || (baseProp && ownMethod)) conflicts.push(name);
  }
  return conflicts;
}

function generateInterface(className, classData, allClasses) {
  let output = renderJsDoc({
    description: classData.description,
    since: classData.since,
    deprecated: classData.deprecated,
    docsUrl: classData.docsUrl,
  }, '');

  const extendsList = (classData.extends || []).map((baseClassName) => {
    const base = allClasses[baseClassName];
    if (!base) return baseClassName;
    // A subclass re-declaring a base member with an incompatible type (almost always
    // GetClassType(): "someMoreSpecificLiteral" vs the base's own GetClassType(): "baseLiteral")
    // makes a plain `extends BaseClass` fail with "incorrectly extends" - Omit only the member(s)
    // that are genuinely incompatible, since its own declaration (below) already covers them; a
    // same-signature redeclaration needs no Omit at all and can extend the base class directly.
    const conflicts = findConflictingMembers(classData, base);
    return conflicts.length > 0
      ? `Omit<${baseClassName}, ${conflicts.map((n) => `"${n}"`).join(' | ')}>`
      : baseClassName;
  });
  const extendsClause = extendsList.length > 0 ? ` extends ${extendsList.join(', ')}` : '';
  output += `export interface ${className}${extendsClause} {\n`;

  // A documented member is preceded by a blank line so its comment block doesn't visually merge with
  // the member above it; undocumented ones stay packed together as before.
  const members = [];

  const propertyNames = Object.keys(classData.properties).sort();
  for (const propName of propertyNames) {
    const prop = classData.properties[propName];
    const optional = prop.optional ? '?' : '';
    members.push({
      doc: renderJsDoc({ description: prop.description }, '  '),
      code: `  ${propName}${optional}: ${prop.type};\n`,
    });
  }

  const methodNames = Object.keys(classData.methods).sort();
  if (propertyNames.length > 0 && methodNames.length > 0) members.push({ doc: '', code: '\n' });

  const renderParams = (params) => params
    .map(p => p.optional ? `${p.name}?: ${p.type}` : `${p.name}: ${p.type}`)
    .join(', ');

  for (const methodName of methodNames) {
    const method = classData.methods[methodName];
    // A real, unambiguous overload pair (see buildOverloadParams) - two call signatures, one doc
    // comment attached to the first the way TS overloads normally read.
    const signatures = method.overloadParams || [method.params];
    const code = signatures
      .map((params) => `  ${methodName}(${renderParams(params)}): ${method.returnType};\n`)
      .join('');

    members.push({
      doc: renderJsDoc(method, '  '),
      code,
    });
  }

  members.forEach((member, index) => {
    if (member.doc && index > 0) output += '\n';
    output += member.doc + member.code;
  });

  output += '}\n';
  return output;
}

function generateTypedef(name, typedefData) {
  let output = renderJsDoc({
    description: typedefData.description,
    since: typedefData.since,
    deprecated: typedefData.deprecated,
  }, '');
  if (typedefData.properties.length > 0) {
    output += `export interface ${name} {\n`;
    typedefData.properties.forEach((prop, index) => {
      const doc = renderJsDoc({ description: prop.description }, '  ');
      if (doc && index > 0) output += '\n';
      const opt = prop.optional ? '?' : '';
      output += `${doc}  ${prop.name}${opt}: ${prop.type};\n`;
    });
    output += '}\n';
  } else {
    output += `export type ${name} = ${typedefData.type || 'unknown'};\n`;
  }
  return output;
}

function methodSignature(name, method) {
  const params = method.params
    .map((p) => `${p.name}${p.optional ? '?' : ''}: ${p.type}`)
    .join(', ');
  return `${name}(${params}): ${method.returnType}`;
}

// The JSDoc prose and the runnable "## Try it" snippets are more useful to a search/RAG consumer as
// separate fields than flattened into one markdown string, so the index keeps them apart -
// description is markdown (inline HTML already translated), examples are raw code.
function proseFields(description) {
  const { summary, examples } = splitDescription(description);
  return {
    ...(summary ? { description: htmlToMarkdown(cleanProse(summary)) } : {}),
    ...(examples.length > 0 ? { examples } : {}),
  };
}

function deprecatedField(deprecated) {
  return deprecated ? { deprecated: typeof deprecated === 'string' ? deprecated : true } : {};
}

function buildApiIndexSection(classes, typedefs, events) {
  const classesIndex = {};
  for (const [className, classData] of Object.entries(classes)) {
    const methods = {};
    for (const [methodName, method] of Object.entries(classData.methods)) {
      methods[methodName] = {
        signature: methodSignature(methodName, method),
        ...proseFields(method.description),
        ...(method.docsUrl ? { docsUrl: method.docsUrl } : {}),
        ...(method.since ? { since: method.since } : {}),
        ...deprecatedField(method.deprecated),
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
    const properties = {};
    for (const [propName, prop] of Object.entries(classData.properties)) {
      properties[propName] = {
        type: prop.type,
        ...(prop.optional ? { optional: true } : {}),
        ...(prop.description ? { description: htmlToMarkdown(cleanProse(prop.description)) } : {}),
      };
    }
    classesIndex[className] = {
      ...proseFields(classData.description),
      ...(classData.docsUrl ? { docsUrl: classData.docsUrl } : {}),
      ...(classData.since ? { since: classData.since } : {}),
      ...deprecatedField(classData.deprecated),
      ...(classData.extends && classData.extends.length > 0 ? { extends: classData.extends } : {}),
      ...(Object.keys(methods).length > 0 ? { methods } : {}),
      ...(Object.keys(properties).length > 0 ? { properties } : {}),
    };
  }

  const typedefsIndex = {};
  for (const [name, typedefData] of Object.entries(typedefs)) {
    const properties = {};
    for (const prop of typedefData.properties) {
      properties[prop.name] = {
        type: prop.type,
        ...(prop.optional ? { optional: true } : {}),
        ...(prop.description ? { description: htmlToMarkdown(cleanProse(prop.description)) } : {}),
      };
    }
    typedefsIndex[name] = {
      ...proseFields(typedefData.description),
      ...(typedefData.since ? { since: typedefData.since } : {}),
      ...deprecatedField(typedefData.deprecated),
      ...(typedefData.type ? { type: typedefData.type } : {}),
      ...(Object.keys(properties).length > 0 ? { properties } : {}),
    };
  }

  const eventsIndex = {};
  for (const [name, event] of Object.entries(events)) {
    eventsIndex[name] = {
      ...proseFields(event.description),
      params: event.params.map((p) => ({ name: p.name, type: p.type })),
    };
  }

  return { classes: classesIndex, typedefs: typedefsIndex, events: eventsIndex };
}

const TS_BUILTINS = new Set([
  'Array', 'Record', 'Object', 'Function', 'Promise', 'Date', 'Map', 'Set',
  'Error', 'RegExp', 'Symbol', 'ReadonlyArray', 'Partial', 'Required', 'Readonly',
  'Pick', 'Omit', 'Exclude', 'Extract', 'NonNullable', 'ReturnType', 'JSON',
  'ArrayBuffer', 'Uint8Array', 'Int8Array', 'Uint16Array', 'Int16Array',
  'Uint32Array', 'Int32Array', 'Float32Array', 'Float64Array', 'Blob', 'File',
]);

function collectCustomTypeRefs(str) {
  // Only collect identifiers that can be type references. String literal enum values such as
  // "Area" and "BarClustered" must not become fake cross-file type stubs. Object-literal property
  // names such as `InternalId: string` are not type references either.
  const withoutStrings = str
    .replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, '')
    .replace(/\b[A-Z][a-zA-Z0-9]+\b(?=\s*:)/g, '');
  const refs = [];
  for (const m of (withoutStrings.match(/\b[A-Z][a-zA-Z0-9]+\b/g) || [])) {
    if (!TS_BUILTINS.has(m)) refs.push(m);
  }
  return refs;
}

function collectReferencedApiTypes(classes, typedefs, events) {
  const refs = new Set();
  for (const classData of Object.values(classes)) {
    for (const baseClass of classData.extends || []) refs.add(baseClass);
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
  for (const event of Object.values(events || {})) {
    for (const p of event.params) collectCustomTypeRefs(p.type).forEach(t => refs.add(t));
  }
  return refs;
}

const OVERRIDES_DIR = path.join(PACKAGE_ROOT, 'src', 'overrides');

// Splits a src/overrides/<editor>.ts file into per-name blocks (its `export interface X {...}` /
// `export type X = ...;` plus any immediately preceding `/** ... */` doc comment), the same way
// generate-ambient-bundle.js's dedupeTopLevelDeclarations walks generated output - reused here for
// the same reason: a name-keyed block is easy to splice in or compare against a real definition.
function parseOverrideBlocks(text) {
  const lines = text.split('\n');
  const declRe = /^export\s+(?:interface|type)\s+([A-Za-z_$][A-Za-z0-9_$]*)\b/;
  const blocks = {};
  let i = 0;
  while (i < lines.length) {
    const match = lines[i].match(declRe);
    if (!match) { i += 1; continue; }

    let start = i;
    let j = i - 1;
    while (j >= 0 && lines[j].trim() === '') j -= 1;
    if (j >= 0 && /^\s*\*\/\s*$/.test(lines[j])) {
      let k = j;
      while (k >= 0 && !/^\s*\/\*\*/.test(lines[k])) k -= 1;
      if (k >= 0) start = k;
    }

    let depth = 0;
    let sawBrace = false;
    let end = i;
    for (; end < lines.length; end += 1) {
      for (const ch of lines[end]) {
        if (ch === '{') { depth += 1; sawBrace = true; }
        else if (ch === '}') depth -= 1;
      }
      const closed = sawBrace ? depth === 0 : /;\s*$/.test(lines[end]);
      if (closed) { end += 1; break; }
    }

    blocks[match[1]] = lines.slice(start, end).join('\n');
    i = end;
  }
  return blocks;
}

// A handful of classes/typedefs sdkjs documents fully but that this package can't reach from a
// plain sdkjs checkout (the individual source file only exists in ONLYOFFICE's prebuilt deploy
// bundle, or the reference is a plain naming mistake in sdkjs's own JSDoc) - see
// src/overrides/word.ts for the full rationale. Loaded once per editor and spliced into the
// generated output in place of a blind `export type X = unknown;` stub, the same pattern
// DefinitelyTyped uses for undocumented corners of a real-world API.
function loadOverrides(typeName) {
  const overridePath = path.join(OVERRIDES_DIR, `${typeName}.ts`);
  if (!fs.existsSync(overridePath)) return {};
  return parseOverrideBlocks(fs.readFileSync(overridePath, 'utf8'));
}

function generateDtsFile(data, typeName, namespaceName, legacy) {
  const editorName = typeName === 'forms' ? 'form' : typeName;
  let body = '';

  const typedefs = extractTypedefs(data);
  const classes = extractClasses(data);
  applyLegacyDescriptions(classes, typedefs, legacy);

  const typedefNames = Object.keys(typedefs).sort();
  for (const name of typedefNames) {
    body += generateTypedef(name, typedefs[name]);
    body += '\n';
  }

  const classNames = Object.keys(classes).sort();

  const events = extractEvents(data, MANUAL_EVENTS[typeName]);

  const definedNames = new Set([...classNames, ...typedefNames]);
  const referenced = collectReferencedApiTypes(classes, typedefs, events);

  const overrides = loadOverrides(typeName);
  const shadowedOverrides = Object.keys(overrides).filter((name) => definedNames.has(name));
  if (shadowedOverrides.length > 0) {
    console.warn(`[${namespaceName}] override(s) in src/overrides/${typeName}.ts are now resolved from real sdkjs sources too - remove from the override file: ${shadowedOverrides.join(', ')}`);
  }
  const activeOverrides = Object.fromEntries(Object.entries(overrides).filter(([name]) => !definedNames.has(name)));
  // An override's own body can reference further names (e.g. ApiTableOfContents.SetPr's `TocPr`
  // param) that need the same "is this resolved anywhere?" treatment as anything the real sdkjs
  // doclets reference - otherwise those would slip through unstubbed instead of falling back to
  // `unknown` like every other unresolved reference does. Unlike collectReferencedApiTypes's other
  // callers (always passed an isolated type string), this runs on full method-declaration lines, so
  // two things collectCustomTypeRefs doesn't otherwise need to guard against must be stripped first:
  // `/** prose */` doc comments (capitalized English words read as type references) and method names
  // immediately followed by `(` (a declaration, not a reference).
  for (const block of Object.values(activeOverrides)) {
    const withoutComments = block.replace(/\/\*\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
    const typesOnly = withoutComments.replace(/\b[A-Za-z_$][A-Za-z0-9_$]*(?=\s*\()/g, '');
    collectCustomTypeRefs(typesOnly).forEach((t) => referenced.add(t));
  }

  const activeOverrideNames = Object.keys(activeOverrides).sort();
  if (activeOverrideNames.length > 0) {
    body += `// Manual overrides (see src/overrides/${typeName}.ts) for types sdkjs's own JSDoc doesn't\n// resolve from this package's usual sources\n`;
    for (const name of activeOverrideNames) {
      body += `${activeOverrides[name]}\n`;
    }
    body += '\n';
  }

  const stubs = [...referenced].filter((t) => !definedNames.has(t) && !activeOverrides[t]).sort();
  if (stubs.length > 0) {
    body += `// Cross-file type stubs\n`;
    for (const stub of stubs) {
      body += `export type ${stub} = unknown;\n`;
    }
    body += '\n';
    console.warn(`[${namespaceName}] unresolved API types (${stubs.length}): ${stubs.join(', ')}`);
  }

  // The entry-point class is always literally named "Api" in the source data
  // (e.g. Api.GetDocument(), Api.GetActiveSheet(), Api.GetPresentation()).
  // Namespacing per editor (Word.Api, Cell.Api, ...) keeps it and every other
  // type reachable and disambiguated across editors - same-named classes like
  // ApiParagraph exist in every editor with a different shape, so a flat export
  // would collide; nesting them under Word/Cell/Slide/Forms makes every type
  // importable from every editor without ambiguity.
  for (const className of classNames) {
    body += generateInterface(className, classes[className], classes);
    body += '\n';
  }

  // executeMethod-style event args map, parsed from plugin-events.js (+ MANUAL_EVENTS above for
  // the small number of real events that aren't documented via a JSDoc @event block anywhere) -
  // lets attachEditorEvent/detachEditorEvent be typed per event name/payload the same way
  // executeMethod already is per method name/args.
  const eventArgsType = generateEventArgsType(events);
  if (eventArgsType) {
    body += eventArgsType;
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

  const codeOnly = output
    .split('\n')
    .filter(line => !/^\s*(?:\/\/|\/\*|\*)/.test(line))
    .join('\n');
  const anyOccurrences = (codeOnly.match(/\bany\b/g) || []).length;
  return {
    content: output,
    stats: {
      classes: classNames.length,
      typedefs: typedefNames.length,
      unresolvedTypes: stubs,
      anyOccurrences,
    },
    indexSection: buildApiIndexSection(classes, typedefs, events),
  };
}

function runGit(repo, args) {
  const result = spawnSync('git', ['-C', repo, ...args], {encoding: 'utf8'});
  return result.status === 0 ? result.stdout.trim() : null;
}

function getGitMetadata(repo) {
  if (!fs.existsSync(path.join(repo, '.git'))) return {commit: null, dirty: null};
  const commit = runGit(repo, ['rev-parse', 'HEAD']);
  const unstaged = spawnSync('git', ['-C', repo, 'diff', '--quiet'], {stdio: 'ignore'}).status;
  const staged = spawnSync('git', ['-C', repo, 'diff', '--cached', '--quiet'], {stdio: 'ignore'}).status;
  return {commit, dirty: unstaged !== 0 || staged !== 0};
}

function sha256File(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function packageVersion(packageName) {
  try {
    return require(`${packageName}/package.json`).version;
  } catch {
    return null;
  }
}

function buildGenerationManifest(paths) {
  const repositories = {
    sdkjs: getGitMetadata(paths.sdkjs),
    sdkjsForms: getGitMetadata(paths.sdkjsForms),
  };
  if (process.argv.includes('--require-clean-sources') &&
      Object.values(repositories).some(repo => repo.dirty)) {
    throw new Error('Source checkout is dirty; --require-clean-sources requires clean sdkjs and sdkjs-forms repositories.');
  }

  const sourceFiles = [];
  const seen = new Set();

  for (const editor of Object.keys(EDITORS)) {
    for (const sourcePath of getSourcePaths(editor, paths)) {
      if (seen.has(sourcePath)) continue;
      seen.add(sourcePath);
      const sourceRepo = sourcePath.startsWith(paths.sdkjsForms)
        ? paths.sdkjsForms
        : paths.sdkjs;
      sourceFiles.push({
        repository: sourceRepo === paths.sdkjsForms ? 'sdkjs-forms' : 'sdkjs',
        path: path.relative(sourceRepo, sourcePath),
        sha256: sha256File(sourcePath),
      });
    }
  }

  return {
    generator: {
      packageVersion: JSON.parse(fs.readFileSync(path.join(PACKAGE_ROOT, 'package.json'), 'utf8')).version,
      node: process.version,
      jsdoc: packageVersion('jsdoc'),
      typescript: packageVersion('typescript'),
    },
    repositories: {
      ...repositories,
      officeApiDescriptions: {
        repository: `https://github.com/${LEGACY_DECLARATIONS_REPO}.git`,
        commit: LEGACY_DECLARATIONS_COMMIT,
      },
    },
    sourceFiles,
  };
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const paths = resolveSdkjsPaths();
  const apiData = await fetchApiDefinitions();
  const report = {};

  for (const [typeName, data] of Object.entries(apiData)) {
    console.log(`Fetching legacy descriptions for ${typeName}...`);
    const legacy = await fetchLegacyDescriptions(typeName);
    const generated = generateDtsFile(data, typeName, NAMESPACE_MAP[typeName], legacy);
    const filename = `${typeName}.ts`;
    fs.writeFileSync(path.join(OUTPUT_DIR, filename), generated.content);
    report[typeName] = generated.stats;
    mergeApiIndex(typeName, generated.indexSection);
    console.log(`Generated ${filename} with ${generated.stats.classes} classes`);
  }

  fs.writeFileSync(path.join(OUTPUT_DIR, 'api-report.json'), `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'generation-manifest.json'), `${JSON.stringify(buildGenerationManifest(paths), null, 2)}\n`);
  console.log(`Wrote ${path.join(OUTPUT_DIR, 'api-report.json')}`);
  console.log(`Wrote ${path.join(OUTPUT_DIR, 'generation-manifest.json')}`);
  console.log('Done!');
}

module.exports = {
  resolveSdkjsPaths,
  runJsdoc,
  parseType,
  parseTypeName,
  splitTopLevel,
  htmlToMarkdown,
  wrapText,
  cleanProse,
  taggedLines,
  renderJsDoc,
  splitDescription,
  collectCustomTypeRefs,
  TS_BUILTINS,
  DOC_WIDTH,
};

// Only run the sdkjs->src/generated pipeline when invoked directly (`node scripts/generate-types.js`)
// - other scripts (e.g. generate-plugin-methods.js) require this file purely for its parsing
// utilities and must not trigger a second, unrelated generation run as a side effect.
if (require.main === module) {
  main().catch(console.error);
}
