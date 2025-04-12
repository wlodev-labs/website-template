import { defineConfig } from 'astro/config'
import wlodev from '@wlodev/astro/adapter'

// https://astro.build/config
export default defineConfig({
    adapter: wlodev(),
})
