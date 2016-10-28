'use strict';
// if running app in development mode, need to use this to run backend

// environment variables 
const API_PORT      = process.env.API_PORT || 3000;

// npm modules 
const debug         = require('debug')('fm:backend-dev-server');
const cors          = require('cors');
const express       = require('express');
const app           = express();


// internal modules 
const backendRouter = require('./backend-router');

// server configuration 
app.use(cors());
app.use('/api', backendRouter);
const server        = app.listen(API_PORT, () => {
  debug(`backend dev server listening on ${API_PORT}`);
});
server.isRunning    = true;
module.exports      = server;
