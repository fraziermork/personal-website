'use strict';

// npm modules
const debug           = require('debug')('fm:backendRouter');
const express         = require('express');
const router          = express.Router();
const morgan          = require('morgan');

// internal modules
const articlesRouter  = require('./routes/articles');
const contactRouter   = require('./routes/contact');
const errMidware      = require('./lib/err-midware');
const AppError        = require('./lib/app-error');

// handle mongoose 
const mongooseManager = require('./lib/mongoose-manager');
mongooseManager.startConnectionToDatabase()
  .catch((err) => {
    throw err;
  });

// configure routes 
router.use(morgan('dev'));
router.use('/articles', articlesRouter);
router.use('/contact', contactRouter);
router.all('*', function return404NotFound(_, res, next) {
  debug('*404');
  return next(new AppError(404, 'hit route.all 404 route'));
});
router.use(errMidware);

module.exports = router;
