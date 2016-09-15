'use strict';

const debug           = require('debug')('fm:initialize');
const mongooseManager = require('../lib/mongoose-manager');
const seedDatabase    = require('./lib/seed-database');
const Article         = require('../resources/article/article-model');

debug('about to seed database');

mongooseManager.startConnectionToDatabase()
 .then(() => {
   Article.find({}).remove().exec();
 })
 .then(() => {
   return seedDatabase.seedDatabaseWithArticles(`${__dirname}/../../data/articles`);
 })
 .then(() => {
   debug('database seeded');
   mongooseManager.closeConnectionToDatabase();
 })
 .catch((err) => {
   debug('ERROR: \n', err);
 });
 
