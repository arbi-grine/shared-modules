#!/usr/bin/env node

const vite = require('vite');
const dts = require('vite-plugin-dts');
const path = require('node:path');
const react = require('@vitejs/plugin-react');

const currentWorkingPath = process.cwd();
const { src, name, peerDependencies } = require(path.join(
  currentWorkingPath,
  'package.json'
));

const fileName = name.replace('@shared-packages/', '');
const inputPath = path.join(currentWorkingPath, src);

const config = vite.defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, inputPath),
      name: fileName,
      formats: ['cjs', 'esm'],
      fileName: (format) => `${fileName}.${format}.js`,
    },
    rollupOptions: {
      external: peerDependencies
        ? [...Object.keys(peerDependencies)]
        : undefined,
    },
  },
});

async function builder() {
  await vite.build(config);
}

builder();
