import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils.js'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-105 transition-all',
  {
    variants: {
      variant: {
        default:
          'bg-brandPrimary-1 text-primary-foreground hover:bg-brandPrimary-50',
        destructive: 'bg-red-500 text-destructive-foreground hover:bg-red-600',
        defaultOrange:
          'bg-orange-500 text-destructive-foreground hover:bg-orange-600',

        //полупрозрачные кнопки
        outline:
          'border border-input bg-[#ffffff4d] hover:bg-accent hover:text-accent-foreground',

        combobox:
          'border border-input bg-white bg-opacity-30 backdrop-blur-md  ',
        //Кнопка Проверить
        outlineViolet: 'hover:bg-violet-400 bg-[#ffffff4d]  hover:text-white',
        //Кнопка Завершить
        outlineDeactivate: 'hover:bg-red-400 bg-[#ffffff4d]  text-white',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-white underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-auto px-1.5 py-1.5 rounded-xl',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
