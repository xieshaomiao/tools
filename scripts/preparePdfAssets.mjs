import { cp, mkdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const pdfjsRoot = dirname(require.resolve('pdfjs-dist/package.json'));
const targetRoot = join(root, 'public', 'pdfjs');

await rm(targetRoot, { force: true, recursive: true });
await mkdir(targetRoot, { recursive: true });

await Promise.all([
  cp(join(pdfjsRoot, 'cmaps'), join(targetRoot, 'cmaps'), { recursive: true }),
  cp(join(pdfjsRoot, 'standard_fonts'), join(targetRoot, 'standard_fonts'), { recursive: true }),
  cp(join(pdfjsRoot, 'wasm'), join(targetRoot, 'wasm'), { recursive: true }),
]);

console.log('Prepared PDF.js static assets in public/pdfjs.');
