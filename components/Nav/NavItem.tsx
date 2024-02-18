import Link from 'next/link'
import { CircleNotch } from '@phosphor-icons/react/dist/ssr'
import { type ComponentPropsWithoutRef } from 'react'
import { type Icon as PhosphorIcon } from '@phosphor-icons/react'
import cn from '@/utils/cn'

const navItemClasses =
  'flex gap-3 hover:bg-green-300/20 items-center p-4 w-full'

interface NavLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  icon: PhosphorIcon
}

export function NavLink({
  children,
  className,
  icon: Icon,
  ...props
}: NavLinkProps) {
  return (
    <Link className={cn(navItemClasses, className)} {...props}>
      <Icon size={20} />
      {children}
    </Link>
  )
}

interface NavButtonProps extends ComponentPropsWithoutRef<'button'> {
  icon: PhosphorIcon
  loading?: boolean
}

export function NavButton({
  children,
  className,
  disabled,
  icon: Icon,
  loading = false,
  ...props
}: NavButtonProps) {
  return (
    <button
      className={cn(navItemClasses, className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <CircleNotch className="animate-spin" size={20} />
      ) : (
        <Icon size={20} />
      )}
      {children}
    </button>
  )
}
