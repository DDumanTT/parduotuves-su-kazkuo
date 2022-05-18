import { Marker, useLoadScript } from "@react-google-maps/api";
import { useState } from "react";
import { Spinner } from "reactstrap";
import Map from "./Map";

export default function AddShopMap({ loc, setLoc }) {
  const [center, setCenter] = useState({
    lat: 54.8902511,
    lng: 23.9382484,
  });

  const onClick = (e) => {
    setLoc(e.latLng);
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? (
    <Map center={center} zoom={12} onClick={onClick}>
      {loc && <Marker position={loc} />}
    </Map>
  ) : (
    <Spinner />
  );
}
