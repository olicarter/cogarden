import {
  CaretDown,
  CaretUp,
  HandCoins,
  MagnifyingGlass,
  Plant,
  SignOut,
} from '@phosphor-icons/react/dist/ssr'
import Avatar from '@/components/Avatar'
import Link from 'next/link'
import { type ComponentPropsWithoutRef } from 'react'
import { type Icon as PhosphorIcon } from '@phosphor-icons/react'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import cn from '@/utils/cn'

export default function Nav() {
  const signOut = async () => {
    'use server'

    const supabase = createClient()
    await supabase.auth.signOut()
    return redirect('/login')
  }

  return (
    <details className="backdrop-blur-xl bg-green-950/90 cursor-pointer duration-300 flex flex-col group/details h-16 items-stretch justify-between open:h-[calc(100vh-16px)] rounded-[32px] select-none text-green-100 transition-[height]">
      <summary className="flex group/summary items-center justify-between p-3 rounded-[32px] ring-0 outline-none">
        <Avatar fullName="John Doe" />
        <Plant size={32} />
        <button
          className="flex group-focus/summary:ring-2 group-focus/summary:ring-green-100 group-hover/summary:bg-green-300/20 h-10 items-center justify-center pointer-events-none rounded-full w-10"
          tabIndex={-1}
        >
          <CaretUp className="group-open/details:block hidden" size={28} />
          <CaretDown className="group-open/details:hidden block" size={28} />
        </button>
      </summary>

      <div className="grow">
        <NavLink href="/" icon={MagnifyingGlass}>
          Find a space
        </NavLink>
        <NavLink href="/gardens/new" icon={HandCoins}>
          Rent your garden
        </NavLink>
        <form action={signOut}>
          <NavButton icon={SignOut}>Sign out</NavButton>
        </form>
      </div>
    </details>
  )
}

const navItemClasses = 'flex gap-3 hover:bg-green-300/20 p-4 w-full'

interface NavLinkProps extends ComponentPropsWithoutRef<typeof Link> {
  icon: PhosphorIcon
}

function NavLink({ children, className, icon: Icon, ...props }: NavLinkProps) {
  return (
    <Link className={cn(navItemClasses, className)} {...props}>
      <Icon size={20} />
      {children}
    </Link>
  )
}

interface NavButtonProps extends ComponentPropsWithoutRef<'button'> {
  icon: PhosphorIcon
}

function NavButton({
  children,
  className,
  icon: Icon,
  ...props
}: NavButtonProps) {
  return (
    <button className={cn(navItemClasses, className)} {...props}>
      <Icon size={20} />
      {children}
    </button>
  )
}
