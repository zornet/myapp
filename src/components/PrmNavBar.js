import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import logo from "./assets/images/logo-conti.png";
import "../Styles/PrmNavBar.css"


class PrmNavBar extends React.Component {
  
  render() {
    return (
      <Navbar id='bootstrap-overrides' className='prm-navbar' bg="primary" variant="dark" border="dark">
        <Navbar.Brand href="http://localhost:3000/" ><img alt="Continental Logo" src={logo} className="conti-logo"></img></Navbar.Brand>
        <Nav className="mr-auto" defaultActiveKey="#home">
          <Nav.Link href="http://localhost:3000/team">Team</Nav.Link>
          <Nav.Link href="http://localhost:3000/statistics">
            General Statistics
          </Nav.Link>
          <Nav.Link href="http://localhost:3000/prediction">
            Ticket Prediction
          </Nav.Link>
          <Nav.Link href="http://localhost:3000/scripts">TeamScripts</Nav.Link>
          <Nav.Link href="http://localhost:3000/contact">Contact</Nav.Link>
          <Nav.Link href="http://localhost:3000/instructions">Instructions</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-light">Search</Button>
        </Form>
      </Navbar>
    );
  }
}

export default PrmNavBar;