import type { Field } from 'payload'
import {
    FixedToolbarFeature,
    HeadingFeature,
    InlineToolbarFeature,
    lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
    name: 'hero',
    type: 'group',
    fields: [
        {
            name: 'type',
            type: 'select',
            defaultValue: 'primary',
            label: {
                en: 'Hero Type',
                pl: 'Typ sekcji hero',
            },
            options: [
                {
                    value: 'primary',
                    label: {
                        en: 'Primary Hero',
                        pl: 'Główna sekcja hero',
                    },
                },
                {
                    value: 'none',
                    label: {
                        en: 'No Hero',
                        pl: 'Brak sekcji hero',
                    },
                },
            ],
            required: true,
        },
        {
            name: 'richText',
            type: 'richText',
            editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                    return [
                        ...rootFeatures,
                        HeadingFeature({
                            enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'],
                        }),
                        FixedToolbarFeature(),
                        InlineToolbarFeature(),
                    ]
                },
            }),
            admin: {
                condition: (_, { type } = {}) => ['primary'].includes(type),
            },
            label: false,
        },
        linkGroup({
            overrides: {
                maxRows: 2,
                admin: {
                    condition: (_, { type } = {}) => ['primary'].includes(type),
                },
            },
        }),
        {
            name: 'media',
            type: 'upload',
            admin: {
                condition: (_, { type } = {}) => ['primary'].includes(type),
            },
            relationTo: 'media',
            required: true,
        },
    ],
    label: false,
}
