// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

/**
 * 100% AWS hosting target: Amplify Hosting (SSR compute) + CloudFront edge.
 * Marketing pages prerender static; /api/* and /admin/* set prerender = false.
 */
export default defineConfig({
  site: 'https://www.mydgv.com',
  trailingSlash: 'always',
  output: 'static',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/admin/') && !page.includes('/api/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
