import type { Block } from 'payload'
import {
    FixedToolbarFeature,
    HeadingFeature,
    InlineToolbarFeature,
    lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { linkGroup } from '@/fields/linkGroup'

export const CallToAction: Block = {
    slug: 'cta',
    interfaceName: 'CallToActionBlock',
    labels: {
        singular: {
            en: 'Call to Action',
            pl: 'Przycisk wezwania do działania',
        },
        plural: {
            en: 'Calls to Action',
            pl: 'Przyciski wezwania do działania',
        },
    },
    fields: [
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
            label: false,
        },
        linkGroup({
            appearances: ['default', 'outline'],
            overrides: {
                maxRows: 2,
            },
        }),
    ],
}
