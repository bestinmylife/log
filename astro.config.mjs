// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';
import remarkWikiLink from './src/plugins/remark-wikilink.mjs';

export default defineConfig({
  site: 'https://bestinmylife.vercel.app',
  integrations: [mdx(), sitemap(), pagefind()],
  markdown: {
    remarkPlugins: [remarkWikiLink],
  },
});
