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

import { StyleInfo } from '@druide-informatique/antidote-api-js';
import { DocumentError } from './errors';

export type CorrectionStyle = 'bold' | 'italic' | 'superscript' | 'subscript' | 'strike';

export interface SelectedTextWithStyle {
  text: string;
  styleInfo?: StyleInfo[];
}

const SELECTED_TEXT_OPTIONS = {
  Numbering: false,
  Math: false,
  ParaSeparator: '\r\n\r\n',
  TableCellSeparator: '\t',
  TabSymbol: String.fromCharCode(160),
};

// `GetCustomProperties()` isn't in the generated ambient types yet, hence this local shape.
export interface CustomProperties {
  Add(name: string, value: unknown): void;
  Get(name: string): unknown;
}

export const CORRECTION_MEMORY_PROPERTY = 'AntidoteCorrectionMemory';

// `attachEditorEvent`/`detachEditorEvent` (distinct from the plugin-window-level
// `attachEvent`/`detachEvent` used elsewhere, e.g. useTheme.ts's `onThemeChanged`) aren't in the
// generated ambient types either — same situation as CustomProperties above.
export interface PluginWithEditorEvents {
  attachEditorEvent(eventName: string, callback: (data: unknown) => void): void;
  detachEditorEvent(eventName: string): void;
}

// The three editor-content-mutation events TextEditor listens for to detect changes happening
// concurrently with an active correction session — text edited within an existing paragraph, or
// paragraphs added/removed (which would otherwise silently shift DocumentCorrectionAgent's
// index-based paragraph bookkeeping out of sync).
export const CONTENT_CHANGE_EVENTS = ['onParagraphText', 'onParagraphAdd', 'onParagraphRemove'] as const;

// Generic host methods live here; editor-specific object-model methods belong in subclasses.
export abstract class BaseEditor {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  // eslint-disable-next-line class-methods-use-this -- shared instance helper, no per-editor state needed
  protected ensurePlugin(): void {
    if (!window.Asc?.plugin?.callCommand) throw new DocumentError('Plugin API unavailable', 'PLUGIN_UNAVAILABLE');
  }

  // callCommand runs `command` inside the document's sandboxed object-model context, where the
  // global `Api`/`Asc.scope` are available. `command` itself must stay self-contained — it's
  // serialized and re-evaluated in that separate realm, so it can only see `Api`/`Asc.scope` and
  // whatever it declares itself; `this` and any outer closure (including this very method) are
  // invisible there. Subclasses passing a command to this must not reference `this` inside it.
  protected runQuery<TResult>(command: () => TResult | { error: string }, scope?: Record<string, unknown>): Promise<TResult> {
    this.ensurePlugin();
    return new Promise(function(resolve, reject) {
      if (scope) {
        window.Asc.scope = scope;
      }
      window.Asc.plugin.callCommand(command, false, true, function(result: unknown) {
        if (result === undefined) {
          reject(new DocumentError('No response from plugin', 'NO_RESPONSE'));
        } else if (typeof result === 'object' && result !== null && 'error' in result && (result as { error?: string }).error) {
          reject(new DocumentError((result as { error: string }).error, 'QUERY_ERROR'));
        } else {
          resolve(result as TResult);
        }
      });
    });
  }

  // See runQuery for the callCommand sandboxing constraints.
  protected runCommand<T extends Record<string, unknown>>(command: () => void, scope: T): Promise<void> {
    this.ensurePlugin();
    return new Promise((resolve) => {
      window.Asc.scope = scope;
      window.Asc.plugin.callCommand(command, false, true, resolve);
    });
  }

  // executeMethod calls a built-in host method directly (works uniformly across word/cell/pdf,
  // unlike Api.GetDocument() which is word-specific).
  getSelectedText(): Promise<string> {
    this.ensurePlugin();
    return new Promise((resolve) => {
      window.Asc.plugin.executeMethod('GetSelectedText', [SELECTED_TEXT_OPTIONS], (text) => resolve(text ?? ''));
    });
  }

  hasSelection(): Promise<boolean> {
    return this.getSelectedText()
      .then((text) => text.trim().length > 0)
      .catch(() => false);
  }

