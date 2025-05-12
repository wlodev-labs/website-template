import type { Field, GroupField } from 'payload'
export type LinkAppearances = 'default' | 'outline'
import deepMerge from '@/utils/deepMerge'

export const appearanceOptions: Record<
    LinkAppearances,
    { label: string; value: string }
> = {
    default: {
        label: 'Default',
        value: 'default',
    },
    outline: {
        label: 'Outline',
        value: 'outline',
    },
}

type LinkType = (options?: {
    appearances?: LinkAppearances[] | false
    disableLabel?: boolean
    overrides?: Partial<GroupField>
}) => Field

export const link: LinkType = ({
    appearances,
    disableLabel = false,
    overrides = {},
} = {}) => {
    const linkResult: GroupField = {
        name: 'link',
        type: 'group',
        label: {
            en: 'Link',
            pl: 'Odnośnik / Link',
        },
        admin: {
            hideGutter: true,
        },
        fields: [
            {
                type: 'row',
                fields: [
                    {
                        name: 'type',
                        type: 'radio',
                        label: {
                            en: 'Link type',
                            pl: 'Typ linku',
                        },
                        admin: {
                            layout: 'horizontal',
                            width: '50%',
                        },
                        defaultValue: 'reference',
                        options: [
                            {
                                label: {
                                    en: 'Internal link',
                                    pl: 'Link wewnętrzny (podstrona, post)',
                                },
                                value: 'reference',
                            },
                            {
                                label: {
                                    en: 'Custom URL',
                                    pl: 'Pełny adres URL (np. do innej strony)',
                                },
                                value: 'custom',
                            },
                        ],
                    },
                    {
                        name: 'newTab',
                        type: 'checkbox',
                        admin: {
                            style: {
                                alignSelf: 'flex-end',
                            },
                            width: '50%',
                        },
                        label: {
                            en: 'Open in new tab',
                            pl: 'Otwórz w nowej karcie',
                        },
                    },
                ],
            },
        ],
    }

    const linkTypes: Field[] = [
        {
            name: 'reference',
            type: 'relationship',
            admin: {
                condition: (_, siblingData) =>
                    siblingData?.type === 'reference',
            },
            label: {
                en: 'Document to link to',
                pl: 'Strona, post, do którego prowadzi link',
            },
            relationTo: ['pages', 'posts'],
            required: true,
        },
        {
            name: 'url',
            type: 'text',
            admin: {
                condition: (_, siblingData) => siblingData?.type === 'custom',
            },
            label: {
                en: 'Custom URL',
                pl: 'Pełny adres URL (np. do innej strony)',
            },
            required: true,
        },
    ]

    if (!disableLabel) {
        linkTypes.map(linkType => ({
            ...linkType,
            admin: {
                ...linkType.admin,
                width: '50%',
            },
        }))

        linkResult.fields.push({
            type: 'row',
            fields: [
                ...linkTypes,
                {
                    name: 'label',
                    type: 'text',
                    label: {
                        en: 'Link label',
                        pl: 'Tekst linku',
                    },
                    admin: {
                        width: '50%',
                        description: {
                            en: 'The text that will be displayed as the link. When clicked, the user will be taken to a subpage, post, or external page.',
                            pl: 'Tekst, który będzie wyświetlany jako link. Po kliknięciu w ten tekst użytkownik zostanie przeniesiony do podstrony, postu lub zewnętrznej strony.',
                        },
                    },
                    required: true,
                },
            ],
        })
    } else {
        linkResult.fields = [...linkResult.fields, ...linkTypes]
    }

    if (appearances !== false) {
        let appearanceOptionsToUse = [
            appearanceOptions.default,
            appearanceOptions.outline,
        ]

        if (appearances) {
            appearanceOptionsToUse = appearances.map(
                appearance => appearanceOptions[appearance]
            )
        }

        linkResult.fields.push({
            name: 'appearance',
            type: 'select',
            label: {
                en: 'Link appearance',
                pl: 'Wygląd linku',
            },
            admin: {
                description: {
                    en: 'The appearance of the link. The default option is a standard link, while the outline option is a link with a border.',
                    pl: 'Wygląd linku. Domyślną opcją jest standardowy link, natomiast opcja outline to link z obramowaniem.',
                },
                width: '50%',
            },
            defaultValue: 'default',
            options: appearanceOptionsToUse,
        })
    }

    return deepMerge(linkResult, overrides)
}
