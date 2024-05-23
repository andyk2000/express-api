const express = require("express");
const bodyParser = require("body-parser");
const config = require("./app.config");

const app = express();

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.listen(config.port, () => {
    console.log(`api app running on port: ${config.port}`);
})