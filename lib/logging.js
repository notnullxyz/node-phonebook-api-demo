/**
 * This file forms part of my toolbox repo of boilerplate node api stuff.
 */

const winston = require('winston');
const fs = require('fs');
const os = require('os');


/**
 * Function responsible for formatting the log lines in way that is parsable by logstash etc
 * @param entry the log entry to format
 * @returns {string} the log line that will be passed to the transports
 */
const formatter = (entry) => {
  const date = new Date(entry.timestamp()).toISOString();
  const message = entry.message || '';

  let context = '';
  if (entry.meta && Object.keys(entry.meta).length) {
    context = JSON.stringify(entry.meta);
  }

  const hostname = os.hostname();
  return JSON.stringify({
    context,
    event: {
      name: entry.level.toUpperCase(),
    },
    timestamp: date,
    message,
    env: {
      host: hostname,
    },
    cid: '',
    app: {
      name: process.env.APP_NAME,
      version: process.env.APP_VERSION,
    },
  });
};

/**
 * Generates the timestamp used by the log entries.
 * @returns {number} the timestamp
 */
const generateTimestamp = () => Date.now();

/**
 * Creates transports based on config values
 * @returns {array} the created transports
 */
const createTransports = (config) => {
  const transports = [];

  // setup the file transport
  if (config.file) {
    // create the file
    fs.open(config.file, 'w', (err, fd) => {
      if (err) {
        throw new Error(`Unable to create log file: ${err}`);
      }

      fs.chmod(config.file, '755');
      fs.close(fd);
    });

    // setup the log transport
    transports.push(new winston.transports.File({
      filename: config.file,
      json: false,
      timestamp: generateTimestamp,
      formatter,
      level: config.level,
    }));
  }

  // setup the console transport, because devs don't always want to tail log files.
  // if config.console is true, a console logger will also be implemented
  if (config.console) {
    transports.push(new winston.transports.Console({
      timestamp: generateTimestamp,
      formatter,
      level: config.level,
    }));
  }

  return transports;
};

module.exports = {

  /**
     * Creates a new logger instance using the config provided.
     * @param  {object} config The config used to setup the logger transports.
     * @return {logger} Returns a new instance of the winston logger.
     */
  create(config) {
    const logger = new winston.Logger({
      transports: createTransports(config),
    });
    logger.error = (err) => logger.log('error', err.message, { error: { code: err.code, stack: err.stack } });
    return logger;
  },
};
