const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const app = express();
const http = require("http");
const cors = require("cors");
const errorHandler = require("errorhandler");
const helmet = require("helmet");
const xss = require("xss");
const server = http.Server(app);
const logger = require("./config/logger");
const port = process.env.PORT || 4000;
// Connecting to the database
const connectDB = require("./config/database")();
dotenv.config();
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
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SECRETKEY,
  })
);
//app.use(xss());
server.listen(port, (err) => {
  if (err)
    throw logger.error("the server is not running !! " + process.env.PORT);
  console.log(`** the server is running on port ${port} **`);
});
