import React from 'react'
import RichText from '../richText'
import type { Page } from '@/utils/cms'

type LowImpactHeroType =
    | {
          children?: React.ReactNode
          richText?: never
      }
    | (Omit<Page['hero'], 'richText'> & {
          children?: never
          richText?: Page['hero']['richText']
      })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({
    children,
    richText,
}) => {
    return (
        <div className='container px-4 mx-auto mt-16'>
            <div className='max-w-[48rem]'>
                {children ||
                    (richText && (
                        <RichText data={richText} enableGutter={false} />
                    ))}
            </div>
        </div>
    )
}
