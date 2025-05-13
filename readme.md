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
│       │   │   ├── payload.ts
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

Basically, astro is responsible only for routing and rendering the pages, while you can use any framework you want to build the components. In this template, we are using react, but you can easily switch to svelte, vue or solidjs. When you look at the file structure, all the files are either `.tsx` or `.ts`, only pages directory holds `.astro` files.

#### utils

The most important part of astro and payloadcms integration is the `payload.ts` file, which initializes the REST API based client with the auto-generated types, meaning that all of the functions are fully typed with intellisense for e.g. collection names, fields or blocks.

> [!NOTE]
> Payloadcms team announced the payloadcms sdk package, which will replace this custom client in the future. [(feat: add Payload SDK package ) https://github.com/payloadcms/payload/pull/9463](https://github.com/payloadcms/payload/pull/9463).

```
import { initPayloadClient } from '@wlodev/astro'
import type { Config } from '../../../cms/src/payload-types'

export const cms = initPayloadClient<Config>({
    url: `${import.meta.env.CMS_URL}/api`,
})

// Make the types from the cms available in the site
export * from '../../../cms/src/payload-types'
```

#### components

Regular react, svelte etc. components you use to build a website.

> [!NOTE]
> Astro provides built-in `<Image>` component which handles the image optimization by default. Using other framework, we cannot use the astro components, thus depending on the framework you use, you will have to create new Image component. Fortunately, astro provides an easy way to enable image optimization and benefits of `<Image>` component without using their implementation with the `getImage()` function from the `astro:assets` packages. Here's the implementation of `Image` component in react.

Image optimization is enabled by default when you deploy to [wlodev.com](https://wlodev.com), so all of your images will be served in multiple sizes, formats and qualities giving your website visitors the best possible loading speeds.

```
import type { UnresolvedImageTransform } from 'astro'
import { getImage } from 'astro:assets'
import { cn } from '@/utils/ui'

export type ImageProps = {
    alt?: string
    fill?: boolean
    className?: string
} & Partial<
    Pick<
        React.ImgHTMLAttributes<HTMLImageElement>,
        'loading' | 'decoding' | 'fetchPriority' | 'sizes'
    >
> &
    UnresolvedImageTransform

/**
 * Astro provides the image component with the image optimization out of the box, similar to how next/image works.
 * We cannot use the astro image component within the react, so we create this seperate image component
 * but with image optimization handled by getImage from astro:assets
 */
export const Image = async (props: ImageProps) => {
    // https://docs.astro.build/en/reference/modules/astro-assets/#getimage
    const { src, srcSet, attributes } = await getImage(props)
    const { alt, sizes, className, loading, decoding, fetchPriority, fill } =
        props

    return (
        <img
            src={src}
            alt={alt}
            srcSet={srcSet.attribute}
            sizes={sizes ?? '100vw'}
            {...attributes}
            className={cn(
                {
                    'absolute inset-0 w-full h-full object-cover object-center':
                        fill,
                },
                className
            )}
            loading={loading ?? (fetchPriority === 'high' ? 'eager' : 'lazy')}
            decoding={decoding ?? 'async'}
            fetchPriority={fetchPriority}
        />
    )
}
```

#### components/ui

Reusable components like button, label, header.

#### components/blocks

After you define your new block in the payloadcms, you have to somehow show it on a website. That's why the blocks directory is for. Below is an example implementation:

```
import React from 'react'
import RichText from '../richText'
import { cn } from '@/utils/ui'
import { CMSLink } from '../cmsLink'
import type { ContentBlock as ContentBlockProps } from '@/utils/payload'

export const ContentBlock: React.FC<ContentBlockProps> = props => {
    const { columns } = props
    return (
        <div className='container px-4 mx-auto my-16'>
            <div className='flex gap-8 justify-center'>
                {columns &&
                    columns.length > 0 &&
                    columns.map((col, index) => {
                        return (
                            <div
                                key={index}
                                className={cn('flex-1', {
                                    'max-w-md': columns.length === 1,
                                })}
                            >
                                {col.richText && (
                                    <RichText
                                        data={col.richText}
                                        enableGutter={false}
                                    />
                                )}
                                {col.enableLink && <CMSLink {...col.link} />}
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}
```

Then in a single `RenderBlocks` component, you pass the prepared blocks and use it in pages where you define collection in payloadcms.

```
import React, { Fragment } from 'react'
import { CallToActionBlock } from './callToActionBlock'
import { ContentBlock } from './contentBlock'
import { MediaBlock } from './mediaBlock'
import type { Page } from '@/utils/payload'

const blockComponents = {
    cta: CallToActionBlock,
    content: ContentBlock,
    mediaBlock: MediaBlock,
}

export const RenderBlocks: React.FC<{
    blocks: Page['layout'][0][]
}> = ({ blocks }) => {
    if (blocks && Array.isArray(blocks) && blocks.length > 0) {
        return (
            <Fragment>
                {blocks.map((block, index) => {
                    const { blockType } = block

                    if (blockType && blockType in blockComponents) {
                        const Block = blockComponents[blockType]

                        if (Block) {
                            return (
                                <div className='my-16' key={index}>
                                    {/* @ts-expect-error there may be some mismatch between the expected types here */}
                                    <Block {...block} disableInnerContainer />
                                </div>
                            )
                        }
                    }
                    return null
                })}
            </Fragment>
        )
    }
    return null
}
```

#### pages

You define the routing of you website here. You just create the directory like `blog` and then `index.astro` file inside it, which will result in the page rendered at `website.com/blog`. Dynamic routing is for handling the cases like blog posts, where the posts are added within the payloadcms collection. Example from this `website-template`:

_pages/[slug]/index.astro_

```
---
import { cms } from '@/utils/payload'
import { PostHero } from '@/components/heros/postHero'
import BaseLayout from '@/layouts/BaseLayout.astro'
import RichText from '@/components/richText'

// https://docs.astro.build/en/guides/routing/#static-ssg-mode
// Because all routes must be determined at build time, a dynamic route must export a getStaticPaths()
// that returns an array of objects with a params property.
// Each of these objects will generate a corresponding route.
export async function getStaticPaths() {
    const posts = await cms.find({ collection: 'posts', limit: 1000 })
    const params = posts.docs.map(({ slug }) => {
        return { params: { slug } }
    })
    return params
}

const slug = Astro.params.slug
if (!slug) {
    throw new Error('Slug is required')
}

// Load the data from the payloadcms
const postsRes = await cms.find({
    collection: 'posts',
    limit: 1,
    where: {
        slug: {
            equals: slug,
        },
    },
})

if (!postsRes.docs || !postsRes.docs.length) {
    throw new Error(`Page with slug "${slug}" not found`)
}
const post = postsRes.docs[0]
---

<BaseLayout invertHeaderColor>
    <article class='pt-16 pb-16'>
        <PostHero post={post} />
        <div class='flex flex-col items-center gap-4 pt-8'>
            <div class='container mx-auto px-4'>
                <RichText
                    className='max-w-[48rem] mx-auto'
                    data={post.content}
                    enableGutter={false}
                />
            </div>
        </div>
    </article>
</BaseLayout>
```

To learn more about the dynamic routing, visit the [astro docs](https://docs.astro.build/en/guides/routing/#static-ssg-mode).

## Deployment

Payload CMS and Astro are open source projects. You can deploy them to any hosting provider and change them anytime you want. [Wlodev.com](https://wlodev.com) deployment platform was created to make this process as easy as possible, not only for you, the developer, but also your clients making both of you happy from the website development to the final website hand over and maintenance.

What [wlodev.com](https://wlodev.com) platform gives you and your clients:

    - GitHub repo based deployments with git push
    - Complete setup for Payload CMS with s3 bucket and mongodb database. It just works.
    - Image optimization
    - Automatic SSL certificate
    - Built-in analytics with no additional setup
    - Complete client dashboard. Track website visits, modify content and manage billing all in one place.

These are only the highlights and more features are about to come very soon. All development sites are **free**, so give it a try and create your first development website now! Visit [wlodev.com](https://wlodev.com) and simplify your website development 🌏.

## Questions

If you have any issues or questions, please don't hesitate to reach out to us on [X (@wlodev)](https://x.com/wlodev) or dev@wlodev.com. Every feedback is valuable and we will consider all requests to improve the experience for you.
