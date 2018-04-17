'use strict';

const shortid = require('shortid');
const httpStatus = require('http-status');
const error = require('app/errors');

class EntryController {
    /**
     * EntryController Constructor
     * @param entryService
     * @param logger
     * @param config
     * @param cache
     */
    constructor(entryService, logger, config) {
        this.entryService = entryService;
        this.logger = logger;
        this.config = config;
    }

    list(req, res, next) {
        const reqId = shortid.generate();
        this.logger.info(`Request ID ${reqId} - request to ${req.getRoute().name}`);

        this.entryService.list()
            .then((results) => {
                this.logger.info(`Request ID: ${reqId} - get successful`);
                res.send(httpStatus.OK, results);
            })
            .catch((error) => {
                this.logger.error(error);
                res.send(
                    httpStatus.INTERNAL_SERVER_ERROR,
                    error
                );
            });
        return next();
    }

    get(req, res, next) {
        const reqId = shortid.generate();
        this.logger.info(`Request ID ${reqId} - request to ${req.getRoute().name}`);
        const {name} = req.params;

        this.entryService.get(name)
            .then((results) => {
                this.logger.info(`Request ID: ${reqId} - get successful`);
                res.send(httpStatus.OK, results);
            })
            .catch((error) => {
                this.logger.error(error);
                this.logger.error(`Request ID: ${reqId} - get failed`);
                res.send(httpStatus.NOT_FOUND, error);
            });

        return next();
    }

    save(req, res, next) {
        const reqId = shortid.generate();
        this.logger.info(`Request ID ${reqId} - request to ${req.getRoute().name}`);
        const data = req.body;

        this.entryService.save(data)
            .then((results) => {
                this.logger.info(`Request ID: ${reqId} - get successful`);
                res.send(httpStatus.CREATED, results);
            })
            .catch((error) => {
                this.logger.error(error);
                this.logger.error(`Request ID: ${reqId} - get failed`);
                res.send(httpStatus.BAD_REQUEST, error);
            });

        return next;
    }

}

module.exports = EntryController;
