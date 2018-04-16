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

serviceLocator.register('PhonebookController', () => {
  const service = serviceLocator.get('PhonebookService');
  const logger = serviceLocator.get('logger');
  return new PhonebookController(service, logger, config, cache);
});

serviceLocator.register('PhonebookRepository', (locator) => {
  const logger = locator.get('logger');
  return new PhonebookRepository(logger);
});

serviceLocator.register('PhonebookService', (locator) => {
  const repo = locator.get('PhonebookRepository');
  const logger = locator.get('logger');
  return new PhonebookService(repo, logger);
});

module.exports = serviceLocator;
