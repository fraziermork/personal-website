/* global __DEVONLY__ */

(function() {
  angular.module('fm.sidebar')
    .controller('SidebarController', [
      '$log', 
      '$scope', 
      '$anchorScroll',
      '$document', 
      SidebarController, 
    ])
    .config([
      '$uiViewScrollProvider',
      configUiViewScrollProvider,
    ]);
    
  function configUiViewScrollProvider($uiViewScrollProvider) {
    $uiViewScrollProvider.useAnchorScroll();
  }
  
  function SidebarController($log, $scope, $anchorScroll, $document) {
    // Configure $anchorScroll.yOffset to be equal to the height of the header element
    $anchorScroll.yOffset = $document.find('header');
    
    const vm                            = this;
    vm.handleClickOnTableOfContentsLink = handleClickOnTableOfContentsLink;
    
    function handleClickOnTableOfContentsLink($event, anchorLink) {
      if (__DEVONLY__) $log.debug('SidebarController handleClickOnTableOfContentsLink');
      $event.preventDefault();
      $anchorScroll(anchorLink);
    }
  }
  
})();
