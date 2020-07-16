import getDb from "./db";

//Count object constructor
var Count = function (count) {
  this.count = count.count;
  this.status = count.status;
  this.created_at = new Date();
};

Count.countAllRecords = async function (result) {
  const sql = await getDb();
  sql.query(
    "select (Select count(*) as total from shootings) + (Select count(*) as total from brutality) as total",
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Count.countAllUnarmedKillings = async function (result) {
  const sql = await getDb();
  sql.query(
    "Select (Select count(*) as total from shootings) AS total, (SELECT count(armed_unarmed) FROM shootings WHERE armed_unarmed = 'Unarmed') AS weaponStatus",
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};
Count.countAllArmedKillings = async function (result) {
  const sql = await getDb();
  sql.query(
    "Select (Select count(*) as total from shootings) AS Total, (SELECT count(armed_unarmed) FROM shootings WHERE armed_unarmed NOT IN ('Unarmed')) AS Armed",
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Count.countAllShootings = async function (result) {
  const sql = await getDb();
  sql.query("Select count(*) as total from shootings", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Count.countAllBrutality = async function (result) {
  const sql = await getDb();
  sql.query("Select count(*) as total from brutality", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Count.countAllRecordsByState = async function (result) {
  const sql = await getDb();
  sql.query(
    "(Select state, count(*) as total from milehigh_grassroots_law.shootings group by state order by state) UNION (Select state, count(*) as total from milehigh_grassroots_law.brutality group by state order by state) ",
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Count.countAllShootingsByState = async function (result) {
  const sql = await getDb();
  sql.query(
    "Select state, count(*) as total from shootings group by state order by state",
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Count.countAllBrutalityByState = async function (result) {
  const sql = await getDb();
  sql.query(
    "Select state, count(*) as total from brutality group by state order by state",
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Count.countAllRecordsByStateAbbv = async function (result) {
  const sql = await getDb();
  sql.query(
    "(Select state_code, count(*) as total from milehigh_grassroots_law.shootings group by state_code order by state_code) UNION (Select state_code, count(*) as total from milehigh_grassroots_law.brutality group by state_code order by state_code) ",
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Count.countAllShootingsByStateAbbv = async function (result) {
  const sql = await getDb();
  sql.query(
    "Select state_code, count(*) as total from shootings group by state_code order by state_code",
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Count.countAllBrutalityByStateAbbv = async function (result) {
  const sql = await getDb();
  sql.query(
    "Select state_code, count(*) as total from brutality group by state_code order by state_code",
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Count.countAllRecordsByStateCounty = async function (result) {
  const sql = await getDb();
  sql.query(
    "(Select state, county, count(*) as total from milehigh_grassroots_law.shootings group by state, county order by state, county) UNION (Select state, county, count(*) as total from milehigh_grassroots_law.brutality group by state, county order by state, county) ",
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Count.countAllShootingsByStateCounty = async function (state, result) {
  const sql = await getDb();
  const where = state ? "where state = ?" : "";
  let query = `Select state, county, count(*) as total from shootings ${where} group by state, county order by state, county`;
  sql.query(query, [state], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Count.countAllBrutalityByStateCounty = async function (result) {
  const sql = await getDb();
  sql.query(
    "Select state, county, count(*) as total from brutality group by state, county order by state, county",
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

//BrutalityOverTime.js query

Count.countAllShootingsOverTime = async function (state, result) {
  const sql = await getDb();
  const where = state ? "and state = ?" : "";
  const query = `Select count(date) as 'count', state, date_format(date, '%Y-%m') as 'month' from shootings where date_format(date, '%Y-%m') != '0000-00' ${where} group by date_format(date, '%Y-%m') having count(*) >= 1 order by date asc`;
  sql.query(query, [state], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Count.countTopPoliceDepartments = async function (state, result) {
  const sql = await getDb();
  const where = state ? "where state = ?" : "";
  const query = `Select police_department, state, count(*) as count from shootings ${where} group by police_department order by count desc limit 20`;
  sql.query(query, [state], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

export default Count;
