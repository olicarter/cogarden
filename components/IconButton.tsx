import cn from '@/utils/cn'
import { type Icon as PhosphorIcon } from '@phosphor-icons/react'
import { type ComponentPropsWithRef } from 'react'

interface IconButtonProps
  extends Omit<ComponentPropsWithRef<'button'>, 'children'> {
  color: 'green-300' | 'green-700'
  icon: PhosphorIcon
}

export default function IconButton({
  className,
  color,
  icon: Icon,
  ...props
}: IconButtonProps) {
  return (
    <button
      className={cn(
        'flex focus:outline-none focus:ring-2 focus:ring-green-100 h-12 items-center justify-center rounded-full shrink-0 w-12',
        {
          'bg-green-300 hover:bg-green-200 text-green-950':
            color === 'green-300',
          'bg-green-700 hover:bg-green-600 text-green-50':
            color === 'green-700',
        },
        className,
      )}
      {...props}
    >
      <Icon size={28} />
    </button>
  )
}
