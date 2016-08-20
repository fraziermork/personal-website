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
        $log.debug('contactMe email');
        if (this.pending) return;
        
        this.pending = true;
        return $q(function(resolve, reject) {
          $http.post({
            
          })
            .then((res) => {
              $log.log('contactMe email', res);
              
            })
            .catch((err) => {
              $log.err('contactMe email', err);
              
            });
        });
      },  
    };
  }
  
})();
