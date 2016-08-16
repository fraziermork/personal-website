'use strict';

const express     = require('express');
const app         = express();
const port        = process.env.PORT || 8080;
// const Mailgun     = require('mailgun-js');
// const mailgun     = new Mailgun({
//   apiKey: process.env.MAILGUN_API_KEY, 
//   domain: process.env.MAILGUN_DOMAIN,
// });

app.use(express.static(`${__dirname}/build`));
let server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
server.isRunning  = true;
module.exports    = server;
