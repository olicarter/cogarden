import cn from '@/utils/cn'
import { type ComponentPropsWithRef } from 'react'
import { type Icon as PhosphorIcon } from '@phosphor-icons/react'

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  color: 'black' | 'green-300' | 'green-700'
  icon?: PhosphorIcon
}

export default function Button({
  className,
  color,
  icon: Icon,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'flex focus:outline-none focus:ring-2 focus:ring-green-100 font-medium gap-3 h-12 items-center justify-center px-4 rounded-full shrink-0',
        {
          'bg-green-300 hover:bg-green-200 text-green-950':
            color === 'green-300',
          'bg-green-700 text-green-50': color === 'green-700',
          'bg-black hover:bg-neutral-900 text-white': color === 'black',
        },
        className,
      )}
      {...props}
    >
      {Icon && <Icon size={24} />}
      {props.children}
    </button>
  )
}
