'use strict';

// environment variables 
const DB_PORT    = process.env.MONGODB_URI || 'mongodb://localhost/db';

// npm modules 
const debug      = require('debug')('fm:mongooseManager');
const Promise    = require('bluebird');
const mongoose   = require('mongoose');
mongoose.Promise = Promise;



module.exports   = {
  /**  
   * startConnectionToDatabase - Starts the connection to MongoDB  
   *    
   */   
  startConnectionToDatabase() {
    debug(`startConnectionToDatabase, DB_PORT: ${DB_PORT}`);
    return new Promise((resolve, reject) => {
      // Attach event handlers 
      mongoose.connection.on('connected', () => {
        debug('mongoose connection open');
      });
      mongoose.connection.on('disconnected', () => {
        debug('mongoose connection closed');
      });
      mongoose.connection.on('error', (err) => {
        debug('mongoose error \n', err);
      });
      process.on('SIGINT', () => {
        debug('app closing, closing mongoose connection');
        this.closeConnectionToDatabase();
      });
      
      // Connect to MongoDB 
      mongoose.connect(DB_PORT, (err) => {
        if (err) return reject(err);
        return resolve();
      });
    });
  }, 
  
  /**  
   * closeConnectionToDatabase - Closes the connection to MongoDB 
   *    
   * @return {type}  description   
   */   
  closeConnectionToDatabase() {
    debug('closeConnectionToDatabase');
    mongoose.connection.close(() => {
      debug('mongoose connection closed');
    });
  },
};
