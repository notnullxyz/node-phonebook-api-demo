'use strict';

const entryValidator = require('app/validations/entryValidator');
const phonebookValidator = require('app/validations/phonebookValidator');


module.exports.setup = function setup(server, serviceLocator) {
  const phonebookController = serviceLocator.get('phonebookController');
  //const entryController = serviceLocator.get('entryController');

  // create a phonebook
  server.post({
    path: '/phonebook',
    name: 'create_phonebook',
    version: '1.0.0',
    scope: 'phonebook/create',
    validation: {
      params: phonebookValidator,
    },
  }, (req, res, next) => phonebookController.save(req, res, next));

  // list all available phonebooks
  server.get({
    path: '/phonebook',
    name: 'list_phonebooks',
    version: '1.0.0',
    scope: 'phonebook/list',
  }, (req, res, next) => phonebookController.list(req, res, next));

  // POST /entry            - save an entry to a specific phonebook

  // GET /entry/:phonebook_id/:entry_id     - get a specific entry from a specific phonebook

  // GET /entry             - get all the entries in a specific phonebook
};
