import { cp, mkdir, rm, readFile } from 'node:fs/promises';
const out = new URL('../dist/', import.meta.url);
await rm(out, {recursive:true, force:true}); await mkdir(out, {recursive:true});
await cp(new URL('../public/', import.meta.url), out, {recursive:true});
const html = await readFile(new URL('index.html', out), 'utf8');
if (!html.includes('DOUBLEU Academy & Club Manager') || !html.includes('app.js')) throw new Error('Build validation failed');
console.log('Build completed: dist/');
