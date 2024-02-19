'use client'

import ReactMapGL, { MapRef, Marker } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useRouter, useSearchParams } from 'next/navigation'
import { type Database } from '@/types/supabase'
import { useCallback, useEffect, useRef, useState } from 'react'

type NearbyPlots = Database['public']['Functions']['nearby_plots']['Returns']

export default function Map({ nearbyPlots }: { nearbyPlots: NearbyPlots }) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const mapRef = useRef<MapRef>(null)

  const plotId = searchParams.get('plot')
  const nearestPlot = nearbyPlots[0]
  const plot = nearbyPlots.find(p => p.id === plotId) ?? nearestPlot

  const [viewState, setViewState] = useState({
    // The 0.002 shows the marker in the empty space
    latitude: plot.lat - 0.002,
    longitude: plot.lng,
    zoom: 14,
  })

  const onSelectPlot = useCallback(
    ({ lng, lat }: { lng: number; lat: number }) => {
      mapRef.current?.flyTo({ center: [lng, lat], duration: 1000 })
    },
    [],
  )

  useEffect(() => {
    if (plot) {
      onSelectPlot({ lng: plot.lng, lat: plot.lat - 0.002 })
    }
  }, [plotId])

  return (
    <div className="bottom-0 fixed left-0 right-0 top-0">
      <ReactMapGL
        {...viewState}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=OwXJ08l2FRtshdySN3dK"
        onMove={evt => setViewState(evt.viewState)}
        ref={mapRef}
        style={{ width: '100vw', height: '100svh' }}
      >
        {nearbyPlots.map(plot => (
          <Marker
            className="cursor-pointer"
            color="#166534"
            key={plot.id}
            latitude={plot.lat}
            longitude={plot.lng}
            onClick={() => {
              const url = new URL(window.location.href)
              url.searchParams.set('plot', plot.id)
              router.push(url.toString())
            }}
          />
        ))}
      </ReactMapGL>
    </div>
  )
}
