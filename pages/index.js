import React from "react";
import { Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import BrutalityByState from "components/widgets/BrutalityByState";
import BrutalityOverTime from "components/widgets/BrutalityOverTime";
import BubbleHeatmap from "components/widgets/BubbleHeatmap";

function HomePage() {
  return (
    <div>
      <Container
        style={{ width: "1200px", backgroundColor: "#000", padding: "1em" }}
      >
        <Row>
          <Col sm={1}>
            <img
              alt="Grassroots Law Project"
              width={261}
              height={60}
              src="https://images.squarespace-cdn.com/content/5e7662fe45630059ae9347cf/1591116153336-2V6MDHUQAXMOIKOZI6DJ/glp+text+only+logo+neon.png?format=1500w&content-type=image%2Fpng"
            />
            ​
          </Col>
          <Col sm={9}>
            {" "}
            <h2
              align="center"
              style={{
                font: "helvetica-neue",
                fontWeight: "heavy",
                color: "#66fcf1",
              }}
            >
              Police Brutality Dashboard
            </h2>
          </Col>
          <Col sm={2}>
            {" "}
            <Button
              style={{ backgroundColor: "#66fcf1", color: "#000" }}
              variant="link"
              href="https://secure.actblue.com/donate/glp-homepage?refcode=homepage_nav"
            >
              DONATE
            </Button>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col>
            <BrutalityOverTime />
          </Col>
          <Col md="auto">
            <BrutalityByState />
          </Col>
        </Row>
        <Row>
          <Col>
            <BrutalityOverTime />
          </Col>
          <Col>
            <BrutalityOverTime />
          </Col>
          <Col>
            <BrutalityOverTime />
          </Col>
        </Row>
        <Row>
          <Col>
            <BubbleHeatmap />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
