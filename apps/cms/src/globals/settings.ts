import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
    slug: 'settings',
    access: {
        read: () => true,
    },
    admin: {
        group: 'Website',
    },
    fields: [
        {
            name: 'brand',
            label: 'Company / Brand Name',
            type: 'text',
            required: false,
        },
        {
            name: 'logo',
            type: 'upload',
            relationTo: 'media', // Assuming 'media' is the collection for uploaded files
            required: false,
        },
        {
            name: 'socialMedia',
            type: 'group',
            fields: [
                {
                    name: 'instagram',
                    type: 'array',
                    fields: [
                        {
                            name: 'link',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: 'label',
                            type: 'text',
                        },
                    ],
                },
                {
                    name: 'facebook',
                    type: 'array',
                    fields: [
                        {
                            name: 'link',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: 'label',
                            type: 'text',
                        },
                    ],
                },
                {
                    name: 'twitter',
                    type: 'array',
                    fields: [
                        {
                            name: 'link',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: 'label',
                            type: 'text',
                        },
                    ],
                },
            ],
        },
        {
            name: 'emails',
            type: 'array',
            fields: [
                {
                    name: 'address',
                    type: 'text',
                    required: true,
                },
            ],
        },
        {
            name: 'phones',
            type: 'array',
            fields: [
                {
                    name: 'phoneNumber',
                    type: 'text',
                    required: true,
                },
            ],
        },
    ],
}
