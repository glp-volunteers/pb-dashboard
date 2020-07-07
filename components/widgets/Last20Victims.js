import React from "react";

import { Box, Paper, Link, List, ListItem } from "@material-ui/core";

const Last20Victims = ({ data }) => {
  return (
    <Paper>
      <Box>
        <List>
          {data.map((item) => {
            const humanDate = new Date(item.date).toDateString();
            return (
              <ListItem key={item.shootingsID}>
                <Box>
                  <Link target="_blank" rel="noreferrer" href={item.media_link}>
                    {item.victim_name}
                  </Link>
                  &nbsp;was killed in {item.county} County, {item.state}.
                  Reported on&nbsp;
                  {humanDate}.
                </Box>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Paper>
  );
};

export default Last20Victims;
