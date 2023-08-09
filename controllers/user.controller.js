const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const userService = require("../services/user.service");
dotenv.config();

const register =async (req, res, next) => {
//   bcrypt.hash(req.body.passWord, 10, function (err, hashedPass) {
//     if (err) {
//       return res.status(400).send({
//         error: err,
//       });
//     }
    //console.log("here comes");
    const hashedPass = await userService.bcryptHash(req.body.passWord)
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      mobileNumber: req.body.mobileNumber,
      passWord: hashedPass,
    });
    // console.log(user);
    user
      .save()
      //res.json({user});
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((error) => {
        return res.status(400).send(error);
      });
//   });
};

const login = async (req, res, next) => {
  var userName = req.body.userName;
  var passWord = req.body.passWord;
  //   use try catch
  // check asyc await
  // const user = await User.findOne({ $or: [{ email: userName }, { mobileNumber: userName }] });
  User.findOne({ $or: [{ email: userName }, { mobileNumber: userName }] }).then(
    (user) => {
      if (user) {
        // userService.tokenCompare();
        bcrypt.compare(passWord, user.passWord, function (err, result) {
          if (err) {
            return res.status(401).send({
              error: err,
            });
            /**
             * Add return
             * add error status code Ref: Check rest api status  code
             */
          }
          if (result) {
            let token = userService.generateToken(result);
            res.status(200).send({
              message: "Login Succesful",
              token,
            });
          } else {
            return res.status(401).send({
              message: "Password Does not Match",
            });
          }
        });
      } else {
        return res.json({
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

// git remote add origin https://github.com/ArulMurugan11/user-1.git
// git branch -M main
// git push -u origin main