  replaceSelectedText(paragraphs: string[]): Promise<boolean> {
    this.ensurePlugin();
    return new Promise((resolve) => {
      window.Asc.plugin.executeMethod('ReplaceTextSmart', [paragraphs, undefined, String.fromCharCode(160)], (ok) => resolve(Boolean(ok)));
    });
  }

  // No caret-word API outside Word's object model. TextEditor overrides this with the real
  // `Api.GetDocument().GetCurrentWord()` call; every other editor keeps this empty-string default,
  // which callers (e.g. useLookup's Dictionaries/Guides caret fallback) treat as "nothing found."
  // eslint-disable-next-line class-methods-use-this -- overridden by subclasses; base is a no-op
  getCurrentWord(): Promise<string> {
    console.error('getCurrentWord is not implemented in this editor');
    return Promise.resolve('');
  }

  getDocumentContent() {
    console.error('getDocumentContent is not implemented in this editor');
    return Promise.resolve([]);
  }

  // Highlights a sub-range of a specific paragraph (paragraph-local `start`/`end`, matching how
  // `applyCorrection` already slices `paragraph.text` locally). Called when Antidote reports the
  // user selected text inside its own Corrector window (WordProcessorAgent.selectInterval) — a
  // real no-op path for editors without a paragraph object model, so it's silent by design (this
  // is expected to happen routinely on cell, unlike getDocumentContent/replaceContent which
  // whole-document scope already keeps out of reach there).
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars -- overridden by TextEditor; base is a no-op
  selectContentRange(_index: number, _start: number, _end: number, _separatorLength?: number): Promise<void> {
    console.error('selectContentRange is not implemented in this editor');
    return Promise.resolve();
  }

  // Highlights a sub-range of the current document selection (`start`/`end` relative to that
  // selection's own text, matching the positions Antidote was given via
  // getSelectedTextWithStyle/zonesToCorrect). Same selectInterval use case as
  // selectContentRange above, just for SelectionCorrectionAgent instead of DocumentCorrectionAgent.
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars -- overridden by TextEditor; base is a no-op
  selectWithinSelection(_selectionStart: number, _start: number, _end: number): Promise<void> {
    console.error('selectWithinSelection is not implemented in this editor');
    return Promise.resolve();
  }

  getSelectionStart(): Promise<number | null> {
    console.error('getSelectionStart is not implemented in this editor');
    return Promise.resolve(null);
  }

  // No run-level style-range extraction outside Word's object model. TextEditor overrides this
  // to add `styleInfo`; every other editor keeps the plain-text default (cosmetic-only data, so
  // dropping it here is always a safe degradation, never a correctness risk for the correction
  // itself).
  getSelectedTextWithStyle(): Promise<SelectedTextWithStyle> {
    console.error('getSelectedTextWithStyle is not implemented in this editor');
    return this.getSelectedText().then((text) => ({ text }));
  }

  replaceContent(text: string, index: number): Promise<void> {
    console.error('replaceContent is not implemented in this editor', { text, index });
    return Promise.resolve();
  }

  // Lets Antidote remember which suggestions were already ignored/applied for this document
  // across multiple Corrector sessions — stored as a custom document property (GetCustomProperties)
  loadCorrectionMemory(): Promise<string> {
    console.error('loadCorrectionMemory is not implemented in this editor');
    return Promise.resolve('');
  }

  saveCorrectionMemory(_data: string): Promise<void> {
    console.error('saveCorrectionMemory is not implemented in this editor');
    return Promise.resolve();
  }

  // Notifies `onChange` whenever the document's content changes (text edited, paragraphs
  // added/removed) — used to detect edits that happen concurrently with an active correction
  // session (another collaborator, or the user typing directly) so cached positions can be
  // resynced instead of silently drifting. No-op outside Word's editor-event API; every other
  // editor just has no concurrent-edit detection yet.
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars -- overridden by TextEditor; base is a no-op
  watchContentChanges(_onChange: () => void): void {}

  // eslint-disable-next-line class-methods-use-this -- overridden by TextEditor; base is a no-op
  stopWatchingContentChanges(): void {}
}
