"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { useState } from "react";

// Fix default icon issue
import "leaflet/dist/leaflet.css";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function LocationPicker({ onChange }) {
  const [position, setPosition] = useState([25.2138, 75.8648]); // default Kota

  // Handle map click
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
      onChange(e.latlng); // send back lat/lng to parent form
    },
  });

  return position ? <Marker position={position} draggable={true} /> : null;
}

export function MapSelector({ onSelect }) {
  return (
    <MapContainer
      center={[25.2138, 75.8648]} // default center Kota
      zoom={13}
      style={{ height: "300px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationPicker onChange={onSelect} />
    </MapContainer>
  );
}


//google map integration but need payment method for api to work

// import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
// const containerStyle = {
//   width: "100%",
//   height: "300px",
//   borderRadius: "12px",
// };

// const center = {
//   lat: 25.2138, // Kota default
//   lng: 75.8648,
// };

// export function GoogleMapSelector({ onSelect }) {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: process.env.GOOGLE_MAP_API
//   });

//   const [position, setPosition] = useState(center);

//   if (!isLoaded) return <p>Loading map...</p>;

//   return (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={position}
//       zoom={13}
//       onClick={(e) => {
//         const coords = { lat: e.latLng.lat(), lng: e.latLng.lng() };
//         setPosition(coords);
//         onSelect(coords);
//       }}
//     >
//       <Marker
//         position={position}
//         draggable={true}
//         onDragEnd={(e) => {
//           const coords = { lat: e.latLng.lat(), lng: e.latLng.lng() };
//           setPosition(coords);
//           onSelect(coords);
//         }}
//       />
//     </GoogleMap>
//   );
// }

