import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";
import { Link } from "react-router-dom";

const Header = ({ setUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">üKool</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link to="/dashboard" className="nav-link">
                Töölaud
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/course" className="nav-link">
                Kursused
              </Link>
            </NavItem>
          </Nav>
          <NavbarText
            style={{ cursor: "pointer" }}
            onClick={() => setUser(null)}
          >
            Logi välja
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
