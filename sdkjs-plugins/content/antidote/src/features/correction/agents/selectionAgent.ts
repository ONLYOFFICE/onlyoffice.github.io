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

import {
  ParamsGetZonesToCorrect,
  ParamsReplace,
  ParamsSelect,
  TextZoneConnectix,
  WordProcessorConfiguration,
  DocumentType,
  StyleInfo,
  TextStyle,
} from '@druide-informatique/antidote-api-js';

import { Editor, CorrectionStyleRange } from '@api/editor';
import { BaseCorrectionAgent } from './base';

// Selection scope. Works uniformly across word/cell/pdf since GetSelectedText/ReplaceTextSmart are
// generic host methods, unlike the paragraph object model used by DocumentCorrectionAgent — hence
// going through Editor.create() rather than a fixed editor class: styleInfo (bold/italic/etc.)
// comes back populated on word (TextEditor.getSelectedTextWithStyle) and empty everywhere else
// (BaseEditor's default), with no editor-type branching needed here.
export class SelectionCorrectionAgent extends BaseCorrectionAgent {
  private editor = Editor.create();

  private text = '';

  private styleInfo: CorrectionStyleRange[] = [];

  async loadSelection(): Promise<void> {
    const selected = await this.editor.getSelectedTextWithStyle();
    this.text = selected.text;
    this.styleInfo = selected.styleInfo ?? [];
  }

  configuration(): WordProcessorConfiguration {
    return {
      documentTitle: `${this.title} — selection`,
      activeMarkup: DocumentType.text,
      carriageReturn: '\r\n',
    };
  }

  zonesToCorrect(_params: ParamsGetZonesToCorrect): TextZoneConnectix[] {
    const styleInfo: StyleInfo[] = this.styleInfo.map((range) => ({
      positionStart: range.positionStart,
      positionEnd: range.positionEnd,
      style: range.style as TextStyle,
    }));

    return [{
      text: this.text, zoneId: '', zoneIsFocused: true, styleInfo,
    }];
  }

  // Antidote calls this when the user selects text inside its own Corrector window — mirror that
  // selection back onto the ONLYOFFICE document. Silent no-op on editors without an object model
  // for it (see BaseEditor.selectWithinSelection) — expected on cell, not a bug.
  selectInterval(params: ParamsSelect): void {
    this.editor.selectWithinSelection(params.positionStart, params.positionEnd).catch(() => {});
  }

  protected async applyCorrection(params: ParamsReplace): Promise<void> {
    this.text = this.text.slice(0, params.positionStartReplace)
      + params.newString
      + this.text.slice(params.positionReplaceEnd);

    const paragraphs = this.text.replace(/(?:\r\n)+$/, '').split(/\r\n\r\n/);
    await this.editor.replaceSelectedText(paragraphs);
  }
}
