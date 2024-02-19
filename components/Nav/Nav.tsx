import {
  CaretDown,
  CaretUp,
  HandCoins,
  MagnifyingGlass,
  Plant,
} from '@phosphor-icons/react/dist/ssr'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import Avatar from '@/components/Avatar'
import { NavLink } from './NavItem'
import { SignOutNavButton } from './SignOutNavButton'
import Details from './Details'

export default function Nav() {
  const signOut = async () => {
    'use server'

    const supabase = createClient()
    await supabase.auth.signOut()
    return redirect('/login')
  }

  return (
    <Details>
      <summary className="flex group/summary items-center justify-between p-3 rounded-[32px] ring-0 outline-none">
        <Avatar name="John Doe" />
        <Plant size={32} />
        <button
          className="flex group-focus-visible/summary:ring-2 group-focus-visible/summary:ring-green-100 h-10 hover:bg-green-300/20 items-center justify-center pointer-events-none rounded-full w-10"
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
          <SignOutNavButton />
        </form>
      </div>
    </Details>
  )
}
