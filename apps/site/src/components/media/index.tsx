import React from 'react'
import { ImageMedia } from './imageMedia'
import { VideoMedia } from './videoMedia'
import type { MediaProps } from './types'

export const Media = ({
    className,
    as = 'div',
    videoClassName,
    ...props
}: MediaProps) => {
    const Tag = as || React.Fragment
    const isVideo =
        typeof props.resource === 'object' &&
        props.resource?.mimeType?.includes('video')

    return (
        <Tag
            {...(as !== null
                ? {
                      className,
                  }
                : {})}
        >
            {isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />}
        </Tag>
    )
}
