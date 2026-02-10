# LizardTypst Plugin

A simple plugin for ONLYOFFICE that allows you to insert Typst mathematical formulas as high-quality SVG images, powered by the `typst.ts` library.

This plugin is compatible with [self-hosted](https://github.com/ONLYOFFICE/DocumentServer) and [desktop](https://github.com/ONLYOFFICE/DesktopEditors) versions of ONLYOFFICE editors. It can be added to ONLYOFFICE instances manually.

## Motivation

The LizardTypst plugin draws inspiration from the existing **Iguana LaTeX** plugin. Our goal is to provide a modern and accessible solution for Typst users by leveraging the benefits of Typst directly within ONLYOFFICE, without requiring complex local setups.

## Features

- **Real-time Rendering**: See a live preview of the rendered Typst formula as you type. This provides an immediate and interactive editing experience.
- **No Local Installation Required**: Unlike solutions that depend on server-side rendering or local LaTeX/Typst installations, LizardTypst utilizes `typst.ts` to compile Typst code directly in your browser. This means you don't need any additional software installed on your machine to use the plugin.
- **SVG-based Rendering**: Inserts formulas as scalable vector graphics, ensuring high quality at any zoom level.

## Powered By

This plugin leverages the power of [typst.ts](https://github.com/myriaddreamin/typst.ts), a powerful TypeScript library for compiling and rendering Typst code directly in the browser using WebAssembly.

## Vendored Dependencies

This plugin uses a vendored (self-hosted) version of `typst.ts` to ensure offline functionality.
- **`@myriaddreamin/typst.ts`**: `0.6.1-rc5`

## How to use

1. Go to the **Plugins** tab in the ONLYOFFICE editor.
2. Click on the **LizardTypst** icon to open the plugin window.
3. Enter your Typst code in the input area on the left. A preview will be generated on the right.
4. Once you are satisfied with the result, click the **Insert** button to place the image into your document.

## How to install

Detailed instructions for plugin installation can be found in the official [ONLYOFFICE API documentation](https://api.onlyoffice.com/docs/plugin-and-macros/tutorials/installing/onlyoffice-docs-on-premises/).

## User feedback and support

To ask questions and share feedback, please use the **Issues** section in the repository where this plugin is located.