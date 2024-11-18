"use client";

import L from "leaflet";
import { useMap, useMapEvents } from "react-leaflet";
import { Locate } from "lucide-react";

interface LocateButtonProps {
  onLocate: (latlng: L.LatLngExpression, accuracy: number) => void;
}

const LocateControl: React.FC<LocateButtonProps> = ({ onLocate }) => {
  const map = useMap();

  const handleClick = () => {
    map.locate({ 
      setView: true, 
      maxZoom: 20,
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
      watch: true
    });
  };

  useMapEvents({
    locationfound(e) {
      map.stopLocate();
      
      const marker = L.marker(e.latlng, {
        draggable: true,
      }).addTo(map);
      
      const circle = L.circle(e.latlng, {
        radius: e.accuracy / 3,
        weight: 1,
        color: 'blue',
        fillColor: '#cacaca',
        fillOpacity: 0.2
      }).addTo(map);

      marker.on('dragend', (event) => {
        const newPosition = event.target.getLatLng();
        circle.setLatLng(newPosition);
        onLocate(newPosition, e.accuracy);
      });

      onLocate(e.latlng as L.LatLngExpression, e.accuracy);
    },
    locationerror(e) {
      alert("Erreur de localisation: " + e.message);
    },
  });

  return (
    <button
      className="bg-white p-1 border border-black rounded-sm"
      onClick={handleClick}
      style={{ position: "absolute", top: "80px", left: "10px", zIndex: 1000 }}
    >
      <Locate className="color-white" />
    </button>
  );
};

export default LocateControl;
