"use strict";
const log4js = require("log4js");

const LOGGING_OPTIONS = {
  logFilename: "logs/merilna-naprava.log",
  logFileLevel: "debug",
  errorFileName: "logs/napake.log",
  hipchatLevel: "debug",
  consoleLevel: "debug",
};

//Konfiguracija loger-ja za beleženje napak in sporočil
log4js.configure({
  appenders: {
    appLogConfig: {
      type: "file",

      filename: LOGGING_OPTIONS.logFilename,
      maxLogSize: 10485760,
      compress: true,
      backups: 50,
      keepFileExt: true,
      layout: {
        type: "pattern",
        pattern: "%p %d{yyyy-MM-dd hh:mm:ss,SSS} [%X{identity}] %c %m",
      },
    },
    appLog: {
      type: "logLevelFilter",
      level: LOGGING_OPTIONS.logFileLevel,
      appender: "appLogConfig",
    },
    errorLogConfig: {
      type: "file",
      filename: LOGGING_OPTIONS.errorFileName,
      maxLogSize: 10485760,
      compress: true,
      backups: 50,
      keepFileExt: true,
      layout: {
        type: "pattern",
        pattern: "%p %d{yyyy-MM-dd hh:mm:ss,SSS} [%X{identity}] %c %m",
      },
    },
    errorLog: {
      type: "logLevelFilter",
      level: "ERROR",
      appender: "errorLogConfig",
    },
    consoleConfig: {
      type: "console",
      layout: {
        type: "pattern",
        pattern: "%p %d{yyyy-MM-dd hh:mm:ss,SSS} [%X{identity}] %c %m",
      },
    },
    console: {
      type: "logLevelFilter",
      level: LOGGING_OPTIONS.consoleLevel,
      appender: "consoleConfig",
    },
  },
  categories: {
    default: { appenders: ["appLog", "errorLog", "console"], level: "debug" },
  },
});


exports.log4js = log4js;
