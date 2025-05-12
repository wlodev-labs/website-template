import type { Block, Field } from 'payload'
import {
    FixedToolbarFeature,
    HeadingFeature,
    InlineToolbarFeature,
    lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'

const columnFields: Field[] = [
    {
        name: 'size',
        type: 'select',
        defaultValue: 'full',
        label: {
            en: 'Column Size',
            pl: 'Rozmiar kolumny',
        },
        options: [
            {
                value: 'full',
                label: {
                    en: 'Full',
                    pl: 'Cała szerokość',
                },
            },
            {
                value: 'half',
                label: {
                    en: 'Half',
                    pl: 'Połowa',
                },
            },
        ],
    },
    {
        name: 'richText',
        type: 'richText',
        editor: lexicalEditor({
            features: ({ rootFeatures }) => {
                return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                ]
            },
        }),
        label: false,
    },
    {
        name: 'enableLink',
        type: 'checkbox',
        label: {
            en: 'Enable Link',
            pl: 'Akywuj link pod kolumną',
        },
    },
    link({
        overrides: {
            admin: {
                condition: (_data, siblingData) => {
                    return Boolean(siblingData?.enableLink)
                },
            },
        },
    }),
]

export const Content: Block = {
    slug: 'content',
    interfaceName: 'ContentBlock',
    labels: {
        singular: {
            en: 'Content',
            pl: 'Treść',
        },
        plural: {
            en: 'Contents',
            pl: 'Treści',
        },
    },
    fields: [
        {
            name: 'columns',
            type: 'array',
            label: {
                en: 'Columns',
                pl: 'Kolumny',
            },
            labels: {
                singular: {
                    en: 'column',
                    pl: 'kolumna',
                },
                plural: {
                    en: 'columns',
                    pl: 'kolumny',
                },
            },
            admin: {
                initCollapsed: true,
            },
            fields: columnFields,
        },
    ],
}
