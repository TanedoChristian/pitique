const express = require("express");
const mysql = require("mysql2");
const app = express();

const path = require("path");

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "pitique",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL!");
    connection.release();
  }
});

app.get("/realtor", (req, res) => {
  pool.query("SELECT * FROM realtor", (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(results);
    }
  });
});

// When in PROD
// if (process.env.NODE_ENV === "production") {
//   app.use("/", express.static("../client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
//   });
// }

const port = process.env.PORT || 8000;

app.listen(port, () => console.log("Node JS Server Started"));
