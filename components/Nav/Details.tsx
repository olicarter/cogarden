'use client'

import { type ComponentPropsWithoutRef, useState } from 'react'
import { useSwipeable } from 'react-swipeable'

export default function Nav({ children }: ComponentPropsWithoutRef<'details'>) {
  const [isOpen, setIsOpen] = useState(false)

  const { ref } = useSwipeable({
    onSwipedDown: () => setIsOpen(true),
    onSwipedUp: () => setIsOpen(false),
  })

  return (
    <details
      className="backdrop-blur-xl bg-green-950/90 cursor-pointer duration-300 flex flex-col group/details h-16 items-stretch justify-between open:h-[calc(100svh-16px)] rounded-[32px] select-none shrink-0 text-green-100 transition-[height]"
      open={isOpen}
      ref={ref}
    >
      {children}
    </details>
  )
}
