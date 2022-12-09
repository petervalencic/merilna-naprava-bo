"use strict";
const FILENAME = "app.js";

require("dotenv").config();
const { log4js } = require("./lib/logger");
const log = log4js.getLogger(FILENAME);
const util = require("./lib/util");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const dbUtil = require("./lib/dbutil");

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//Statične datoteke
app.use(express.static("public"));

//Določimo mapo za prikaz strani in template engine
app.set("views", "./views");
app.set("view engine", "ejs");


app.get("", (req, res) => {
  res.render("index", { tekst: "Poljubni tekst" });
});

app.get("/podatki", dbUtil.vrniTrenutnePodatke);

//Ustvarimo strežnik, ki posluša na določenih vratih
app.listen(process.env.SERVER_PORT, () => {
  log.info(util.printBanner("APP Server"));
  log.info(`Strežnik posluša na vratih ${process.env.SERVER_PORT}`);
});
