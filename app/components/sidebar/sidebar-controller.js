(function() {
  angular.module('fm.sidebar')
  .controller('SidebarController', [
    '$log', 
    '$scope', 
    '$anchorScroll',
    SidebarController, 
  ]);
  
  function SidebarController($log, $scope, $anchorScroll) {
    const vm                            = this;
    vm.handleClickOnTableOfContentsLink = handleClickOnTableOfContentsLink;
    
    
    function handleClickOnTableOfContentsLink($event, anchorLink) {
      $event.preventDefault();
      $anchorScroll(anchorLink);
    }
    
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
