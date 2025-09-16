import { Commands } from "./commands.js";
import { SvgParser } from "../utils/svg-parser.js";
import { SvgLoader } from "../utils/svg-loader.js";
import { IconPicker } from "../components/icon-picker.js";
import { CategoriesPicker } from "../components/categories-picker.js";
import { SearchFilter } from "../components/search-filter.js";
import { FA_CATEGORIES } from "../environments/categories.js";

class IconsPlugin {
    #categoriesPicker;
    #iconsPicker;
    #searchFilter;

    #selectedIcons;

    constructor() {
        this.#selectedIcons = new Map();
        this.#iconsPicker = new IconPicker(FA_CATEGORIES);
        this.#categoriesPicker = new CategoriesPicker(FA_CATEGORIES);
        this.#searchFilter = new SearchFilter(FA_CATEGORIES);
    }

    init() {
        return new Promise((resolve, reject) => {
            SvgLoader.loadSprites()
                .then(resolve)
                .catch((e) => {
                    console.error("Failed to load font awesome sprites");
                    reject(e);
                });
            try {
                this.#categoriesPicker.setOnSelectCategoryCallback(
                    (categoryName) => {
                        this.#iconsPicker.show(FA_CATEGORIES, categoryName);
                        this.#searchFilter.reset();
                    }
                );

                this.#searchFilter.setOnFilterCallback((catalogOfIcons) => {
                    this.#iconsPicker.show(catalogOfIcons);
                    this.#categoriesPicker.reset();
                });

                this.#iconsPicker.setOnSelectIconCallback(
                    (icons, needToRun) => {
                        this.#selectedIcons = icons;
                        needToRun && this.run();
                    }
                );
            } catch (e) {
                reject(e);
            }
        });
    }

    run() {
        return new Promise((resolve, reject) => {
            SvgLoader.loadSvgs(this.#selectedIcons)
                .then((svgs) => {
                    console.log("selected", this.#selectedIcons);
                    console.log("svgs", svgs);
                    let parsed = svgs.map((svg) => SvgParser.parse(svg));
                    console.log("parsed", parsed);
                    Asc.scope.editor = Asc.plugin.info.editorType;
                    Asc.scope.parsedSvgs = parsed;
                    Asc.plugin.callCommand(
                        Commands.insertIcon,
                        false,
                        false,
                        resolve
                    );
                })
                .catch((e) => reject(e));
        });
    }
}

export { IconsPlugin };
