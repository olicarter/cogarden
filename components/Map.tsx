'use client'

import ReactMapGL, { Marker } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'

export default function Map() {
  return (
    <div className="bottom-0 fixed left-0 right-0 top-0">
      <ReactMapGL
        initialViewState={{
          latitude: 59.445,
          longitude: 24.68701,
          zoom: 14,
        }}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=OwXJ08l2FRtshdySN3dK"
        style={{ width: '100vw', height: '100vh' }}
      >
        <Marker color="#166534" latitude={59.4482} longitude={24.68701} />
      </ReactMapGL>
    </div>
  )
}
