import React from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Bar } from '@/models/Bar';

interface BarMapProps {
  bars: Bar[];
  onBarSelect?: (bar: Bar) => void;
}

const PARIS_CENTER = {
  lat: 48.8566,
  lng: 2.3522
};

const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    }
  ]
};

const BarMap: React.FC<BarMapProps> = ({ bars, onBarSelect }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places']
  });

  const [selectedBar, setSelectedBar] = React.useState<Bar | null>(null);

  const handleMarkerClick = (bar: Bar) => {
    setSelectedBar(bar);
    if (onBarSelect) {
      onBarSelect(bar);
    }
  };

  if (loadError) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-600">Erreur de chargement de la carte</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="animate-pulse bg-gray-200 rounded-lg" style={mapContainerStyle}>
        <div className="h-full w-full flex items-center justify-center">
          <p className="text-gray-500">Chargement de la carte...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={PARIS_CENTER}
        options={options}
      >
        {bars.map((bar) => (
          bar.coordinates && (
            <Marker
              key={bar.id}
              position={bar.coordinates}
              onClick={() => handleMarkerClick(bar)}
              icon={{
                url: '/images/cocktail-marker.png',
                scaledSize: new google.maps.Size(30, 30)
              }}
            />
          )
        ))}

        {selectedBar && selectedBar.coordinates && (
          <InfoWindow
            position={selectedBar.coordinates}
            onCloseClick={() => setSelectedBar(null)}
          >
            <div className="p-2 max-w-xs">
              <h3 className="font-bold text-gray-900">{selectedBar.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{selectedBar.address}</p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-400 material-icons text-sm">star</span>
                <span className="ml-1 text-sm">{selectedBar.rating}</span>
                <span className="ml-2 text-purple-600 font-medium">{selectedBar.priceRange}</span>
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default BarMap; 