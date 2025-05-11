import type { CollectionConfig } from 'payload'
import { CallToAction } from '@/blocks/callToAction'
import { Content } from '@/blocks/contentBlock'
import { MediaBlock } from '@/blocks/mediaBlock'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { slugField } from '@/fields/slug'
import { hero } from '@/fields/hero'

import {
    MetaDescriptionField,
    MetaImageField,
    MetaTitleField,
    OverviewField,
    PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
    slug: 'pages',
    access: {
        read: () => true,
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
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            type: 'tabs',
            tabs: [
                {
                    fields: [hero],
                    label: 'Hero',
                },
                {
                    fields: [
                        {
                            name: 'layout',
                            type: 'blocks',
                            blocks: [CallToAction, Content, MediaBlock],
                            required: true,
                            admin: {
                                initCollapsed: true,
                            },
                        },
                    ],
                    label: 'Content',
                },
                {
                    name: 'meta',
                    label: 'SEO',
                    fields: [
                        OverviewField({
                            titlePath: 'meta.title',
                            descriptionPath: 'meta.description',
                            imagePath: 'meta.image',
                        }),
                        MetaTitleField({
                            hasGenerateFn: true,
                        }),
                        MetaImageField({
                            relationTo: 'media',
                        }),

                        MetaDescriptionField({}),
                        PreviewField({
                            // if the `generateUrl` function is configured
                            hasGenerateFn: true,

                            // field paths to match the target field for data
                            titlePath: 'meta.title',
                            descriptionPath: 'meta.description',
                        }),
                    ],
                },
            ],
        },
        {
            name: 'publishedAt',
            type: 'date',
            admin: {
                position: 'sidebar',
            },
        },
        ...slugField(),
    ],
    hooks: {
        beforeChange: [populatePublishedAt],
    },
    // versions: {
    //     drafts: {
    //         autosave: {
    //             interval: 100, // We set this interval for optimal live preview
    //         },
    //         schedulePublish: true,
    //     },
    //     maxPerDoc: 50,
    // },
}
