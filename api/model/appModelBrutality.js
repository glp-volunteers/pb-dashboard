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
  sql.query("Select * from brutality", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("brutality : ", res);
      result(null, res);
    }
  });
};

Brutality.getLast20Brutality = async function (result) {
  const sql = await getDb();
  sql.query("Select * from brutality order by date desc limit 20", function (
    err,
    res
  ) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("brutality : ", res);
      result(null, res);
    }
  });
};

// Brutality.createBrutality = async function (newBrutality, result) {
//         const sql = await getDb();
//         sql.query("INSERT INTO brutality set ?", newBrutality, function (err, res) {
//                 if(err) {
//                     console.log("error: ", err);
//                     result(err, null);
//                 }
//                 else{
//                     console.log(res.insertId);
//                     result(null, res.insertId);
//                 }
//             });
// };

// Brutality.updateById = async function(id, brutality, result){
//   const sql = await getDb();
//   sql.query("UPDATE brutality SET brutality = ? WHERE brutalityID = ?", [brutality.brutality, id], function (err, res) {
//           if(err) {
//               console.log("error: ", err);
//                 result(null, err);
//              }
//            else{
//              result(null, res);
//                 }
//             });
// };

// Brutality.remove = async function(id, result){
//      const sql = await getDb();
//      sql.query("DELETE FROM brutality WHERE brutalityID = ?", [id], function (err, res) {
//                 if(err) {
//                     console.log("error: ", err);
//                     result(null, err);
//                 }
//                 else{
//                  result(null, res);
//                 }
//             });
// };

export default Brutality;
