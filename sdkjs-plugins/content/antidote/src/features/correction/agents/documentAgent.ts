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

import { CorrectionStyleRange } from '@api/editor';
import { BaseCorrectionAgent } from './base';

interface ParagraphOffset {
  index: number;
  start: number;
  text: string;
  styleInfo?: CorrectionStyleRange[];
}

const PARAGRAPH_SEPARATOR = '\r\n\r\n';

// Whole-document scope. Only valid for editorType "word" — cell/pdf don't expose a paragraph
// object model the same way (see useHasSelection / Main.tsx, which restrict this scope to "word").
export class DocumentCorrectionAgent extends BaseCorrectionAgent {
  private paragraphs: ParagraphOffset[] = [];

  async loadParagraphs(): Promise<void> {
    await this.preloadCorrectionMemory();
    const paragraphs = await this.editor.getDocumentContent();
    let start = 0;
    this.paragraphs = paragraphs.map((paragraph) => {
      const offset: ParagraphOffset = {
        index: paragraph.index, start, text: paragraph.text, styleInfo: paragraph.styleInfo,
      };
      start += paragraph.text.length + PARAGRAPH_SEPARATOR.length;
      return offset;
    });
  }

  configuration(): WordProcessorConfiguration {
    return {
      documentTitle: this.title,
      activeMarkup: DocumentType.text,
      carriageReturn: '\r\n',
      correctionMemory: this.correctionMemory,
    };
  }

  zonesToCorrect(_params: ParamsGetZonesToCorrect): TextZoneConnectix[] {
    const styleInfo: StyleInfo[] = [];
    this.paragraphs.forEach((paragraph) => {
      (paragraph.styleInfo ?? []).forEach((range) => {
        styleInfo.push({
          positionStart: range.positionStart + paragraph.start,
          positionEnd: range.positionEnd + paragraph.start,
          style: range.style as TextStyle,
        });
      });
    });

    return [{
      text: this.paragraphs.map((paragraph) => paragraph.text).join(PARAGRAPH_SEPARATOR),
      zoneId: '',
      zoneIsFocused: true,
      styleInfo,
    }];
  }

  private findParagraphAt(position: number): ParagraphOffset {
    let found = this.paragraphs[0];
    for (const paragraph of this.paragraphs) {
      if (paragraph.start > position) break;
      found = paragraph;
    }
    return found;
  }

  // Antidote calls this when the user selects text inside its own Corrector window — mirror that
  // selection back onto the ONLYOFFICE document so it stays visible which part is being worked on.
  selectInterval(params: ParamsSelect): void {
    const paragraph = this.findParagraphAt(params.positionStart);
    const localStart = params.positionStart - paragraph.start;
    const localEnd = params.positionEnd - paragraph.start;
    this.editor.selectContentRange(paragraph.index, localStart, localEnd).catch(() => {
      console.error('Failed to select content range');
    });
  }

  protected async applyCorrection(params: ParamsReplace): Promise<void> {
    const paragraph = this.findParagraphAt(params.positionStartReplace);
    const localStart = params.positionStartReplace - paragraph.start;
    const localEnd = params.positionReplaceEnd - paragraph.start;
    const newText = paragraph.text.slice(0, localStart) + params.newString + paragraph.text.slice(localEnd);

    await this.editor.replaceContent(newText, paragraph.index);

    const diff = newText.length - paragraph.text.length;
    paragraph.text = newText;
    for (const other of this.paragraphs) {
      if (other.start > paragraph.start) other.start += diff;
    }
  }
}
