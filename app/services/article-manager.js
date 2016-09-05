/* global __API_URL__ */

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
      getAllArticles() {
        $log.debug('articleManager getAllArticles');
        return $q((resolve, reject) => {
          $http.get(baseUrl)
            .then((res) => {
              $log.debug('successfully retrieved articles: \n', res.data);
              return resolve(res.data);
            })
            .catch((err) => {
              $log.error('error retrieving articles! \n', err);
              return reject(err);
            });
        });
      }, 
      
      getArticleById(id) {
        return $q((resolve, reject) => {
          $http.get(`${baseUrl}/${id}`)
            .then((res) => {
              $log.debug('successfully retrieved article: \n', res.data);
              return resolve(res.data);
            })
            .catch((err) => {
              $log.error('error retrieving article! \n', err);
              return reject(err);
            });
        });
      },
    };
  }
  
})();
