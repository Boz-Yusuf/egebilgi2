const express = require("express");
const cors = require("cors");
const app = express();

const bodyParser = require("body-parser");

// * Route Imports
const sentenceRoute = require("./src/modules/content/routes");
const authRoute = require("./src/modules/auth/routes");

const PORT = process.env.PORT | 5000;
app.use(cors());
app.use(bodyParser.json());

app.use("/sentence", sentenceRoute);
s;
app.use("/auth", authRoute);

app.get("/api", (req, res) => {
  res.send("hello api");
});

app.get("/test", (req, res) => {
  res.send("test api");
});

app.listen(PORT, () => {
  console.log(`app listening on port: ${PORT}`);
});
