'use client'

import { useFormStatus } from 'react-dom'
import Button from '@/components/Button'

export default function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button color="amber-100" loading={pending}>
      {pending ? 'Signing in...' : 'Continue'}
    </Button>
  )
}
