import React from "react";
import { Button } from "react-bootstrap";
import BrutalityByState from "components/widgets/BrutalityByState";
import BrutalityOverTime from "components/widgets/BrutalityOverTime";

function HomePage() {
  return (
    <div>
      <h1>Police Brutality Dashboard</h1>
      <BrutalityOverTime />
      <BrutalityByState />
      <Button>Test Button</Button>
    </div>
  );
}

export default HomePage;
