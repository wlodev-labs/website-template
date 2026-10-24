import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { en } from '@payloadcms/translations/languages/en'
import { pl } from '@payloadcms/translations/languages/pl'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { wlodevPlugin } from '@wlodev/payload'
import { defaultLexical } from './fields/defaultLexical'

// Your collections imports
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'

// Your globals imports
import { Settings } from './globals/Settings'
import { Heading } from './globals/Heading'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    globals: [Heading, Settings],
    collections: [Pages, Media, Users],
    i18n: {
        fallbackLanguage: 'en',
        supportedLanguages: { en, pl },
    },
    editor: defaultLexical,
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
    plugins: [wlodevPlugin()],
})
