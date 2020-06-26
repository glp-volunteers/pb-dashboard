import mysql from "mysql";

const dev = process.env.NODE_ENV !== "production";
let connected = false;

// MySQL setup
const connection = mysql.createConnection({
  host: "localhost",
  user: dev ? "root" : "milehigh_glp_read",
  password: process.env.DBPASS,
  database: "milehigh_grassroots_law",
});

export default async function () {
  if (connected) {
    return Promise.resolve(connection);
  }
  return new Promise(function (res, rej) {
    connected = true;
    connection.connect(function (err) {
      if (err) rej(err);
      res(connection);
    });
  });
}
