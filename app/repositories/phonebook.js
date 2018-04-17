
class PhonebookRepository {
  constructor(logger, cache, config) {
    this.logger = logger;
    this.cache = cache;
    this.config = config;
  }

  findAll() {
      return new Promise((resolve, reject) => {

          this.cache.client.keys('*', function(err, reply) {
              if (err) {
                  reject(err);
              } else {
                  resolve(reply);
              }
          })
      })
  }

  findById(id) {
    // @todo - beyond usable scope for now
  }

  save(data) {
      this.logger.info('Going to persist a phonebook now.');
      return new Promise((resolve, reject) => {
        this.cache.client.hset(data.name, null, null, (err, reply) => {
            if (err) {
                this.logger.error('Phonebook persistence failed.');
                reject(err);
            } else {
                this.logger.debug('Phonebook persisted');
                data.result = reply;
                resolve(data);
            }
        });
      });
  }
}

module.exports = PhonebookRepository;
