(function() {
  angular.module('fm.navbar')
    .controller('NavbarController', [
      '$log',
      'navVisible', 
      NavbarController, 
    ]);
  
  function NavbarController($log, navVisible) {
    const vm      = this;
    vm.navVisible = navVisible;
    
    
  }
  
})();
