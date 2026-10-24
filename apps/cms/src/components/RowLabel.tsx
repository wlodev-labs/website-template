'use client'

import { useLocale, useRowLabel } from '@payloadcms/ui'
import type { PayloadClientReactComponent, RowLabelComponent } from 'payload'

const translations: Record<string, string> = {
    en: 'Row',
    pl: 'Wiersz',
}

export const RowLabel: PayloadClientReactComponent<RowLabelComponent> = ({
    use,
}) => {
    const loadedLocale = useLocale()
    const locale = loadedLocale ?? 'en'
    const translation = translations[locale.code]

    const { data, rowNumber } = useRowLabel<{ [key: string]: any }>()

    const rowNum = typeof rowNumber !== 'undefined' ? rowNumber + 1 : null
    if (data && data[use]) {
        return (
            <>{`${data[use]}${rowNum ? ` (${translation} ${rowNum})` : ''}`}</>
        )
    }
    return rowNum ? <>{`${translation} ${rowNum}`}</> : <>{translation}</>
}
