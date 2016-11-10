(function() {
  angular.module('fm.header')
    .controller('HeaderController', [
      '$log', 
      HeaderController,
    ]);
  
  function HeaderController($log) {
    const vm               = this;
    vm.maxHeaderHeight     = 300;
    vm.minHeaderHeight     = 60;
    vm.headerIsSmall       = false;
    vm.navVisible          = false;
    vm.toggleNavVisibility = toggleNavVisibility;
  
    
    function toggleNavVisibility() {
      vm.navVisible = !vm.navVisible;
      // if (__DEVONLY__) $log.debug('HeaderController toggleNavVisibility, visibility: ', vm.navVisible);
    }
  }
  
})();
