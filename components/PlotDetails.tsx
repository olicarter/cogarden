'use client'

import {
  forwardRef,
  useEffect,
  type ComponentPropsWithoutRef,
  type PropsWithChildren,
} from 'react'
import { useSwipeable } from 'react-swipeable'
import { useIntersectionObserver } from 'usehooks-ts'
import {
  ArrowLeft,
  ArrowRight,
  CalendarBlank,
  Check,
  Money,
  X,
  type Icon as PhosphorIcon,
} from '@phosphor-icons/react'
import cn from '@/utils/cn'
import mergeRefs from '@/utils/mergeRefs'
import Button from '@/components/Button'
import { type Database } from '@/types/supabase'
import Avatar from './Avatar'
import IconButton from './IconButton'

type NearbyPlot =
  Database['public']['Functions']['nearby_plots']['Returns'][number]

interface PlotDetailsProps {
  isExpanded: boolean
  onChangeExpanded: (isExpanded: boolean) => void
  onChangeIntersection: (isIntersecting: boolean) => void
  plot: NearbyPlot
  scrollToPrevPlot: () => void
  scrollToNextPlot: () => void
}

export default forwardRef<HTMLDivElement, PlotDetailsProps>(
  function PlotDetails(
    {
      isExpanded,
      onChangeExpanded,
      onChangeIntersection,
      plot,
      scrollToPrevPlot,
      scrollToNextPlot,
    },
    ref,
  ) {
    const { isIntersecting, ref: intersectionRef } = useIntersectionObserver({
      threshold: 0.5,
    })
    const { ref: swipeableRef } = useSwipeable({
      onSwipedDown: () => onChangeExpanded(false),
      onSwipedUp: () => onChangeExpanded(true),
    })

    useEffect(() => {
      onChangeIntersection(isIntersecting)
    }, [isIntersecting])

    return (
      <div
        className={cn(
          'bg-green-950/90 backdrop-blur-xl duration-300 flex flex-col overflow-hidden rounded-[32px] shrink-0 text-green-50 transition-all w-full',
          isExpanded ? 'h-[calc(100svh-88px)]' : 'h-[292px]',
        )}
        ref={mergeRefs(ref, intersectionRef, swipeableRef)}
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
              isExpanded
                ? 'basis-[calc(100%-64px)]'
                : 'basis-[calc(100%-128px)]',
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
  },
)

function InfoItem({ children, className }: ComponentPropsWithoutRef<'div'>) {
  return <div className={cn('flex gap-2', className)}>{children}</div>
}

function InfoItemIcon({ icon: Icon }: { icon: PhosphorIcon }) {
  return <Icon size={16} weight="bold" />
}

function InfoItemText({ children }: PropsWithChildren) {
  return <span className="leading-4 text-sm">{children}</span>
}
