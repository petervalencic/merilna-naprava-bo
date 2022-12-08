"use strict";
const FILENAME = "dbutil.js";
const { log4js } = require("./logger");
const log = log4js.getLogger(FILENAME);
const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const vrniTrenutnePodatke = (request,response) => {
    log.info(`vrniTrenutnePodatke - start()`);
    response.status(200).json({temperatura:47,vlaga: 80});
}

module.exports = {
  vrniTrenutnePodatke
};
