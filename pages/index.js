import React from "react";
import Link from "next/link";
import Head from "pages/head";
import materialUI from "@material-ui/core";
import { Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";
import BrutalityByState from "components/widgets/BrutalityByState";
import BrutalityOverTime from "components/widgets/BrutalityOverTime";
import BrutalityMap from "components/widgets/BrutalityMap";
import EnhancedTable from "components/widgets/TableData";
import Last20Victims from "components/widgets/Last20Victims";
import AboutUs from "pages/aboutus";
import { getApiData } from "api/routes/appRoutes";

export const getServerSideProps = async ({ req }) => {
  const mapData = await getApiData("count/shootings/state/name");
  console.log("mapData", mapData);
  return {
    props: {
      mapData,
    },
  };
};

function HomePage({ mapData }) {
  return (
    <div>
      <Container
        style={{ width: "1200px", backgroundColor: "#0B0C10", padding: "1em" }}
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
              Police Killings Dashboard
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

    <div>

  <Head />


      

<Container>
  <Row>
      <Col sm={7} >
        <BrutalityMap data={mapData} />
      <BrutalityOverTime />

      </Col>

      <Col sm={5}>
        <h3>Last 20 Reported Police Killings</h3>
      <Last20Victims /> 
      </Col>
  </Row>

</Container>


  <Container>
  <EnhancedTable/>

  </Container>

      <Container style={{borderColor: "#c5c6c8"}}>
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
