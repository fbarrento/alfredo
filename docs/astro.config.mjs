// @ts-check
import starlight from '@astrojs/starlight'
import tailwind from '@astrojs/tailwind'
import { defineConfig } from 'astro/config'

import node from '@astrojs/node'

// https://astro.build/config
export default defineConfig({
    integrations: [
        starlight({
            title: 'Alfredo',
            social: {
                github: 'https://github.com/getalfredo/alfredo',
            },
            sidebar: [
                {
                    label: 'Guides',
                    items: [
                        // Each item here is one entry in the navigation menu.
                        { label: 'Outline', slug: 'guides/outline' },
                        { label: 'Getting started', slug: 'guides/getting-started' },
                    ],
                },
                {
                    label: 'Contributor Guide',
                    autogenerate: { directory: 'contributor-guide' },
                },
            ],
            head: [
                {
                    tag: 'script',
                    attrs: {
                        defer: true,
                        src: 'https://analytics.ntrpnt.com/script.js',
                        'data-website-id': 'd2c704b5-aec7-402e-bedd-40227bf9213f'
                    },
                },
            ],
            customCss: ['./src/tailwind.css'],
        }),
        tailwind({ applyBaseStyles: false }),
    ],

    adapter: node({
        mode: 'standalone',
    }),
})
