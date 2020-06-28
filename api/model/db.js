import mysql from "mysql";

let connected = false;

console.log(`Running with database host ${process.env.DB_HOST}`);

// MySQL setup
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
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
