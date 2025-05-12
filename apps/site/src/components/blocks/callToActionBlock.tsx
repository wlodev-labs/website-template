import React from 'react'
import RichText from '../richText'
import { CMSLink } from '../cmsLink'
import type { CallToActionBlock as CTABlockProps } from '@/utils/cms'

export const CallToActionBlock: React.FC<CTABlockProps> = ({
    links,
    richText,
}) => {
    return (
        <div className='container px-4 mx-auto'>
            <div className='bg-card rounded border bg-neutral-100 border-neutral-300 p-4 flex flex-col gap-y-4 gap-x-8 md:flex-row md:justify-between md:items-center'>
                <div className='max-w-[48rem] flex items-center'>
                    {richText && (
                        <RichText
                            className='mb-0'
                            data={richText}
                            enableGutter={false}
                        />
                    )}
                </div>
                <div className='flex flex-col gap-8'>
                    {(links || []).map(({ link }, i) => {
                        return <CMSLink key={i} size='lg' {...link} />
                    })}
                </div>
            </div>
        </div>
    )
}
