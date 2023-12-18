const authService = require("./service");
const Response = require("../../utils/response-types");
const jwtHelper = require("../../utils/helpers/jwt-helper");
const hashHelper = require("../../utils/helpers/hash-helper");

const logIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log("username: " + username);
    console.log("password: " + password);
    var user = await authService.logInUser(username);
    console.log(user);
    if (!user) {
      // const response = new Response(responseData, "", "", 200);
      res.status(404).send("Kullanici bulunamadi!");
      return;
    }

    var hashedPassword = hashHelper.hashPassword(username, password);

    if (hashedPassword != user.password) {
      res.status(400).send("Kullanici adi veya sifre yanlis");
      return;
    }

    var token = jwtHelper.generateAccessToken(user);
    res.json({ access_token: token });
  } catch (error) {
    const response = new Response.response("", error, "", error.statusCode);
    res.send(response);
  }
};

const register = (req, res) => {
  try {
    const { username, password, code } = req.body;

    if (code === "tavernaciMurat") {
      // const hashedPassword = hashHelper.hashPassword(username, password);
      authService.registerUser(username, password);
      const response = new Response.emptyResponse("", "User was created", 200);
      res.send(response);
    } else {
      const response = new Response.emptyResponse("Unvalid User", "", 401);
      res.send(response);
    }
  } catch (error) {
    const response = new Response.emptyResponse(
      error,
      "Could not create user",
      error.statusCode
    );
    res.send(response);
  }
};

const authTest = async (req, res) => {
  var user = await authService.logInUser("boz35");
  console.log(user);
  try {
    res.send("auth test run");
  } catch (error) {
    throw error;
  }
};

module.exports = {
  logIn,
  register,
  authTest,
};
