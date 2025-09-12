import { Commands } from "./commands.js";
import { SvgParser } from "../utils/svg-parser.js";
import { SvgLoader } from "../utils/svg-loader.js";

class Executor {
  static run(selectedIcons) {
    console.log("selectedIcons", selectedIcons);

    SvgLoader.loadSvgs(selectedIcons).then((svgs) => {
      console.log("svgs", svgs);
      let parsed = svgs.map((svg) => SvgParser.parse(svg));
      console.log(parsed);

      Asc.scope.parsedSvgs = parsed;
      window.Asc.plugin.callCommand(Commands.insertIcon, false);
    });
  }
}

export { Executor };
