'use client'

import ReactMapGL, { Marker } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useRouter, useSearchParams } from 'next/navigation'

interface MapProps {
  plot: any
  plots: any[]
}

export default function Map({ plot, plots }: MapProps) {
  const searchParams = useSearchParams()
  const router = useRouter()

  return (
    <div className="bottom-0 fixed left-0 right-0 top-0">
      <ReactMapGL
        initialViewState={{
          // The 0.002 shows the marker in the empty space
          latitude: plot.lat - 0.002,
          longitude: plot.lng,
          zoom: 14,
        }}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=OwXJ08l2FRtshdySN3dK"
        style={{ width: '100vw', height: '100svh' }}
      >
        {plots.map(p => (
          <Marker
            className="cursor-pointer"
            color="#166534"
            key={p.id}
            latitude={p.lat}
            longitude={p.lng}
            onClick={() => {
              const url = new URL(window.location.href)
              url.searchParams.set('plot', p.id)
              router.push(url.toString())
            }}
          />
        ))}
      </ReactMapGL>
    </div>
  )
}
