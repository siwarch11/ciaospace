const express = require("express");
var cors = require("cors");
const bodyParser = require("body-parser");

// create express app
const app = express();
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// define a simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Rest API By Chaaben Group." });
});

require("./app/routes/admin.routes.js")(app);
require("./app/routes/user.routes.js")(app);
require("./app/routes/partner.routes.js")(app);
require("./app/routes/horaire.routes.js")(app);
require("./app/routes/preference.routes.js")(app);
require("./app/routes/evaluation.routes.js")(app);
require("./app/routes/reservation.routes.js")(app);
require("./app/routes/offre.routes.js")(app);
require("./app/routes/reclamation.routes.js")(app);

// listen for requests
app.listen(3000, "192.168.37.220", () => {
  console.log("Server is listening on port 3000");
});
