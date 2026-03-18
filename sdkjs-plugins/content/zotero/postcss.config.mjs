import atImport from "postcss-import";
import postcssNested from "postcss-nested";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";

export default {
    plugins: [
        atImport(),
        postcssNested(),
        autoprefixer({
            overrideBrowserslist: ["ie >= 11", "last 2 versions"],
        }),
        cssnano({
            preset: [
                "default",
                {
                    discardDuplicates: true,
                    normalizeWhitespace: true,
                    discardEmpty: true,
                    mergeRules: true,
                    discardUnused: {
                        fontFace: false,
                        keyframes: false,
                        counterStyle: false,
                    },
                },
            ],
        }),
    ],
};
