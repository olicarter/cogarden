'use client'

import cn from '@/utils/cn'
import { CircleNotch } from '@phosphor-icons/react'
import { useFormStatus } from 'react-dom'

export default function LoadingOverlay() {
  const { pending } = useFormStatus()

  return (
    <div
      className={cn(
        'backdrop-blur-3xl bottom-0 duration-300 fixed flex items-center justify-center left-0 opacity-0 pointer-events-none right-0 top-0 transition-opacity z-10',
        pending && 'opacity-100',
      )}
    >
      <CircleNotch className="animate-spin" size={64} />
    </div>
  )
}
