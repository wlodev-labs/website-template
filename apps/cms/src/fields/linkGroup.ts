import type { ArrayField, Field } from 'payload'
import type { LinkAppearances } from './link'
import deepMerge from '@/utils/deepMerge'
import { link } from './link'

type LinkGroupType = (options?: {
    appearances?: LinkAppearances[] | false
    overrides?: Partial<ArrayField>
}) => Field

export const linkGroup: LinkGroupType = ({
    appearances,
    overrides = {},
} = {}) => {
    const generatedLinkGroup: Field = {
        name: 'links',
        type: 'array',
        label: {
            en: 'Links',
            pl: 'Odnośniki / Linki',
        },
        // Array type based parameter
        labels: {
            singular: {
                en: 'link',
                pl: 'odnośnik / link',
            },
            plural: {
                en: 'links',
                pl: 'odnośniki / linki',
            },
        },
        fields: [
            link({
                appearances,
            }),
        ],
        admin: {
            initCollapsed: true,
        },
    }

    return deepMerge(generatedLinkGroup, overrides)
}
