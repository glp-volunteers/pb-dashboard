import getDb from "./db";

//Brutality object constructor
var Brutality = function (brutality) {
  this.brutality = brutality.brutality;
  this.status = brutality.status;
  this.created_at = new Date();
};

Brutality.getBrutalityById = async function (brutalityId, result) {
  const sql = await getDb();
  sql.query(
    "Select * from brutality where brutalityID = ? ",
    brutalityId,
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

Brutality.getBrutalityByIds = async function (
  brutalityId1,
  brutalityId2,
  result
) {
  const sql = await getDb();
  sql.query(
    "Select * from brutality where brutalityID between ? and ?",
    [brutalityId1, brutalityId2],
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

Brutality.getAllBrutality = async function (result) {
  const sql = await getDb();
  sql.query("Select * from brutality",
  function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Brutality.getAllBrutalityForState = async function (stateCode, result) {
  const sql = await getDb();
  sql.query("Select * from brutality where state = ?",
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

Brutality.getAllBrutalityByState = async function (result) {
  const sql = await getDb();
  sql.query("Select * from brutality order by state",
  function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

Brutality.getLast20Brutality = async function (result) {
  const sql = await getDb();
  sql.query("Select * from brutality order by date desc limit 20", 
  function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

export default Brutality;
