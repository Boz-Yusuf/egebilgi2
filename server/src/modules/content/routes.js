const express = require("express");
const router = express.Router();
const {
  checkAuthenticate,
} = require("../../utils/middlewares/auth-middleware");

const contentController = require("./controller");

router.get("/ner", checkAuthenticate, contentController.getNerSentence);
router.get("/pos", checkAuthenticate, contentController.getPosSentence);
router.post("/ner", checkAuthenticate, contentController.sendNerAnswer);
router.post("/pos", checkAuthenticate, contentController.sendPosAnswer);

module.exports = router;
