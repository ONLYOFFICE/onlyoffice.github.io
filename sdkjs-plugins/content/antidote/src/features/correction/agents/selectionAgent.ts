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
  TextZoneConnectix,
  WordProcessorConfiguration,
  DocumentType,
} from '@druide-informatique/antidote-api-js';

import { getSelectedText, replaceSelectedText } from '@api/document';
import { BaseCorrectionAgent } from './base';

// Selection scope. Works uniformly across word/cell/pdf since GetSelectedText/ReplaceTextSmart are
// generic host methods, unlike the paragraph object model used by DocumentCorrectionAgent.
export class SelectionCorrectionAgent extends BaseCorrectionAgent {
  private text = '';

  async loadSelection(): Promise<void> {
    this.text = await getSelectedText();
  }

  configuration(): WordProcessorConfiguration {
    return {
      documentTitle: `${this.title} — selection`,
      activeMarkup: DocumentType.text,
      carriageReturn: '\r\n',
    };
  }

  zonesToCorrect(_params: ParamsGetZonesToCorrect): TextZoneConnectix[] {
    return [{ text: this.text, zoneId: '', zoneIsFocused: true }];
  }

  protected async applyCorrection(params: ParamsReplace): Promise<void> {
    this.text = this.text.slice(0, params.positionStartReplace)
      + params.newString
      + this.text.slice(params.positionReplaceEnd);

    const paragraphs = this.text.replace(/(?:\r\n)+$/, '').split(/\r\n\r\n/);
    await replaceSelectedText(paragraphs);
  }
}
