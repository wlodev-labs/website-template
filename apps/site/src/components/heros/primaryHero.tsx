'use client'
import React from 'react'
import { CMSLink } from '../cmsLink'
import { Media } from '../media'
import RichText from '../richText'
import type { Page } from '@/utils/cms'
import { cn } from '@/utils/ui'

export const PrimaryHero: React.FC<Page['hero']> = ({
    links,
    media,
    richText,
}) => {
    return (
        <div className='relative text-white lg:rounded-lg lg:container lg:mx-auto lg:overflow-hidden'>
            <div className='z-10 py-24 px-4 lg:py-40 bg-black/50 relative flex items-center justify-center'>
                <div className='max-w-lg text-center'>
                    {richText && (
                        <RichText data={richText} enableGutter={false} />
                    )}
                    {Array.isArray(links) && links.length > 0 && (
                        <ul className='flex justify-center gap-4 mt-6'>
                            {links.map(({ link }, i) => {
                                return (
                                    <li key={i}>
                                        <CMSLink
                                            {...link}
                                            className={cn({
                                                'text-white hover:text-black':
                                                    link.appearance ===
                                                    'outline',
                                            })}
                                        />
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </div>
            </div>
            <div className='select-none'>
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
