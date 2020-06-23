import React from "react";
import Head from "pages/head";
import { Container } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import BrutalityByState from "components/widgets/BrutalityByState";
import BrutalityOverTime from "components/widgets/BrutalityOverTime";
import GoogleChart from "components/widgets/GoogleChart";
import EnhancedTable from "components/widgets/TableData";
import Last20Victims from "components/widgets/Last20Victims";

function HomePage() {
  return (
    <div>
      <Head />

      <Container>
        <Row>
          <Col sm={7}>
            <GoogleChart />
            <BrutalityOverTime />
          </Col>

          <Col sm={5}>
            <h3>Last 20 Reported Police Killings</h3>
            <Last20Victims />
          </Col>
        </Row>
      </Container>

      <Container>
        <EnhancedTable />
      </Container>

      <Container style={{ borderColor: "#c5c6c8" }}>
        <Row>
          <Col>
            <BrutalityByState />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;
