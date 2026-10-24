/**
 * ! This field is temporary as default slug field is broken since 3.90.2 and is not released yet.
 * https://github.com/payloadcms/payload/pull/18682
 */

import {
    slugField as payloadSlugField,
    type FieldHook,
    type RowField,
    type TextField,
} from 'payload'
import { slugify as defaultSlugify } from 'payload/shared'

type SlugFieldArgs = NonNullable<Parameters<typeof payloadSlugField>[0]>

const normalizeSlugInput = (value: string): string =>
    value
        .replace(/[łŁ]/g, character => (character === 'ł' ? 'l' : 'L'))
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')

/**
 * Payload's `slugField`, with the slug generated on create by the `slug` field
 * itself.
 *
 * Payload generates the slug in a `beforeChange` hook on the hidden
 * `generateSlug` checkbox. Since 3.90.2 (payloadcms/payload#18181) that hook
 * awaits `slugify` before assigning `data.slug`, and sibling fields run their
 * `beforeChange` step concurrently, so the required `slug` validates before the
 * value arrives: every create without a slug fails with "Slug: This field is
 * required" (payloadcms/payload#18334, #996).
 *
 * A field validates only after its own `beforeChange` hooks resolve, so
 * generating the slug in a hook on `slug` makes it present in time on any
 * Payload version. It can't move earlier to `beforeValidate`: defaults resolve
 * concurrently in that pass, and the Volumes slug comes from `volumeNumber`'s
 * async default. Payload's hook computes the same value, so the checkbox and
 * update behavior stay Payload's.
 */
export const slugField = (args: SlugFieldArgs = {}): RowField => {
    const { name = 'slug', overrides, slugify, useAsSlug = 'title' } = args

    const generateOnCreate: FieldHook = async ({
        data,
        operation,
        req,
        value,
    }) => {
        if (operation !== 'create' || value || !data?.[useAsSlug]) {
            return value
        }

        const valueToSlugify = data[useAsSlug]
        const normalizedValueToSlugify = normalizeSlugInput(valueToSlugify)
        return slugify
            ? slugify({ data, req, valueToSlugify: normalizedValueToSlugify })
            : defaultSlugify(normalizedValueToSlugify)
    }

    return payloadSlugField({
        ...args,
        overrides: row => {
            const slug = row.fields.find(
                (field): field is TextField =>
                    'name' in field && field.name === name,
            )
            if (slug) {
                slug.label = {
                    en: 'URL address (slug)',
                    pl: 'Adres URL (slug)',
                }
                slug.admin = {
                    ...slug.admin,
                    description: {
                        pl: 'Czytelna nazwa w adresie URL dla danej podstrony, artykułu, np. "o-nas" lub "kontakt".',
                        en: 'A human-readable name in the URL for a given subpage, article, e.g. "about-us" or "contact".',
                    },
                }
                slug.hooks = {
                    ...slug.hooks,
                    beforeChange: [
                        generateOnCreate,
                        ...(slug.hooks?.beforeChange ?? []),
                    ],
                }
            }
            return overrides ? overrides(row) : row
        },
    })
}
