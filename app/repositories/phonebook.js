
class PhonebookRepository {
  constructor(logger) {
    this.logger = logger;
    this.phonebook = null;
  }

  findAll() {
    // hit cache redis for find all... promise
  }

  findById(id) {
    // return this promise from cache redis for find by id.
  }
}

module.exports = PhonebookRepository;
