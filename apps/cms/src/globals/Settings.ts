import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
    slug: 'settings',
    label: {
        en: 'General settings',
        pl: 'Ustawienia ogólne',
    },
    admin: {
        group: {
            en: 'Settings',
            pl: 'Ustawienia',
        },
        description: {
            en: 'Email addresses, phone numbers and other general settings',
            pl: 'Adresy email, numery telefonów i inne ustawienia ogólne',
        },
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: {
                        en: 'Basic information',
                        pl: 'Podstawowe informacje',
                    },
                    fields: [
                        {
                            name: 'companyName',
                            type: 'text',
                            label: {
                                en: 'Company name',
                                pl: 'Pełna nazwa firmy',
                            },
                        },
                        {
                            name: 'contact',
                            label: {
                                en: 'Contact information',
                                pl: 'Dane kontaktowe',
                            },
                            type: 'group',
                            fields: [
                                {
                                    name: 'email',
                                    type: 'email',
                                    label: {
                                        en: 'Email address',
                                        pl: 'Adres email',
                                    },
                                },
                                {
                                    name: 'phoneNumbers',
                                    label: {
                                        en: 'Phone numbers',
                                        pl: 'Numery telefonów',
                                    },
                                    labels: {
                                        singular: {
                                            en: 'phone number',
                                            pl: 'numer telefonu',
                                        },
                                        plural: {
                                            en: 'Phone numbers',
                                            pl: 'Numery telefonów',
                                        },
                                    },
                                    type: 'array',
                                    admin: {
                                        components: {
                                            RowLabel: {
                                                path: '/components/RowLabel.tsx#RowLabel',
                                                clientProps: {
                                                    use: 'number',
                                                },
                                            },
                                        },
                                    },
                                    fields: [
                                        {
                                            name: 'number',
                                            type: 'text',
                                            label: {
                                                en: 'Phone number',
                                                pl: 'Numer telefonu',
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            name: 'location',
                            type: 'group',
                            label: {
                                en: 'Company address',
                                pl: 'Adres firmy',
                            },
                            fields: [
                                {
                                    type: 'row',
                                    fields: [
                                        {
                                            name: 'street',
                                            type: 'text',
                                            label: {
                                                en: 'Street',
                                                pl: 'Ulica',
                                            },
                                            admin: {
                                                width: '100%',
                                            },
                                        },
                                        {
                                            name: 'postalCode',
                                            type: 'text',
                                            label: {
                                                en: 'Postal code',
                                                pl: 'Kod pocztowy',
                                            },
                                            admin: {
                                                width: '25%',
                                            },
                                        },
                                        {
                                            name: 'city',
                                            type: 'text',
                                            label: {
                                                en: 'City',
                                                pl: 'Miasto',
                                            },
                                            admin: {
                                                width: '75%',
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    label: {
                        en: 'Legal notes (privacy policy, terms of service, etc.)',
                        pl: 'Noty prawne (polityka prywatności, regulamin itp.)',
                    },
                    fields: [
                        {
                            name: 'formsPrivacyPolicyConsent',
                            type: 'richText',
                            label: {
                                en: 'Consent for processing personal data in forms',
                                pl: 'Zgoda na przetwarzanie danych osobowych w formularzach',
                            },
                            admin: {
                                description: {
                                    en: 'Content of the consent for processing personal data / privacy policy that will be displayed in contact forms and other forms on the website.',
                                    pl: 'Treść zgody na przetwarzanie danych osobowych / polityki prywatności, która będzie wyświetlana w formularzach kontaktowych i innych formularzach na stronie.',
                                },
                            },
                        },
                    ],
                },
                {
                    label: {
                        en: 'Advanced / SEO',
                        pl: 'Zaawansowane / SEO',
                    },
                    fields: [
                        {
                            name: 'scripts',
                            type: 'group',
                            label: {
                                en: 'Scripts',
                                pl: 'Skrypty',
                            },
                            admin: {
                                description: {
                                    en: 'Additional scripts to insert in the <head> and <body> sections. Particularly useful for inserting tracking codes, e.g. Google Analytics or marketing codes, e.g. Facebook Pixel.',
                                    pl: 'Dodatkowe skrypty do wstawienia w sekcjach <head> i <body>. Szczególnie przydatne do wstawienia kodów śledzących, np. Google Analytics lub marketingowych, np. Facebook Pixel.',
                                },
                            },
                            fields: [
                                {
                                    name: 'head',
                                    type: 'textarea',
                                    label: {
                                        en: 'Scripts in the <head> section',
                                        pl: 'Skrypty w sekcji <head>',
                                    },
                                },
                                {
                                    name: 'bodyStart',
                                    type: 'textarea',
                                    label: {
                                        en: 'Scripts at the beginning of the <body> section',
                                        pl: 'Skrypty na początku sekcji <body>',
                                    },
                                },
                                {
                                    name: 'bodyEnd',
                                    type: 'textarea',
                                    label: {
                                        en: 'Scripts at the end of the <body> section',
                                        pl: 'Skrypty na końcu sekcji <body>',
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
}
