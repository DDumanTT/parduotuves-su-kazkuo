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
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import AuthService from "../services/AuthService";

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Email is required.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters long.";
  }

  return errors;
};

export default function LoginPage() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async ({ email, password }) => {
    setLoading(true);
    setErrMessage("");
    await AuthService.login(email, password)
      .then((response) => {
        setUser(response.data);
        navigate("..");
      })
      .catch((err) => {
        setLoading(false);
        setErrMessage(err?.response?.data.message);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    validateOnChange: false,
    validateOnBlur: false,
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
        <h1 className="mb-3">Login</h1>
        {errMessage ? <Alert color="danger">{errMessage}</Alert> : <></>}
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup floating>
            <Input
              id="email"
              name="email"
              placeholder="Email address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              invalid={!!formik.errors.email}
            />
            <Label for="email">Email</Label>
            <FormFeedback>{formik.errors.email}</FormFeedback>
          </FormGroup>
          <FormGroup floating>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              invalid={!!formik.errors.password}
            />
            <Label for="password">Password</Label>
            <FormFeedback>{formik.errors.password}</FormFeedback>
          </FormGroup>
          <Button type="submit" className="w-100">
            Login
          </Button>
        </Form>
      </>
    );
  }
}
