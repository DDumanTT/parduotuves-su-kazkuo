import {
  Container,
  ListGroup,
  ListGroupItem,
  UncontrolledAccordion,
  AccordionBody,
  AccordionItem,
  AccordionHeader,
} from "reactstrap";
import { Link, useLocation } from "react-router-dom";

import UserActions from "./UserActions";
import useAuth from "../hooks/useAuth";

function MenuItem({ to, children, section, ...rest }) {
  let location = useLocation();

  return (
    <ListGroupItem
      action
      tag={to ? Link : "li"}
      to={to}
      active={location.pathname === to ? true : false}
      {...rest}
    >
      {children}
    </ListGroupItem>
  );
}

export default function NavMenu() {
  const { user } = useAuth();

  return (
    <>
      <Container fluid className="w-100 my-4">
        PSA
      </Container>
      <ListGroup flush className="flex-grow-1">
        <MenuItem to="/" className="fw-bold">
          Home
        </MenuItem>
        {user && user.role === "Admin" ? (
          <UncontrolledAccordion flush stayOpen defaultOpen={["1", "2"]}>
            <AccordionItem>
              <MenuItem className="p-0">
                <AccordionHeader targetId="1">
                  <b>CRUD</b>
                </AccordionHeader>
              </MenuItem>
              <AccordionBody accordionId="1">
                <ListGroup flush>
                  <MenuItem to="/users" className="ps-4">
                    Users
                  </MenuItem>
                  <MenuItem to="/shops" className="ps-4">
                    Shops
                  </MenuItem>
                </ListGroup>
              </AccordionBody>
            </AccordionItem>
          </UncontrolledAccordion>
        ) : (
          <></>
        )}
        <MenuItem to="/about" className="fw-bold">
          About
        </MenuItem>
      </ListGroup>
      <UserActions />
    </>
  );
}
