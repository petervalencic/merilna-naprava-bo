"use strict";
const FILENAME = "index.js";

require("dotenv").config();
const { log4js } = require("./lib/logger");
const log = log4js.getLogger(FILENAME);
const util = require("./lib/util");
const bodyParser = require('body-parser');
const express = require("express");
const app = express();
const dbUtil = require('./lib/dbutil');

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/',(req,res) => {
    res.send(`Pozdravljen uporabnik. To sporočilo je iz strežnika`);
});

app.get('/podatki',dbUtil.vrniTrenutnePodatke); 


//ustvarimo strežnik, ki posluša na določenih vratih
app.listen(process.env.SERVER_PORT, () => {
  log.info(util.printBanner("APP Server"));
  log.info(
    `Strežnik posluša na vratih ${
      process.env.SERVER_PORT
    }`
  );
});

