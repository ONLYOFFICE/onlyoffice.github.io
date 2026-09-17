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

// @ts-check

/**
 * Zotero itemType -> CSL type. Shared between `index.js`'s convertJsonToCsl
 * (converts a raw Zotero API item into a CSL-shaped search-result object)
 * and `CitationItemData.prototype.fillFromObject` (ingests raw Zotero item
 * data directly) - both need the same mapping, just on different input
 * shapes, so keep it in one place rather than two copies drifting apart.
 * @type {Object<string, string>}
 */
const ZOTERO_TYPE_TO_CSL = {
    "artwork": "graphic",
    "audioRecording": "song",
    "bill": "bill",
    "blogPost": "post-weblog",
    "book": "book",
    "bookSection": "chapter",
    "case": "legal_case",
    "computerProgram": "software",
    "conferencePaper": "paper-conference",
    "dictionaryEntry": "entry-dictionary",
    "document": "document",
    "email": "personal_communication",
    "encyclopediaEntry": "entry-encyclopedia",
    "film": "motion_picture",
    "forumPost": "post",
    "hearing": "hearing",
    "instantMessage": "personal_communication",
    "interview": "interview",
    "journalArticle": "article-journal",
    "letter": "personal_communication",
    "magazineArticle": "article-magazine",
    "manuscript": "manuscript",
    "map": "map",
    "newspaperArticle": "article-newspaper",
    "patent": "patent",
    "podcast": "song",
    "presentation": "speech",
    "radioBroadcast": "broadcast",
    "report": "report",
    "statute": "legislation",
    "thesis": "thesis",
    "tvBroadcast": "broadcast",
    "videoRecording": "motion_picture",
    "webpage": "webpage",
};

export { ZOTERO_TYPE_TO_CSL };
