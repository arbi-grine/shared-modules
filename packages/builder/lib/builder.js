#!/usr/bin/env node
const rollup = require('rollup');
const path = require('path');
const resolve = require('@rollup/plugin-node-resolve').default;
const babel = require('@rollup/plugin-babel').default;
const typescript = require('@rollup/plugin-typescript');

const currentWorkingPath = process.cwd();
const { main, name } = require(path.join(currentWorkingPath, 'package.json'));

const inputPath = path.join(currentWorkingPath, main);

const fileName = name.replace('@shared-packages/', '');

const inputOptions = {
  input: inputPath,
  external: ['react'],
  plugins: [
    resolve(),
    typescript({ tsconfig: './tsconfig.json' }),
    babel({
      presets: ['@babel/preset-env', '@babel/preset-react'],
      babelHelpers: 'bundled',
    }),
  ],
};

const outputOptions = [
  {
    file: `dist/${fileName}.cjs.js`,
    format: 'cjs',
    sourcemap:true
  },
  {
    file: `dist/${fileName}.esm.js`,
    format: 'esm',
    sourcemap:true
  },
];

async function build() {
  const bundle = await rollup.rollup(inputOptions);
  outputOptions.forEach(async (options) => {
    await bundle.write(options);
  });
}

build();