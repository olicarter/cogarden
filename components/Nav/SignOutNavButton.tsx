'use client'

import { SignOut } from '@phosphor-icons/react'
import { NavButton } from './NavItem'
import { useFormStatus } from 'react-dom'

export function SignOutNavButton() {
  const { pending } = useFormStatus()

  return (
    <NavButton icon={SignOut} loading={pending}>
      {pending ? 'Signing out...' : 'Sign out'}
    </NavButton>
  )
}
