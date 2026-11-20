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

/// <reference path="../domain/scan-findings.js" />
/// <reference path="../domain/text-locator.js" />
/// <reference path="../editor/document-reader.js" />
/// <reference path="../editor/paragraph-texts.js" />
/// <reference path="../editor/annotation-renderer.js" />
/// <reference path="../editor/text-selector.js" />

/**
 * @typedef {Object} HighlightedRange
 * @property {string} findingId
 * @property {string} name
 * @property {string} paragraphId
 * @property {string} rangeId
 * @property {string} text - what the range covered when it was drawn
 * @property {string} recalcId - the version of the paragraph it was drawn on
 */

/**
 * Marks the findings of a scan in the document and leads from one to the other: a finding chosen
 * in the panel is selected in the text, an annotation clicked in the text names its finding.
 *
 * Where the editor has no text annotations, findings are not marked, and choosing one selects it
 * by a text search instead.
 */
class HighlightService {

	/** annotation names: one per kind of finding, so the editor keeps them apart */
	static names = Object.freeze({
		ai         : "originality-ai",
		plagiarism : "originality-plagiarism",
	});

	/**
	 * @param {ParagraphTexts} paragraphs
	 * @param {DocumentReader} reader
	 * @param {AnnotationRenderer} renderer
	 * @param {TextSelector} selector
	 */
	constructor(paragraphs, reader, renderer, selector) {
		this._paragraphs = paragraphs;
		this._reader = reader;
		this._renderer = renderer;
		this._selector = selector;

		/** @type {Map<string, HighlightedRange>} by {@link HighlightService._key} */
		this._ranges = new Map();

		paragraphs.onChange((paragraphId, paragraph, annotations) => this._onParagraphChanged(paragraphId, paragraph, annotations));
	}

	/**
	 * @returns {Promise<boolean>}
	 */
	isSupported() {
		return this._paragraphs.isSupported();
	}

	/**
	 * Marks the AI-flagged blocks and the plagiarised phrases, replacing earlier marks.
	 * @param {ScanFindings} findings
	 * @returns {Promise<number>} how many findings were found in the document and marked
	 */
	async show(findings) {
		await this.clear();
		if (!(await this.isSupported()))
			return 0;

		const ids = await this._reader.readParagraphIds();
		/** @type {Array<{ id: string, text: string, paragraph: ParagraphText }>} */
		const paragraphs = [];
		ids.forEach((id) => {
			const paragraph = this._paragraphs.get(id);
			if (paragraph)
				paragraphs.push({ id: id, text: paragraph.text, paragraph: paragraph });
		});

		const ai = TextLocator.locate(paragraphs, findings.ai.map((f) => f.text), { sequential: true })
			.filter((range) => findings.ai[range.phraseIndex].flagged);
		const plagiarism = TextLocator.locate(paragraphs, findings.plagiarism.map((f) => f.text), { sequential: false });

		await this._draw(HighlightService.names.ai, ai, findings.ai, paragraphs);
		await this._draw(HighlightService.names.plagiarism, plagiarism, findings.plagiarism, paragraphs);

		return new Set(Array.from(this._ranges.values()).map((range) => range.findingId)).size;
	}

	/**
	 * Removes every mark this service drew.
	 * @returns {Promise<void>}
	 */
	async clear() {
		/** @type {Set<string>} */
		const drawn = new Set();
		this._ranges.forEach((range) => drawn.add(range.name + "\n" + range.paragraphId));
		this._ranges.clear();

		for (const entry of drawn) {
			const [name, paragraphId] = entry.split("\n");
			await this._renderer.removeAll(paragraphId, name);
		}
	}

	/**
	 * Selects the finding in the document.
	 * @param {ScanFinding} finding
	 * @returns {Promise<boolean>} whether it was found
	 */
	async select(finding) {
		const range = Array.from(this._ranges.values()).find((r) => r.findingId === finding.id);
		if (range) {
			await this._renderer.select(range.paragraphId, range.name, range.rangeId);
			return true;
		}
		return this._selector.select(finding.text);
	}

	/**
	 * The finding behind an annotation the editor reports, e.g. on a click.
	 * @param {string} name
	 * @param {string} paragraphId
	 * @param {string[]} rangeIds
	 * @returns {string | null} the finding id
	 */
	findingAt(name, paragraphId, rangeIds) {
		for (const rangeId of rangeIds) {
			const range = this._ranges.get(HighlightService._key(name, paragraphId, rangeId));
			if (range)
				return range.findingId;
		}
		return null;
	}

	/**
	 * @param {string} name
	 * @param {LocatedRange[]} located
	 * @param {ScanFinding[]} findings - the list `located` indexes into
	 * @param {Array<{ id: string, paragraph: ParagraphText }>} paragraphs
	 * @returns {Promise<void>}
	 * @private
	 */
	async _draw(name, located, findings, paragraphs) {
		/** @type {Map<string, AnnotationRange[]>} */
		const byParagraph = new Map();
		located.forEach((range) => {
			const finding = findings[range.phraseIndex];
			const rangeId = finding.id + "_" + range.partIndex;
			const paragraph = paragraphs.find((p) => p.id === range.paragraphId);
			const list = byParagraph.get(range.paragraphId) || [];
			list.push({ id: rangeId, start: range.start, length: range.length });
			byParagraph.set(range.paragraphId, list);

			this._ranges.set(HighlightService._key(name, range.paragraphId, rangeId), {
				findingId   : finding.id,
				name        : name,
				paragraphId : range.paragraphId,
				rangeId     : rangeId,
				text        : range.text,
				recalcId    : paragraph ? paragraph.paragraph.recalcId : "",
			});
		});

		for (const [paragraphId, ranges] of byParagraph) {
			const paragraph = paragraphs.find((p) => p.id === paragraphId);
			if (paragraph)
				await this._renderer.annotate(paragraphId, paragraph.paragraph, name, ranges);
		}
	}

	/**
	 * The editor moves marks along with edits; a mark whose text was edited no longer points at
	 * what was scanned, so it goes.
	 * @param {string} paragraphId
	 * @param {ParagraphText} paragraph
	 * @param {AnnotationPosition[]} annotations
	 * @private
	 */
	_onParagraphChanged(paragraphId, paragraph, annotations) {
		const reported = new Set();
		annotations.forEach((annotation) => {
			const key = HighlightService._key(annotation.name, paragraphId, annotation.id);
			const range = this._ranges.get(key);
			if (!range)
				return;

			reported.add(key);
			const now = TextLocator.fold(AnnotationRenderer.textAt(paragraph.text, annotation)).replace(/\s+/g, " ");
			const then = TextLocator.fold(range.text).replace(/\s+/g, " ");
			if (now.trim() !== then.trim()) {
				this._ranges.delete(key);
				this._renderer.remove(paragraphId, range.name, range.rangeId);
			}
		});

		// a range the editor no longer reports is gone with the text it covered — unless the report
		// is of the very version the range was drawn on, sent before the marks were in place
		Array.from(this._ranges.entries()).forEach(([key, range]) => {
			if (range.paragraphId === paragraphId && !reported.has(key) && range.recalcId !== paragraph.recalcId)
				this._ranges.delete(key);
		});
	}

	/**
	 * @param {string} name
	 * @param {string} paragraphId
	 * @param {string} rangeId
	 * @returns {string}
	 * @private
	 */
	static _key(name, paragraphId, rangeId) {
		return name + "\n" + paragraphId + "\n" + rangeId;
	}
}
