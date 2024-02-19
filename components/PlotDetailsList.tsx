'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import cn from '@/utils/cn'
import { type Database } from '@/types/supabase'
import PlotDetails from './PlotDetails'

type NearbyPlot =
  Database['public']['Functions']['nearby_plots']['Returns'][number]

export default function PlotDetailsList({
  nearbyPlots,
}: {
  nearbyPlots: NearbyPlot[]
}) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const plotDetailsListRef = useRef<HTMLDivElement>(null)
  const plotDetailsRef = useRef<{ id: string; element: HTMLDivElement }[]>([])
  const plotId = searchParams.get('plot')

  const [expandedListing, setExpandedListing] = useState<
    NearbyPlot['id'] | null
  >(null)
  const [selectedListing, setSelectedListing] = useState<
    NearbyPlot['id'] | null
  >(null)

  useEffect(() => {
    if (!plotId) {
      const url = new URL(window.location.href)
      url.searchParams.set('plot', nearbyPlots[0]?.id)
      router.push(url.toString())
    } else if (plotId !== selectedListing) {
      setSelectedListing(plotId)
      const el = plotDetailsRef.current.find(p => p.id === plotId)?.element
      if (el) {
        plotDetailsListRef.current?.scrollTo({
          left: el.offsetLeft,
          behavior: 'smooth',
        })
      }
    }
  }, [plotId])

  const scrollToNextPlot = () => {
    plotDetailsListRef.current?.scrollTo({
      left: plotDetailsListRef.current.scrollLeft - window.innerWidth,
      behavior: 'smooth',
    })
  }

  const scrollToPrevPlot = () => {
    plotDetailsListRef.current?.scrollTo({
      left: plotDetailsListRef.current.scrollLeft + window.innerWidth,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    if (selectedListing && selectedListing !== plotId) {
      const url = new URL(window.location.href)
      url.searchParams.set('plot', selectedListing)
      router.push(url.toString())
    }
  }, [selectedListing])

  return (
    <div
      className={cn(
        'flex gap-4 w-full px-2 pb-2 snap-x snap-mandatory *:snap-always *:snap-center',
        expandedListing ? 'overflow-hidden' : 'overflow-x-scroll',
      )}
      ref={plotDetailsListRef}
      style={{ scrollbarWidth: 'none' }}
    >
      {nearbyPlots.map(plot => (
        <PlotDetails
          isExpanded={expandedListing === plot.id}
          key={plot.id}
          onChangeExpanded={isExpanded => {
            setExpandedListing(isExpanded ? plot.id : null)
          }}
          onChangeIntersection={isIntersecting => {
            if (isIntersecting) setSelectedListing(plot.id)
          }}
          plot={plot}
          ref={element => {
            if (
              element &&
              !plotDetailsRef.current.some(p => p.id === plot.id)
            ) {
              plotDetailsRef.current.push({ id: plot.id, element })
            }
          }}
          scrollToPrevPlot={scrollToPrevPlot}
          scrollToNextPlot={scrollToNextPlot}
        />
      ))}
    </div>
  )
}
