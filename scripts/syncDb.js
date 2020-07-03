const mysql = require("mysql");
const neatCsv = require("neat-csv");
const fs = require("fs");

console.log(`Running with database host ${process.env.DB_HOST}`);

let id = 0;
const states = {
  Alabama: "AL",
  Alaska: "AK",
  "American Samoa": "AS",
  Arizona: "AZ",
  Arkansas: "AR",
  California: "CA",
  Colorado: "CO",
  Connecticut: "CT",
  Delaware: "DE",
  "District Of Columbia": "DC",
  "Federated States Of Micronesia": "FM",
  Florida: "FL",
  Georgia: "GA",
  Guam: "GU",
  Hawaii: "HI",
  Idaho: "ID",
  Illinois: "IL",
  Indiana: "IN",
  Iowa: "IA",
  Kansas: "KS",
  Kentucky: "KY",
  Louisiana: "LA",
  Maine: "ME",
  "Marshall Islands": "MH",
  Maryland: "MD",
  Massachusetts: "MA",
  Michigan: "MI",
  Minnesota: "MN",
  Mississippi: "MS",
  Missouri: "MO",
  Montana: "MT",
  Nebraska: "NE",
  Nevada: "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  "Northern Mariana Islands": "MP",
  Ohio: "OH",
  Oklahoma: "OK",
  Oregon: "OR",
  Palau: "PW",
  Pennsylvania: "PA",
  "Puerto Rico": "PR",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  Tennessee: "TN",
  Texas: "TX",
  Utah: "UT",
  Vermont: "VT",
  "Virgin Islands": "VI",
  Virginia: "VA",
  Washington: "WA",
  "West Virginia": "WV",
  Wisconsin: "WI",
  Wyoming: "WY",
};

const transform = (row) =>
  Object.values({
    shootingsID: ++id,
    state: row.State,
    state_code: states[row.State],
    county: row.County,
    date: new Date(row.Timestamp).toJSON().split("T")[0],
    victim_name: `${row["Victim First Name (If not listed, enter Unknown)"]} ${row["Victim Last Name (If not listed, enter Unknown)"]}`,
    officer_name: `${row["Officer First Name (If not listed, enter Unknown)"]} ${row["Officer Last Name (If not listed, enter Unknown)"]}`,
    armed_unarmed: row["Victim Armed"],
    cause_of_death: row["Cause of Death"],
    officer_charged: row["Officer Charged"],
    alleged_crime: row["Alleged Crime/Reason for Police presence"],
    media_link: row["Link 1"],
    summay: row.Summary,
  });

const query = (connection, ...args) =>
  new Promise((res, rej) => {
    connection.query(...args, function (err, response) {
      if (err) {
        rej(err);
      } else {
        res(response);
      }
    });
  });

// MySQL setup
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_WRITE_USER,
  password: process.env.DB_WRITE_PASSWORD,
  database: "milehigh_grassroots_law",
});

const insertQuery =
  "INSERT INTO shootings (shootingsID, state, state_code, county, date, victim_name, officer_name, armed_unarmed, cause_of_death, officer_charged, alleged_crime, media_link, summay) VALUES ?";

connection.connect(async function (err) {
  if (err) throw err;

  const data = fs.readFileSync("./db/police_killings.csv");
  const parsedData = await neatCsv(data);
  const csvData = parsedData.map(transform);
  await query(connection, "TRUNCATE TABLE shootings");
  for (let d in csvData) {
    console.log(`Inserting ${d.shootingsID}`);
    await query(connection, insertQuery, [[d]]);
  }
  process.exit(0);
});
