const joi = require('joi');

module.exports = joi.object().keys({
  name: joi.string().required(),
  number: joi.string().max(10).required()
}).required();
