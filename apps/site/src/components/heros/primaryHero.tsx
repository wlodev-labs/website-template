'use client'
import React from 'react'
import { CMSLink } from '../cmsLink'
import { Media } from '../media'
import RichText from '../richText'
import type { Page } from '@/utils/cms'

export const PrimaryHero: React.FC<Page['hero']> = ({
    links,
    media,
    richText,
}) => {
    return (
        <div
            className='relative -mt-[10.4rem] flex items-center justify-center text-white'
            data-theme='dark'
        >
            <div className='container px-4 mx-auto mb-8 z-10 relative flex items-center justify-center'>
                <div className='max-w-[36.5rem] md:text-center'>
                    {richText && (
                        <RichText
                            className='mb-6'
                            data={richText}
                            enableGutter={false}
                        />
                    )}
                    {Array.isArray(links) && links.length > 0 && (
                        <ul className='flex md:justify-center gap-4'>
                            {links.map(({ link }, i) => {
                                return (
                                    <li key={i}>
                                        <CMSLink {...link} />
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </div>
            </div>
            <div className='min-h-[80vh] select-none'>
                {media && typeof media === 'object' && (
                    <Media
                        fill
                        imgClassName='-z-10 object-cover'
                        fetchPriority='high'
                        resource={media}
                    />
                )}
            </div>
        </div>
    )
}
