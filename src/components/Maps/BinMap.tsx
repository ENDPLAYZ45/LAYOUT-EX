import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import { Bin } from '../../types';
import { MapPin, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface BinMapProps {
  bins: Bin[];
  onBinSelect?: (bin: Bin) => void;
  selectedBin?: Bin | null;
  showRoutes?: boolean;
}

const BinMap: React.FC<BinMapProps> = ({ 
  bins, 
  onBinSelect, 
  selectedBin, 
  showRoutes = false 
}) => {
  const [center] = useState<LatLngExpression>([40.7128, -74.0060]); // New York City

  const getBinColor = (fillLevel: number, status: string) => {
    if (status === 'maintenance') return '#9CA3AF';
    if (status === 'overflow') return '#EF4444';
    if (fillLevel >= 90) return '#F59E0B';
    if (fillLevel >= 70) return '#F97316';
    if (fillLevel >= 50) return '#10B981';
    return '#22C55E';
  };

  const getBinIcon = (status: string) => {
    switch (status) {
      case 'maintenance': return AlertTriangle;
      case 'overflow': return XCircle;
      default: return CheckCircle;
    }
  };

  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <MapContainer
        center={center}
        zoom={13}
        className="w-full h-full"
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {bins.map((bin) => {
          const color = getBinColor(bin.fillLevel, bin.status);
          const IconComponent = getBinIcon(bin.status);
          
          return (
            <CircleMarker
              key={bin._id}
              center={[bin.location.lat, bin.location.lng]}
              radius={8}
              pathOptions={{
                color: color,
                weight: 2,
                opacity: 0.8,
                fillOpacity: 0.6,
                fillColor: color,
              }}
              eventHandlers={{
                click: () => onBinSelect?.(bin),
              }}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <div className="flex items-center space-x-2 mb-2">
                    <IconComponent className="w-5 h-5" style={{ color }} />
                    <h3 className="font-semibold">Bin {bin.binId}</h3>
                  </div>
                  
                  <div className="space-y-1 text-sm">
                    <p><strong>Location:</strong> {bin.location.address}</p>
                    <p><strong>Fill Level:</strong> {bin.fillLevel}%</p>
                    <p><strong>Zone:</strong> {bin.zone}</p>
                    <p><strong>Status:</strong> 
                      <span className={`ml-1 capitalize font-medium ${
                        bin.status === 'overflow' ? 'text-red-600' :
                        bin.status === 'maintenance' ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {bin.status}
                      </span>
                    </p>
                    <p><strong>Last Emptied:</strong> {new Date(bin.lastEmptied).toLocaleDateString()}</p>
                  </div>
                  
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${bin.fillLevel}%`,
                          backgroundColor: color
                        }}
                      />
                    </div>
                  </div>
                  
                  {onBinSelect && (
                    <button
                      onClick={() => onBinSelect(bin)}
                      className="mt-2 w-full bg-green-600 text-white py-1 px-3 rounded-md text-sm hover:bg-green-700 transition-colors"
                    >
                      Provide Feedback
                    </button>
                  )}
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default BinMap;