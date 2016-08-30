'use strict';

const express = require('express');
const router  = express.Router();

const Mailgun     = require('mailgun-js');
const mailgun     = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY, 
  domain: process.env.MAILGUN_DOMAIN,
});
