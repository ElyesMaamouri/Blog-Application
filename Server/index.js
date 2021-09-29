const express = require("express");
const dotenv = require("dotenv");
const app = express();
const http = require("http");
const cors = require("cors");
const errorHandler = require("errorhandler");
const helmet = require("helmet");
const session = require("express-session");
const xss = require("xss");
const logger = require("./config/logger");
const passport = require("passport");
const server = http.Server(app);
const port = process.env.PORT || 4000;
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

// Config Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog API",
      version: "1.0.0",
      description: "Blog applcation",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};
const specs = swaggerJSDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
// Connecting to the database
require("./config/database")();

// Load config
dotenv.config();

// Passport config
//require("./src/middleware/passport")(passport);

//Session
app.use(
  session({
    secret: process.env.KEY_SESSION,
    resave: false,
    saveUninitialized: false,
  })
);
//Passport Middleware
// app.use(passport.initialize());
// app.use(passport.session());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, OPTIONS, DELETE");
  next();
});

// '*' cross-orgin header
app.use(cors());
// To parse the incoming requests with JSON payloads (replace body-parser)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(errorHandler());

//Route API

require("./src/routes/auth")(app, process.env.PATH_API);
require("./src/routes/client")(app, process.env.PATH_API);
//app.use(xss());
server.listen(port, (err) => {
  if (err)
    throw logger.error("the server is not running !! " + process.env.PORT);
  console.log(`** the server is running on port ${port} **`);
});
