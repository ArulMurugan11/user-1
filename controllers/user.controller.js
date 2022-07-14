const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res, next) => {
  bcrypt.hash(req.body.passWord, 10, function (err, hashedPass) {
    if (err) {
      res.json({
        error: err,
      });
    }
    console.log("here comes");
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      mobileNumber: req.body.mobileNumber,
      passWord: hashedPass,
    });
    console.log(user);
    user
      .save()
      //res.json({user});
      .then((response) => {
        res.json(response);
      })
      .catch((error) => {
        res.json(error);
      });
  });
};

const login = (req, res, next) => {
  var userName = req.body.userName;
  var passWord = req.body.passWord;

  User.findOne({ $or: [{ email: userName }, { mobileNumber: userName }] }).then(
    (user) => {
      if (user) {
        bcrypt.compare(passWord, user.passWord, function (err, result) {
          if (err) {
            res.json({
              error: err,
            });
          }
          if (result) {
            let token = jwt.sign({ name: user.name }, "verySecretValue", {
              expiresIn: "1hr",
            });
            res.json({
              message: "Login Succesful",
              token,
            });
          } else {
            res.json({
              message: "Password Does not Match",
            });
          }
        });
      } else {
        res.json({
          message: "No User found",
        });
      }
    }
  );
};

const userprofile = (req, res, next) => {
  res.json({
    message: "Authentication Success",
  });
  //res.send("User");
};
module.exports = {
  register,
  login,
  userprofile,
};
