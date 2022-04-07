import {
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  Button,
  Spinner,
  Alert,
} from "reactstrap";
import { useFormik } from "formik";
import { useEffect, useState } from "react";

import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "El. pašto adresas yra privalomas.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Neteisingas el. pašto adresas.";
  }

  if (!values.password) {
    errors.password = "Slaptažodis yra privalomas";
  } else if (values.password.length < 6) {
    errors.password = "Slaptažodis turi būti bent 6 simbolių ilgio.";
  }

  return errors;
};

export default function LoginForm({ setModalOpen }) {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const handleSubmit = async ({ email, password }) => {
    setLoading(true);
    setErrMessage("");
    try {
      const response = await axios.post(
        "/accounts/authenticate",
        {
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setUser(response.data);
      setModalOpen(false);
    } catch (err) {
      setLoading(false);
      setErrMessage(err?.response?.data.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    validateOnChange: false,
    onSubmit: handleSubmit,
  });

  if (loading) {
    return (
      <div className="w-100 d-flex justify-content-center">
        <Spinner type="grow" />
      </div>
    );
  } else {
    return (
      <>
        {errMessage ? <Alert color="danger">{errMessage}</Alert> : <></>}
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup floating>
            <Input
              id="email"
              name="email"
              placeholder="El. paštas"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              invalid={!!formik.errors.email}
            />
            <Label for="email">El. paštas</Label>
            <FormFeedback>{formik.errors.email}</FormFeedback>
          </FormGroup>
          <FormGroup floating>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Slaptažodis"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              invalid={!!formik.errors.password}
            />
            <Label for="password">Slaptažodis</Label>
            <FormFeedback>{formik.errors.password}</FormFeedback>
          </FormGroup>
          <Button type="submit" className="w-100">
            Prisijungti
          </Button>
        </Form>
      </>
    );
  }
}
