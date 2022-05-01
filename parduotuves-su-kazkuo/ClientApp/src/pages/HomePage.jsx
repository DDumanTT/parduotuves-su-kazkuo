import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useState } from "react";
import { Spinner } from "reactstrap";

import Marker from "../components/Marker";
import Map from "../components/Map";

export default function HomePage() {
  const [clicks, setClicks] = useState([]);
  const [zoom, setZoom] = useState(12); // initial zoom
  const [center, setCenter] = useState({
    lat: 54.8902511,
    lng: 23.9382484,
  });

  const onClick = (e) => {
    // avoid directly mutating state
    setClicks([...clicks, e.latLng]);
  };

  const onIdle = (m) => {
    console.log("onIdle");
    setZoom(m.getZoom());
    setCenter(m.getCenter().toJSON());
  };

  const render = (status) => {
    if (status === Status.FAILURE) return <h1>API Error</h1>;
    return (
      <div className="min-vh-100 min-vw-100 d-flex justify-content-center align-items-center">
        <Spinner />;
      </div>
    );
  };

  return (
    <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} render={render}>
      <Map
        zoom={zoom}
        center={center}
        onClick={onClick}
        onIdle={onIdle}
        style={{ height: "100%", width: "100%" }}
      >
        {clicks.map((latLng, i) => (
          <Marker key={i} position={latLng} />
        ))}
      </Map>
    </Wrapper>
  );
}
