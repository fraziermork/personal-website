(function() {
  angular.module('fm.header')
    .controller('HeaderController', [
      '$log', 
      HeaderController,
    ]);
  
  function HeaderController($log) {
    const vm                     = this;
    vm.scrollPosToShrinkHeaderAt = 200;
    vm.headerIsSmall             = false;
    vm.navVisible                = false;
    
    vm.toggleNavVisibility       = toggleNavVisibility;
  
    
    function toggleNavVisibility() {
      vm.navVisible = !vm.navVisible;
      $log.debug('HeaderController toggleNavVisibility, visibility: ', vm.navVisible);
    }
  }
  
})();
