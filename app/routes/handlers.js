const httpStatusCodes = require('http-status');
const errors = require('app/errors');

/**
 * Allows us to register the Restify server handlers.
 * @description Sets up the Restify handlers.
 * @param  {Server} server An instance of the Restify server
 * @param {Logger} logger
 */
module.exports.setup = function setup(server, logger) {
    server.on('NotFound', (req, res) => {
        res.send(
            httpStatusCodes.NOT_FOUND,
            new errors.RouteNotImplemented('Route Not Implemented'),
        );
    });

    server.on('VersionNotAllowed', (req, res) => {
        res.send(
            httpStatusCodes.NOT_FOUND,
            new errors.InvalidVersion('Unsupported API version requested'),
        );
    });

    server.on('InvalidVersion', (req, res) => {
        res.send(
            httpStatusCodes.NOT_FOUND,
            new errors.InvalidVersion('Unsupported API version requested'),
        );
    });

    server.on('uncaughtException', (req, res, route, error) => {
        // scream at developers about what went wrong
        logger.error(error.stack);

        res.send(
            httpStatusCodes.INTERNAL_SERVER_ERROR,
            new errors.InternalServerError('Internal Server Error'),
        );
    });

    server.on('MethodNotAllowed', (req, res) => {
        res.send(
            httpStatusCodes.METHOD_NOT_ALLOWED,
            new errors.MethodNotAllowed('Method not Allowed'),
        );
    });
};
