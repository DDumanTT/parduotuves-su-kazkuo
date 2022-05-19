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
import { useNavigate, useParams } from "react-router-dom";

import { createUser, getUser } from "./UsersRequests";
import Roles from "./Roles";
import { useEffect, useState } from "react";
import { axiosAuth } from "../../api/axios";

const validate = (values) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = "First name is required.";
  }

  if (!values.lastName) {
    errors.lastName = "Last name is required.";
  }

  if (!values.role) {
    errors.role = "Role is required.";
  }

  if (!values.email) {
    errors.email = "Email is required.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email.";
  }

  if (values.confirmPassword && values.confirmPassword.length < 6) {
    errors.confirmPassword = "Password must be at least 6 characters long.";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
};

export default function UsersEdit() {
  let navigate = useNavigate();
  const [error, setError] = useState("");
  let { shopId } = useParams();

  const handleSubmit = (values) => {
    console.log(values);
    return axiosAuth
      .put(`/accounts/${shopId}`, {
        password: "",
        confirmPassword: "",
        ...values,
      })
      .then((e) => navigate("/users"))
      .catch((e) => {
        setError(e.response.data.message);
        console.log(e.response);
      });
  };

  useEffect(() => {
    console.log(error);
  }, [error]);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    money: 0,
    password: "",
    confirmPassword: "",
  });

  const formik = useFormik({
    initialValues: user,
    validate,
    validateOnChange: false,
    validateOnBlur: false,
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    getUser(shopId)
      .then((response) => {
        setUser({...user, ...response.data});
      })
      .catch((err) => console.log(err.response.data));
  }, []);

  return (
    <>
      <h1>Update user</h1>
      <Form onSubmit={formik.handleSubmit}>
        <FormGroup floating>
          <Input
            id="firstName"
            name="firstName"
            placeholder="First name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            invalid={!!formik.errors.firstName}
          />
          <Label for="firstName">First name</Label>
          <FormFeedback>{formik.errors.firstName}</FormFeedback>
        </FormGroup>
        <FormGroup floating>
          <Input
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            invalid={!!formik.errors.lastName}
          />
          <Label for="lastName">Last Name</Label>
          <FormFeedback>{formik.errors.lastName}</FormFeedback>
        </FormGroup>
        <FormGroup floating>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
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
            id="role"
            name="role"
            type="select"
            placeholder="Role"
            onChange={formik.handleChange("role")}
            onBlur={formik.handleBlur}
            value={formik.values.role}
            invalid={!!formik.errors.role}
          >
            <option value="">Select Role</option>
            {Object.values(Roles).map((r, i) => (
              <option key={`role-${i}`} value={r}>
                {r}
              </option>
            ))}
          </Input>
          <Label for="role">Role</Label>
          <FormFeedback>{formik.errors.role}</FormFeedback>
        </FormGroup>
        <FormGroup floating>
          <Input
            id="money"
            name="money"
            type="number"
            placeholder="Money"
            onChange={formik.handleChange("money")}
            onBlur={formik.handleBlur}
            value={formik.values.money}
            invalid={!!formik.errors.money}
          />

          <Label for="role">Money</Label>
          <FormFeedback>{formik.errors.money}</FormFeedback>
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
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            invalid={!!formik.errors.confirmPassword}
          />
          <Label for="confirmPassword">Confirm Password</Label>
          <FormFeedback>{formik.errors.confirmPassword}</FormFeedback>
        </FormGroup>
        <Button type="submit" className="w-100">
          Update
        </Button>
      </Form>
      <p className="mt-2 text-danger">{error}</p>
    </>
  );
}
