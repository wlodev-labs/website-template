import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'

export const Categories: CollectionConfig = {
    slug: 'categories',
    labels: {
        singular: {
            en: 'Category',
            pl: 'Kategoria',
        },
        plural: {
            en: 'Categories',
            pl: 'Kategorie',
        },
    },
    admin: {
        useAsTitle: 'name',
        group: 'Blog',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            label: {
                en: 'Name',
                pl: 'Nazwa',
            },
            required: true,
        },
        ...slugField('name'),
    ],
}
