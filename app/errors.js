/**
 * @description Define errors available in project
 */
const create = require('custom-error-generator');

module.exports = {
  InvalidVersion: create('InvalidVersion', {
    code: 'INVALID_VERSION',
  }, null),

  NotImplemented: create('MethodNotImplemented', {
    code: 'METHOD_NOT_IMPLEMENTED',
  }, null),

  MethodNotAllowed: create('MethodNotAllowed', {
    code: 'METHOD_NOT_ALLOWED',
  }, null),

  RouteNotImplemented: create('RouteNotImplemented', {
    code: 'ROUTE_NOT_IMPLEMENTED',
  }, null),

  InvalidParams: create('InvalidParamsError', {
    code: 'INVALID_PARAMS',
  }, null),

  InternalServerError: create('InternalServerError', {
    code: 'INTERNAL_SERVER_ERROR',
  }, null),
};
