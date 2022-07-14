const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    rewuired: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  passWord: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
