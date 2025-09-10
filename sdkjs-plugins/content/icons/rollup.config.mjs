import { babel } from "@rollup/plugin-babel";

const isES5Build = process.env.TARGET === "es5";

function getBabelConfig() {
  if (isES5Build) {
    return {
      babelHelpers: "bundled",
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {
              browsers: ["> 0.5%", "last 2 versions", "IE 11"],
            },
            modules: false, // Rollup processes modules itself
            useBuiltIns: "usage",
            corejs: 3,
          },
        ],
      ],
      plugins: ["@babel/plugin-transform-class-properties"],
    };
  }

  return {
    babelHelpers: "bundled",
    presets: [
      [
        "@babel/preset-env",
        {
          targets: { esmodules: true },
          modules: false,
        },
      ],
    ],
  };
}

export default {
  input: "src/index.js",
  output: {
    file: isES5Build ? "dist/bundle.es5.js" : "dist/bundle.modern.js",
    format: isES5Build ? "umd" : "esm",
    name: isES5Build ? "Icons" : undefined,
    sourcemap: true,
  },
  plugins: [
    babel({
      ...getBabelConfig(),
      exclude: "node_modules/**",
    }),
  ],
};
