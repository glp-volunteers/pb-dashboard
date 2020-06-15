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
  sql.query("Select * from shootings", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("shootings : ", res);
      result(null, res);
    }
  });
};

Shooting.getLast20Shootings = async function (result) {
  const sql = await getDb();
  sql.query("Select * from shootings order by date desc limit 20", function (
    err,
    res
  ) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("shootings : ", res);
      result(null, res);
    }
  });
};

// Shooting.createShooting = async function (newShooting, result) {
//        const sql = await getDb();
//         sql.query("INSERT INTO shootings set ?", newShooting, function (err, res) {
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

// Shooting.updateById = async function(id, shooting, result){
//   const sql = await getDb();
//   sql.query("UPDATE shootings SET shooting = ? WHERE shootingsID = ?", [shooting.shooting, id], function (err, res) {
//           if(err) {
//               console.log("error: ", err);
//                 result(null, err);
//              }
//            else{
//              result(null, res);
//                 }
//             });
// };

// Shooting.remove = async function(id, result){
//      const sql = await getDb();
//      sql.query("DELETE FROM shootings WHERE shootingsID = ?", [id], function (err, res) {
//                 if(err) {
//                     console.log("error: ", err);
//                     result(null, err);
//                 }
//                 else{
//                  result(null, res);
//                 }
//             });
// };

export default Shooting;
