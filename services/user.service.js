const user = require("../models/user.model");
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");

async function bcryptHash(passWord) {
    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(passWord, salt);
    return hash;
}
function generateToken(result) {
  return jwt.sign({ name: user.name }, process.env.key, {
    expiresIn: "1hr",
  });
}
async function hashPassword(){

}
//function tokenCompare(passWord, passWord,res) {


module.exports = {
  generateToken,
  bcryptHash,
};
