'use client'

import { List, Plant, X } from '@phosphor-icons/react'
import Avatar from '@/components/Avatar'
import { useState } from 'react'
import cn from '@/utils/cn'

export default function Naev() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={cn(
        'backdrop-blur-xl bg-green-950/90 duration-300 flex flex-col items-stretch justify-between p-3 rounded-[32px] text-green-100 transition-all',
        isExpanded ? 'h-[calc(100vh-16px)]' : 'h-16',
      )}
    >
      <div className="flex items-center justify-between">
        <Avatar fullName="John Doe" />
        <Plant size={32} />
        <button
          className="flex hover:bg-green-900 h-10 items-center justify-center rounded-full w-10"
          onClick={() => setIsExpanded(p => !p)}
        >
          {isExpanded ? <X size={28} /> : <List size={28} />}
        </button>
      </div>
      {isExpanded && (
        <button
          className="bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-100 font-medium h-12 rounded-full text-green-950 w-full"
          onClick={() => setIsExpanded(false)}
        >
          Close
        </button>
      )}
    </div>
  )
}
