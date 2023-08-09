const express = require("express");
const mongoose = require("mongoose");
//const dbconfig = require("./config/db");
require("dotenv").config();
const app = express();

const userRoute = require("./routes/user.route");

mongoose.Promise = global.Promise;
mongoose.connect(process.env.db).then(
  () => {
    console.log("Database Connected Successfully");
  },
  (error) => {
    console.log("Database Not Connected" + error);
  }
);

app.use(express.json());
app.use("/users", userRoute);

app.listen(4005, function () {
  console.log("Port run on 4005");
});
