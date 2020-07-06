import React from "react";
  import { Link as NextLink } from "next/link";

import { Box, Button, Container, Link, Typography } from "@material-ui/core";

function Head() {
  const topWhitespace = "-0.3em"; // lineheight of font; lets top of text line up with logo image top

  return (
    <Box color="text.inverted" bgcolor="background.dark" pb={2} pt={4}>
      <Container maxWidth="lg">
        <Box
          display="flex"
          flexDirection={["column", "row"]}
          justifyContent="space-between"
          mb={3}
          px="1rem" // will match value in padded nav elements
        >
          <Box width={[180, 261]}>
            <img
              alt="Grassroots Law Project"
              display="block"
              height="auto"
              width="261"
              style={{ maxWidth: "100%" }}
              src="https://images.squarespace-cdn.com/content/5e7662fe45630059ae9347cf/1591116153336-2V6MDHUQAXMOIKOZI6DJ/glp+text+only+logo+neon.png?format=1500w&content-type=image%2Fpng"
            />
          </Box>
          <Box maxWidth="500px" ml={[0, 6]} mt={[3, topWhitespace]}>
            <Typography variant="body1">
              <Link color="inherit" href="https://www.grassrootslaw.org/">
                Grassroots Law Project
              </Link>{" "}
              collects information on police violence across the United States.
              This data is critical to identifying the national pattern of
              police brutality. This page provides a view into our database,
              which covers police killings for <b>2020 onward. </b>
            </Typography>
          </Box>
        </Box>
        <Box display="flex" flexDirection="row" flexWrap={["wrap", "none"]}>
          <Link
            align="center"
            color="inherit"
            component={NextLink}
            display="block"
            href="/"
            variant="body1"
          >
            <Box color="secondary.main" px={2} py={1}>
              Police Killings Dashboard
            </Box>
          </Link>
          <Link
            align="center"
            color="inherit"
            component={NextLink}
            display="block"
            href="/"
            variant="body1"
          >
            <Box px={2} py={1}>
              Home
            </Box>
          </Link>
          <Link
            align="center"
            color="inherit"
            component={NextLink}
            display="block"
            href="/methodology"
            variant="body1"
          >
            <Box px={2} py={1}>
              Our Methodology
            </Box>
          </Link>
          <Link
            align="center"
            color="inherit"
            component={NextLink}
            display="block"
            href="/resources"
            variant="body1"
          >
            <Box px={2} py={1}>
              Resources
            </Box>
          </Link>
          <Button
            ml={2}
            variant="outlinedSecondary"
            href="https://secure.actblue.com/donate/glp-homepage?refcode=homepage_nav"
          >
            Donate
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Head;
