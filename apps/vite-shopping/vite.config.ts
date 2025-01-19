/// <reference types="vite/client" />

import { defineConfig, loadEnv, PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import { federation } from "@module-federation/vite";
import dns from "node:dns";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import postcssPrefixer from "postcss-prefixer";
import path from "path";
import { wasm } from "@rollup/plugin-wasm";

dns.setDefaultResultOrder("verbatim");

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    base: env.VITE_APP_URL,
    resolve: {
      alias: {
        "@dp-wk/store": path.resolve(__dirname, "../../packages/store"),
        "@dp-wk/emitter": path.resolve(__dirname, "../../packages/emitter"),
      },
    },
    css: {
      postcss: {
        plugins: [
          tailwindcss({
            content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
            theme: {
              extend: {},
            },
            plugins: [],
          }),
          autoprefixer(),
          postcssPrefixer({
            prefix: "shopping-",
          }),
        ],
      },
    },
    server: {
      port: 3008,
      host: "0.0.0.0",
      proxy: {
        "/socket.io": {
          target: env.VITE_WS_URL,
          ws: true,
        },
      },
      fs: { allow: [".", "../../packages/*"] },
      hmr: {
        port: 3082,
        path: "/socket.io",
        clientPort: 443,
      },
      watch: {
        usePolling: true,
        ignored: ["!../../packages/store/**", "!../../packages/emitter/**"],
      },
      cors: false,
    },
    build: {
      target: "chrome89",
      minify: false,
      rollupOptions: {
        output: {
          format: "esm",
        },
      },
    },
    plugins: <PluginOption[]>[
      wasm(),
      react(),

      federation({
        name: "@shopping",
        filename: "remoteEntry.js",
        remotes: {},
        exposes: {
          "./shopping-modal": "./src/main.tsx",
        },
        shared: ["react", "react-dom"],
      }),
    ],
    preview: {
      host: "0.0.0.0",
      port: 3008,
      strictPort: true,
      cors: false,
    },
  };
});
