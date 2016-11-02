'use strict';

// npm modules 
const debug    = require('debug')('fm:seedDatabase');
const Promise  = require('bluebird');

// internal modules 
const Article       = require('../../resources/article/article-model');
const articleReader = require('./article-reader');

module.exports = {
  seedDatabaseWithArticles(inputPathToArticlesDirectory) {
    debug('seedDatabaseWithArticles');
    return articleReader.readEachArticle(inputPathToArticlesDirectory)
      .then((articles) => {
        debug('seedDatabaseWithArticles then');
        return Promise.all(articles.map((articleInfo) => {
          return Article.create(articleInfo); 
        }));
      });
  }
};
