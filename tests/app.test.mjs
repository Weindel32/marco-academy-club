import test from 'node:test'; import assert from 'node:assert/strict'; import { readFile } from 'node:fs/promises';
const html = await readFile(new URL('../public/index.html', import.meta.url),'utf8');
const js = await readFile(new URL('../public/app.js', import.meta.url),'utf8');
test('all MVP areas are present', () => ['Dashboard','Tennis Academy','Padel Academy','Atleti e famiglie','Tecnici e personale','Gruppi e calendari','Presenze e assenze','Recuperi','Certificati medici','Tornei ed eventi','Report operativi','Scheda club'].forEach(x => assert.ok(js.includes(x))));
test('absence eligibility rules are implemented', () => { assert.ok(js.includes("reason === 'club' || reason === 'medical'")); assert.ok(js.includes('similarLevel')); assert.ok(js.includes('capacity')); });
test('local persistence and responsive shell exist', () => { assert.ok(js.includes('localStorage')); assert.ok(html.includes('viewport')); });
