import cn from '@/utils/cn'
import { type Icon as PhosphorIcon } from '@phosphor-icons/react'
import { type ComponentPropsWithRef } from 'react'

interface IconButtonProps
  extends Omit<ComponentPropsWithRef<'button'>, 'children'> {
  color: 'green-900'
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
        `flex h-12 items-center justify-center rounded-full shrink-0 w-12
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-100`,
        {
          'bg-green-900 text-amber-50': color === 'green-900',
        },
        className,
      )}
      {...props}
    >
      <Icon size={24} />
    </button>
  )
}
