'use strict';

const debug           = require('debug')('fm:initialize');
const mongooseManager = require('../lib/mongoose-manager');
const seedDatabase    = require('./lib/seed-database');
const Article         = require('../resources/article/article-model');

debug('about to seed database');

mongooseManager.startConnectionToDatabase()
 .then(() => {
   debug('articles removed');
   Article.find({}).remove().exec();
 })
 .then(() => {
   debug('seeding database');
   return seedDatabase.seedDatabaseWithArticles(`${__dirname}/../../data/articles`);
 })
 .then((articles) => {
   debug('database seeded');
   mongooseManager.closeConnectionToDatabase();
 })
 .catch((err) => {
   debug('ERROR: \n', err);
   mongooseManager.closeConnectionToDatabase();
 });
 
