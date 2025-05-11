import React from 'react'
import { CMSLink } from '../cmsLink'
import { Media } from '../media'
import RichText from '../richText'
import type { Page } from '@/utils/cms'

export const MediumImpactHero: React.FC<Page['hero']> = ({
    links,
    media,
    richText,
}) => {
    return (
        <div className=''>
            <div className='container px-4 mx-auto mb-8'>
                {richText && (
                    <RichText
                        className='mb-6'
                        data={richText}
                        enableGutter={false}
                    />
                )}

                {Array.isArray(links) && links.length > 0 && (
                    <ul className='flex gap-4'>
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
            <div className='container px-4 mx-auto'>
                {media && typeof media === 'object' && (
                    <div>
                        <Media
                            className='-mx-4 md:-mx-8 2xl:-mx-16'
                            fetchPriority='high'
                            resource={media}
                        />
                        {media?.caption && (
                            <div className='mt-3'>
                                <RichText
                                    data={media.caption}
                                    enableGutter={false}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
