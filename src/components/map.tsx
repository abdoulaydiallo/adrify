"use client";

import React, { useState } from "react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markericon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import LocateControl from "./mapping/locate-button";
// Fix Leaflet's default icon path issues
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markericon2x.src,
  shadowUrl: markerShadow.src,
});

interface MapProps {
  center?: L.LatLngExpression;
  locate?: boolean;
  onCenter: (e: L.LatLngExpression) => void;
  zoom?: number;
}

const Map: React.FC<MapProps> = ({ center, onCenter, locate, zoom = 5 }) => {
  const [position, setPosition] = useState<L.LatLngExpression | null>(null);

  const handleLocate = (e: L.LatLngExpression) => {
    const [lat, lng] = Array.isArray(e) ? e : [e.lat, e.lng];
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      console.error("Invalid coordinates");
      return;
    }

    setPosition(e);
    onCenter(e);
  };

  return (
    <MapContainer
      className="h-[35vh] my-4 relative"
      zoom={zoom}
      center={center || [9.6412, -13.5784]}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {center && (
        <Marker
          position={
            center
              ? (center as L.LatLngExpression)
              : (position as L.LatLngExpression)
          }
        />
      )}
      {locate && <LocateControl onLocate={handleLocate} />}
    </MapContainer>
  );
};

export default Map;
