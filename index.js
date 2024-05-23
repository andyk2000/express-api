const express = require("express");
const bodyParser = require("body-parser");
const config = require("./app.config");
const routes = require("./routes/Users");
const controller = require("./controller/Users");

const app = express();

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get(routes.users, controller.getUsers);
app.get(routes.login, controller.login);

app.listen(config.port, () => {
    console.log(`api app running on port: ${config.port}`);
})