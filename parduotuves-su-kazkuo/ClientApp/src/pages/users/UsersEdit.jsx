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

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Name is required";
  }

  return errors;
};

export default function UsersEdit() {
  const { user } = useAuth();
  let navigate = useNavigate();
  let { shopId } = useParams();
  const [shop, setShop] = useState({ name: "", address: "" });

  useEffect(() => {
    axiosAuth
      .get(`/shops/${shopId}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => setShop(response.data))
      .catch((err) => console.log(err.response));
  }, []);

  const handleSubmit = async ({ name, address }) => {
    console.log("object");
    try {
      await axiosAuth.put(
        `/shops/${shopId}`,
        {
          id: shopId,
          name,
          address,
        },
        {
          headers: { Authorization: `Bearer ${user.jwtToken}` },
        }
      );
      navigate(-1);
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
  return (
    <>
      <h1>Edit shop {shopId}</h1>
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
