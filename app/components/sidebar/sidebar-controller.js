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
  }
  
})();
