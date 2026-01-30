

/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  "stories": [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-docs",
  ],
  "staticDirs": ["../images"],
  "framework": {
    "name": "@storybook/html-vite",
    "options": {}
  },
  "core": {
    "disableTelemetry": true,
  },
};
export default config;
