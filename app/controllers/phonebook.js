const shortid = require('shortid');
const httpStatus = require('http-status');
const error = require('app/errors');

class PhonebookController {
  /**
   * PhonebookController Constructor
   * @param phonebookService
   * @param logger
   * @param config
   * @param cache
   */
  constructor(phonebookService, logger, config, cache) {
    this.phonebookService = phonebookService;
    this.logger = logger;
    this.config = config;
    this.cache = cache;
  }

  list(req, res, next) {
    const reqId = shortid.generate();
    this.logger.info(`Request ID ${reqId} - request to ${req.getRoute().name}`);

    this.phonebookService.list()
      .then((results) => {
        this.logger.info(`Request ID: ${reqId} - get successful`);
        res.send(httpStatus.OK, results);
      })
      .catch((error) => {
        this.logger.error(error);
        res.send(
          httpStatus.INTERNAL_SERVER_ERROR,
          error,
        );
      });
    return next();
  }

  get(req, res, next) {
    const reqId = shortid.generate();
    this.logger.info(`Request ID ${reqId} - request to ${req.getRoute().name}`);
    const { id } = req.params;

    this.phonebookService.get(id)
      .then((results) => {
        this.logger.info(`Request ID: ${reqId} - get successful`);
        res.send(httpStatus.OK, results);
      })
      .catch((error) => {
        this.logger.error(error);
        this.logger.error(`Request ID: ${reqId} - get failed`);
        res.send(
          httpStatus.INTERNAL_SERVER_ERROR,
          error,
        );
      });

    return next();
  }

  save(req, res, next) {
    const reqId = shortid.generate();
    this.logger.info(`Request ID ${reqId} - request to ${req.getRoute().name}`);
    const data = req.body;

    this.phonebookService.save(data)
      .then((results) => {
        this.logger.info(`Request ID: ${reqId} - get successful`);
        res.send(httpStatus.CREATED, results);
      })
      .catch((error) => {
        this.logger.error(error);
        this.logger.error(`Request ID: ${reqId} - get failed`);
        res.send(
          httpStatus.INTERNAL_SERVER_ERROR,
          error,
        );
      });

    return next;
  }

}

module.exports = PhonebookController;
