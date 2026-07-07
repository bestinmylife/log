import { visit } from 'unist-util-visit';
import { resolveWikiLink } from '../lib/wikigraph.mjs';

const RE = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

export default function remarkWikiLink() {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (index == null || !parent || !node.value.includes('[[')) return;
      const value = node.value;
      const nodes = [];
      let last = 0;
      let m;
      RE.lastIndex = 0;
      while ((m = RE.exec(value))) {
        const [full, target, label] = m;
        if (m.index > last) nodes.push({ type: 'text', value: value.slice(last, m.index) });
        const text = (label || target).trim();
        const resolved = resolveWikiLink(target);
        if (resolved) {
          nodes.push({
            type: 'link',
            url: resolved.url,
            data: { hProperties: { className: 'wikilink' } },
            children: [{ type: 'text', value: text }],
          });
        } else {
          nodes.push({
            type: 'html',
            value: `<span class="wikilink-missing" title="아직 없는 문서">${text}</span>`,
          });
        }
        last = m.index + full.length;
      }
      if (!nodes.length) return;
      if (last < value.length) nodes.push({ type: 'text', value: value.slice(last) });
      parent.children.splice(index, 1, ...nodes);
      return index + nodes.length;
    });
  };
}
