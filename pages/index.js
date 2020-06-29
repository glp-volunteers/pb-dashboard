import React, { useState } from "react";
import { Container, Col, Row, Form } from "react-bootstrap";
import Head from "pages/head";
import BrutalityByState from "components/widgets/BrutalityByState";
import BrutalityOverTime from "components/widgets/BrutalityOverTime";
import BrutalityMap from "components/widgets/BrutalityMap";
import EnhancedTable from "components/widgets/TableData";
import Last20Victims from "components/widgets/Last20Victims";
import SimpleBarReact from "simplebar-react";

import { getApiData } from "api/routes/appRoutes";

export const getServerSideProps = async () => {
  const shootingsByState = await getApiData("count/shootings/state/name");
  const populationDataRaw = await fetch(
    "https://datausa.io/api/data?drilldowns=State&measures=Population&year=latest"
    );
  const shootingsOverTimeRaw = await getApiData("count/shootings/overtime");
  const populationData = await populationDataRaw.json();

  const shootingsOverTime = await JSON.parse(JSON.stringify(shootingsOverTimeRaw));

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
    },
  };
};

function HomePage({ shootingsByState, shootingsPerCapita, shootingsOverTime }) {
  const [isPerCapita, setIsPerCapita] = useState(false);

  return (
    <Container>
      <Head />

      <Row>
        <Col lg={9}>
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
          

          <BrutalityByState
            data={isPerCapita ? shootingsPerCapita : shootingsByState} 
          />
          
          <BrutalityOverTime data={shootingsOverTime}/>

          
      </Col>
      <Col lg={3}>
        <h2>Recent Police Killings</h2>
        <SimpleBarReact style={{ maxHeight:300 }}>
          <Last20Victims />
          </SimpleBarReact>
          
        </Col>
</Row>

<Col>
          <h2>Police Brutality by the Numbers</h2>
          
          <EnhancedTable />
          
        </Col>


        



  
    </Container>
  );
}

export default HomePage;
