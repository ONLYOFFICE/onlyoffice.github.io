import { babel } from '@rollup/plugin-babel';

export default {
  input: "src/index.js",
  output: {
    file: "dist/bundle.es5.js",
    format: "umd",
    name: "icons",
    sourcemap: true,
  },
  plugins: [
    babel({
      babelHelpers: "bundled",
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              browsers: ['> 0.5%', 'last 2 versions', 'IE 11']
            },
            modules: false, // Rollup processes modules itself
            useBuiltIns: 'usage',
            corejs: 3 // Не забудьте установить core-js
          }
        ]
      ],
      exclude: "node_modules/**",
      plugins: [
        '@babel/plugin-transform-class-properties'
      ],
    }),
  ],
};
