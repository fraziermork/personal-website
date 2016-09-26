'use strict';






const express     = require('express');
const bodyParser  = require('body-parser');
const router      = express.Router();
module.exports    = router;

const AppError    = require('../lib/app-error');


if (process.env.NODE_ENV === 'production' && (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN)) {
  throw new Error('Mailgun configuration required');
}

const Mailgun     = require('mailgun-js');
const mailgun     = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY, 
  domain: process.env.MAILGUN_DOMAIN,
});


router.on('/', bodyParser, (req, res, next) => {
  // Error our if invalid request 
  if (!req.body.name || !req.body.body || !req.body.from || !req.body.subject) {
    return next(new AppError(400, 'Incoming request missing required fields'));
  }
  
  // Attach required properties 
  req.body.subject = `PORTFOLIO CONTACT: ${req.body.subject}`;
  req.body.from    = process.env.npm_config_email;
  
  // Send email 
  mailgun.messages.send(req.body, (err, body) => {
    if (err) {
      next(new AppError(500, err));
    }
    return res.status(204).send();
  });
});
