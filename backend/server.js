const express = require("express");
const db = require("./db");

const app = express();

db.pool.query(
  `CREATE TABLE lists (
    id INTEGER AUTO_INCREMENT,
    value TEXT,
    PRIMARY KEY (id)
  )`,
  (err, results, fields) => {
    console.error(err);
    console.log("results :", results);
  }
);

app.use("/api/values", (req, res) => {
  db.pool.query("SELECT * FROM lists;", (err, results, fields) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    return res.json(results);
  });
});

app.post("/api/value", (req, res, next) => {
  db.pool.query(
    `INSERT INTO lists (value) VALUES("${req.body.value}")`,
    (err, results, fields) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      return res.json({
        success: true,
        value: req.body.value,
      });
    }
  );
});

app.listen(5000, () => {
  console.log("App starts on port 5000");
});
