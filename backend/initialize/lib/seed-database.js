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
        return Promise.all(articles.map((articleInfo) => {
          // Attach the title as the url property so that t can be formatted by the setter on the model 
          articleInfo.url = articleInfo.title;
          return Article.create(articleInfo); 
        }));
      });
  }
};
