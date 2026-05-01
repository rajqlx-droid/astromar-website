'use client'
import { useEffect, useRef } from 'react'

const locations = [
  { name: 'Kochi', state: 'Kerala', lat: 9.9312, lng: 76.2673 },
  { name: 'Vizag', state: 'Andhra Pradesh', lat: 17.6868, lng: 83.2185 },
  { name: 'Mumbai (Panvel)', state: 'Maharashtra', lat: 18.9894, lng: 73.1175 },
  { name: 'Mumbai (JNPA)', state: 'Maharashtra', lat: 18.9543, lng: 72.9479 },
  { name: 'Chennai (Sriperumbudur)', state: 'Tamil Nadu', lat: 12.9716, lng: 79.9473 },
  { name: 'Chennai (Vallur)', state: 'Tamil Nadu', lat: 13.2090, lng: 80.2843 },
  { name: 'Delhi (Khurja)', state: 'Uttar Pradesh', lat: 28.2476, lng: 77.8538 },
  { name: 'Bengaluru', state: 'Karnataka', lat: 13.2486, lng: 77.7066 },
  { name: 'Dahej', state: 'Gujarat', lat: 21.7051, lng: 72.5793 },
  { name: 'Mundra', state: 'Gujarat', lat: 22.8386, lng: 69.7295 },
]

export default function FTWZMapInner() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    if (!mapRef.current) return

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove()
      mapInstanceRef.current = null
    }

    if ((mapRef.current as any)._leaflet_id) return

    import('leaflet').then((L) => {
      import('leaflet/dist/leaflet.css')

      if (!mapRef.current || (mapRef.current as any)._leaflet_id) return

      const map = L.map(mapRef.current!, {
        zoomControl: true,
        scrollWheelZoom: false,
      }).setView([20.5937, 78.9629], 5)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map)

      const pinIcon = L.divIcon({
        className: '',
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="32" viewBox="0 0 24 32">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 20 12 20s12-11 12-20C24 5.373 18.627 0 12 0z"
            fill="#f97316" stroke="white" stroke-width="1.5"/>
          <circle cx="12" cy="12" r="5" fill="white"/>
        </svg>`,
        iconSize: [24, 32],
        iconAnchor: [12, 32],
        popupAnchor: [0, -34],
      })

      locations.forEach((loc) => {
        const marker = L.marker([loc.lat, loc.lng], { icon: pinIcon }).addTo(map)
        marker.bindPopup(`
          <div style="font-family: sans-serif; min-width: 150px; padding: 4px;">
            <p style="font-weight: 600; font-size: 13px; margin: 0 0 3px; color: #0a1628;">${loc.name}</p>
            <p style="font-size: 11px; color: #64748b; margin: 0 0 6px;">${loc.state}</p>
            <span style="background: #fff7ed; color: #f97316; font-size: 10px; font-weight: 500;
              padding: 2px 8px; border-radius: 999px; border: 1px solid #fed7aa;">
              FTWZ Warehouse
            </span>
          </div>
        `, { closeButton: false, offset: [0, -5] })

        marker.on('mouseover', function(this: any) { this.openPopup() })
        marker.on('mouseout', function(this: any) { this.closePopup() })
      })

      mapInstanceRef.current = map
    })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200">
      <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center bg-white">
        <div>
          <p className="text-blue-600 text-xs font-semibold tracking-widest uppercase mb-1">
            Our Network
          </p>
          <h3 className="text-gray-900 text-base font-semibold">
            FTWZ Locations Across India
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <svg width="12" height="16" viewBox="0 0 24 32">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 20 12 20s12-11 12-20C24 5.373 18.627 0 12 0z"
              fill="#f97316"/>
          </svg>
          FTWZ Warehouse
        </div>
      </div>
      <div ref={mapRef} style={{ height: '460px', width: '100%' }} />
    </div>
  )
}
