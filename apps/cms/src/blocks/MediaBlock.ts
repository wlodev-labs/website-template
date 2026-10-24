import type { Block } from 'payload'

export const MediaBlock: Block = {
    slug: 'media',
    interfaceName: 'MediaBlock',
    labels: {
        singular: {
            en: 'Media',
            pl: 'Media',
        },
        plural: {
            en: 'Media',
            pl: 'Media',
        },
    },
    fields: [
        {
            name: 'media',
            type: 'upload',
            relationTo: 'media',
            required: true,
            label: {
                en: 'Media',
                pl: 'Media',
            },
        },
    ],
}
