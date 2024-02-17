import cn from '@/utils/cn'
import { type ComponentPropsWithRef } from 'react'

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  color: 'green-300' | 'green-700'
}

export default function Button({ className, color, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'focus:outline-none focus:ring-2 focus:ring-green-100 font-medium h-12 rounded-full shrink-0',
        {
          'bg-green-300 hover:bg-green-200 text-green-950':
            color === 'green-300',
          'bg-green-700 text-green-50': color === 'green-700',
        },
        className,
      )}
      {...props}
    />
  )
}
