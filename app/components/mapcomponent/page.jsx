'use client';

import dynamic from 'next/dynamic';
import { FiNavigation, FiMapPin } from 'react-icons/fi';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

// Dynamically import Leaflet components with NO SSR
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const Circle = dynamic(() => import('react-leaflet').then(mod => mod.Circle), { ssr: false });

// Standard coordinates for Katwanyaa/Kambusu area
const schoolLocation = [-1.3068, 37.3512]; 

const nearbyLandmarks = [
  { position: [-1.3050, 37.3530], name: 'Kambusu Market', type: 'commercial' },
  { position: [-1.3080, 37.3490], name: 'Tala Road Junction', type: 'transport' },
];

function LegendItem({ color, border, label }) {
  return (
    <div className="flex items-center gap-1">
      <span className={`w-2 h-2 rounded-full ${border ? 'border border-orange-600' : color}`}></span>
      <span className="text-[9px] sm:text-xs text-gray-600">{label}</span>
    </div>
  );
}

export default function MapComponent() {
  const [isClient, setIsClient] = useState(false);
  const [L, setL] = useState(null);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      import('leaflet').then(leaflet => {
        delete leaflet.Icon.Default.prototype._getIconUrl;
        leaflet.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });
        setL(leaflet);
      });
    }
  }, []);

  if (!isClient || !L) {
    return (
      <div className="h-[250px] sm:h-[400px] w-full rounded-xl bg-gray-100 animate-pulse flex items-center justify-center">
        <p className="text-xs text-gray-400 font-medium">Initializing Map...</p>
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Container with fixed mobile height to ensure visibility */}
      <div className="h-[280px] sm:h-[350px] md:h-[450px] w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative z-0">
        
        {/* COMPACT TOP LEGEND FOR MOBILE */}
        <div className="absolute top-2 left-2 right-2 z-[400] flex justify-center">
          <div className="bg-white/90 backdrop-blur-md px-2 py-1.5 rounded-lg shadow-sm border border-gray-100 flex flex-wrap gap-x-3 gap-y-1 justify-center max-w-full">
            <LegendItem color="bg-orange-600" label="School" />
            <LegendItem color="bg-blue-500" label="Landmarks" />
            <div className="hidden xs:flex items-center gap-1">
               <div className="w-2 h-2 border border-orange-500 rounded-full bg-orange-50"></div>
               <span className="text-[9px] text-gray-500">Radius</span>
            </div>
          </div>
        </div>

        <MapContainer
          center={schoolLocation}
          zoom={15}
          scrollWheelZoom={false}
          className="h-full w-full"
          zoomControl={false} // Disable default zoom to save mobile space
        >
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* School Marker */}
          <Marker position={schoolLocation}>
            <Popup className="custom-popup">
              <div className="p-1 max-w-[180px]">
                <h3 className="font-bold text-gray-900 text-xs sm:text-sm">
                  Matungulu Girls High School
                </h3>
                <p className="text-[10px] text-gray-500 mt-1 mb-2">
                  Tala-Kambusu Road, Machakos
                </p>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=-1.3068,37.3512"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 w-full py-1.5 bg-orange-600 text-white text-[10px] font-bold rounded-md hover:bg-orange-700 transition-colors"
                >
                  <FiNavigation size={10} />
                  OPEN IN GOOGLE MAPS
                </a>
              </div>
            </Popup>
          </Marker>

          <Circle
            center={schoolLocation}
            radius={300}
            pathOptions={{ color: '#ea580c', fillOpacity: 0.05, weight: 1, dashArray: '4,4' }}
          />
        </MapContainer>

        {/* COMPACT BOTTOM STATUS */}
        <div className="absolute bottom-2 left-2 z-[400]">
          <div className="bg-slate-900/80 backdrop-blur-md text-white px-2 py-1 rounded-md flex items-center gap-2 shadow-lg">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-[9px] font-bold tracking-wider uppercase">Matungulu, Machakos</span>
          </div>
        </div>
      </div>
      
      {/* Mobile-only hint */}
      <p className="mt-2 text-center text-[10px] text-gray-400 lg:hidden italic">
        Tip: Tap the marker to get directions
      </p>
    </div>
  );
}