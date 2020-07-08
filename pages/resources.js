import React from "react";
import Head from "pages/head";
import { Box, Container, Link } from "@material-ui/core";
import { Link as NextLink } from "next/link";


function Resources() {
  return (
    <div>
      <Head />
      <Container>
        <Box maxWidth={680} mx="auto">
          <h1>Resources</h1>
          <p>
            Below are a list of resources we have made available to the public.
          </p>

          {/* Segment talking about our data */}

            <h2>Our Data</h2>
              To get a copy of our latest dataset, follow{" "}
            <Link href="https://github.com/glp-volunteers/pb-dashboard/blob/master/db/police_killings.csv">
              <b> this link.</b>
            </Link>
              To read about how we gather our data, please visit our{" "}
            <Link component={NextLink} href="/methodology">
              <b> Methodology page.</b>
            </Link>

            {/* Segment talking about this as a open source project. */}
            <h2>This Open Source Project</h2>
            <p>
              This Police Brutality application is a part of an open-source project. Anyone can contribute. <b>We have 2 repositories. </b> 
              To see our sourcecode and our Github repositories see the links below. {" "}
              </p>

              <ul>
                
            <li>
            <Link href="https://github.com/mjcronin/grassroots_law">
              <b>Data science repository using Python and Streamlit</b>
            </Link>
            </li>
            <li>
            <Link href="https://github.com/glp-volunteers/pb-dashboard/">
              <b>Application repository</b>
            </Link> </li>
            </ul>

            {/* Segment talking about process for reporting app and/or data issues. */}

            <h2>Reporting Data or Application Issues</h2>
            <p>
              If you find bugs or any data issues , please file an issue by following {" "}
            <Link href="https://github.com/glp-volunteers/pb-dashboard/issues/new">
              <b>this link.</b>
            </Link>
            </p>
            {/* Segment talking about upcoming features for technical audiences. */}
            <h2>Developers, Data Scientists, and Analytics Audiences</h2>
            <p>
            At some point, we will release documentation for consuming our APIs. For now, check out the data exploration our data scientists have embarked on..
            </p>

            <ul>

            <li>
            <Link href="https://jfmarx.gitlab.io/fun/police-killings-viz.html/">
              <b>Data + Visualizations Exploration for Police Killings Dataset</b>
            </Link> </li>
            
            <li>
            <Link href="http://policekillings.grassrootslaw.org/api-docs">
              <b>Our APIs</b>
            </Link> </li>

            </ul>
          
        </Box>
      </Container>
    </div>
  );
}

export default Resources;
