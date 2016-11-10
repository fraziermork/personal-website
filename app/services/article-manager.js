/* global __API_URL__ __DEVONLY__ */

const baseUrl = `${__API_URL__}/articles`;

(function() {
  angular.module('fm.services')
    .factory('articleManager', [
      '$log', 
      '$http', 
      '$q', 
      articleManager,
    ]);
  
  function articleManager($log, $http, $q) {
    return {
      // Will hold the html string of the current article
      articleTableOfContents: null, 
      
      
      
      /**      
       * getAllArticles - Retrieves all articles from the database 
       *        
       * @return {promise}  A promise that resolves with an array of all articles or rejects with a server error        
       */       
      getAllArticles() {
        if (__DEVONLY__) $log.debug('articleManager getAllArticles');
        return $q((resolve, reject) => {
          $http.get(baseUrl)
            .then((res) => {
              if (__DEVONLY__) $log.debug('successfully retrieved articles: \n', res.data);
              return resolve(res.data);
            })
            .catch((err) => {
              if (__DEVONLY__) $log.error('error retrieving articles! \n', err);
              return reject(err);
            });
        });
      }, 
      
      
      
      
      /**      
       * getArticleByUrl - Retrieves articles from the database by their url suffix, which is formatted from the article title 
       *        
       * @param  {string} articleUrl A string based on the article title that serves as a database id 
       * @return {promise}           A promise that resolves with the requested article or rejects with a server error        
       */       
      getArticleByUrl(articleUrl) {
        return $q((resolve, reject) => {
          $http.get(`${baseUrl}/${articleUrl}`)
            .then((res) => {
              if (__DEVONLY__) $log.debug('successfully retrieved article: \n', res.data);
              return resolve(res.data);
            })
            .catch((err) => {
              if (__DEVONLY__) $log.error('error retrieving article! \n', err);
              return reject(err);
            });
        });
      },
    };
  }
  
})();
