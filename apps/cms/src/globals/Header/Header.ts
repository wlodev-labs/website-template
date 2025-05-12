import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'

export const Header: GlobalConfig = {
    slug: 'header',
    label: {
        en: 'Header',
        pl: 'Nagłówek',
    },
    admin: {
        group: {
            en: 'General',
            pl: 'Ogólne',
        },
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'navItems',
            type: 'array',
            label: {
                en: 'Navbar items',
                pl: 'Linki w górnym pasku menu / nawigacji',
            },
            // Array type based parameter
            labels: {
                singular: {
                    en: 'navbar item',
                    pl: 'link w górnym pasku menu / nawigacji',
                },
                plural: {
                    en: 'navbar items',
                    pl: 'linki w górnym pasku menu / nawigacji',
                },
            },
            fields: [
                link({
                    appearances: false,
                }),
            ],
            maxRows: 6,
        },
    ],
}
