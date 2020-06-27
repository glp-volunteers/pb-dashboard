import React from "react";
import { Container } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";

import Head from "pages/head";
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
    <Container>
      <Head />

      <Row>
        <Col lg={8}>
          <h2>Police Killings by State</h2>
          <BrutalityMap data={mapData} />
          <BrutalityByState />
        </Col>

        <Col lg={4}>
          <h2>Most Recent Police Killings</h2>
          <Last20Victims />
          <BrutalityOverTime />
        </Col>
      </Row>

      <EnhancedTable />
    </Container>
  );
}

export default HomePage;
