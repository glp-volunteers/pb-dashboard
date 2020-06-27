import React from "react";
import Link from "next/link";
import { Button, Container, Col, Row, Navbar, Nav } from "react-bootstrap";

import { container, brand, nav, button } from "styles/head";

function Head() {
  return (
    <Container style={container}>
      <Row>
        <Col>
          <img
            alt="Grassroots Law Project"
            width={261}
            height={60}
            src="https://images.squarespace-cdn.com/content/5e7662fe45630059ae9347cf/1591116153336-2V6MDHUQAXMOIKOZI6DJ/glp+text+only+logo+neon.png?format=1500w&content-type=image%2Fpng"
          />
        </Col>
        <Col className="d-none d-md-block">
          <p>
            <a href="https://www.grassrootslaw.org/" style={nav}>
              Grassroots Law Project
            </a>{" "}
            collects information on police violence across the United States.
            This data is critical to identifying the national pattern of police
            brutality. This page provides a view into our database.
          </p>
        </Col>
      </Row>
      <Nav>
        <Navbar.Brand style={brand} href="/">
          Police Killings Dashboard
        </Navbar.Brand>
        <Nav.Link style={nav} href="/">
          Home
        </Nav.Link>
        <Nav.Link style={nav} href="/methodology">
          Our Methodology
        </Nav.Link>
        <Button
          style={button}
          variant="link"
          href="https://secure.actblue.com/donate/glp-homepage?refcode=homepage_nav"
        >
          Donate
        </Button>
      </Nav>
    </Container>
  );
}

export default Head;
