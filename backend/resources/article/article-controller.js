'use strict';

// npm modules 
const debug = require('debug')('fm:articleCtrl');

// internal modules 
const Article = require('./article-model');

module.exports = {
  /**  
   * findArticleById - Finds an article by id if it is published 
   *    
   * @param  {type} articleId description   
   * @return {type}           description   
   */   
  findArticleById(articleId) {
    debug('articleCtrl findArticleById');
    return Article.findOne({ _id: articleId })
      .where('publication_date').ne(null)
      .exec();
  }, 
  
  /**  
   * findArticles - Finds all published articles, sorted by publication_date
   *    
   * @return {type}  description   
   */   
  findArticles() {
    debug('articleCtrl findArticles');
    return Article.find()
      .sort({ publication_date: 'desc' })
      .select('-content')
      .where('publication_date').ne(null)
      .exec();
  },
};
