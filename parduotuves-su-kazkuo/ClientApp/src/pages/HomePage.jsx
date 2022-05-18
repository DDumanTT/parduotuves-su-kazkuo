import { useCallback, useEffect, useState } from "react";
import { Button, ListGroup, ListGroupItem, Spinner } from "reactstrap";
import { Marker, useJsApiLoader, useLoadScript } from "@react-google-maps/api";

import Map from "../components/Map";
import axios from "../api/axios";

export default function HomePage() {
  const [location, setLocation] = useState();
  const [shops, setShops] = useState([]);
  const [map, setMap] = useState();

  const [center, setCenter] = useState({
    lat: 54.8902511,
    lng: 23.9382484,
  });

  const onClick = (e) => {
    console.log(e);
  };

  useEffect(() => {
    map &&
      location &&
      axios.get("Shops").then((r) => {
        let ss = r.data;
        const placesService = new window.google.maps.places.PlacesService(map);
        const distanceMatrixService =
          new window.google.maps.DistanceMatrixService();
        ss.forEach((s, i) => {
          placesService.getDetails(
            {
              placeId: s.placeId,
              fields: ["name", "rating"],
            },
            (place, status) => {
              if (status == window.google.maps.places.PlacesServiceStatus.OK) {
                ss[i].rating = place.rating;
                console.log(location);
                distanceMatrixService.getDistanceMatrix(
                  {
                    origins: [location],
                    destinations: [
                      new window.google.maps.LatLng(
                        ss[i].latitude,
                        ss[i].longitude
                      ),
                    ],
                    travelMode: "DRIVING",
                  },
                  (response, status) => {
                    if (status === "OK") {
                      ss[i].distance =
                        response.rows[0].elements[0].distance.value / 1000;
                    }
                  }
                );
              }
            }
          );
        });
        setShops(ss);
      });
  }, [map, location]);

  useEffect(() => {
    console.log(location);
  }, [location]);

  useEffect(() => {
    console.log(shops);
  }, [shops]);

  const onLoad = useCallback((map) => {
    const google = window.google;

    setMap(map);

    // Add get location button
    const infoWindow = new google.maps.InfoWindow();
    const locationButton = document.createElement("button");
    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setLocation(new google.maps.LatLng(pos.lat, pos.lng));

            infoWindow.setPosition(pos);
            infoWindow.setContent("Location found.");
            infoWindow.open(map);
            map.setCenter(pos);
          },
          () => {
            handleLocationError(map, true, infoWindow, map.getCenter());
          }
        );
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(map, false, infoWindow, map.getCenter());
      }
    });

    function handleLocationError(map, browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(map);
    }
  }, []);

  return (
    <>
      <Map
        center={center}
        onClick={onClick}
        onLoad={onLoad}
        setLocation={setLocation}
      >
        {location && <Marker position={location} />}
        {shops &&
          shops.map((s, i) => (
            <Marker
              key={i}
              position={new window.google.maps.LatLng(s.latitude, s.longitude)}
            />
          ))}
        {shops && (
          <ListGroup className="position-absolute top-50">
            {shops.map((s, i) => {
              console.log("lole");
              console.log(s);
              return (
                <ListGroupItem key={i} action style={{ width: 200 }}>
                  <div className="d-flex">
                    <span>{s.name}</span>
                    <span>{s.rating}</span>
                    <span>{s.distance}</span>
                  </div>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        )}
      </Map>
    </>
  );
}
