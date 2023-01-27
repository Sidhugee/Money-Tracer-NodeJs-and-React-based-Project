const mongoose = require("mongoose");
require("dotenv").config();

const connect = mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.on("errorr", (err) => console.log(err));

connection.on("connected", () =>
  console.log("mongo Db connection sucessfully")
);