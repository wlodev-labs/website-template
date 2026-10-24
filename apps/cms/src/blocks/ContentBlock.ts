import type { Block } from 'payload'

export const ContentBlock: Block = {
    slug: 'content',
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
            name: 'layout',
            type: 'select',
            label: {
                en: 'Layout',
                pl: 'Układ',
            },
            defaultValue: 'full',
            admin: {
                description: {
                    en: 'One column means the text will be spread across the full width of the section/page. Two columns split the section into two parts and place the text next to each other.',
                    pl: 'Jedna kolumna oznacza, że tekst zostanie rozłożony na pełną szerokość danej sekcji / strony. Dwie kolumny dzielą sekcje na dwie części i układają tekst obok siebie.',
                },
            },
            options: [
                {
                    label: {
                        en: '1 column',
                        pl: '1 kolumna',
                    },
                    value: 'full',
                },
                {
                    label: {
                        en: '2 columns',
                        pl: '2 kolumny',
                    },
                    value: 'twoColumns',
                },
            ],
        },
        {
            name: 'firstColumnRichText',
            type: 'richText',
            label: {
                en: 'Column 1',
                pl: 'Kolumna i',
            },
        },
        {
            name: 'secondColumnRichText',
            type: 'richText',
            label: {
                en: 'Column 2',
                pl: 'Kolumna 2',
            },
            admin: {
                condition: (_, siblingData) => {
                    return siblingData.layout === 'twoColumns'
                },
            },
        },
    ],
}
