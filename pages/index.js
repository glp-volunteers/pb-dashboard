import React from "react";
import Head from "pages/head";
import { Container } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import BrutalityByState from "components/widgets/BrutalityByState";
import BrutalityOverTime from "components/widgets/BrutalityOverTime";
import BrutalityMap from "components/widgets/BrutalityMap";
import EnhancedTable from "components/widgets/TableData";
import Last20Victims from "components/widgets/Last20Victims";

export const getServerSideProps = async ({ req }) => {
  const rawMapData = await fetch(
    "http://policetracker.link/count/shootings/state/name"
  );
  const mapData = await rawMapData.json();
  return {
    props: {
      mapData,
    },
  };
};

function HomePage({ mapData }) {
  return (
    <div>
      <Head />

      <Container>
        <Row>
          <Col sm={7}>
            <h3>Police Killings by State</h3>
            <BrutalityMap data={mapData} />
            <BrutalityByState />
          </Col>

          <Col sm={5}>
            <h3>Last 20 Reported Police Killings</h3>
            <Last20Victims />
            <BrutalityOverTime />
          </Col>
        </Row>
      </Container>

      <Container>
        <EnhancedTable />
      </Container>
    </div>
  );
}

export default HomePage;
