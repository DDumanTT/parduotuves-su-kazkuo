import { useState } from "react";
import {
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import useAxiosAuth from "../hooks/useAxiosAuth";
import AuthService from "../services/AuthService";

export default function UserActions() {
  const { user, setUser } = useAuth();
  const axiosAuth = useAxiosAuth();

  const logout = () => {
    AuthService.logout();
    setUser(undefined);
  };

  return (
    <>
      <div className="hstack mb-2 w-100">
        {!user ? (
          <>
            <Button tag={Link} to="/register" className="w-100" outline>
              Register
            </Button>
            <Button tag={Link} to="/login" className="w-100" outline>
              Login
            </Button>
          </>
        ) : (
          <UncontrolledDropdown direction="up">
            <DropdownToggle caret className="w-100" outline>
              {user.email}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={logout}>Atsijungti</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        )}
      </div>
    </>
  );
}
