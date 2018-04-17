'use strict';

const config = require('./app/config/config');    // app configuration
const routes = require('./app/routes/routes');    // app routes

const versioning = require('restify-url-semver');
const validator = require('restify-joi-middleware');
const restify = require('restify');

const routeTable = require('./lib/route-table');
const handlers = require('./app/routes/handlers');
const serviceLocator = require('./app/config/di');

// service locator via dependency injection
const logger = serviceLocator.get('logger');

const server = restify.createServer({
    name: config.appName,
    versions: ['1.0.0'],
});

// API versioner, allow trailing slashes on uri
server.pre(restify.pre.sanitizePath());
server.pre(versioning({prefix: '/'}));

// set request handling and parsing
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

// Joi validation middleware for request params - see validations/ dir
server.use(validator());

// setup Routing and Error Event Handling
handlers.setup(server, logger);
logger.log(logger.levels);
routes.setup(server, serviceLocator);

// go go go!
server.listen(config.webserver.port, () => {
    logger.info('Server: %s listening at %s', server.name, server.url);

    if (process.env.NODE_ENV === 'development') {
        console.log('\nAPIs for this service:\n%s', routeTable(server.router.mounts, logger).toString());
    }
});


module.exports = server;
