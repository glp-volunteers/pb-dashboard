import React from "react";
import Head from "pages/head";
import { Box, Container, Link } from "@material-ui/core";

function Resources() {
  return (
    <div>
      <Head />
      <Container>
        <Box maxWidth={680} mx="auto">
          <h2>Resources</h2>
          <p>
            Below are a list of resources we have made available to the public.
          </p>

          {/* Segment talking about our data */}

            <h3>Our Data</h3>
            <p>
              To get a copy of our latest dataset, follow{" "}
            <Link href="https://github.com/glp-volunteers/pb-dashboard/blob/master/db/police_killings.csv">
              <b> this link.</b>
            </Link>
            </p>
              To read about how we gather our data, please visit our{" "}
            <Link href="/methodology">
              <b> Methodology page.</b>
            </Link>

            {/* Segment talking about this as a open source project. */}
            <h3>This Open Source Project</h3>
            <p>
              This Police Brutality application is an open-source project. Anyone can contribute. To see our sourcecode and our Github repository , please follow {" "}
            <Link href="https://github.com/glp-volunteers/pb-dashboard/">
              <b>this link.</b>
            </Link>
            </p>

            {/* Segment talking about process for reporting app and/or data issues. */}

            <h3>Reporting Data or Application Issues</h3>
            <p>
              If you find bugs or any data issues , please file an issue by following {" "}
            <Link href="https://github.com/glp-volunteers/pb-dashboard/issues/new">
              <b>this link.</b>
            </Link>
            </p>
            {/* Segment talking about upcoming features for technical audiences. */}
            <h3>Developers, Data Scientists, and Analytics Audiences</h3>
            <p>
            At some point, we will release documentation for consuming our APIs, along with data science/analytical tools for the public to use. Stay tuned.
            </p>
         
          
        
        </Box>
      </Container>
    </div>
  );
}

export default Resources;
