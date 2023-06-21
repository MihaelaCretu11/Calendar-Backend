"use strict";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./config");
const eventRoutes = require("./routes/event-routes");
const recursiveEventRoutes = require("./routes/recursiveEvent-routes");
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api", eventRoutes.routes);
app.use("/api", recursiveEventRoutes.routes);


app.listen(config.port, () =>
  console.log("App is listening on url http://localhost:" + config.port)
);
