// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// 배포 후 실제 주소로 바꾸세요 (예: https://내아이디.github.io 또는 https://내도메인.com)
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap()],
});
