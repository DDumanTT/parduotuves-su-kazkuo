import {
  Container,
  ListGroup,
  ListGroupItem,
  UncontrolledAccordion,
  AccordionBody,
  AccordionItem,
  AccordionHeader,
  UncontrolledAlert,
} from "reactstrap";
import { Link, useLocation } from "react-router-dom";

import UserActions from "./UserActions";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

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
  const [loggedInToday, setLoggedInToday] = useState(true);

  useEffect(() => {
    if (user) {
      setLoggedInToday(user.loggedInToday);
    }
  }, [user]);

  return (
    <>
      <Container fluid className="w-100 my-4">
        PSA
      </Container>
      <ListGroup flush className="flex-grow-1">
        <MenuItem to="/" className="fw-bold">
          Home
        </MenuItem>
        <MenuItem to="/auctions" className="fw-bold">
          Auctions
        </MenuItem>
        <MenuItem to="/lottery" className="fw-bold">
          Lottery
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
      {!loggedInToday && (
        <UncontrolledAlert>
          <h6 className="alert-heading">Congratulations!</h6>
          You received a free lottery spin!
        </UncontrolledAlert>
      )}
      <UserActions />
    </>
  );
}
