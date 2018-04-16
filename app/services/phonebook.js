/**
 * Phonebook Activities Model
 */
class PhonebookService {
  constructor(phonebookRepository, logger) {
    this.phonebookRepository = phonebookRepository;
    this.logger = logger;
  }

  /**
   * Get All The Phonebooks
   * @returns {Promise.<T>}
   */
  list() {
    return this.phonebookRepository.findAll()
      .then((results) => {
        if (!results) {
          throw new Error('No phonebook records were found');
        }

        return results;
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Get a specific phonebook by id
   * @param id
   * @returns {Promise.<T>}
   */
  get(id) {
    return this.phonebookRepository.findById(id)
      .then((result) => {
        if (!result) {
          throw new Error('phonebook not found');
        }

        return result;
      })
      .catch((error) => {
        throw error; // in this case we're happy for the error to be bubbled up
      });
  }

  save(data) {
    return this.phonebookRepository.save(data)
      .then((result) => {
        if (!result) {
          throw new Error('phonebook record not persisted');
        }

        return result;
      })
      .catch((error) => {
        throw error; // in this case we're happy for the error to be bubbled up
      });
  }


}

module.exports = PhonebookService;
