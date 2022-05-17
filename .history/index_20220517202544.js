//imports
const express = require("express");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

//swagger docs
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

//import routes
const login = require("./routes/login");

//app
let app = express();

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//db
const db = require("./setup/myurl").mongoURL;

//connection to db
mongoose
  .connect(db)
  .then(() => console.log("connected to mongo "))
  .catch((err) => console.log(err));

//passport middleware
app.use(passport.initialize());
//config jwt strategy
require("./Strategy/jwtStrategy")(passport);

// app.get("/", (req, res) => res.send("this is jwt"));

app.use("/", login);

//create server
app.listen(port, (req, res) => {
  console.log("Server listening");
});
