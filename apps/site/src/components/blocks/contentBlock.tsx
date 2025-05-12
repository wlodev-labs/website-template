import React from 'react'
import RichText from '../richText'
import { cn } from '@/utils/ui'
import { CMSLink } from '../cmsLink'
import type { ContentBlock as ContentBlockProps } from '@/utils/cms'

export const ContentBlock: React.FC<ContentBlockProps> = props => {
    const { columns } = props
    return (
        <div className='container px-4 mx-auto my-16'>
            <div className='flex gap-8 justify-center'>
                {columns &&
                    columns.length > 0 &&
                    columns.map((col, index) => {
                        return (
                            <div
                                key={index}
                                className={cn('flex-1', {
                                    'max-w-md': columns.length === 1,
                                })}
                            >
                                {col.richText && (
                                    <RichText
                                        data={col.richText}
                                        enableGutter={false}
                                    />
                                )}
                                {col.enableLink && <CMSLink {...col.link} />}
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}
