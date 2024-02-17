'use client'

import { useState } from 'react'
import {
  ClockClockwise,
  CoinVertical,
  Drop,
  Leaf,
  MapPin,
  type Icon,
  ArrowLeft,
} from '@phosphor-icons/react'
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
      <div
        className={cn(
          'duration-300 flex gap-4 overflow-x-auto px-4 transition-[height]',
          isExpanded ? 'h-48' : 'h-32',
        )}
      >
        {[0, 1, 2].map(index => (
          <div
            className="aspect-square bg-green-900 h-full rounded-[20px]"
            key={index}
          />
        ))}
      </div>
      <header className="flex justify-between px-4">
        <span className="font-bold text-xl">Raised bed</span>
        <span className="font-bold text-xl">
          6m<sup>2</sup>
        </span>
      </header>
      <div className="gap-4 grid grid-cols-2 grow auto-rows-min px-4">
        <InfoItem icon={MapPin} text="Pelguranna 37" />
        <InfoItem icon={ClockClockwise} text="Available now" />
        <InfoItem icon={Drop} text="No water source" />
        <InfoItem icon={Leaf} text="Has soil" />
        <InfoItem
          className="col-span-2"
          icon={CoinVertical}
          text="€10/month + €50 deposit"
        />
      </div>
      <div className="flex gap-4 px-4">
        {isExpanded && (
          <button
            className="bg-green-700 flex focus:outline-none focus:ring-2 focus:ring-green-100 h-12 items-center justify-center rounded-full shrink-0 text-green-50 w-12"
            onClick={() => setIsExpanded(false)}
          >
            <ArrowLeft size={28} />
          </button>
        )}
        <button
          className="bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-100 font-medium grow h-12 rounded-full shrink-0 text-green-950"
          onClick={() => {
            if (!isExpanded) setIsExpanded(true)
          }}
        >
          {isExpanded ? 'Reserve' : 'View details'}
        </button>
      </div>
    </div>
  )
}

function InfoItem(props: { className?: string; icon: Icon; text: string }) {
  return (
    <div className={cn('flex gap-2', props.className)}>
      <props.icon size={20} weight="fill" />
      <span className="leading-5 text-sm">{props.text}</span>
    </div>
  )
}
