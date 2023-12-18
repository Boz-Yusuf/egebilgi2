const express = require("express");
const authRouter = express.Router();

const authController = require("./controller");

authRouter.post("/login", authController.logIn);
authRouter.post("/register", authController.register);

//todo  SIL
authRouter.get("/authTest", authController.authTest);

module.exports = authRouter;
