import type { ElementType } from 'react'
import type { Media as CMSMediaType } from '@/utils/payload'
import type { ImageProps } from '../image'

type MyOmit<T, K extends PropertyKey> = {
    [P in keyof T as Exclude<P, K>]: T[P]
}

export type MediaProps = {
    as?: ElementType | null
    resource?: CMSMediaType | string | null
    className?: string
    imgClassName?: string
    videoClassName?: string
} & MyOmit<ImageProps, 'className' | 'src'>

export type ImageMediaProps = MyOmit<
    MediaProps,
    'as' | 'className' | 'videoClassName'
>
