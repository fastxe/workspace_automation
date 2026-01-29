import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();

console.log(root)
// const entry = path.join(appDir, 'src', 'index.ts');
// const outDir = path.join(appDir, 'dist');
// const outFile = path.join(outDir, 'Code.js');

// fs.mkdirSync(outDir, { recursive: true });

// await build({
//     entryPoints: [entry],
//     bundle: true,
//     platform: 'browser',
//     format: 'iife', // GAS-friendly
//     target: ['es2020'],
//     outfile: outFile
// });

// console.log(`Built: ${outFile}`);
