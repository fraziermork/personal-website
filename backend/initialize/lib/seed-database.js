'use strict';

// npm modules 
const debug    = require('debug')('fm:seedDatabase');
const Promise  = require('bluebird');
const fs       = Promise.promisifyAll(require('fs'));
const path     = require('path');

// internal modules 
const readArticlesDir = require('./read-directory');

module.exports = seedDatabase;


function seedDatabase(inputPathToArticlesDirectory, directoryCalledFrom) {
  debug('seedDatabase');
  readArticlesDir(inputPathToArticlesDirectory, directoryCalledFrom);
}
