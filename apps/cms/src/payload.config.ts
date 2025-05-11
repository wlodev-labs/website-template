import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { getSiteURL, wlodevPlugin } from '@wlodev/payload'
import type { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import type { Post, Page } from './payload-types'

// Your collections imports
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Pages } from './collections/Pages'
import { Header } from './globals/Header/Header'
import { Settings } from './globals/settings'
import { Categories } from './collections/Categories'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
    return doc?.title
        ? `${doc.title} | Wlodev Website Template`
        : 'Wlodev Website Template'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
    const url = getSiteURL() ?? new URL('http://localhost:3000')
    return doc?.slug ? `${url.toString()}/${doc.slug}` : url.toString()
}

export default buildConfig({
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    collections: [Pages, Posts, Categories, Media, Users],
    globals: [Header, Settings],
    editor: lexicalEditor(),
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    db: mongooseAdapter({
        url: process.env.DATABASE_URI || '',
        connectOptions: {
            maxPoolSize: 1,
        },
    }),
    plugins: [
        wlodevPlugin(),
        seoPlugin({
            generateTitle,
            generateURL,
        }),
    ],
})
