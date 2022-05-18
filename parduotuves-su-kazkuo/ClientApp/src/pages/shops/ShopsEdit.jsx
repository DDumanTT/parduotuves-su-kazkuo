import {
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  Button,
} from "reactstrap";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { axiosAuth } from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import Map from "../../components/Map";
import { Marker } from "@react-google-maps/api";

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Name is required";
  }
  if (!values.longitude) {
    errors.longitude = "Longitude is required";
  }
  if (!values.latitude) {
    errors.latitude = "Latitude is required";
  }
  if (!values.placeId) {
    errors.placeId = "Invalid place";
  }
  console.log(errors);

  return errors;
};

function getReverseGeocodingData(latlng, formik) {
  const google = window.google;
  // This is making the Geocode request
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ latLng: latlng }, (results, status) => {
    if (status !== google.maps.GeocoderStatus.OK) {
      alert(status);
    }
    // This is checking to see if the Geoeode Status is OK before proceeding
    if (status == google.maps.GeocoderStatus.OK) {
      formik.setFieldValue("address", results[0].formatted_address);
      formik.setFieldValue("placeId", results[0].place_id);
    }
  });
}

export default function ShopsEdit() {
  const [shopLoc, setShopLoc] = useState();
  const [center, setCenter] = useState({
    lat: 54.8902511,
    lng: 23.9382484,
  });
  const { user } = useAuth();
  let navigate = useNavigate();
  let { shopId } = useParams();
  const [shop, setShop] = useState({
    name: "",
    address: "",
    longitude: "",
    latitude: "",
    placeId: "",
  });

  useEffect(() => {
    axiosAuth
      .get(`/shops/${shopId}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((r) => {
        setShop(r.data);
        console.log(window.google);
        console.log(
          new window.google.maps.LatLng(r.data.latitude, r.data.longitude)
        );
        setShopLoc(
          new window.google.maps.LatLng(r.data.latitude, r.data.longitude)
        );
      })
      .catch((err) => console.log(err.response));
  }, []);

  const handleSubmit = async ({
    name,
    address,
    latitude,
    longitude,
    placeId,
  }) => {
    try {
      await axiosAuth.put(`/shops/${shopId}`, {
        id: shopId,
        name,
        address,
        latitude,
        longitude,
        placeId,
      });
      navigate("..");
    } catch (err) {
      console.log(err.response);
    }
  };

  const formik = useFormik({
    initialValues: shop,
    validate,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

  const changeMarkerLoc = (e) => {
    setShopLoc(e.latLng);
    getReverseGeocodingData(e.latLng, formik);
    formik.setFieldValue("longitude", e.latLng.lng().toString());
    formik.setFieldValue("latitude", e.latLng.lat().toString());
  };

  return (
    <>
      <h1>Edit shop {shopId}</h1>
      <hr />
      <div className="hstack gap-5">
        <div style={{ width: "50%", height: 480 }}>
          <Map onClick={changeMarkerLoc} center={center}>
            {shopLoc && (
              <Marker
                draggable
                position={shopLoc}
                onDragEnd={changeMarkerLoc}
              />
            )}
          </Map>
        </div>
        <div>
          <p>Latitude: {shopLoc && shopLoc.lat()}</p>
          <p>Longitude: {shopLoc && shopLoc.lng()}</p>
          <p>Place id: {formik.values.placeId}</p>
        </div>
      </div>
      <Input
        name="longitude"
        type="hidden"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={shopLoc ? shopLoc.lng() : ""}
        invalid={!!formik.errors.longitude}
      />
      <FormFeedback>{formik.errors.longitude}</FormFeedback>
      <Input
        name="latitude"
        type="hidden"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={shopLoc ? shopLoc.lat() : ""}
        invalid={!!formik.errors.latitude}
      />
      <FormFeedback>{formik.errors.latitude}</FormFeedback>
      <Input
        name="placeId"
        type="hidden"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.placeId}
        invalid={!!formik.errors.placeId}
      />
      <FormFeedback>{formik.errors.placeId}</FormFeedback>
      <hr />
      <Form onSubmit={formik.handleSubmit}>
        <FormGroup floating>
          <Input
            id="name"
            name="name"
            placeholder="Shop name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            invalid={!!formik.errors.name}
          />
          <Label for="name">Shop name</Label>
          <FormFeedback>{formik.errors.name}</FormFeedback>
        </FormGroup>
        <FormGroup floating>
          <Input
            id="address"
            name="address"
            placeholder="Address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            invalid={!!formik.errors.address}
          />
          <Label for="address">Address</Label>
          <FormFeedback>{formik.errors.address}</FormFeedback>
        </FormGroup>
        <Button type="submit" className="w-100">
          Update
        </Button>
      </Form>
    </>
  );
}
