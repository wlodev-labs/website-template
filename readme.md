## Website Template 🌏

Start building a website with basics of payloadcms and astro setup for you like - collection, blocks, fields for payloadcms and astrojs pages structure along with react integration and all of the components built with this framework. Deploy to [wlodev.com](https://wlodev.com) with a single `git push` on the main branch.

Here's the little overview of template file structure and how to develop a website with payloadcms and astro:

### Template file structure

Template is built with turborepo, which efficiently manage multiple apps within single development environment and by using `npm run dev`. We will go through the each directory one by one, from top to bottom to see what it's for and how it integrates wit entire website.

```bash
├── apps
│   ├── cms
│   │   ├── src
│   │   │   ├── app
│   │   │   ├── collections
│   │   │   │   ├── Posts.ts
│   │   │   │   └── ...
│   │   │   ├── globals
│   │   │   │   ├── Header.ts
│   │   │   │   └── ...
│   │   │   ├── blocks
│   │   │   │   ├── contentBlock.ts
│   │   │   │   └── ...
│   │   │   ├── fields
│   │   │   │   ├── link.ts
│   │   │   │   └── ...
│   │   │   ├── payload-types.ts
│   │   │   └── payload.config.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── next.config.mjs
│   └── site
│       ├── src
│       │   ├── utils
│       │   │   ├── cms.ts
│       │   │   └── ...
│       │   ├── components
│       │   │   ├── image.tsx
│       │   │   ├── ...
│       │   │   ├── blocks
│       │   │   │   ├── contentBlock.tsx
│       │   │   │   └── ....
│       │   │   └── ui
│       │   │       ├── button.tsx
│       │   │       └── ...
│       │   ├── layouts
│       │   │   └── BaseLayout.astro
│       │   ├── pages
│       │   │   ├── [slug]
│       │   │   │   ├── _PageTemplate.astro
│       │   │   │   └── index.astro
│       │   │   ├── blog
│       │   │   │   ├── [slug]
│       │   │   │   │   └── index.astro
│       │   │   │   └── index.astro
│       │   │   └── index.astro
│       │   ├── config
│       │   │   └── general.ts
│       │   ├── styles
│       │   │   └── global.css
│       │   └── env.d.ts
│       ├── public
│       │   └── favicon.svg
│       ├── package.json
│       ├── tsconfig.json
│       └── astro.config.mjs
├── package-lock.json
├── package.json
└── turbo.json
```

### What is Payloadcms (/apps/cms)

Payloadcms is a code-first approach in a cms game, where you can easily define the appropiate fields, blocks and schema with typescript files. It has a tons of features built-in, like authentication, file uploads, flexible REST API, admin panel but also gives you a way to fully customize your experience with plugins. You don't need to know every aspect of this open source headless cms to get started with your first website. Here's step by step how this template was created with payloadcms.

#### Collections

> Collections are the primary way to structure recurring data in your application, such as products, pages, posts, and other types of content that you might want to manage. More in [docs](https://payloadcms.com/docs/configuration/collections#admin-options).

```
import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
    slug: 'posts',
    fields: [
        {
            name: 'title',
            type: 'text',
        },
    ],
}
```

#### Globals

> Globals are the primary way to structure singletons in Payload, such as a header navigation, site-wide banner alerts, or website-wide localized strings. More in [docs](https://payloadcms.com/docs/configuration/globals).

```
import { GlobalConfig } from 'payload'

export const Nav: GlobalConfig = {
    slug: 'nav',
    fields: [
        {
            name: 'items',
            type: 'array',
            required: true,
            maxRows: 8,
            fields: [
                {
                    name: 'page',
                    type: 'relationship',
                    relationTo: 'pages', // "pages" is the slug of an existing collection
                    required: true,
                },
            ],
        },
    ],
}
```

#### Blocks

> Blocks are a great way to create a flexible content model that can be used to build a wide variety of content types, e.g. a layout builder tool that grants editors to design highly customizable page or post layouts. Blocks could include configs such as `Quote`, `CallToAction`, `Slider`, `Content`, `Gallery`, or others. More in [docs](https://payloadcms.com/docs/fields/blocks).

Pages in this template, but also blog posts are created based on blocks, where the editor / your website client can easily modify the content or even change the layout using them. More often you, as a developer, will be preparing these layouts and then the client will just take care of a content.

```
import type { Block } from 'payload'

export const MediaBlock: Block = {
    slug: 'mediaBlock',
    fields: [
        {
            name: 'media',
            type: 'upload',
            relationTo: 'media', // "media" is the slug of an existing upload collection
            required: true,
        },
    ],
}
```

_Example usage of this block:_

```
import type { CollectionConfig } from 'payload'
import { MediaBlock } from '@/blocks/mediaBlock'

export const Pages: CollectionConfig<'pages'> = {
    slug: 'pages',
    fields: [
        {
            name: 'layout',
            type: 'blocks',
            blocks: [MediaBlock, ...],
        },
    ],
}
```

#### Fields

> There are many Field Types to choose from, ranging anywhere from simple text strings to nested arrays and blocks. Fields can be endlessly customized in their appearance and behavior, but also a new can be created. More in [docs](https://payloadcms.com/docs/fields/overview).

```
import type { Field } from 'payload'

export const hero: Field = {
    name: 'hero',
    type: 'group',
    fields: [
        {
            name: 'type',
            type: 'select',
            defaultValue: 'primary',
            options: [
                {
                    value: 'primary',
                },
                {
                    value: 'none',
                },
            ],
        },
    ],
}
```

_Example usage of this field:_

```
import type { CollectionConfig } from 'payload'
import { hero } from '@/fields/hero'

export const Pages: CollectionConfig<'pages'> = {
    slug: 'pages',
    fields: [hero],
}
```

#### payload.config.ts

```
import path from 'path'
import { fileURLToPath } from 'url'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { wlodevPlugin } from '@wlodev/payload'

// Your collections imports
import { Header } from './globals/Header/Header'
import { Users } from './collections/Users'
import { Posts } from './collections/Posts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    globals: [Header, ...],
    collections: [Posts, ...],
    editor: lexicalEditor(),
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    db: mongooseAdapter({
        ...
    }),
    plugins: [
        wlodevPlugin(),
        ...
    ],
})
```

To learn more about what is payload and how to get the most of it, visit the [payloadcms docs](https://payloadcms.com/docs/getting-started/what-is-payload).

### What is Astro.js (/apps/site)

> Astro is a JavaScript web framework optimized for building fast, content-driven websites. **Astro supports every major UI framework**. Bring your existing components and take advantage of Astro's optimized client build performance. Learn more at [astro.build](https://astro.build).
