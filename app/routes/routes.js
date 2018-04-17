'use strict';

const entryValidator = require('app/validations/entryValidator');
const phonebookValidator = require('app/validations/phonebookValidator');


module.exports.setup = function setup(server, serviceLocator) {
  const phonebookController = serviceLocator.get('phonebookController');
  const entryController = serviceLocator.get('entryController');

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

  // create a new entry on the default book
  server.post({
    path: '/entry',
    name: 'create_entry',
    version: '1.0.0',
    scope: 'entry/create',
    validation: {
      params: entryValidator,
    },
  }, (req, res, next) => entryController.save(req, res, next));

  // get an entry by name
  server.get({
    path: '/entry/:name',
    name: 'get_entry_by_name',
    version: '1.0.0',
    scope: 'entry/get',
  }, (req, res, next) => entryController.get(req, res, next));

  // get all entries in the default book
  server.get({
    path: '/entry',
    name: 'list_entries',
    version: '1.0.0',
    scope: 'entry/list',
  }, (req, res, next) => entryController.list(req, res, next));

};
