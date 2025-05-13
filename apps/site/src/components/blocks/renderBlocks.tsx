import React, { Fragment } from 'react'
import { CallToActionBlock } from './callToActionBlock'
import { ContentBlock } from './contentBlock'
import { MediaBlock } from './mediaBlock'
import type { Page } from '@/utils/payload'

const blockComponents = {
    cta: CallToActionBlock,
    content: ContentBlock,
    mediaBlock: MediaBlock,
}

export const RenderBlocks: React.FC<{
    blocks: Page['layout'][0][]
}> = ({ blocks }) => {
    if (blocks && Array.isArray(blocks) && blocks.length > 0) {
        return (
            <Fragment>
                {blocks.map((block, index) => {
                    const { blockType } = block

                    if (blockType && blockType in blockComponents) {
                        const Block = blockComponents[blockType]

                        if (Block) {
                            return (
                                <div className='my-16' key={index}>
                                    {/* @ts-expect-error there may be some mismatch between the expected types here */}
                                    <Block {...block} disableInnerContainer />
                                </div>
                            )
                        }
                    }
                    return null
                })}
            </Fragment>
        )
    }
    return null
}
