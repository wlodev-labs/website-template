import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'

export const Header: GlobalConfig = {
    slug: 'header',
    access: {
        read: () => true,
    },
    admin: {
        group: 'Website',
    },
    fields: [
        {
            name: 'navItems',
            type: 'array',
            fields: [
                link({
                    appearances: false,
                }),
            ],
            maxRows: 6,
            admin: {
                initCollapsed: true,
                components: {
                    RowLabel: '@/globals/Header/RowLabel#RowLabel',
                },
            },
        },
    ],
}
