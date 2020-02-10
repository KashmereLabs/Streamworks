import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './topnav.css';

export default class TopNav extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg" className="app-top-nav">
  <Navbar.Brand href="/home">StreamWorks</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/user">User</Nav.Link>
      <Nav.Link href="/manager">Manager</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    )
  }
}
