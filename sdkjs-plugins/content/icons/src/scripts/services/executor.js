import { Commands } from "./commands.js";
import { SvgParser } from "../utils/svg-parser.js";
import { SvgLoader } from "../utils/svg-loader.js";

class Executor {
    static run(selectedIcons) {
        SvgLoader.loadSvgs(selectedIcons).then((svgs) => {
            // console.log("svgs", svgs);
            let parsed = svgs.map((svg) => SvgParser.parse(svg));
            // console.log(parsed);

            Asc.scope.editor = Asc.plugin.info.editorType;
            Asc.scope.parsedSvgs = parsed;
            Asc.plugin.callCommand(Commands.insertIcon, true);
        });
    }
}

export { Executor };
