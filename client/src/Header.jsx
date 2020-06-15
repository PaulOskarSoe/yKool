import React, { useState, useContext } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText,
} from "reactstrap";

import { UserContext } from "./store/UserContextProvider";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const logOut = () => {
    setUser(null);
    fetch("/logout");
  };

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">üKool</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar></Nav>
          <NavbarText style={{ marginRight: 25 }}>
            Tere, {user.fullName}
          </NavbarText>
          <NavbarText style={{ cursor: "pointer" }} onClick={() => logOut()}>
            Logi välja
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
