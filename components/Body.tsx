'use client'

import cn from '@/utils/cn'
import { usePathname } from 'next/navigation'
import { type ComponentPropsWithoutRef } from 'react'

export default function Body(props: ComponentPropsWithoutRef<'body'>) {
  const pathname = usePathname()

  return (
    <body
      className={cn('h-svh', pathname ? 'bg-green-950' : 'bg-[#EFEEDF]')}
      {...props}
    />
  )
}
