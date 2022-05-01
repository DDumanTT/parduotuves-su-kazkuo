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
import { useNavigate } from "react-router-dom";

const validate = (values) => {
  const errors = {};

  if (!values.firstname) {
    errors.firstname = "First name is required.";
  } else if (values.password.length < 3) {
    errors.firstname = "Password must be at least 3 characters long.";
  }

  if (!values.lastname) {
    errors.lastname = "Last name is required.";
  } else if (values.password.length < 3) {
    errors.lastname = "Password must be at least 3 characters long.";
  }

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

  if (values.confirmpassword !== values.password) {
    errors.confirmpassword = "Passwords do not match.";

    return errors;
  }
};

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async ({
    firstname,
    lastname,
    email,
    password,
    confirmpassword,
  }) => {
    setLoading(true);
    setErrMessage("");
    try {
      await axios.post(
        "/accounts/register",
        {
          firstName: firstname,
          lastName: lastname,
          email,
          password,
          confirmPassword: confirmpassword,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      navigate(-1);
    } catch (err) {
      setLoading(false);
      setErrMessage(err?.response?.data.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: "",
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
        <h1 className="mb-3">Register</h1>
        {errMessage ? <Alert color="danger">{errMessage}</Alert> : <></>}
        <Form onSubmit={formik.handleSubmit}>
          <div className="d-flex">
            <FormGroup floating className="w-100">
              <Input
                id="firstname"
                name="firstname"
                placeholder="First name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstname}
                invalid={!!formik.errors.firstname}
              />
              <Label for="firstName">First name</Label>
              <FormFeedback>{formik.errors.firstname}</FormFeedback>
            </FormGroup>
            <FormGroup floating className="w-100">
              <Input
                id="lastname"
                name="lastname"
                placeholder="Last name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastname}
                invalid={!!formik.errors.lastname}
              />
              <Label for="lastName">Last name</Label>
              <FormFeedback>{formik.errors.lastname}</FormFeedback>
            </FormGroup>
          </div>
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
          <FormGroup floating>
            <Input
              id="confirmpassword"
              name="confirmpassword"
              type="password"
              placeholder="Confirm password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmpassword}
              invalid={!!formik.errors.confirmpassword}
            />
            <Label for="password">Confirm password</Label>
            <FormFeedback>{formik.errors.confirmpassword}</FormFeedback>
          </FormGroup>
          <Button type="submit" className="w-100">
            Register
          </Button>
        </Form>
      </>
    );
  }
}
