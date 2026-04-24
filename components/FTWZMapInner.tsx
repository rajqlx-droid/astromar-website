"use client"
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon issue with bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const activeIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [30, 46],
  iconAnchor: [15, 46],
  popupAnchor: [0, -46],
  shadowSize: [41, 41],
  className: "active-marker",
});

const defaultIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface Location {
  city: string;
  state: string;
  type: string;
  phone: string;
  lat: number;
  lng: number;
  address: string;
}

interface FTWZMapProps {
  locations: Location[];
  activeCity: string | null;
  onMarkerClick: (city: string) => void;
}

function FlyToActive({ locations, activeCity }: { locations: Location[]; activeCity: string | null }) {
  const map = useMap();
  useEffect(() => {
    if (activeCity) {
      const loc = locations.find((l) => l.city === activeCity);
      if (loc) {
        map.flyTo([loc.lat, loc.lng], 8, { duration: 0.8 });
      }
    }
  }, [activeCity, locations, map]);
  return null;
}

const FTWZMapInner = ({ locations, activeCity, onMarkerClick }: FTWZMapProps) => {
  return (
    <div className="w-full">
    <MapContainer
      center={[22.5, 82.0]}
      zoom={5}
      scrollWheelZoom={false}
      style={{ height: "420px", width: "100%" }}
      className="z-0"
      maxBounds={[[6.0, 68.0], [37.5, 97.5]]}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
      />
      <FlyToActive locations={locations} activeCity={activeCity} />
      {locations.map((loc) => (
        <Marker
          key={loc.city}
          position={[loc.lat, loc.lng]}
          icon={activeCity === loc.city ? activeIcon : defaultIcon}
          eventHandlers={{ click: () => onMarkerClick(loc.city) }}
        >
          <Popup>
            <div className="text-sm font-sans max-w-[250px]">
              <p className="font-bold text-base mb-1">{loc.city}</p>
              <p className="text-gray-600">{loc.state}</p>
              <p className="text-gray-600">{loc.type}</p>
              <p className="text-gray-500 text-xs mt-1 leading-relaxed">{loc.address}</p>
              <p className="mt-1">
                <a href={`tel:${loc.phone.replace(/\s/g, "")}`} className="text-blue-600 hover:underline">
                  {loc.phone}
                </a>
              </p>
              <p className="mt-1.5">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(loc.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-semibold text-xs"
                >
                  📍 Get Directions
                </a>
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
    <p className="text-xs text-muted-foreground mt-2 text-center px-4">
      * Map is for representational purposes only. India&apos;s external boundaries are as per the Government of India. Jammu &amp; Kashmir and Ladakh are integral parts of India.
    </p>
    </div>
  );
};

export default FTWZMapInner;
