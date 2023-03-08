import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { LinkContainer } from "react-router-bootstrap";

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
    dispatch(logoutRequest(navigate));
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#">Keywords Analyzer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/search-reports">
              <Nav.Link>Search Reports</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            <DropdownButton id="dropdown-button" title={`Hi ${username}!`}>
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
