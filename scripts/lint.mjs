import { readFile } from 'node:fs/promises';
for (const file of ['public/index.html','public/styles.css','public/app.js']) {
  const text = await readFile(file,'utf8');
  if (/\t/.test(text)) throw new Error(`${file}: tabs are not allowed`);
  if (/TODO|FIXME/.test(text)) throw new Error(`${file}: unfinished marker found`);
}
console.log('Lint checks passed');
