import mapboxgl from "mapbox-gl"
import 'mapbox-gl/dist/mapbox-gl.css'
import { useEffect, useRef } from "react"

export function MapBox() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current) {
      return
    }
    
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: '/api/mapbox/styles/v1/qiyuor2/cm8yaxquq002l01r15306f8da',
      center: [139.6917, 35.6895],
      zoom: 10,
    })

    return () => map.remove()
  })

  return (
    <div ref={mapRef}></div>
  )
}