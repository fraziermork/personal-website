'use strict';

// npm modules 
const debug = require('debug')('fm:articleCtrl');

// internal modules 
const Article = require('./article-model');

module.exports = {
  /**  
   * findArticleById - Finds an article by id if it is published 
   *    
   * @param  {string} articleId The database id of the article    
   * @return {promise}          A promise that resolves with the article that was found or rejects with an error    
   */     
  findArticleById(articleId) {
    debug('articleCtrl findArticleById');
    return Article.findOne({ _id: articleId })
      .where('publication_date').ne(null)
      .exec();
  },
  
  
  
  /**  
   * findArticleUrl - Allows retrieval of a published article by its url property, which is based on its title 
   *    
   * @param  {string} articleUrl The url suffix specific to that article, which is a hyphen-separated string based on the article title    
   * @return {promise}           A promise that resolves with the article that was found or rejects with an error    
   */   
  findArticleUrl(articleUrl) {
    debug('articleCtrl findArticleById');
    return Article.findOne({ url: articleUrl })
      .where('publication_date').ne(null)
      .exec();
  }, 
  
  /**  
   * findArticles - Finds all published articles, sorted by publication_date
   *    
   * @return {promise}  A promise that resolves with all published articles or rejects with an error    
   */   
  findArticles() {
    debug('articleCtrl findArticles');
    return Article.find()
      .sort({ publication_date: 'desc' })
      .select('-content -tableOfContents')
      .where('publication_date').ne(null)
      .exec();
  },
};
