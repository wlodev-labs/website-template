import { MediaBlock } from './blocks/mediaBlock'
import type {
    DefaultNodeTypes,
    SerializedBlockNode,
    SerializedLinkNode,
    DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
    type JSXConvertersFunction,
    LinkJSXConverter,
    RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'

import type {
    CallToActionBlock as CTABlockProps,
    MediaBlock as MediaBlockProps,
} from '@/utils/payload'
import { CallToActionBlock } from './blocks/callToActionBlock'
import { cn } from '@/utils/ui'

type NodeTypes =
    | DefaultNodeTypes
    | SerializedBlockNode<CTABlockProps | MediaBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
    const { value, relationTo } = linkNode.fields.doc!
    if (typeof value !== 'object') {
        throw new Error('Expected value to be an object')
    }
    const slug = value.slug
    return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
    defaultConverters,
}) => ({
    ...defaultConverters,
    ...LinkJSXConverter({ internalDocToHref }),
    blocks: {
        mediaBlock: ({ node }) => (
            <MediaBlock
                className='col-start-1 col-span-3'
                imgClassName='m-0'
                {...node.fields}
                captionClassName='mx-auto max-w-[48rem]'
                enableGutter={false}
                disableInnerContainer={true}
            />
        ),
        cta: ({ node }) => <CallToActionBlock {...node.fields} />,
    },
})

type Props = {
    data: DefaultTypedEditorState
    enableGutter?: boolean
    enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
    const {
        className,
        enableProse = true,
        enableGutter = true,
        ...rest
    } = props
    return (
        <ConvertRichText
            converters={jsxConverters}
            className={cn(
                'payload-richtext',
                {
                    container: enableGutter,
                    'max-w-none': !enableGutter,
                    'mx-auto': enableProse,
                },
                className
            )}
            {...rest}
        />
    )
}
