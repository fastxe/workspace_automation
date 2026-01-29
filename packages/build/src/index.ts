#!/usr/bin/env tsx

import { rollup } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const entry = path.join(root, 'src', 'index.ts');
const outDir = path.join(root, 'dist');
const outFile = path.join(outDir, 'index.js');

if (!fs.existsSync(entry)) {
  console.error(`Entry file not found: ${entry}`);
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

const bundle = await rollup({
  input: entry,
  plugins: [
    resolve({
      extensions: ['.ts', '.js'],
    }),
    typescript({
      tsconfig: path.join(root, 'tsconfig.json'),
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
  file: outFile,
  format: 'es',
  banner: '// Google Apps Script Bundle\n',
});

await bundle.close();

// Post-process: Remove ESM export syntax for GAS compatibility
let code = fs.readFileSync(outFile, 'utf-8');
code = code.replace(/^export\s*\{[^}]*\};?\s*$/gm, '');
code = code.replace(/^export\s+/gm, '');
code = code.replace(/\n{3,}/g, '\n\n').trim() + '\n';
fs.writeFileSync(outFile, code);

console.log(`✓ Built: ${outFile}`);