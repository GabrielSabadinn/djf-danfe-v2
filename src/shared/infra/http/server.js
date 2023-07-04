require("reflect-metadata");
require("dotenv/config");
const cors = require("cors");
const express = require("express");
const { router } = require("./routes");

const app = express();

app.use(cors());

app.use(express.text({ limit: "50mb" }));

app.use(router);

app.listen(process.env.APP_PORT || 3000, () => {
  console.log(`Server esta rodando da porta: ${process.env.APP_PORT || 3000}`);
});
