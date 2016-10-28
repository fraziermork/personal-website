'use strict';

const debug = require('debug')('fm:AppError');

module.exports = AppError;

const publicErrorMessages = {
  400: 'Bad Request', 
  404: 'Not Found', 
  500: 'Internal Server Error',
};

/**
 * AppError - Constructor function for internal errors supporting internal messages to log 
 *  
 * @param  {number} statusCode      the status code to respond with 
 * @param  {string} internalMessage a message describing what went wrong 
 */ 
function AppError(statusCode, internalMessage) {
  if (!statusCode || !publicErrorMessages[statusCode]) {
    statusCode = 500;
    debug('AppError defaulting to status 500.');
  }
  Error.call(this, publicErrorMessages[statusCode]);
  this.internalMessage = internalMessage;
  this.statusCode      = statusCode;
}

AppError.prototype  = Object.create(Error.prototype);
AppError.isAppError = isAppError;

function isAppError(err) {
  return err instanceof AppError;
}
