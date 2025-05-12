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
        group: {
            en: 'General',
            pl: 'Ogólne',
        },
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            label: {
                en: 'Title',
                pl: 'Tytuł',
            },
            required: true,
        },
        {
            type: 'tabs',
            tabs: [
                {
                    fields: [hero],
                    label: {
                        en: 'Hero',
                        pl: 'Sekcja Hero',
                    },
                    admin: {
                        description: {
                            en: 'Hero section is the first section of the page at the top. It usually contains a title, subtitle, and sometimes a call to action button.',
                            pl: 'Sekcja Hero to pierwsza sekcja strony na górze. Zwykle zawiera tytuł, podtytuł i czasami przycisk wezwania do działania.',
                        },
                    },
                },
                {
                    fields: [
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
                            blocks: [CallToAction, Content, MediaBlock],
                            required: true,
                        },
                    ],
                    label: {
                        en: 'Content',
                        pl: 'Treść podstrony',
                    },
                    admin: {
                        description: {
                            en: 'This is the main content of the page. You can add any blocks you want here.',
                            pl: 'To jest główna treść strony. Możesz dodać tutaj dowolne bloki.',
                        },
                    },
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
            label: {
                en: 'Published At',
                pl: 'Data publikacji',
            },
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
