(function() {
  angular.module('fm.wrapper')
  .controller('WrapperController', [
    '$log',
    '$state', 
    WrapperController, 
  ]);
  
  function WrapperController($log, $state) {
    const vm  = this;
    vm.$state = $state;
    
    
    
  }
  
})();
