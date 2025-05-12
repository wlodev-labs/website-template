import type { CollectionConfig } from 'payload'
import {
    BlocksFeature,
    FixedToolbarFeature,
    HeadingFeature,
    HorizontalRuleFeature,
    InlineToolbarFeature,
    lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { MediaBlock } from '@/blocks/mediaBlock'
import {
    MetaDescriptionField,
    MetaImageField,
    MetaTitleField,
    OverviewField,
    PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from '@/fields/slug'

export const Posts: CollectionConfig<'posts'> = {
    slug: 'posts',
    labels: {
        singular: {
            en: 'Post',
            pl: 'Post',
        },
        plural: {
            en: 'Posts',
            pl: 'Posty',
        },
    },
    access: {
        read: () => true,
    },
    // This config controls what's populated by default when a post is referenced
    // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
    // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'posts'>
    defaultPopulate: {
        title: true,
        slug: true,
        categories: true,
        meta: {
            image: true,
            description: true,
        },
    },
    admin: {
        defaultColumns: ['title', 'slug', 'updatedAt'],
        useAsTitle: 'title',
        group: 'Blog',
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
                    fields: [
                        {
                            name: 'heroImage',
                            type: 'upload',
                            label: {
                                en: 'Hero image',
                                pl: 'Obrazek w sekcji Hero',
                            },
                            admin: {
                                description: {
                                    en: 'This image will be used in the hero section of the post at the very top.',
                                    pl: 'Ten obrazek będzie użyty w sekcji Hero posta na samej górze.',
                                },
                            },
                            relationTo: 'media',
                        },
                        {
                            name: 'content',
                            type: 'richText',
                            editor: lexicalEditor({
                                features: ({ rootFeatures }) => {
                                    return [
                                        ...rootFeatures,
                                        HeadingFeature({
                                            enabledHeadingSizes: [
                                                'h1',
                                                'h2',
                                                'h3',
                                                'h4',
                                            ],
                                        }),
                                        BlocksFeature({
                                            blocks: [MediaBlock],
                                        }),
                                        FixedToolbarFeature(),
                                        InlineToolbarFeature(),
                                        HorizontalRuleFeature(),
                                    ]
                                },
                            }),
                            label: false,
                            required: true,
                        },
                        {
                            name: 'categories',
                            type: 'relationship',
                            label: {
                                en: 'Categories',
                                pl: 'Kategorie',
                            },
                            admin: {
                                position: 'sidebar',
                            },
                            hasMany: true,
                            relationTo: 'categories',
                        },
                        {
                            name: 'relatedPosts',
                            type: 'relationship',
                            label: {
                                en: 'Related posts',
                                pl: 'Powiązane posty',
                            },
                            admin: {
                                position: 'sidebar',
                            },
                            filterOptions: ({ id }) => {
                                return {
                                    id: {
                                        not_in: [id],
                                    },
                                }
                            },
                            hasMany: true,
                            relationTo: 'posts',
                        },
                    ],
                    label: {
                        en: 'Content',
                        pl: 'Treść postu',
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
                date: {
                    pickerAppearance: 'dayAndTime',
                },
                position: 'sidebar',
            },
            hooks: {
                beforeChange: [
                    ({ siblingData, value }) => {
                        if (siblingData._status === 'published' && !value) {
                            return new Date()
                        }
                        return value
                    },
                ],
            },
        },
        ...slugField(),
    ],
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
