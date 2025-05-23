import React from 'react'
import { cn } from '@/utils/ui'
import RichText from '../richText'
import { Media } from '../media'
import type { MediaBlock as MediaBlockProps } from '@/utils/payload'

type Props = MediaBlockProps & {
    breakout?: boolean
    captionClassName?: string
    className?: string
    enableGutter?: boolean
    imgClassName?: string
    disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = props => {
    const {
        captionClassName,
        className,
        enableGutter = true,
        imgClassName,
        media,
        disableInnerContainer,
    } = props

    let caption
    if (media && typeof media === 'object') caption = media.caption

    return (
        <div
            className={cn(
                '',
                {
                    'container mx-auto px-4': enableGutter,
                },
                className
            )}
        >
            {media && (
                <Media
                    imgClassName={cn('rounded-lg', imgClassName)}
                    resource={media}
                />
            )}
            {caption && (
                <div
                    className={cn(
                        'mt-6',
                        {
                            'container px-4 mx-auto': !disableInnerContainer,
                        },
                        captionClassName
                    )}
                >
                    <RichText data={caption} enableGutter={false} />
                </div>
            )}
        </div>
    )
}
