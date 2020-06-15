import React from "react";
import BrutalityByState from "components/widgets/BrutalityByState";
import BrutalityOverTime from "components/widgets/BrutalityOverTime";

function HomePage() {
  return (
    <div>
      <h1>Police Brutality Dashboard</h1>
      <BrutalityOverTime />
      <BrutalityByState />
    </div>
  );
}

export default HomePage;
