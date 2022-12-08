"use strict";
const FILENAME = "index.js";

require("dotenv").config();
const { log4js } = require("./lib/logger");
const log = log4js.getLogger(FILENAME);
const util = require("./lib/util");
const http = require("http");
const express = require("express");
const app = express();

app.get('/',(req,res) => {
    res.send(`Pozdravljen uporabnik. To sporočilo je iz strežnika`);
});

//ustvarimo strežnik, ki posluša na določenih vratih
app.listen(process.env.SERVER_PORT, () => {
  log.info(util.printBanner("APP Server"));
  log.info(
    `Zagnan ${new Date().toISOString}, Strežnik posluša na vratih ${
      process.env.SERVER_PORT
    }`
  );
});

