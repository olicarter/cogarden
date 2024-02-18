import cn from '@/utils/cn'
import { CircleNotch } from '@phosphor-icons/react/dist/ssr'
import { type ComponentPropsWithRef } from 'react'
import { type Icon as PhosphorIcon } from '@phosphor-icons/react'

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  color: 'black' | 'green-300' | 'green-700'
  icon?: PhosphorIcon
  loading?: boolean
}

export default function Button({
  className,
  color,
  disabled,
  icon: Icon,
  loading = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'flex focus:outline-none focus:ring-2 focus:ring-green-100 font-medium gap-3 h-12 items-center justify-center px-4 rounded-full shrink-0 whitespace-nowrap',
        {
          'bg-green-300 text-green-950': color === 'green-300',
          'bg-green-700 text-green-50': color === 'green-700',
          'bg-black text-white': color === 'black',
        },
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <CircleNotch className="animate-spin" size={24} />
      ) : (
        Icon && <Icon size={24} />
      )}
      {props.children}
    </button>
  )
}
