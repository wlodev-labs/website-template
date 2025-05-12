import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
    slug: 'settings',
    label: {
        en: 'Settings',
        pl: 'Ustawienia',
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
            name: 'companyName',
            label: {
                en: 'Company Name',
                pl: 'Nazwa firmy',
            },
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
            label: {
                en: 'Social Media',
                pl: 'Profile na mediach społecznościowych',
            },
            type: 'group',
            fields: [
                {
                    name: 'instagram',
                    type: 'array',
                    fields: [
                        {
                            name: 'link',
                            type: 'text',
                            label: {
                                en: 'Instagram profile URL address',
                                pl: 'Adres URL profilu na instagramie',
                            },
                            required: true,
                        },
                        {
                            name: 'label',
                            type: 'text',
                            label: {
                                en: 'Alternative label (default: Icon / Instagram)',
                                pl: 'Alternatywny tekst (domyślnie: Ikonka / Instagram)',
                            },
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
                            label: {
                                en: 'Facebook profile URL address',
                                pl: 'Adres URL profilu na Facebooku',
                            },
                            required: true,
                        },
                        {
                            name: 'label',
                            label: {
                                en: 'Alternative label (default: Icon / Facebook)',
                                pl: 'Alternatywny tekst (domyślnie: Ikonka / Facebook)',
                            },
                            type: 'text',
                        },
                    ],
                },
                {
                    name: 'twitter',
                    label: 'X / Twitter',
                    type: 'array',
                    fields: [
                        {
                            name: 'link',
                            type: 'text',
                            label: {
                                en: 'X profile URL address',
                                pl: 'Adres URL profilu na X',
                            },
                            required: true,
                        },
                        {
                            name: 'label',
                            label: {
                                en: 'Alternative label (default: Icon / X)',
                                pl: 'Alternatywny tekst (domyślnie: Ikonka / X)',
                            },
                            type: 'text',
                        },
                    ],
                },
            ],
        },
        {
            name: 'emails',
            type: 'array',
            label: {
                en: 'Email Addresses',
                pl: 'Adresy e-mail',
            },
            // Array type based parameter
            labels: {
                singular: {
                    en: 'email address',
                    pl: 'adres e-mail',
                },
                plural: {
                    en: 'email addresses',
                    pl: 'adresy e-mail',
                },
            },
            fields: [
                {
                    name: 'address',
                    type: 'text',
                    label: {
                        en: 'Email address',
                        pl: 'Adres e-mail',
                    },
                    required: true,
                },
            ],
        },
        {
            name: 'phones',
            type: 'array',
            label: {
                en: 'Phone Numbers',
                pl: 'Numery telefonów',
            },
            // Array type based parameter
            labels: {
                singular: {
                    en: 'phone number',
                    pl: 'numer telefonu',
                },
                plural: {
                    en: 'phone numbers',
                    pl: 'numery telefonów',
                },
            },
            fields: [
                {
                    name: 'phoneNumber',
                    type: 'text',
                    label: {
                        en: 'Phone number',
                        pl: 'Numer telefonu',
                    },
                    required: true,
                },
            ],
        },
    ],
}
