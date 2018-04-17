'use strict';

const config = require('app/config/config');
const loggingFactory = require('lib/logging');
const serviceLocator = require('lib/service_locator');
const Cache = require('lib/cache');

// Services
const PhonebookService = require('app/services/phonebook');

// Repositories
const PhonebookRepository = require('app/repositories/phonebook');

// Controllers
const PhonebookController = require('app/controllers/phonebook');


// Returns an instance of our preferred logger
serviceLocator.register('logger', () => loggingFactory.create(config.logging));

//  Returns an instance of the redis cache.
serviceLocator.register('cache', () => {
  const cache = new Cache(config.redis.port, config.redis.host);
  cache.select(config.redis.database);
  return cache;
});

serviceLocator.register('phonebookController', (locator) => {
  const service = serviceLocator.get('phonebookService');
  const logger = serviceLocator.get('logger');
  return new PhonebookController(service, logger, config);
});

serviceLocator.register('phonebookRepository', (locator) => {
  const logger = locator.get('logger');
  return new PhonebookRepository(logger, locator.get('cache'));
});

serviceLocator.register('phonebookService', (locator) => {
  const repo = locator.get('phonebookRepository');
  const logger = locator.get('logger');
  return new PhonebookService(repo, logger);
});

module.exports = serviceLocator;
