import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Habits & Tasks</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/tasks">
            Tasks
          </Nav.Link>
          <Nav.Link as={Link} to="/habits">
            Habits
          </Nav.Link>
          <Nav.Link as={Link} to="/friends">
            Friends
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
