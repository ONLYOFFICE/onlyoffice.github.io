/**
 *
 * (c) Copyright Ascensio System SIA 2026
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import preact from "@preact/preset-vite";
import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig(() => {
  return {
    base: "./",
    publicDir: false,
    build: {
      outDir: "dist",
      assetsDir: "",
      emptyOutDir: true,
      rollupOptions: {
        input: fileURLToPath(new URL("./src/index.tsx", import.meta.url)),
        output: {
          entryFileNames: "index.js",
          chunkFileNames: "chunk-[name].js",
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith(".css")) return "index.css";
            return "[name][extname]";
          },
        },
      },
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "@api": fileURLToPath(new URL("./src/api", import.meta.url)),
        "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
        "@features": fileURLToPath(new URL("./src/features", import.meta.url)),
        "@hooks": fileURLToPath(new URL("./src/hooks", import.meta.url)),
        "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
        "@store": fileURLToPath(new URL("./src/store", import.meta.url)),
        "@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
        "@types": fileURLToPath(new URL("./src/types", import.meta.url)),
        "@resources": fileURLToPath(new URL("./resources", import.meta.url)),
      },
    },
    plugins: [
      preact(),
    ],
  };
});
