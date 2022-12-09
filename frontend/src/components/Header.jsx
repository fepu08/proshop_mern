import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();

  const logoutHandler = (e) => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            ProShop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end w-100">
              <Nav.Link as={NavLink} to="/cart">
                <i className="fas fa-shopping-cart" />
                &nbsp;Cart
              </Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item as={NavLink} to="profile">
                    Profile
                  </NavDropdown.Item>

                  <NavDropdown.Item onClick={logoutHandler}>Log Out</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={NavLink} to="/login">
                  <i className="fas fa-user" />
                  &nbsp;Sign In
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
