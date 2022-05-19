import { useCallback, useEffect, useState, useRef } from "react";
import { Button, ListGroup, ListGroupItem, Spinner, Table } from "reactstrap";
import { Marker, useJsApiLoader, useLoadScript } from "@react-google-maps/api";

import Map from "../components/Map";
import axios from "../api/axios";

export default function HomePage() {
  const [location, setLocation] = useState();
  const [shops, setShops] = useState([]);
  const [map, setMap] = useState();

  const directionsRenderer = useRef(null);

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
        let ss = [...r.data];
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
                      if (ss[i].distance && ss[i].rating) {
                        axios
                          .post("shops/suitability", {
                            distance: ss[i].distance,
                            rating: ss[i].rating,
                            people: Math.floor(Math.random() * 30),
                          })
                          .then((r) => {
                            ss[i].suitability = r.data.suitability;
                            let shop = shops.find((sh) => sh.id === s.id);
                            if (!shop) {
                              setShops((prev) => [...prev, ss[i]]);
                            }
                          });
                      } else {
                        let shop = shops.find((sh) => sh.id === s.id);
                        if (!shop) {
                          setShops((prev) => [...prev, ss[i]]);
                        }
                      }
                    }
                  }
                );
              }
            }
          );
        });
      });
  }, [map, location]);

  const onLoad = useCallback((map) => {
    const google = window.google;

    setMap(map);
    directionsRenderer.current = new window.google.maps.DirectionsRenderer();

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

  const showDirections = (dest) => {
    const directionsService = new window.google.maps.DirectionsService();
    if (directionsRenderer.current !== null) {
      directionsRenderer.current.setMap(null);
      directionsRenderer.current = null;
    }
    directionsRenderer.current = new window.google.maps.DirectionsRenderer();
    directionsRenderer.current.setMap(map);
    directionsService.route(
      {
        origin: location,
        destination: dest,
        travelMode: "DRIVING",
      },
      (res, status) => {
        if (status === "OK") {
          directionsRenderer.current.setDirections(res);
        }
      }
    );
  };

  const renderShopsTable = () => {
    let sortedShops = [...shops].sort((a, b) => {
      if (a.suitability === b.suitability) {
        return 0;
      } else if (!a.suitability) {
        return 1;
      } else if (!b.suitability) {
        return -1;
      } else {
        return a.suitability < b.suitability ? 1 : -1;
      }
    });
    if (sortedShops.length > 5) {
      sortedShops = sortedShops.slice(0, 5);
    }
    return (
      <div className="position-absolute bottom-0">
        <Table hover className="bg-light mb-0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Distance</th>
              <th>Rating</th>
              <th>Suit.</th>
            </tr>
          </thead>
          <tbody>
            {sortedShops.map((s, i) => {
              return (
                <tr
                  key={i}
                  onClick={() =>
                    showDirections(
                      new window.google.maps.LatLng(s.latitude, s.longitude)
                    )
                  }
                >
                  <th>{s.name}</th>
                  <th>{s.distance ?? "-"} km</th>
                  <th>{s.rating ?? "-"}</th>
                  <th>{s.suitability ?? "-"}</th>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  };

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
        {shops && renderShopsTable()}
      </Map>
    </>
  );
}
