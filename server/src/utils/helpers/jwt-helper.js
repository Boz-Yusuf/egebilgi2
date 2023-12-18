const jwt = require("jsonwebtoken");
const token_secret =
  "457a19fb4cb2e03b1138db036f4aac9cf4701f62fac1fd9fd2bb74e0280bd302";

exports.generateAccessToken = (userInfo) => {
  return jwt.sign(userInfo, token_secret, { expiresIn: "3h" });
};
