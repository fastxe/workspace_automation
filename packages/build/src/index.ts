#!/usr/bin/env tsx

import { rollup } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const __cwd = process.cwd();
const __input = path.join(__cwd, 'src', 'index.ts');
const __outDir = path.join(__cwd, 'dist');
const __outFile = path.join(__outDir, 'index.js');

if (!fs.existsSync(__input)) {
  console.error(`Entry file not found: ${__input}`);
  process.exit(1);
}

fs.mkdirSync(__outDir, { recursive: true });

const bundle = await rollup({
  input: __input,
  plugins: [
    resolve({
      extensions: ['.ts', '.js'],
    }),
    typescript({
      tsconfig: path.join(__cwd, 'tsconfig.json'),
      declaration: false,
      removeComments: false,
      include: ['src/**/*.ts', '../../packages/**/*.ts'],
    }),
  ],
  onwarn(warning, warn) {
    if (warning.code === 'CIRCULAR_DEPENDENCY') return;
    warn(warning);
  },
});

await bundle.write({
  file: __outFile,
  format: 'es',
  banner: '// Google Apps Script Bundle\n',
});

await bundle.close();

const code = `${fs.readFileSync(__outFile, 'utf-8')
  .replace(/^export\s*\{[^}]*\};?\s*$/gm, '')
  .replace(/^export\s+/gm, '')
  .replace(/\n{3,}/g, '\n\n').trim()}\n`;

fs.writeFileSync(__outFile, code);