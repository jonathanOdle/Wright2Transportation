// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = process.env.PUBLIC_SITE_URL;

export default defineConfig({
    devToolbar: { enabled: false },
    integrations: site ? [sitemap()] : [],
    prefetch: true,
    ...(site ? { site } : {}),
});
