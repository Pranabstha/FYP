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
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import reverseGeocode from "../api/Map/Location";

interface MapComponentProps {
  handleSetCoordinates: (position: LatLngTuple) => void;
  latitude: number;
  longitude: number;
  address: string;
  setAddress: Dispatch<SetStateAction<string>>;
}

const MapComponent: React.FC<MapComponentProps> = ({
  handleSetCoordinates,
  latitude,
  longitude,
  address,
  setAddress,
}) => {
  const defaultPosition: LatLngTuple = [latitude, longitude];
  const [position, setPosition] = useState<LatLngTuple>(defaultPosition);

  // Define a separate component for the useMapEvents hook
  function UseMapEvents({
    setPosition,
  }: {
    setPosition: (position: LatLngTuple) => void;
  }) {
    const map = useMapEvents({
      click(event) {
        const { lat, lng } = event.latlng;
        setPosition([lat, lng]);
      },
    });

    return null;
  }

  useEffect(() => {
    const fetchData = async (lat: any, lon: any) => {
      // const apiKey = process.env.Map_API_KEY;
      // console.log(apiKey)
      const apiKey = "pk.27db667cc7231ed5971599a2237a64ed";
      const data = await reverseGeocode(lat, lon, apiKey);
      if (data) {
        setAddress(data.filtredAddress);
      }
    };
    if (position) {
      handleSetCoordinates(position);
      fetchData(position[0], position[1]);
    }
  }, [position, handleSetCoordinates]);

  return (
    <div style={{ position: "sticky" }}>
      <MapContainer
        className="h-40vh"
        center={defaultPosition}
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
            <Popup>{<p>{address}</p>}</Popup>
          </Marker>
        )}

        {/* UseMapEventsExample component */}
        <UseMapEvents setPosition={setPosition} />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
