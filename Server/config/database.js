module.exports = () => {
  const mongoose = require("mongoose");
  const dotenv = require("dotenv");
  dotenv.config();
  //mongoURL : `mongodb://${key.MONGO_USER}:${key.MONGO_PASSWORD}@${key.MONGO_HOST}:${key.MONGO_PORT}/${key.MONGO_DB_NAME}`,
  mongoose.connect(
    `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  mongoose.Promise = Promise;
  mongoose.connection.on("connected", () => {
    console.info("++ Successfully connected to the database ++");
  });

  mongoose.connection.on("reconnected", () => {
    console.info("reconnected mongoDB");
  });

  mongoose.connection.on("disconnected", () => {
    console.error(" Disconnected mongoDB");
  });

  mongoose.connection.on("close", () => {
    console.error("Connection mongoDB Closed");
  });

  mongoose.connection.on("error", (error) => {
    console.error("ERROR mongoDB: " + error);
  });
  //handle Promise Error
  process.on("unhandledRejection", (error) => {
    console.log("unhandledRejection", error.message);
  });

  return mongoose;
};
