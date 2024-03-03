'use client'

import ReactMapGL, { Marker } from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useEffect, useState } from 'react'

export default function Map() {
  const [viewState, setViewState] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 0,
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setViewState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 16,
      })
    })
  }, [])

  return (
    <>
      <input type="hidden" name="latitude" value={viewState.latitude} />
      <input type="hidden" name="longitude" value={viewState.longitude} />
      <ReactMapGL
        {...viewState}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=OwXJ08l2FRtshdySN3dK"
        onMove={evt => setViewState(evt.viewState)}
        // ref={mapRef}
        style={{ borderRadius: '16px', height: '100%', width: '100%' }}
      >
        <Marker
          className="cursor-pointer"
          color="#166534"
          latitude={viewState.latitude}
          longitude={viewState.longitude}
        />
      </ReactMapGL>
    </>
  )
}
