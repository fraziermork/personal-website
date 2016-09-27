'use strict';

// environment variables 
if (process.env.NODE_ENV === 'production' && (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN)) {
  throw new Error('Mailgun configuration required');
}

// npm modules 
const debug       = require('debug')('fm:contactRouter');
const express     = require('express');
const bodyParser  = require('body-parser').json();
const Mailgun     = require('mailgun-js');
const mailgun     = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY, 
  domain: process.env.MAILGUN_DOMAIN,
});

// internal modules 
const AppError    = require('../lib/app-error');

// module exports 
const router      = express.Router();
module.exports    = router;


router.post('/', bodyParser, (req, res, next) => {
  debug('POST /contact \n', req.body);
  
  // Error out if invalid request 
  if (!req.body.name || !req.body.text || !req.body.from || !req.body.subject) {
    return next(new AppError(400, 'Incoming request missing required fields'));
  }
  
  // Attach required properties 
  req.body.to      = process.env.npm_config_email;
  req.body.subject = `WEBSITE CONTACT: ${req.body.subject}`;
  req.body.from    = `${req.body.name} <${req.body.from}>`;
  delete req.body.name;
  
  debug('req.body after formatting: \n', req.body);
  
  // Send email 
  mailgun.messages().send(req.body, (err, body) => {
    if (err) {
      debug('ERROR: \n', err);
      return next(new AppError(500, err));
    }
    return res.status(204).end();
  });
});

router.all('*', function return404NotFound(_, res, next) {
  debug('*404');
  return next(new AppError(404, 'hit /contact 404 route'));
});
