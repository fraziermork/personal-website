(function() {
  angular.module('fm.header')
    .controller('HeaderController', [
      '$log', 
      'navVisible', 
      HeaderController,
    ]);
  
  function HeaderController($log, navVisible) {
    const vm                     = this;
    vm.navVisible                = navVisible;
    vm.scrollPosToShrinkHeaderAt = 200;
    vm.headerIsSmall             = false;
    
  
    
    
  }
  
})();
