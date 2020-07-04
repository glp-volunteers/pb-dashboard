import React, { useState } from "react";
import { Container, Col, Row, Form } from "react-bootstrap";
import Head from "pages/head";
import BrutalityByState from "components/widgets/BrutalityByState";
import BrutalityOverTime from "components/widgets/BrutalityOverTime";
import BrutalityMap from "components/widgets/BrutalityMap";
import EnhancedTable from "components/widgets/TableData";
import Last20Victims from "components/widgets/Last20Victims";
import TopPoliceDepartments from "components/widgets/TopPoliceDepartments";
import { getApiData } from "api/routes/appRoutes";

const rowStyle = {
  marginBottom: 20,
};

export const getServerSideProps = async () => {
  const shootingsByState = await getApiData("count/shootings/state/name");

  const populationDataRaw = await fetch(
    "https://datausa.io/api/data?drilldowns=State&measures=Population&year=latest"
  );

  const shootingsOverTime = await getApiData("count/shootings/overtime");

  const last20Items = await getApiData("shootings/last20");

  const topPoliceDepartments = await getApiData("count/shootings/pd");

  const populationData = await populationDataRaw.json();

  const filteredShootingsByState = shootingsByState.filter((state) =>
    populationData.data.find((s) => s.State === state.state)
  );

  const shootingsPerCapita = filteredShootingsByState.map((state) => ({
    ...state,
    total:
      state.total /
      populationData.data.find((s) => s.State === state.state).Population,
  }));

  return {
    props: {
      shootingsByState: filteredShootingsByState,
      shootingsPerCapita,
      shootingsOverTime,
      topPoliceDepartments,
      last20Items,
    },
  };
};

function HomePage({
  shootingsByState,
  shootingsPerCapita,
  shootingsOverTime,
  topPoliceDepartments,
  last20Items,
}) {
  const [isPerCapita, setIsPerCapita] = useState(false);

  return (
    <Container>
      <Head />
      <Row style={rowStyle}>
        <Col lg={8}>
          <h2>Police Killings by State</h2>
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Per Capita"
            onChange={(val) => {
              setIsPerCapita(val.target.checked);
            }}
          />
          <BrutalityMap
            data={isPerCapita ? shootingsPerCapita : shootingsByState}
          />
        </Col>
        <Col lg={4}>
          <h2>Recent Police Killings</h2>
          <Last20Victims data={last20Items} />
        </Col>
      </Row>
      <Row style={rowStyle}>
        <Col lg={8}>
          <h2>Police Killings by State</h2>
          <BrutalityByState
            data={isPerCapita ? shootingsPerCapita : shootingsByState}
          />
        </Col>
        <Col lg={4}>
          <h2>Police Departments with the Most Killings</h2>
          <TopPoliceDepartments data={topPoliceDepartments} />
        </Col>
      </Row>
      <Row style={rowStyle}>
        <Col lg={8}>
          <h2>Highest Number of Killings by Police Department</h2>
          <BrutalityOverTime data={shootingsOverTime} />
        </Col>
        <Col lg={4}>
          <h2>By the Numbers</h2>
          <EnhancedTable />
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
