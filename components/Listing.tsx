'use client'

import { useState } from 'react'
import { Drop, Leaf, ClockClockwise, CoinVertical } from '@phosphor-icons/react'
import cn from '@/utils/cn'

export default function Listing() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={cn(
        'bg-green-950/90 backdrop-blur-xl duration-300 flex flex-col gap-4 overflow-hidden py-4 rounded-[32px] transition-all',
        isExpanded && 'grow',
      )}
    >
      <div className="flex gap-4 h-32 overflow-x-auto px-4">
        {[0, 1, 2].map(() => (
          <div className="aspect-square bg-green-900 h-full rounded-[20px]" />
        ))}
      </div>
      <header className="flex justify-between px-4">
        <span className="font-bold text-xl">Pelguranna 37</span>
        <span className="font-bold text-xl">
          6m<sup>2</sup>
        </span>
      </header>
      <div className="gap-4 grid grid-cols-2 grow auto-rows-min px-4">
        <div className="flex gap-2">
          <Drop size={20} weight="fill" />
          <span className="leading-5 text-sm">No water source</span>
        </div>
        <div className="flex gap-2">
          <Leaf size={20} weight="fill" />
          <span className="leading-5 text-sm">Has soil</span>
        </div>
        <div className="col-span-2 flex gap-2">
          <ClockClockwise size={20} weight="fill" />
          <span className="leading-5 text-sm">Available now</span>
        </div>
        <div className="col-span-2 flex gap-2">
          <CoinVertical size={20} weight="fill" />
          <span className="leading-5 text-sm">€10/month + €50 deposit</span>
        </div>
      </div>
      <div className="px-4">
        <button
          className="bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-100 font-medium h-12 rounded-full text-green-950 w-full"
          onClick={() => setIsExpanded(p => !p)}
        >
          {isExpanded ? 'Reserve' : 'View details'}
        </button>
      </div>
    </div>
  )
}
