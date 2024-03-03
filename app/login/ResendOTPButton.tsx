'use client'

import { useFormStatus } from 'react-dom'
import { useInterval } from 'react-use'
import Button from '@/components/Button'
import { useState } from 'react'

export default function ResendOTPButton() {
  const { pending } = useFormStatus()

  const [countdown, setCountdown] = useState(60)

  useInterval(() => {
    if (countdown > 0) setCountdown(countdown - 1)
  }, 1000)

  return (
    <Button
      color="amber-100"
      disabled={countdown > 0}
      loading={pending}
      onSubmit={() => {
        setCountdown(60)
      }}
    >
      {pending ? 'Sending' : 'Send'} new code
      {countdown > 0 && ` (${countdown}s)`}
    </Button>
  )
}
