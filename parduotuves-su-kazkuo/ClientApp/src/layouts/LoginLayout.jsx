import { Container, Row, Col } from "reactstrap";
import { Outlet } from "react-router-dom";

export default function LoginLayout() {
  return (
    <Container className="min-vh-100 d-flex justify-content-center align-items-center">
      <Row className="border shadow p-5 rounded">
        <Outlet />
      </Row>
    </Container>
  );
}
