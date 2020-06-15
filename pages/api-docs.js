import React from "react";
import Head from "next/head";

function ApiDocs() {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css"
        />
      </Head>
      <div className="container">
        <div className="jumbotron">
          <h1>
            APIs available for pulling police shootings and police brutality
          </h1>

          <h3>
            <a href="/api/shootings">/api/shootings</a> will return all records
            in our DB
          </h3>
          <h3>{"/api/shootings/{id} will return just record number id"}</h3>
          <h3>
            {"/api/shootings/{id1}-{id2} will return records from id1 to id2"}
          </h3>
          <h3>
            /api/shootings/last20 will return the last (most recent) 20 records
          </h3>
          <h3>
            /api/count will return the count of all shootings and brutality
            records
          </h3>
          <h3>
            /api/count/state/name will return the count of all shootings and
            brutality records by state
          </h3>
          <h3>
            /api/count/state/abbv will return the count of all shootings and
            brutality records by state abbreviation
          </h3>

          <h3>
            /api/count/shootings will return the count of all shootings records
          </h3>
          <h3>
            /api/count/shootings/state/name will return the count of all
            shootings records by state
          </h3>
          <h3>
            /api/count/shootings/state/abbv will return the count of all
            shootings records by state abbreviation
          </h3>
          <h3>
            /api/count/shootings/statecounty will return the count of all
            shootings records by state and county
          </h3>

          <h3>
            /api/count/brutality will return the count of all brutality records
          </h3>
          <h3>
            /api/count/brutality/state/name will return the count of all
            brutality records by state
          </h3>
          <h3>
            /api/count/brutality/state/abbv will return the count of all
            brutality records by state abbreviation
          </h3>
          <h3>
            /api/count/brutality/statecounty will return the count of all
            brutality records by state and county
          </h3>

          <h2>Future functionality will also include police brutality data</h2>
        </div>
      </div>
    </>
  );
}

export default ApiDocs;
