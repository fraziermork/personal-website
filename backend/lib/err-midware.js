'use strict';

// npm modules 
const debug = require('debug')('fm:errMidware');

// internal modules 
const AppError = require('./app-error');

module.exports = errMidware;

function errMidware(err, req, res, next) {
  debug('errMidware');
  if (AppError.isAppError(err)) {
    console.error(`ERROR: code: ${err.statusCode} \n message: ${err.internalMessage}`);
    return res.status(err.statusCode).send(err.message);
  }
  console.error('Internal error not handled! \n', err.message);
  return res.status(500).send('Internal Server Error');  
}
