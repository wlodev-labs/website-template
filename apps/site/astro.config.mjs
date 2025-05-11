import { defineConfig } from 'astro/config'
import wlodev from '@wlodev/astro/adapter'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { general } from './src/config/general'

// https://astro.build/config
export default defineConfig({
    ...general,
    adapter: wlodev(),
    integrations: [react(), sitemap()],
    vite: {
        plugins: [tailwindcss()],
    },
})
