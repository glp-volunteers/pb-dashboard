import React from "react";
import Head from "next/head";

function ApiFaq() {
  return (
    <div className="container">
      <div className="jumbotron">
        <h1>FAQ</h1>

        <h3>Where did you get this data?</h3>
        <h2>Data was collected by volunteers of the Grassroot Law Project</h2>

        <h3>How accurate is this data?</h3>
        <h2>
          Data will refined by volunteers manually at this point to remove
          duplicates and validate entries
        </h2>
        <h2>
          Data is free to use, but we offer no guarantees on the data at this
          point in time.
        </h2>

        <h3>How can I help?</h3>
        <h2>Check with the Grassroot Law Project</h2>
      </div>
    </div>
  );
}

export default ApiFaq;
