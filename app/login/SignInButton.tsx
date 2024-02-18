'use client'

import { useFormStatus } from 'react-dom'
import Button from '@/components/Button'

export default function SignInButton() {
  const { pending } = useFormStatus()

  return (
    <Button color="green-300" loading={pending}>
      {pending ? 'Signing in...' : 'Sign in'}
    </Button>
  )
}
