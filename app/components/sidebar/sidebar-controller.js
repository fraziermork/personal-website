(function() {
  angular.module('fm.sidebar')
  .controller('SidebarController', [
    '$log', 
    '$scope', 
    SidebarController, 
  ]);
  
  function SidebarController($log, $scope) {
    const vm = this;
    
    // Properties
    // vm.hidden = true;
    
    // Methods  
    // vm.toggleVisibility = toggleVisibility;
    
    // function toggleVisibility() {
    //   vm.hidden = !vm.hidden;
    //   $log.debug(`SidebarController toggleVisibility to ${!vm.hidden}`);
    // }
    
  }
  
})();
