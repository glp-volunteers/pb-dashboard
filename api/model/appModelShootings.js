import getDb from "./db";

//Shooting object constructor
var Shooting = function (shooting) {
  this.shooting = shooting.shooting;
  this.status = shooting.status;
  this.created_at = new Date();
};

Shooting.getShootingById = async function (shootingId, result) {
  const sql = await getDb();
  sql.query(
    "Select * from shootings where shootingsID = ? ",
    shootingId,
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

Shooting.getShootingByIds = async function (shootingId1, shootingId2, result) {
  const sql = await getDb();
  sql.query(
    "Select * from shootings where shootingsID between ? and ?",
    [shootingId1, shootingId2],
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

Shooting.getAllShootings = async function (result) {
  const sql = await getDb();
  sql.query("Select * from shootings",
  function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Shooting.getAllShootingsByState = async function (stateCode, result) {
  const sql = await getDb();
  sql.query("Select * from shootings where state_code = ?",
  stateCode,
  function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Shooting.getAllShootingsByState = async function (result) {
  const sql = await getDb();
  sql.query("Select * from shootings order by state",
  function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Shooting.getLast20Shootings = async function (result) {
  const sql = await getDb();
  sql.query("Select * from shootings order by date desc limit 20",
  function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

export default Shooting;
