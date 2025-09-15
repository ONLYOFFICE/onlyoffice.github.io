export const Commands = {
    insertIcon: function () {
        let editor = Asc.scope.editor;
        const factor = 36000;
        const destination = {
            word: {},
            slide: {},
            cell: {},
        };
        if (editor === "word") {
            const document = Api.GetDocument();
            destination.word.run = document.GetCurrentRun();
        } else if (editor === "slide") {
            const presentation = Api.GetPresentation();
            destination.slide.active =
                presentation.GetCurrentVisibleSlide() ||
                presentation.GetCurrentSlide();
            destination.slide.width = destination.slide.active.GetWidth();
            destination.slide.height = destination.slide.active.GetHeight();
        } else if (editor === "cell") {
            destination.cell.sheet = Api.GetActiveSheet();
            const activeCell = destination.cell.sheet.GetActiveCell();
            destination.cell.row = activeCell.GetRow();
            destination.cell.col = activeCell.GetCol();
        }

        Asc.scope.parsedSvgs.forEach((svgParsedObject) => {
            const smallFactor = factor / 10;
            const width = svgParsedObject.width * smallFactor;
            const height = svgParsedObject.height * smallFactor;
            let customGeometry = createCustomGeometry(
                svgParsedObject,
                width,
                height,
                smallFactor
            );

            let fill = Api.CreateSolidFill(Api.CreateRGBColor(100, 150, 255));
            let stroke = Api.CreateStroke(
                factor,
                Api.CreateSolidFill(Api.CreateRGBColor(0, 50, 200))
            );

            if (editor === "word") {
                let shape = Api.CreateShape(
                    "rect",
                    width,
                    height,
                    fill,
                    stroke
                );
                shape.SetGeometry(customGeometry);
                destination.word.run.AddDrawing(shape);
            } else if (editor === "slide") {
                let shape = Api.CreateShape(
                    "rect",
                    width,
                    height,
                    fill,
                    stroke
                );
                const top = destination.slide.height / 2 - height / 2;
                const left = destination.slide.width / 2 - width / 2;
                shape.SetGeometry(customGeometry);
                shape.SetPosition(left, top);
                destination.slide.active.AddObject(shape);
            } else if (editor === "cell") {
                let shape = destination.cell.sheet.AddShape(
                    "rect",
                    width,
                    height,
                    fill,
                    stroke,
                    destination.cell.col - 1,
                    0,
                    destination.cell.row - 1,
                    0
                );
                shape.SetGeometry(customGeometry);
            }
        });

        function createCustomGeometry(svgParsedObject, width, height, factor) {
            let customGeometry = Api.CreateCustomGeometry();

            svgParsedObject.elements.forEach((svgElement) => {
                if (svgElement.type === "path") {
                    let path;

                    svgElement.d.forEach((d) => {
                        switch (d.type) {
                            case "moveto":
                                path = customGeometry.AddPath();

                                path.SetWidth(width);
                                path.SetHeight(height);
                                path.SetFill("darken");
                                if (svgElement.style.fill) {
                                    path.SetFill(svgElement.style.fill);
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
                            case "lineto":
                                path.LineTo(d.x * factor, d.y * factor);
                                break;
                            case "closepath":
                                path.Close();
                                break;
                        }
                    });
                } else if (svgElement.type === "circle") {
                    // TODO: circle
                } else if (svgElement.type === "rect") {
                    // TODO: rect
                }
            });

            return customGeometry;
        }
    },
};
