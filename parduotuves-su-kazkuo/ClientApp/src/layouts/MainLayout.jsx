import { Container, Row, Col } from "reactstrap";
import { Outlet } from "react-router-dom";
import NavMenu from "../components/NavMenu";

export default function Layout() {
  return (
    <Container fluid>
      <Row className="min-vh-100 position-relative overflow-hidden flex-sm-nowrap">
        <Col sm="4" md="4" lg="3" xl="2" className="d-flex flex-column">
          <NavMenu />
        </Col>
        <Col className="gx-0">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}
