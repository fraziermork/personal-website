(function() {
  angular.module('fm.wrapper')
  .controller('WrapperController', [
    '$log',
    '$state', 
    WrapperController, 
  ]);
  
  
  // TODO: attach article title to state data params for wrapper to access 
  function WrapperController($log, $state) {
    const vm  = this;
    vm.$state = $state;
    
    
    
  }
  
})();
