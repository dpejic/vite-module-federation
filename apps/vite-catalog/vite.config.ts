/// <reference types="vite/client" />

import { defineConfig, PluginOption, loadEnv } from 'vite';
import analog from '@analogjs/platform';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import json from '@rollup/plugin-json';
import { federation as moduleFederation } from '@module-federation/vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path from 'path';
import { wasm } from '@rollup/plugin-wasm';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: env['VITE_APP_URL'],
    resolve: {
      mainFields: ['module'],
      alias: {
        '@dp-wk/store': path.resolve(__dirname, '../../packages/store'),
        '@dp-wk/emitter': path.resolve(__dirname, '../../packages/emitter'),
      },
    },
    css: {
      postcss: {
        plugins: [
          tailwindcss({
            prefix: 'tw-',
            content: ['./index.html', './src/**/*.{html,ts,md,analog,ag}'],
            theme: {
              extend: {},
            },
            plugins: [],
          }),
          autoprefixer(),
        ],
      },
    },
    build: {
      target: ['es2020'],
    },
    server: {
      port: 3007,
      host: '0.0.0.0',
      proxy: {
        '/socket.io': {
          target: env['VITE_WS_URL'],
          ws: true,
        },
      },
      fs: { allow: ['.', '../../packages/*'] },
      hmr: {
        port: 3081,
        path: '/socket.io',
        clientPort: 443,
      },
      watch: {
        usePolling: true,
        ignored: ['!../../packages/store/**', '!../../packages/emitter/**'],
      },
      cors: false,
    },
    plugins: <PluginOption[]>[
      wasm(),
      nodePolyfills(),
      json(),
      moduleFederation({
        name: '@catalog',
        exposes: {
          './catalog': './src/main.ts',
        },
        filename: 'remoteEntry.js',
        shared: [],
      }),
      analog({
        ssr: false,
        static: true,
        ssrBuildDir: 'dist/ssr',
        vite: {
          tsconfig: './tsconfig.app.json',
        },
      }),
    ],
    preview: {
      host: '0.0.0.0',
      port: 3007,
      strictPort: true,
      cors: false,
    },
  };
});
