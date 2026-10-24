import type { Field, GroupField } from 'payload'
import deepMerge from '@/lib/deepMerge'

export type LinkAppearances = 'default'

export const appearanceOptions: Record<
    LinkAppearances,
    { label: Record<string, string>; value: string }
> = {
    default: {
        label: {
            en: 'Default',
            pl: 'Domyślny',
        },
        value: 'default',
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
                        admin: {
                            layout: 'horizontal',
                            width: '50%',
                        },
                        defaultValue: 'reference',
                        options: [
                            {
                                label: {
                                    en: 'Internal link',
                                    pl: 'Link wewnętrzny',
                                },
                                value: 'reference',
                            },
                            {
                                label: {
                                    en: 'External link',
                                    pl: 'Link zewnętrzny',
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
                en: 'Select a page, product, or post to link to',
                pl: 'Wybierz stronę, produkt lub post do podlinkowania',
            },
            relationTo: ['pages'],
            required: true,
        },
        {
            name: 'url',
            type: 'text',
            admin: {
                condition: (_, siblingData) => siblingData?.type === 'custom',
            },
            label: {
                en: 'Enter the URL to which the link should lead',
                pl: 'Wpisz adres URL, do którego ma prowadzić link',
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
                    admin: {
                        width: '50%',
                    },
                    label: {
                        en: 'Enter the text to be displayed as a link',
                        pl: 'Wpisz tekst, który ma być wyświetlany jako link',
                    },
                    required: true,
                },
            ],
        })
    } else {
        linkResult.fields = [...linkResult.fields, ...linkTypes]
    }

    if (appearances !== false) {
        let appearanceOptionsToUse = [appearanceOptions.default]

        if (appearances) {
            appearanceOptionsToUse = appearances.map(
                appearance => appearanceOptions[appearance],
            )
        }

        linkResult.fields.push({
            name: 'appearance',
            type: 'select',
            label: {
                en: 'Select link appearance',
                pl: 'Wybierz wygląd linku',
            },
            admin: {
                description: {
                    en: 'Select the appearance of the link. This will affect how the link is displayed on the website.',
                    pl: 'Wybierz wygląd linku. To wpłynie na sposób wyświetlania linku na stronie internetowej.',
                },
            },
            defaultValue: 'default',
            options: appearanceOptionsToUse,
        })
    }

    return deepMerge(linkResult, overrides)
}
