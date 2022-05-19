import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { memo, useCallback, useEffect } from "react";
import { Spinner } from "reactstrap";

export default function Map({
  center,
  onClick,
  onLoad,
  children,
  setLocation,
}) {
  // const { isLoaded, loadError } = useLoadScript({
  //   googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  // });

  // if (loadError) {
  //   return <div>Map cannot be loaded right now, sorry.</div>;
  // }

  // return isLoaded ? (
  return (
    <RenderMap
      center={center}
      zoom={12}
      onClick={onClick}
      onLoad={onLoad}
      setLocation={setLocation}
    >
      {children}
    </RenderMap>
  );
  // ) : (
  //   <Spinner />
  // );
}

const RenderMap = memo(
  ({ zoom, center, onClick, onLoad, children, setLocation }) => {
    return (
      <GoogleMap
        mapContainerStyle={{ height: "100%", width: "100%" }}
        zoom={zoom}
        center={center}
        onLoad={onLoad}
        onClick={onClick}
      >
        {children}
      </GoogleMap>
    );
  }
);
