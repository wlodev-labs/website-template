import type { CollectionConfig } from 'payload'
import {
    FixedToolbarFeature,
    InlineToolbarFeature,
    lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Media: CollectionConfig = {
    slug: 'media',
    admin: {
        group: {
            en: 'General',
            pl: 'Ogólne',
        },
        description: {
            en: 'Media collection is used to store images, videos, pdf and other files.',
            pl: 'Kolekcja Media jest używana do przechowywania obrazów, filmów, pdf i innych plików.',
        },
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            label: {
                en: 'Alt text',
                pl: 'Tekst alternatywny',
            },
            admin: {
                description: {
                    en: 'Alt text is a short description of the image. It is used for accessibility, SEO, and as a hint for users who cannot see the image. The text is not visible on the page when the image loads correctly.',
                    pl: 'Tekst alternatywny to krótki opis obrazu. Jest używany do celów dostępności, SEO i jako podpowiedź dla użytkowników, którzy nie mogą zobaczyć obrazu. Tekst nie jest widoczny na stronie gdy zdjęcie poprawnie się załadowało.',
                },
            },
        },
        {
            name: 'caption',
            type: 'richText',
            label: {
                en: 'Caption',
                pl: 'Podpis',
            },
            admin: {
                description: {
                    en: 'Caption is a short description of the image. It is displayed below the image.',
                    pl: 'Podpis to krótki opis obrazu, wyświetlany poniżej obrazu.',
                },
            },
            editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                    return [
                        ...rootFeatures,
                        FixedToolbarFeature(),
                        InlineToolbarFeature(),
                    ]
                },
            }),
        },
    ],
    upload: true,
}
