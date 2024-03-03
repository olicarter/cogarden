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
      className={`bg-green-950 cursor-pointer duration-300 flex flex-col group/details h-16 items-stretch justify-between overflow-hidden relative rounded-[32px] select-none shrink-0 transition-[height]
      open:h-[calc(100svh-16px)]`}
      open={isOpen}
      ref={ref}
    >
      {children}
    </details>
  )
}
