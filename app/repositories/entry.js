
class EntryRepository {
  constructor(logger, cache, config) {
    this.logger = logger;
    this.cache = cache;
    this.config = config;
  }

  findAll() {
      return new Promise((resolve, reject) => {

          this.cache.client.hgetall(this.config.book, (err, reply) => {
              if (err) {
                  reject(err);
              } else {
                  resolve(
                      {
                        book: this.config.book,
                        data: reply
                      }
                    );
              }
          })
      })
  }

  findByName(name) {
      return new Promise((resolve, reject) => {
        this.cache.client.hget(this.config.book, name, (err, reply) => {
            if (!err) {
                this.logger.debug('Entry retrieval by name succeeded.');
                resolve(reply);
            } else {
                this.logger.error('Entry retrieve failed.');
                reject(err);
            }
        });

      });
  }

  save(data) {
      this.logger.info('Going to persist a entry now.');
      return new Promise((resolve, reject) => {
        this.cache.client.hset(this.config.book, data.name, data.number, (err, reply) => {
            if (err) {
                this.logger.error('Entry persistence failed.');
                reject(err);
            } else {
                this.logger.debug('Entry persisted');
                data.result = reply;
                resolve(data);
            }
        });
      });
  }
}

module.exports = EntryRepository;
