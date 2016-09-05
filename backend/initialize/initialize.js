'use strict';

const debug           = require('debug')('fm:initialize');
const mongooseManager = require('../lib/mongoose-manager');
const seedDatabase    = require('./lib/seed-database');

debug('about to seed database');

mongooseManager.startConnectionToDatabase()
 .then(() => {
   return seedDatabase.seedDatabaseWithArticles(`${__dirname}/../../data/articles`);
 })
 .then(() => {
   debug('database seeded');
   mongooseManager.closeConnectionToDatabase();
 })
 .catch((err) => {
   debug(err);
 });
 
