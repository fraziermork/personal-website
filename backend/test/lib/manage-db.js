'use strict';

// set environment variables 
process.env.MONGODB_URI = 'mongodb://localhost/fm_test';

// npm modules 
const debug           = require('debug')('fm:test-manage-db'); 
const Promise         = require('bluebird');
const mongoose        = require('mongoose');

// internal modules
const mongooseManager = require('../../lib/mongoose-manager');

module.exports = manageDb;

function manageDb() {
  return {
    startDummyDbBeforeTests() {
      debug('manageDb startDummyDbBeforeTests');
      return mongooseManager.startConnectionToDatabase();
    }, 
    
    dropDummyDbAfterTests() {
      debug('manageDb dropDummyDbAfterTests');
      return new Promise((resolve, reject) => {
        mongoose.connection.db.dropDatabase((err) => {
          debug('Database dropped');
          if (err) return reject(err);
          return resolve();
        });
      });
    },
  };
}
