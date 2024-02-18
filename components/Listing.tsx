'use client'

import { ComponentPropsWithoutRef, PropsWithChildren, useState } from 'react'
import {
  CalendarBlank,
  Money,
  type Icon as PhosphorIcon,
  X,
  Check,
} from '@phosphor-icons/react'
import cn from '@/utils/cn'
import Button from '@/components/Button'
import IconButton from './IconButton'
import { useSwipeable } from 'react-swipeable'
import Avatar from './Avatar'

export default function Listing() {
  const [isExpanded, setIsExpanded] = useState(false)
  const { ref } = useSwipeable({
    onSwipedDown: () => setIsExpanded(false),
    onSwipedUp: () => setIsExpanded(true),
  })

  return (
    <div
      className={cn(
        'bg-green-950/90 backdrop-blur-xl duration-300 flex flex-col overflow-hidden rounded-[32px] shrink-0 text-green-50 transition-all',
        isExpanded ? 'h-[calc(100svh-88px)]' : 'h-[292px]',
      )}
      ref={ref}
    >
      <div
        className={cn(
          'box-content duration-300 flex gap-4 overflow-x-auto p-4 shrink-0 transition-[height,margin]',
          isExpanded ? 'h-48' : 'h-28',
        )}
        style={{ scrollbarWidth: 'none' }}
      >
        {[0, 1, 2].map(index => (
          <div
            className="aspect-square bg-green-900 h-full rounded-[20px]"
            key={index}
          />
        ))}
      </div>
      <header className="flex flex-col gap-4 px-4 pb-4">
        <div className="flex justify-between">
          <span className="font-bold text-xl">Pelguranna</span>
          <span className="font-bold text-xl">
            6m<sup>2</sup>
          </span>
        </div>
        <InfoItem className="col-span-2 items-center">
          <Avatar fullName="Artjom" size="xs" />
          <InfoItemText>Rented by Artjom</InfoItemText>
        </InfoItem>
      </header>
      <div className="duration-300 gap-4 grid grid-cols-2 grow auto-rows-min overflow-hidden px-4">
        <InfoItem>
          <InfoItemIcon icon={X} />
          <InfoItemText>Shared with others</InfoItemText>
        </InfoItem>
        <InfoItem>
          <InfoItemIcon icon={X} />
          <InfoItemText>Water source</InfoItemText>
        </InfoItem>
        <InfoItem>
          <InfoItemIcon icon={Check} />
          <InfoItemText>Soil</InfoItemText>
        </InfoItem>
        <InfoItem>
          <InfoItemIcon icon={Check} />
          <InfoItemText>Storage</InfoItemText>
        </InfoItem>
        <InfoItem>
          <InfoItemIcon icon={Money} />
          <InfoItemText>€10/month</InfoItemText>
        </InfoItem>
        <InfoItem>
          <InfoItemIcon icon={CalendarBlank} />
          <InfoItemText>Available now</InfoItemText>
        </InfoItem>
      </div>
      <div className="flex gap-4 justify-end p-4 pt-0">
        <IconButton
          color="green-700"
          icon={X}
          onClick={e => {
            setIsExpanded(false)
            e.currentTarget.blur()
          }}
          tabIndex={isExpanded ? 0 : -1}
        />
        <Button
          className={cn(
            'duration-300 transition-[width]',
            isExpanded ? 'w-[calc(100%-64px)]' : 'w-full',
          )}
          color="green-300"
          onClick={() => {
            if (!isExpanded) setIsExpanded(true)
          }}
        >
          {isExpanded ? 'Reserve' : 'View details'}
        </Button>
      </div>
    </div>
  )
}

interface InfoItemProps extends ComponentPropsWithoutRef<'div'> {}

function InfoItem({ children, className }: InfoItemProps) {
  return <div className={cn('flex gap-2', className)}>{children}</div>
}

function InfoItemIcon({ icon: Icon }: { icon: PhosphorIcon }) {
  return <Icon size={16} weight="bold" />
}

function InfoItemText({ children }: PropsWithChildren) {
  return <span className="leading-4 text-sm">{children}</span>
}
