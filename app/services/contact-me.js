(function() {
  angular.module('fm.services')
    .factory('contactMe', [
      '$log', 
      '$http', 
      '$q', 
      contactMe,
    ]);
    
  function contactMe($log, $http, $q) {
    return {
      pending: false, 
      email(emailData) {
        if (__DEVONLY__) $log.debug('contactMe email');
        if (this.pending) return;
        
        this.pending = true;
        return $q(function(resolve, reject) {
          $http.post({
            
          })
            .then((res) => {
              if (__DEVONLY__) $log.debug('contactMe email', res);
              
            })
            .catch((err) => {
              if (__DEVONLY__) $log.err('contactMe email', err);
              
            });
        });
      },  
    };
  }
  
})();
