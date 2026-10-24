import type { CollectionConfig } from 'payload'
import { ContentBlock } from '@/blocks/ContentBlock'
import { MediaBlock } from '@/blocks/MediaBlock'
import { slugField } from '@/fields/slug'

export const Pages: CollectionConfig<'pages'> = {
    slug: 'pages',
    labels: {
        singular: {
            en: 'Page',
            pl: 'Podstrona',
        },
        plural: {
            en: 'Pages',
            pl: 'Podstrony',
        },
    },
    // This config controls what's populated by default when a page is referenced
    // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
    // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
    defaultPopulate: {
        title: true,
        slug: true,
    },
    admin: {
        defaultColumns: ['title', 'slug', 'updatedAt'],
        useAsTitle: 'title',
        group: {
            en: 'General',
            pl: 'Ogólne',
        },
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: {
                en: 'Page name',
                pl: 'Nazwa strony',
            },
        },
        {
            name: 'layout',
            type: 'blocks',
            label: {
                en: 'Layout',
                pl: 'Układ podstrony',
            },
            labels: {
                singular: {
                    en: 'block',
                    pl: 'blok',
                },
                plural: {
                    en: 'blocks',
                    pl: 'bloki',
                },
            },
            blocks: [ContentBlock, MediaBlock],
            required: true,
        },
        slugField(),
    ],
}
