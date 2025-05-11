import type { ElementType } from 'react'
import type { Media as CMSMediaType } from '@/utils/cms'

export type MediaProps = {
    className?: string
    imgClassName?: string
    videoClassName?: string
    pictureClassName?: string
    htmlElement?: ElementType | null
    resource?: CMSMediaType | string | null
    onClick?: () => void
    loading?: React.ImgHTMLAttributes<HTMLImageElement>['loading']
    decoding?: React.ImgHTMLAttributes<HTMLImageElement>['decoding']
    fetchPriority?: React.ImgHTMLAttributes<HTMLImageElement>['fetchPriority']
    fill?: boolean
}
