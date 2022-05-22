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
  import { useNavigate } from "react-router-dom";
  
  import { createScraper} from "./ScraperRequests";
  import Roles from "./Roles";
  import { useEffect, useState } from "react";
  
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
  
    if (!values.password) {
      errors.password = "Password is required.";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }
  
    if (!values.confirmPassword) {
      errors.confirmPassword = "Password is required.";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    } else if (values.confirmPassword.length < 6) {
      errors.confirmPassword = "Password must be at least 6 characters long.";
    }
  
    return errors;
  };
  
  export default function ScraperCreate() {
    let navigate = useNavigate();
    const [error, setError] = useState("");
  
    const handleSubmit = ({
      firstName,
      lastName,
      role,
      email,
      password,
      confirmPassword,
    }) => {
      createScraper(firstName, lastName, role, email, password, confirmPassword)
        .then((e) => navigate("/scraper"))
        .catch((e) => {
          setError(e.response.data.message);
          console.log(e.response);
        });
    };
  
    useEffect(() => {
      console.log(error);
    }, [error]);
  
    const formik = useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        password: "",
        confirmPassword: "",
      },
      validate,
      validateOnChange: false,
      validateOnBlur: false,
      onSubmit: handleSubmit,
    });
    return (
      <>
        <h1>Add user</h1>
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
            Create
          </Button>
        </Form>
        <p className="mt-2 text-danger">{error}</p>
      </>
    );
  }
  