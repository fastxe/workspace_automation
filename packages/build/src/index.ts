#!/usr/bin/env tsx

import { build } from 'esbuild';

import fs from 'fs';
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

await build({
  entryPoints: [entry],
  bundle: true,
  platform: 'browser',
  format: 'iife',
  target: ['es2020'],
  outfile: outFile,
});

console.log(`✓ Built: ${outFile}`);