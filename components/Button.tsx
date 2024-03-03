import cn from '@/utils/cn'
import { CircleNotch } from '@phosphor-icons/react/dist/ssr'
import { type ComponentPropsWithRef } from 'react'
import { type Icon as PhosphorIcon } from '@phosphor-icons/react'

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  color: 'amber-100' | 'amber-200' | 'black' | 'green-900'
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
        `flex font-medium gap-3 h-12 items-center justify-center px-4 rounded-full shrink-0 whitespace-nowrap
        disabled:cursor-not-allowed disabled:opacity-50
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-100`,
        {
          'bg-amber-100 text-green-950': color === 'amber-100',
          'bg-amber-200 text-green-950': color === 'amber-200',
          'bg-black text-white': color === 'black',
          'bg-green-900 text-amber-50': color === 'green-900',
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
