import React from "react";
import Head from "pages/head";
import { Container } from "react-bootstrap";

function Methodology() {
  return (
    <div>
      <Head />

      <Container>
        <h2>Methodology</h2>
        Grassroots Law Project volunteers collect and aggregate reports of both
        police shooting and police brutality or violence. For more details on
        how the research team is searching for and collecting this data, check
        out the{" "}
        <a href="https://docs.google.com/document/d/19mFluy_s6E7y8Q8Q97xCuM2I_teyVxWPnju9y1sjZzA/edit?rd=1">
          research guide.
        </a>
        <p></p>
        Once that data is collected, the team uses both automated and manual
        processes to clean it. This includes removing duplicate entries and
        ensuring that location and timestamp data matches the linked incident.
        <p></p>
        Each police shooting is recorded as a separate entry, while each police
        brutality incident can have multiple entries. We recorded multiple
        entries to capture multiple perspectives on the incident. For example,
        if two different people took video of the same incident.
        <p></p>
        Here are the APIs used to aggregate the data: http://policetracker.link/
      </Container>
    </div>
  );
}

export default Methodology;
