const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // handle error (null check)
    const { authorization } = req.headers;
    console.log("header  :" + authorization);
    if (authorization == null) {
      // throw error 401
      return res.status(401).send({
        message: "Invalid Token",
      });
    }
    const decode = jwt.verify(token, process.env.key);
    req.user = decode;
    next();
  } catch (err) {
    return res.status(401).send({
      message: "Authentication Failed!",
    });
  }
};

module.exports = authenticate;
