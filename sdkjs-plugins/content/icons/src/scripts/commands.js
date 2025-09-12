class Commands {
  static insertIcon(parsedSvgs) {
    Asc.scope.parsedSvgs = parsedSvgs;
    window.Asc.plugin.callCommand(function () {
      const factor = 3600;
      let doc = Api.GetDocument();
      let paragraph = doc.GetElement(0);

      Asc.scope.parsedSvgs.forEach((svgElements) => {
        let customGeometry = Api.CreateCustomGeometry();

        svgElements.forEach((svgElement) => {
          if (svgElement.type === "path") {
            let path;

            svgElement.d.forEach((d) => {
              switch (d.type) {
                case "moveto":
                  path = customGeometry.AddPath();

                  path.SetWidth(100 * factor);
                  path.SetHeight(100 * factor);
                  path.SetFill("norm");
                  path.SetStroke(true);
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
          } else if (svgElement.type === "rect") {
          }
        });

        let fill = Api.CreateSolidFill(Api.CreateRGBColor(100, 150, 255));
        let stroke = Api.CreateStroke(
          factor,
          Api.CreateSolidFill(Api.CreateRGBColor(0, 50, 200))
        );
        let shape = Api.CreateShape(
          "rect",
          80 * factor,
          80 * factor,
          fill,
          stroke
        );
        shape.SetGeometry(customGeometry);

        paragraph.AddDrawing(shape);
      });
    }, true);
  }
}

export { Commands };
