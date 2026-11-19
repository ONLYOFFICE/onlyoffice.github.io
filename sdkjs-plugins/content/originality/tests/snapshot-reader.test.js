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

const test = require("node:test");
const assert = require("node:assert");
const { loadScripts } = require("./load-scripts");

const { SnapshotReader } = loadScripts(["app/snapshot-reader"], ["SnapshotReader"]);

/** a document of paragraphs that counts what is read of it */
function documentOf(/** @type {Array<[string, string]>} */ paragraphs) {
	const doc = {
		paragraphs : paragraphs,
		textsRead  : 0,
		readParagraphs(/** @type {string[] | null} */ ids) {
			/** @type {Record<string, string>} */
			const texts = {};
			doc.paragraphs.forEach(([id, text]) => {
				if (!ids || ids.includes(id)) {
					texts[id] = text;
					doc.textsRead++;
				}
			});
			return Promise.resolve({ ids: doc.paragraphs.map(([id]) => id), texts: texts });
		},
	};
	return doc;
}

test("reads everything until told the editor reports changed paragraphs", async () => {
	const doc = documentOf([["p1", "One"], ["p2", "Two"]]);
	const snapshots = new SnapshotReader(doc);
	assert.strictEqual(await snapshots.read(), "One\nTwo");
	assert.strictEqual(await snapshots.read(), "One\nTwo");
	assert.strictEqual(doc.textsRead, 4);
});

test("then reads only the paragraphs reported changed", async () => {
	const doc = documentOf([["p1", "One"], ["p2", "Two"], ["p3", "Three"]]);
	const snapshots = new SnapshotReader(doc);
	await snapshots.readAll();
	snapshots.readChangedOnly();
	doc.textsRead = 0;

	doc.paragraphs[1] = ["p2", "Two, edited"];
	snapshots.markChanged("p2");
	assert.strictEqual(await snapshots.read(), "One\nTwo, edited\nThree");
	assert.strictEqual(doc.textsRead, 1);

	// a change nobody reported shows only in a full read
	doc.paragraphs[0] = ["p1", "One!"];
	assert.strictEqual(await snapshots.read(), "One\nTwo, edited\nThree");
	assert.strictEqual(await snapshots.readAll(), "One!\nTwo, edited\nThree");
});

test("follows paragraphs added, moved and removed", async () => {
	const doc = documentOf([["p1", "One"], ["p2", "Two"]]);
	const snapshots = new SnapshotReader(doc);
	await snapshots.readAll();
	snapshots.readChangedOnly();

	// a new paragraph is read even before the editor reports it
	doc.paragraphs = [["p1", "One"], ["p9", "New"], ["p2", "Two"]];
	assert.strictEqual(await snapshots.read(), "One\nNew\nTwo");

	doc.paragraphs = [["p2", "Two"], ["p1", "One"]];
	assert.strictEqual(await snapshots.read(), "Two\nOne");
});

