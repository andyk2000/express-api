const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const config = require("./app.config");
const usersRoutes = require("./routes/Users");
const servicesRoutes = require("./routes/Services");
const usersController = require("./controller/Users");
const servicesController = require("./controller/Services");
const servicesMiddleware = require("./middlewares/Services");

const app = express();

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(cookieParser())

app.get(usersRoutes.users, usersController.getUsers);
app.get(usersRoutes.login, usersController.login);
app.post(usersRoutes.signup, usersController.signup);

app.get(servicesRoutes.services,servicesMiddleware.check, servicesController.getServices);
app.get(servicesRoutes.servicesId,servicesMiddleware.check, servicesController.getServicesByID);
app.put(servicesRoutes.servicesId,servicesMiddleware.check, servicesController.updateServices);
app.delete(servicesRoutes.servicesId,servicesMiddleware.check, servicesController.deleteServices);
app.post(servicesRoutes.services,servicesMiddleware.check, servicesController.createServices);

app.listen(config.port, () => {
    console.log(`api app running on port: ${config.port}`);
})