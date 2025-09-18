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

                    svgElement.d.forEach((d) => {
                        switch (d.type) {
                            case "moveto":
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
