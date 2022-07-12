const winston = require('winston')
require('winston-daily-rotate-file')
const path = require('app-root-path')

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});


const infoTransport = new winston.transports.DailyRotateFile({
  filename: `${path}/logs/accessLogs/application-%DATE%.log`,
  datePattern: 'YYYY-MM-DD-HH',
  frequency: '24h',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '30d'
});

const errorTransport = new winston.transports.DailyRotateFile({
  filename: `${path}/logs/errorLogs/error-%DATE%.log`,
  datePattern: 'YYYY-MM-DD-HH',
  frequency: '24h',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '30d'
})

infoTransport.on('rotate', function (oldFilename, newFilename) {
  // do something fun
})

errorTransport.on('rotate', function (oldFilename, newFilename) {
  // do something fun
})

const infoLogger = createLogger({
  format: combine(
    timestamp({ format: 'YY-MM-DD hh:mm:ss' }),
    format.errors({ stack: true }),
    myFormat
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    infoTransport
  ]
})

const errorLogger = createLogger({
  format: combine(
    timestamp({ format: 'YY-MM-DD hh:mm:ss' }),
    format.errors({ stack: true }),
    format.json(),
    myFormat
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    errorTransport
  ]
})

var logHelper = {
  log(msg) {
    infoLogger.info(msg);
  },
  error(req, msg) {
    errorLogger.error(req?.originalUrl + " " + msg);
  }
};

module.exports = logHelper
