import React, { useState, useEffect } from "react";
// import { Container, Col, Row, Form, Badge } from "react-bootstrap";

import {
  Box,
  Chip,
  Container,
  Grid,
  Switch,
  Typography,
} from "@material-ui/core";

import Footer from "pages/footer";
import Head from "pages/head";
import BrutalityByState from "components/widgets/BrutalityByState";
import BrutalityOverTime from "components/widgets/BrutalityOverTime";
import BrutalityMap from "components/widgets/BrutalityMap";
import EnhancedTable from "components/widgets/TableData";
import Last20Victims from "components/widgets/Last20Victims";
import TopPoliceDepartments from "components/widgets/TopPoliceDepartments";
import CloseIcon from "@material-ui/icons/Close";

const universalAPIFetch = async (url) => {
  if (!process.browser) {
    const { getApiData } = require("api/routes/appRoutes");
    return getApiData(url);
  }
  const rawData = await fetch(`/api/${url}`);
  return rawData.json();
};

const getNationalData = async () => {
  const shootingsByState = await universalAPIFetch(
    "count/shootings/state/name"
  );
  const populationDataRaw = await fetch(
    "https://datausa.io/api/data?drilldowns=State&measures=Population&year=latest"
  );
  const shootingsOverTime = await universalAPIFetch("count/shootings/overtime");
  const last20Items = await universalAPIFetch("shootings/last20");
  const topPoliceDepartments = await universalAPIFetch("count/shootings/pd");
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

const getStateData = async (state) => {
  const shootingsByCounty = await universalAPIFetch(
    `count/shootings/statecounty/${state}`
  );
  const shootingsOverTime = await universalAPIFetch(
    `count/shootings/overtime/${state}`
  );
  const last20Items = await universalAPIFetch(`shootings/last20/${state}`);
  const topPoliceDepartments = await universalAPIFetch(
    `count/shootings/pd/${state}`
  );

  return {
    shootingsByCounty,
    shootingsOverTime,
    topPoliceDepartments,
    last20Items,
  };
};

export const getServerSideProps = async () => {
  const nationalData = await getNationalData();
  return nationalData;
};

function Dashboard({
  shootingsByState,
  shootingsByGeo,
  shootingsOverTime,
  topPoliceDepartments,
  last20Items,
  selectedState,
  setSelectedState,
  setIsPerCapita,
}) {
  return (
    <>
      <Head />
      <Container>
        <Grid container spacing={4}>
          <Grid item sm={12}>
            <h1>Police Killings in 2020</h1>
          </Grid>

          <Grid item sm={12} md={8}>
            <Box display={["block", "flex"]}>
              <h2>Police Killings by State</h2>
              {selectedState ? (
                <Chip
                  pill
                  variant="info"
                  style={{ verticalAlign: "bottom", fontSize: 18 }}
                >
                  {selectedState}{" "}
                  <CloseIcon
                    fontSize="inherit"
                    onClick={() => setSelectedState(null)}
                  />
                </Chip>
              ) : (
                <Box
                  alignItems="center"
                  component="label"
                  display="inline-flex"
                  ml={3}
                  pr={2}
                >
                  <Switch
                    onChange={(val) => {
                      setIsPerCapita(val.target.checked);
                    }}
                  />
                  <Typography component="span">Per Capita</Typography>
                </Box>
              )}

              <BrutalityMap
                data={shootingsByState}
                selectState={setSelectedState}
                selectedState={selectedState}
              />
            </Box>
          </Grid>
          <Grid item sm={12} md={4}>
            <h2>Recent Police Killings</h2>
            <Last20Victims data={last20Items} />
          </Grid>

          <Grid item sm={12} md={8}>
            <h2>Police Killings by {selectedState ? "County" : "State"}</h2>
            <BrutalityByState
              data={shootingsByGeo}
              x={selectedState ? "county" : "state"}
            />
          </Grid>
          <Grid item sm={12} md={4}>
            <h2>Police Departments with the Most Killings</h2>
            <TopPoliceDepartments data={topPoliceDepartments} />
          </Grid>

          <Grid sm={12} md={6}>
            <h2>Police Killings Over Time</h2>
            <BrutalityOverTime data={shootingsOverTime} />
          </Grid>
          <Grid sm={12} md={6}>
            <h2>By the Numbers</h2>
            <EnhancedTable />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

function HomePage({
  shootingsByState,
  shootingsPerCapita,
  shootingsOverTime,
  topPoliceDepartments,
  last20Items,
}) {
  const [isPerCapita, setIsPerCapita] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [stateData, setStateData] = useState({
    shootingsByCounty: [],
    shootingsOverTime: [],
    topPoliceDepartments: [],
    last20Items: [],
  });

  useEffect(() => {
    if (selectedState) {
      getStateData(selectedState).then(setStateData);
    }
  }, [selectedState, setStateData]);

  const byState = isPerCapita ? shootingsPerCapita : shootingsByState;
  const byGeo = selectedState ? stateData.shootingsByCounty : byState;
  const overTime = selectedState
    ? stateData.shootingsOverTime
    : shootingsOverTime;
  const policeDepartments = selectedState
    ? stateData.topPoliceDepartments
    : topPoliceDepartments;
  const last20 = selectedState ? stateData.last20Items : last20Items;

  return (
    <Dashboard
      shootingsByState={byState}
      shootingsByGeo={byGeo}
      shootingsOverTime={overTime}
      topPoliceDepartments={policeDepartments}
      last20Items={last20}
      selectedState={selectedState}
      setSelectedState={setSelectedState}
      setIsPerCapita={setIsPerCapita}
    />
  );
}

export default HomePage;
