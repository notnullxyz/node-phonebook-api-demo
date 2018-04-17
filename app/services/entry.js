/**
 * Entry Model
 */
class EntryService {
  constructor(entryRepository, logger) {
    this.entryRepository = entryRepository;
    this.logger = logger;
  }

  /**
   * Get All The Entries
   * @returns {Promise.<T>}
   */
  list() {
    return this.entryRepository.findAll()
      .then((results) => {
        if (!results) {
          throw new Error('No entries were found');
        }

        return results;
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Get a specific entry by name
   * @param id
   * @returns {Promise.<T>}
   */
  get(name) {
    return this.entryRepository.findByName(name)
      .then((result) => {
        if (!result) {
          throw new Error('entry not found');
        }

        return result;
      })
      .catch((error) => {
        throw error; // in this case we're happy for the error to be bubbled up
      });
  }

  save(data) {
    return this.entryRepository.save(data)
      .then((result) => {
        if (!result) {
          throw new Error('entry not persisted');
        }

        return result;
      })
      .catch((error) => {
        throw error; // in this case we're happy for the error to be bubbled up
      });
  }


}

module.exports = EntryService;
