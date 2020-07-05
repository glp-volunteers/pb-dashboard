import React from "react";

import { Box, Paper, List, ListItem } from "@material-ui/core";

const TopPoliceDepartments = ({ data }) => {
  return (
    <Paper>
      <List>
        {data.map((item) => {
          return (
            <ListItem display="block" key={item.police_department}>
              <Box>
                <b>{item.police_department}</b>
                &nbsp;in {item.state} killed {item.count} people.
              </Box>
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export default TopPoliceDepartments;
