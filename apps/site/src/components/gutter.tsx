import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'

const gutterVariants = cva('', {
    variants: {
        size: {
            base: 'px-4',
        },
    },
    defaultVariants: {
        size: 'base',
    },
})

export type GutterProps = VariantProps<typeof gutterVariants> &
    React.HTMLAttributes<HTMLDivElement>

export const Gutter = ({ size, className, ...props }: GutterProps) => {
    return (
        <div className={cn(gutterVariants({ size }), className)} {...props} />
    )
}
