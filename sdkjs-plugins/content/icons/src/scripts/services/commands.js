/*
 * (c) Copyright Ascensio System SIA 2010-2025
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

export const Commands = {
    insertIcon: function () {
        let editor = Asc.scope.editor;

        const insertIconFunction = createInsertFunction(editor);
        const fill = Api.CreateSolidFill(Api.CreateRGBColor(100, 150, 255));

        Asc.scope.parsedSvgs.forEach((svgParsedObject) => {
            let factor = 36000;
            if (svgParsedObject.width * svgParsedObject.height > 10000) {
                factor = factor / 10;
            }
            const width = svgParsedObject.width * factor;
            const height = svgParsedObject.height * factor;
            let customGeometry = createCustomGeometry(
                svgParsedObject,
                width,
                height,
                factor
            );

            let stroke = Api.CreateStroke(
                factor,
                Api.CreateSolidFill(Api.CreateRGBColor(0, 50, 200))
            );

            insertIconFunction(customGeometry, width, height, fill, stroke);
        });

        function createCustomGeometry(svgParsedObject, width, height, factor) {
            let customGeometry = Api.CreateCustomGeometry();

            svgParsedObject.elements.forEach((svgElement) => {
                if (svgElement.type === "path") {
                    let path = customGeometry.AddPath();
                    path.SetWidth(width);
                    path.SetHeight(height);
                    if (svgElement.style.fill) {
                        path.SetFill(svgElement.style.fill);
                    } else {
                        path.SetFill("darken");
                    }
                    if (svgElement.style.stroke) {
                        path.SetStroke(true);
                    }

                    svgElement.d.forEach((d) => {
                        switch (d.type) {
                            case "moveto":
                                path.MoveTo(d.x * factor, d.y * factor);
                                break;
                            case "cubicBezier":
                                path.CubicBezTo(
                                    d.x1 * factor,
                                    d.y1 * factor,
                                    d.x2 * factor,
                                    d.y2 * factor,
                                    d.x * factor,
                                    d.y * factor
                                );
                                break;
                            case "quadraticBezier":
                                path.QuadBezTo(
                                    d.x1 * factor,
                                    d.y1 * factor,
                                    d.x2 * factor,
                                    d.y2 * factor
                                );
                                break;
                            case "lineto":
                                path.LineTo(d.x * factor, d.y * factor);
                                break;
                            case "closepath":
                                path.Close();
                                break;
                        }
                    });
                }
            });

            return customGeometry;
        }

        function createInsertFunction(editor) {
            if (editor === "word") {
                const document = Api.GetDocument();
                const run = document.GetCurrentRun();
                return (customGeometry, width, height, fill, stroke) => {
                    let shape = Api.CreateShape(
                        "rect",
                        width,
                        height,
                        fill,
                        stroke
                    );
                    shape.SetGeometry(customGeometry);
                    run.AddDrawing(shape);
                };
            } else if (editor === "slide") {
                const presentation = Api.GetPresentation();
                const activeSlide =
                    presentation.GetCurrentVisibleSlide() ||
                    presentation.GetCurrentSlide();
                const slideWidth = activeSlide.GetWidth();
                const slideHeight = activeSlide.GetHeight();
                return (customGeometry, width, height, fill, stroke) => {
                    let shape = Api.CreateShape(
                        "rect",
                        width,
                        height,
                        fill,
                        stroke
                    );
                    const top = slideHeight / 2 - height / 2;
                    const left = slideWidth / 2 - width / 2;
                    shape.SetGeometry(customGeometry);
                    shape.SetPosition(left, top);
                    activeSlide.AddObject(shape);
                };
            } else if (editor === "cell") {
                const worksheet = Api.GetActiveSheet();
                const activeCell = worksheet.GetActiveCell();
                const row = activeCell.GetRow();
                const col = activeCell.GetCol();
                return (customGeometry, width, height, fill, stroke) => {
                    let shape = worksheet.AddShape(
                        "rect",
                        width,
                        height,
                        fill,
                        stroke,
                        col - 1,
                        0,
                        row - 1,
                        0
                    );
                    shape.SetGeometry(customGeometry);
                };
            }
        }

        return true;
    },
};
