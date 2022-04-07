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
import { axiosAuth } from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Name is required";
  }

  return errors;
};

export default function ShopsCreate() {
  const { user } = useAuth();
  let navigate = useNavigate();
  const handleSubmit = async ({ name, address }) => {
    try {
      await axiosAuth.post(
        "/shops/",
        {
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
    initialValues: {
      name: "",
      address: "",
    },
    validate,
    validateOnChange: false,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <h1>Add shop</h1>
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
          Create
        </Button>
      </Form>
    </>
  );
}
