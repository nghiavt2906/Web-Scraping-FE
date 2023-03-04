import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Navbar,
  Nav,
  Container,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { logoutRequest } from "../../store/actions/user";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.user);

  const handleLogout = () => {
    console.log("test");
    dispatch(logoutRequest(navigate));
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#">Keywords Analyzer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <Nav>
            <DropdownButton
              id="dropdown-basic-button"
              title={`Hi ${username}!`}
            >
              <Dropdown.Item href="#" onClick={handleLogout}>
                Logout
              </Dropdown.Item>
            </DropdownButton>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
