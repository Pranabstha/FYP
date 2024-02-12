import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import { LatLngTuple } from "leaflet";
import { useState } from "react";

export default function Map() {
  const [position, setPosition] = useState<LatLngTuple | null>(null);

  return (
    <MapContainer
      className="h-40vh"
      center={[28.3949, 84.124]}
      zoom={8}
      style={{ height: "40vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Render the Marker conditionally based on the position */}
      {position && (
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}

      {/* UseMapEventsExample component */}
      <UseMapEventsExample setPosition={setPosition} />
    </MapContainer>
  );
}

// Define a separate component for the useMapEvents hook
function UseMapEventsExample({
  setPosition,
}: {
  setPosition: (position: LatLngTuple | null) => void;
}) {
  const map = useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;
      setPosition([lat, lng]);
      console.log(lat, lng);
    },
    locationfound(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return null;
}
