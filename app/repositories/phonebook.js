
class PhonebookRepository {
  constructor(logger, cache) {
    this.logger = logger;
    this.cache = cache;
  }

  findAll() {
      return new Promise((resolve, reject) => {

          this.cache.hgetall(options, function(err, reply) {
              if (err) {
                  reject(err);
              } else {
                  resolve(JSON.parse(body));
              }
          })
      })
  }

  findById(id) {
    // return this promise from cache redis for find by id.
  }
}

module.exports = PhonebookRepository;
