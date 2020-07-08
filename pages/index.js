import React, { useState, useEffect } from "react";
// import { Container, Col, Row, Form, Badge } from "react-bootstrap";

import {
  Box,
  Chip,
  Container,
  Grid,
  Hidden,
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
  const unarmedItems = await universalAPIFetch("count/unarmedKillings");

  const topPoliceDepartments = await universalAPIFetch("count/shootings/pd");
  const populationData = await populationDataRaw.json();
  const filteredShootingsByState = shootingsByState.filter((state) =>
    populationData.data.find((s) => s.State === state.state)
  );
  const shootingsPerCapita = filteredShootingsByState.map((state) => ({
    ...state,
    total:
      state.total /
      (populationData.data.find((s) => s.State === state.state).Population /
        1000000),
  }));

  return {
    props: {
      shootingsByState: filteredShootingsByState,
      shootingsPerCapita,
      shootingsOverTime,
      topPoliceDepartments,
      last20Items,
      unarmedItems,
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

function PerCapitaSwitch({
  className,
  selectedState,
  setSelectedState,
  isPerCapita,
  setIsPerCapita,
}) {
  return (
    <Box className={className} alignItems="center" display="inline-flex" ml={3}>
      {selectedState ? (
        <Chip
          color="primary"
          label={selectedState}
          onDelete={() => setSelectedState(null)}
        />
      ) : (
        <Box alignItems="center" component="label" display="inline-flex" pr={2}>
          <Switch
            onChange={(val) => {
              setIsPerCapita(val.target.checked);
            }}
            checked={isPerCapita || false}
          />
          <Typography component="span">Per Capita</Typography>
        </Box>
      )}
    </Box>
  );
}

function Dashboard({
  shootingsByState,
  shootingsByGeo,
  shootingsOverTime,
  topPoliceDepartments,
  last20Items,
  selectedState,
  setSelectedState,
  setIsPerCapita,
  isPerCapita,
  unarmedItems,
}) {
  return (
    <>
      <Head />
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Box pt={4} pb={2}>
              <Typography variant="h1">
                Police Killings in 2020: {unarmedItems[0].total} victims (
                {unarmedItems[0].weaponStatus} unarmed)
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box display={["block", "flex"]} alignItems="center" pb={3}>
              <Typography mb={3} variant="h2">
                Police Killings by State
              </Typography>
              <PerCapitaSwitch
                selectedState={selectedState}
                setSelectedState={setSelectedState}
                isPerCapita={isPerCapita}
                setIsPerCapita={setIsPerCapita}
              />
            </Box>
            <Box pt={2}>
              <BrutalityMap
                data={shootingsByState}
                selectState={setSelectedState}
                selectedState={selectedState}
                isPerCapita={isPerCapita}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography mb={3} variant="h2">
              Police Killings by {selectedState ? "County" : "State"}
            </Typography>
            <Hidden mdUp>
              <PerCapitaSwitch
                selectedState={selectedState}
                setSelectedState={setSelectedState}
                isPerCapita={isPerCapita}
                setIsPerCapita={setIsPerCapita}
              />
            </Hidden>
            <Box mt={3} height="700px">
              <BrutalityByState
                data={shootingsByGeo}
                x={selectedState ? "county" : "state"}
                isPerCapita={isPerCapita}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Typography mb={3} variant="h2">
              Recent Police Killings
            </Typography>
            <Box mt={3}>
              <Last20Victims data={last20Items} />
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography mb={3} variant="h2">
              Deadliest Police Forces
            </Typography>
            <Box mt={3}>
              <TopPoliceDepartments data={topPoliceDepartments} />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography mb={3} variant="h2">
              Police Killings Over Time
            </Typography>
            <Box mt={3}>
              <BrutalityOverTime data={shootingsOverTime} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography mb={3} variant="h2">
              By the Numbers
            </Typography>
            <Box mt={3}>
              <EnhancedTable />
            </Box>
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
  unarmedItems,
}) {
  const [isPerCapita, setIsPerCapita] = useState(false);
  const [selectedState, setSelectedState] = useState(null);
  const [stateData, setStateData] = useState({
    shootingsByCounty: [],
    shootingsOverTime: [],
    topPoliceDepartments: [],
    last20Items: [],
  });
  const [isUnarmedItems] = useState(unarmedItems);

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
      setSelectedState={(state) => {
        setSelectedState(state);
        setIsPerCapita(false);
      }}
      setIsPerCapita={setIsPerCapita}
      isPerCapita={isPerCapita}
      unarmedItems={isUnarmedItems}
    />
  );
}

export default HomePage;
