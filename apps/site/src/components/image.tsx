import type { UnresolvedImageTransform } from 'astro'
import { getImage } from 'astro:assets'
import { cn } from '@/utils/ui'

export type ImageProps = {
    alt?: string
    fill?: boolean
    className?: string
} & Partial<
    Pick<
        React.ImgHTMLAttributes<HTMLImageElement>,
        'loading' | 'decoding' | 'fetchPriority' | 'sizes'
    >
> &
    UnresolvedImageTransform

/**
 * Astro provides an image component with the built-in image optimization, similar to Next.js’s <Image>.
 * Since we can’t use the Astro image component within React, we create a seperate image component,
 * with image optimization handled by getImage from astro:assets
 */
export const Image = async (props: ImageProps) => {
    // https://docs.astro.build/en/reference/modules/astro-assets/#getimage
    const { src, srcSet, attributes } = await getImage(props)
    const { alt, sizes, className, loading, decoding, fetchPriority, fill } =
        props

    return (
        <img
            src={src}
            alt={alt}
            srcSet={srcSet.attribute}
            sizes={sizes ?? '100vw'}
            {...attributes}
            className={cn(
                {
                    'absolute inset-0 w-full h-full object-cover object-center':
                        fill,
                },
                className
            )}
            loading={loading ?? (fetchPriority === 'high' ? 'eager' : 'lazy')}
            decoding={decoding ?? 'async'}
            fetchPriority={fetchPriority}
        />
    )
}
