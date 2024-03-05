'use client'

import Image from 'next/image'
import {
  forwardRef,
  useEffect,
  type ComponentPropsWithoutRef,
  type PropsWithChildren,
  useState,
} from 'react'
import { useSwipeable } from 'react-swipeable'
import { useIntersectionObserver } from 'usehooks-ts'
import {
  ArrowLeft,
  ArrowRight,
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
import { createClient } from '@/utils/supabase/client'
import { QueryData } from '@supabase/supabase-js'
import { useKey } from 'react-use'

type NearbyPlot =
  Database['public']['Functions']['nearby_plots']['Returns'][number]

interface PlotDetailsProps {
  index: number
  isExpanded: boolean
  onChangeExpanded: (isExpanded: boolean) => void
  onChangeIntersection: (isIntersecting: boolean) => void
  nearbyPlot: NearbyPlot
  nearbyPlotsCount: number
  scrollToPrevPlot: () => void
  scrollToNextPlot: () => void
}

export default forwardRef<HTMLDivElement, PlotDetailsProps>(
  function PlotDetails(
    {
      index,
      isExpanded,
      onChangeExpanded,
      onChangeIntersection,
      nearbyPlot,
      nearbyPlotsCount,
      scrollToPrevPlot,
      scrollToNextPlot,
    },
    ref,
  ) {
    const supabase = createClient()

    const plotQuery = supabase
      .from('plots')
      .select('*, plots_images(id, image_url)')

    const [plot, setPlot] = useState<
      QueryData<typeof plotQuery>[number] | null
    >(null)

    useEffect(() => {
      const getData = async () => {
        const { data, error } = await plotQuery.eq('id', nearbyPlot.id).single()
        if (error) console.error(error)
        else setPlot(data)
      }
      getData()
    }, [nearbyPlot.id])

    const { isIntersecting, ref: intersectionRef } = useIntersectionObserver({
      threshold: 0.5,
    })

    useEffect(() => {
      onChangeIntersection(isIntersecting)
    }, [isIntersecting])

    const { ref: swipeableRef } = useSwipeable({
      onSwipedDown: () => onChangeExpanded(false),
      onSwipedUp: () => onChangeExpanded(true),
    })

    useKey('Escape', () => onChangeExpanded(false), {}, [isExpanded])

    if (!plot) return null

    return (
      <div
        className={cn(
          'bg-green-950 duration-300 flex flex-col group overflow-hidden relative rounded-[32px] shrink-0 text-amber-50 transition-all w-full',
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
          {plot.plots_images.map(image => (
            <Image
              alt="Plot image"
              className="aspect-square basis-0 h-full object-cover rounded-[20px]"
              height={192}
              key={image.id}
              src={image.image_url}
              width={192}
            />
          ))}
        </div>
        <header className="flex flex-col gap-4 px-4 pb-4">
          <div className="flex gap-4 justify-between">
            <span
              className={cn(
                'font-bold text-xl',
                !plot && 'animate-pulse bg-amber-50/50 rounded w-full',
              )}
            >
              {nearbyPlot.street_name}
            </span>
            <span className="font-bold text-xl">
              {nearbyPlot.area}m<sup>2</sup>
            </span>
          </div>
          <InfoItem className="col-span-2 items-center">
            <Avatar
              name={nearbyPlot.host_first_name}
              size="xs"
              src={nearbyPlot.host_avatar_url}
            />
            <InfoItemText>Hosted by {nearbyPlot.host_first_name}</InfoItemText>
          </InfoItem>
        </header>
        <div className="duration-300 gap-4 grid grid-cols-2 grow auto-rows-min overflow-hidden px-4">
          <InfoItem>
            <InfoItemIcon icon={plot.has_water ? Check : X} />
            <InfoItemText>Water source</InfoItemText>
          </InfoItem>
          <InfoItem>
            <InfoItemIcon icon={plot.has_storage ? Check : X} />
            <InfoItemText>Storage</InfoItemText>
          </InfoItem>
          <InfoItem>
            <InfoItemIcon icon={Money} />
            <InfoItemText>€10/month</InfoItemText>
          </InfoItem>
        </div>
        <footer
          className={cn(
            'duration-300 flex gap-4 justify-center p-4 pt-0 transition-[transform,width] w-full',
            isExpanded && 'w-[calc(100%+64px)]',
            !isExpanded &&
              nearbyPlotsCount < 2 &&
              '-translate-x-[64px] w-[calc(100%+128px)]',
            !isExpanded &&
              nearbyPlotsCount > 1 &&
              'group-first:-translate-x-[64px] group-last:translate-x-[0px] w-[calc(100%+64px)]',
          )}
        >
          <IconButton
            color="green-900"
            icon={isExpanded ? X : ArrowLeft}
            onClick={e => {
              if (isExpanded) {
                onChangeExpanded(false)
                e.currentTarget.blur()
              } else scrollToNextPlot()
            }}
            tabIndex={
              isIntersecting &&
              (isExpanded || (nearbyPlotsCount > 1 && index > 0))
                ? 0
                : -1
            }
          />
          <Button
            className="grow"
            color="amber-100"
            onClick={() => {
              if (!isExpanded) onChangeExpanded(true)
            }}
            tabIndex={isIntersecting ? 0 : -1}
          >
            {isExpanded ? 'Reserve' : 'View details'}
          </Button>
          <IconButton
            color="green-900"
            icon={ArrowRight}
            onClick={scrollToPrevPlot}
            tabIndex={
              isIntersecting && !isExpanded && index < nearbyPlotsCount - 1
                ? 0
                : -1
            }
          />
        </footer>
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
