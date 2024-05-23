const express = require("express");
var bodyParser = require("body-parser");

const app = express();
const port = 8080;
var cors = require("cors");
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", require("./api/quotes").router);
app.use("/api", require("./api/comments").router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
