## Website Template 🌏

Start building a website with basics of Payload CMS and Astro, including collection, blocks, fields for Payload CMS and Astro page structure along with React integration and components built using this framework. Deploy to [wlodev.com](https://wlodev.com) with a single `git push` on the main branch.

Here's a brief of the template file structure and how to develop a website using Payload CMS and Astro:

### Template file structure

The template is built with Turborepo, which efficiently manages multiple apps within a single development environment using `npm run dev`. We will go through each directory one by one to understand its purpose and how it integrates with the entire website.

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

### What is Payload CMS (/apps/cms)

Payload CMS is a code-first content management system where you define fields, blocks and schemaa using Typescript files. It has tons of built-in features, like authentication, file uploads, flexible REST API, admin panel but also gives you a way to fully customize your experience with plugins. You don't need to understand every detail of this open-source system to start building your first website. Here's a step-by-step overview of how this template was created using Payload CMS.

#### Collections

> Collections are the main way to structure repeatable content in your website, such as products, pages, posts, or any other types of content that you might want to manage. More in [docs](https://payloadcms.com/docs/configuration/collections#admin-options).

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

In this template, both pages and blog posts are built using blocks. This lets editors or clients modify content and adjust layouts easily. Typically, developers set up these block-based layouts, and clients handle the content.

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

To learn more about Payload and how to get the most of it, visit the [Payload CMS documentation](https://payloadcms.com/docs/getting-started/what-is-payload).

### What is Astro.js (/apps/site)

> Astro is a JavaScript web framework optimized for building fast, content-driven websites. **Astro supports every major UI framework**. Bring your existing components and take advantage of Astro's optimized client build performance. Learn more at [astro.build](https://astro.build).

Astro handles routing and page rendering, while you can use any framework to build components. In this template, React is used, but you can easily switch to Svelte, Vue or SolidJS. The file structure consists of `.tsx` or `.ts` files, with the pages directory containing `.astro` files.

#### Utils

The key part of the Astro and Payload CMS integration is the `payload.ts` file, which initializes the REST API-based client with auto-generated types. This ensures all functions are fully typed with IntelliSense support for example, for collection names, fields, or blocks.

> [!NOTE]
> The Payload CMS team has announced the upcoming Payload CMS SDK package, which will replace this custom client in the future. [(feat: add Payload SDK package) https://github.com/payloadcms/payload/pull/9463](https://github.com/payloadcms/payload/pull/9463).

```
import { initPayloadClient } from '@wlodev/astro'
import type { Config } from '../../../cms/src/payload-types'

export const cms = initPayloadClient<Config>({
    url: `${import.meta.env.CMS_URL}/api`,
})

// Make the types from the cms available in the site
export * from '../../../cms/src/payload-types'
```

#### Components

Regular React, Svelte, or other framework components used to build a website.

> [!NOTE]
> Astro provides a built-in `<Image>` component that handles the image optimization by default. However, when using other frameworks, Astro components can’t be directly used. Depending on the framework, you’ll need to create a custom image component. Fortunately, Astro offers an easy way to enable image optimization without using their implementation, through the `getImage()` function from the `astro:assets` package. Here's the implementation of the `Image` component in React.

Image optimization is enabled by default when deploying to [wlodev.com](https://wlodev.com), ensuring all images are served in multiple sizes, formats, and qualities for optimal loading speeds.

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
 * Astro provides an image component with the built-in image optimization, similar to Next.js’s <Image>.
 * Since we can’t use the Astro image component within React, we create a seperate image component,
 * with image optimization handled by getImage from astro:assets
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

After defining a new block in Payload CMS, you need to display it on the website. The blocks directory handles this. Below is an example implementation:

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

In the `RenderBlocks` component, you pass the prepared blocks and use it on pages where the corresponding collection is defined in Payload CMS.

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

#### Pages

This is where website routing is defined. Create a directory like `blog` and an `index.astro` file inside it to render a page at `website.com/blog`. Dynamic routing handles cases like individual blog posts, where content is managed through a Payload CMS collection. Example from this template:

_pages/[slug]/index.astro_

```
---
import { cms } from '@/utils/payload'
import { PostHero } from '@/components/heros/postHero'
import BaseLayout from '@/layouts/BaseLayout.astro'
import RichText from '@/components/richText'

/**
 * https://docs.astro.build/en/guides/routing/#static-ssg-mode
 * Because all routes must be determined at build time, a dynamic route must export a getStaticPaths()
 * that returns an array of objects with a params property. Each of these objects will generate a corresponding route.
 */
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

To learn more about dynamic routing, visit the [Astro docs](https://docs.astro.build/en/guides/routing/#static-ssg-mode).

## Deployment

Payload CMS and Astro are open-source and can be deployed to any hosting provider. The [wlodev.com](https://wlodev.com) deployment platform was created to simplify the deployment process for both developers and clients - from development to final handoff and maintenance.

What [wlodev.com](https://wlodev.com) offers:

- GitHub-bbased deployments via git push
- Fully configured Payload CMS with S3 bucket and MongoDB. It just works.
- Image optimization
- Automatic SSL certificate
- Built-in analytics with no setup required
- Client dashboard for content management, site stats, and billing, all in one place.

These are only the highlights - more features are coming very soon. All development sites are **free**. Visit [wlodev.com](https://wlodev.com) to create your first development website and streamline your workflow 🌏.

## Questions

For support or feedback, contact us on [X (@wlodev)](https://x.com/wlodev) or dev@wlodev.com. All feedback is valuable, and we'll consider all requests to improve your experience.
