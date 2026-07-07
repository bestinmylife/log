import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
// 빌드 시 번들 경로 문제를 피하려 프로젝트 루트(cwd) 우선, 없으면 모듈 기준 폴백
const candidates = [
  path.resolve(process.cwd(), 'src/content'),
  path.resolve(here, '../content'),
];
const contentDir = candidates.find((d) => fs.existsSync(d)) || candidates[0];

function listFiles(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) out.push(...listFiles(full));
    else out.push(full);
  }
  return out;
}

function frontTitle(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const t = m[1].match(/^title:\s*(.+)$/m);
  return t ? t[1].trim().replace(/^["']|["']$/g, '') : null;
}

function norm(s) {
  return String(s).trim().toLowerCase().replace(/\s+/g, ' ');
}

function collect(sub, toUrl) {
  const dir = path.join(contentDir, sub);
  const pages = [];
  for (const f of listFiles(dir)) {
    if (!/\.mdx?$/.test(f)) continue;
    const raw = fs.readFileSync(f, 'utf8');
    const rel = path.relative(dir, f).replace(/\\/g, '/').replace(/\.mdx?$/, '');
    const title = frontTitle(raw) || rel;
    pages.push({ url: toUrl(rel), title, raw });
  }
  return pages;
}

const pages = [
  ...collect('chapters', (rel) => `/books/${rel}/`),
  ...collect('blog', (rel) => `/blog/${rel}/`),
];

const titleMap = new Map();
for (const p of pages) titleMap.set(norm(p.title), p);

export function resolveWikiLink(target) {
  const p = titleMap.get(norm(target));
  return p ? { url: p.url, title: p.title } : null;
}

const WIKI_RE = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
const backlinks = new Map();
for (const p of pages) {
  const seen = new Set();
  let m;
  WIKI_RE.lastIndex = 0;
  while ((m = WIKI_RE.exec(p.raw))) {
    const r = resolveWikiLink(m[1]);
    if (r && r.url !== p.url && !seen.has(r.url)) {
      seen.add(r.url);
      if (!backlinks.has(r.url)) backlinks.set(r.url, []);
      backlinks.get(r.url).push({ url: p.url, title: p.title });
    }
  }
}

export function getBacklinks(url) {
  return backlinks.get(url) || [];
}
