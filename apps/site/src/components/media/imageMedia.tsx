import { cn } from '@/utils/ui'
import type { ImageMediaProps } from './types'
import { Image } from '../image'

export const ImageMedia = async ({
    resource,
    imgClassName,
    alt,
    width,
    height,
    ...props
}: ImageMediaProps) => {
    if (!resource || typeof resource === 'string') {
        console.warn(
            'ImageMedia: resource is not a valid image object. Please provide a valid image object.'
        )
        return null
    }

    return (
        <Image
            {...props}
            src={resource.url}
            alt={alt ?? resource.alt}
            width={width ?? resource.width}
            height={height ?? resource.height}
            className={cn(imgClassName)}
        />
    )
}
