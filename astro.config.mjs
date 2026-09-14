// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = process.env.PUBLIC_SITE_URL;
const base = process.env.PUBLIC_SITE_BASE?.trim() || '/';

export default defineConfig({
    devToolbar: { enabled: false },
    base,
    integrations: site ? [sitemap()] : [],
    prefetch: true,
    ...(site ? { site } : {}),
});
