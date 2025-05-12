import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@utils/ui'

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        defaultVariants: {
            size: 'default',
            variant: 'default',
        },
        variants: {
            size: {
                clear: '',
                default: 'h-10 px-4 py-2',
                icon: 'h-10 w-10',
                lg: 'h-11 rounded px-8',
                sm: 'h-9 rounded px-3',
            },
            variant: {
                default: 'bg-primary hover:bg-primary/90',
                link: 'text-black items-start justify-start underline-offset-4 hover:underline',
                outline:
                    'text-black border border-neutral-200 hover:bg-neutral-100',
            },
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
    ref?: React.Ref<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = ({
    asChild = false,
    className,
    size,
    variant,
    ref,
    ...props
}) => {
    const Comp = asChild ? Slot : 'button'
    return (
        <Comp
            className={cn(buttonVariants({ className, size, variant }))}
            {...props}
        />
    )
}

export { Button, buttonVariants }
