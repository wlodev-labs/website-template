import {
    BoldFeature,
    ItalicFeature,
    ParagraphFeature,
    lexicalEditor,
    UnderlineFeature,
    InlineToolbarFeature,
    FixedToolbarFeature,
    HeadingFeature,
    HorizontalRuleFeature,
    OrderedListFeature,
    UnorderedListFeature,
    AlignFeature,
    LinkFeature,
    LinkFields,
} from '@payloadcms/richtext-lexical'
import { TextFieldSingleValidation } from 'payload'

export const defaultLexical = lexicalEditor({
    features: [
        ParagraphFeature(),
        UnderlineFeature(),
        BoldFeature(),
        ItalicFeature(),
        AlignFeature(),
        HeadingFeature({
            enabledHeadingSizes: ['h2', 'h3', 'h4'],
        }),
        InlineToolbarFeature(),
        FixedToolbarFeature(),
        HorizontalRuleFeature(),
        OrderedListFeature(),
        UnorderedListFeature(),
        LinkFeature({
            enabledCollections: ['pages'],
            fields: ({ defaultFields }) => {
                const defaultFieldsWithoutUrl = defaultFields.filter(field => {
                    if ('name' in field && field.name === 'url') return false
                    return true
                })

                return [
                    ...defaultFieldsWithoutUrl,
                    {
                        name: 'url',
                        type: 'text',
                        admin: {
                            condition: (_data, siblingData) =>
                                siblingData?.linkType !== 'internal',
                        },
                        label: ({ t }) => t('fields:enterURL'),
                        required: true,
                        validate: ((value, options) => {
                            if (
                                (options?.siblingData as LinkFields)
                                    ?.linkType === 'internal'
                            ) {
                                // no validation needed, as no url should exist for internal links
                                return true
                            }
                            return value
                                ? true
                                : 'Adres URL jest wymagany dla linków zewnętrznych'
                        }) as TextFieldSingleValidation,
                    },
                ]
            },
        }),
    ],
})
