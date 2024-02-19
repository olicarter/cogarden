'use client'

import {
  ComponentPropsWithoutRef,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  CalendarBlank,
  Money,
  type Icon as PhosphorIcon,
  X,
  Check,
  ArrowLeft,
  ArrowRight,
} from '@phosphor-icons/react'
import cn from '@/utils/cn'
import Button from '@/components/Button'
import IconButton from './IconButton'
import { useSwipeable } from 'react-swipeable'
import Avatar from './Avatar'
import { type Database } from '@/types/supabase'
import { useRouter, useSearchParams } from 'next/navigation'
import { useIntersectionObserver } from 'usehooks-ts'

type NearbyPlot =
  Database['public']['Functions']['nearby_plots']['Returns'][number]

export default function Listings({
  nearbyPlots,
}: {
  nearbyPlots: NearbyPlot[]
}) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const listingsRef = useRef<HTMLDivElement>(null)
  const plotId = searchParams.get('plot')

  useEffect(() => {
    if (!plotId) {
      const url = new URL(window.location.href)
      url.searchParams.set('plot', nearbyPlots[0]?.id)
      router.push(url.toString())
    }
  }, [plotId])

  const scrollToNextPlot = () => {
    listingsRef.current?.scrollTo({
      left: listingsRef.current.scrollLeft - window.innerWidth,
      behavior: 'smooth',
    })
  }

  const scrollToPrevPlot = () => {
    listingsRef.current?.scrollTo({
      left: listingsRef.current.scrollLeft + window.innerWidth,
      behavior: 'smooth',
    })
  }

  const [expandedListing, setExpandedListing] = useState<
    NearbyPlot['id'] | null
  >(null)
  const [selectedListing, setSelectedListing] = useState<
    NearbyPlot['id'] | null
  >(null)

  useEffect(() => {
    if (selectedListing) {
      const url = new URL(window.location.href)
      url.searchParams.set('plot', selectedListing)
      router.push(url.toString())
    }
  }, [selectedListing])

  return (
    <div
      className={cn(
        'flex gap-4 w-screen px-2 pb-2 snap-x snap-mandatory *:snap-always *:snap-center',
        expandedListing ? 'overflow-hidden' : 'overflow-x-scroll',
      )}
      ref={listingsRef}
      style={{ scrollbarWidth: 'none' }}
    >
      {nearbyPlots.map(plot => (
        <Listing
          isExpanded={expandedListing === plot.id}
          key={plot.id}
          onChangeExpanded={isExpanded => {
            setExpandedListing(isExpanded ? plot.id : null)
          }}
          onChangeIntersection={isIntersecting => {
            if (isIntersecting) {
              setSelectedListing(plot.id)
            }
          }}
          plot={plot}
          scrollToPrevPlot={scrollToPrevPlot}
          scrollToNextPlot={scrollToNextPlot}
        />
      ))}
    </div>
  )
}

function Listing({
  isExpanded,
  onChangeExpanded,
  onChangeIntersection,
  plot,
  scrollToPrevPlot,
  scrollToNextPlot,
}: {
  isExpanded: boolean
  onChangeExpanded: (isExpanded: boolean) => void
  onChangeIntersection: (isIntersecting: boolean) => void
  plot: NearbyPlot
  scrollToPrevPlot: () => void
  scrollToNextPlot: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { isIntersecting, ref: intersectionRef } = useIntersectionObserver({
    threshold: 1,
  })
  const { ref: swipeableRef } = useSwipeable({
    onSwipedDown: () => onChangeExpanded(false),
    onSwipedUp: () => onChangeExpanded(true),
  })

  // Combine refs
  useEffect(() => {
    if (ref.current) {
      intersectionRef(ref.current)
      swipeableRef(ref.current)
    }
  }, [ref.current])

  useEffect(() => {
    onChangeIntersection(isIntersecting)
  }, [isIntersecting])

  return (
    <div
      className={cn(
        'bg-green-950/90 backdrop-blur-xl duration-300 flex flex-col overflow-hidden rounded-[32px] shrink-0 text-green-50 transition-all w-[calc(100svw-16px)]',
        isExpanded ? 'h-[calc(100svh-88px)]' : 'h-[292px]',
      )}
      ref={ref}
    >
      <div
        className={cn(
          'box-content duration-300 flex gap-4 p-4 shrink-0 transition-[height,margin]',
          isExpanded ? 'h-48 overflow-x-auto' : 'h-28 overflow-x-hidden',
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
        <div className="flex gap-4 justify-between">
          <span
            className={cn(
              'font-bold text-xl',
              !plot && 'animate-pulse bg-green-50/50 rounded w-full',
            )}
          >
            {plot?.street_name}
          </span>
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
      <div className="flex gap-4 justify-start p-4 pt-0">
        <IconButton
          color="green-700"
          icon={isExpanded ? X : ArrowLeft}
          onClick={e => {
            if (isExpanded) {
              onChangeExpanded(false)
              e.currentTarget.blur()
            } else {
              scrollToNextPlot()
            }
          }}
          tabIndex={isExpanded ? 0 : -1}
        />
        <Button
          className={cn(
            'duration-300 grow transition-[flex-basis]',
            isExpanded ? 'basis-[calc(100%-64px)]' : 'basis-[calc(100%-128px)]',
          )}
          color="green-300"
          onClick={() => {
            if (!isExpanded) onChangeExpanded(true)
          }}
        >
          {isExpanded ? 'Reserve' : 'View details'}
        </Button>
        <IconButton
          color="green-700"
          icon={ArrowRight}
          onClick={scrollToPrevPlot}
          tabIndex={-1}
        />
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
