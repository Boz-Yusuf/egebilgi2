const Response = require("../../utils/response-types");
const jwt = require("jsonwebtoken");
const token_secret =
  "457a19fb4cb2e03b1138db036f4aac9cf4701f62fac1fd9fd2bb74e0280bd302";

exports.checkAuthenticate = (req, res, next) => {
  var header = req.headers.authorization;
  const token = header && header.split(" ")[1];

  if (token == null) {
    const response = new Response.emptyResponse("", "Unauthorized User", 401);
    return res.send(response);
  }

  jwt.verify(token, token_secret, (err, user) => {
    if (err) {
      const response = new Response.emptyResponse("", "Unvalid Token", 403);
      return res.send(response);
    }
    req.user = user;
    next();
  });
};
