const express = require("express");
var bodyParser = require("body-parser");

const app = express();

var cors = require("cors");
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", require("./api/quotes").router);
app.use("/api", require("./api/comments").router);

module.exports = app;
