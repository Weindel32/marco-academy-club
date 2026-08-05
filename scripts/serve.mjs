import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
const root = join(process.cwd(), 'public');
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml' };
const server = createServer(async (req,res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  const requested = pathname === '/' ? 'index.html' : pathname.slice(1);
  const file = normalize(join(root, requested));
  if (!file.startsWith(root)) { res.writeHead(403); return res.end('Forbidden'); }
  try { const body = await readFile(file); res.writeHead(200, {'Content-Type':types[extname(file)] || 'application/octet-stream'}); res.end(body); }
  catch { try { const body = await readFile(join(root,'index.html')); res.writeHead(200, {'Content-Type':types['.html']}); res.end(body); } catch { res.writeHead(404); res.end('Not found'); } }
});
server.listen(4173, '127.0.0.1', () => console.log('Local: http://127.0.0.1:4173'));
