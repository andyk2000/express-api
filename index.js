const express = require("express");
const bodyParser = require("body-parser");
const config = require("./app.config");
const usersRoutes = require("./routes/Users");
const servicesRoutes = require("./routes/Services");
const usersController = require("./controller/Users");
const servicesController = require("./controller/Services")

const app = express();

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get(usersRoutes.users, usersController.getUsers);
app.get(usersRoutes.login, usersController.login);

app.get(servicesRoutes.services, servicesController.getServices);
app.get(servicesRoutes.servicesId, servicesController.getServicesByID);
app.put(servicesRoutes.servicesId, servicesController.updateServices);
app.delete(servicesRoutes.servicesId, servicesController.deleteServices);
app.post(servicesRoutes.services, servicesController.createServices)

app.listen(config.port, () => {
    console.log(`api app running on port: ${config.port}`);
})