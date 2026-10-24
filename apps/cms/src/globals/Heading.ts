import { link } from '@/fields/link'
import type { GlobalConfig } from 'payload'

export const Heading: GlobalConfig = {
    slug: 'heading',
    label: {
        en: 'Heading',
        pl: 'Nagłówek',
    },
    admin: {
        group: {
            en: 'Settings',
            pl: 'Ustawienia',
        },
        description: {
            en: 'Settings for the page header / navigation',
            pl: 'Ustawienia nagłówka strony / nawigacji',
        },
    },
    fields: [
        {
            name: 'navItems',
            type: 'array',
            label: {
                en: 'Navigation items',
                pl: 'Elementy nawigacji',
            },
            labels: {
                singular: {
                    en: 'Navigation item',
                    pl: 'Element nawigacji',
                },
                plural: {
                    en: 'Navigation items',
                    pl: 'Elementy nawigacji',
                },
            },
            admin: {
                description: {
                    en: 'List of links in the page header. The order of the items corresponds to the order of display.',
                    pl: 'Lista linków w nagłówku strony. Kolejność elementów odpowiada kolejności wyświetlania.',
                },
                components: {
                    RowLabel: {
                        path: '/components/RowLabel.tsx#RowLabel',
                    },
                },
            },
            fields: [
                link({
                    appearances: false,
                }),
            ],
        },
        link({
            appearances: false,
            overrides: {
                name: 'cta',
                label: {
                    en: 'CTA button',
                    pl: 'Przycisk CTA',
                },
                admin: {
                    description: {
                        en: 'A prominent button in the page header on the right side. Usually leads to the most important subpage.',
                        pl: 'Wyróżniający się przycisk w nagłówku strony po prawej stronie. Zazwyczaj prowadzi do najważniejszej podstrony.',
                    },
                },
            },
        }),
    ],
}
