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
    // .run([
    //   '$log',
    //   '$anchorScroll',
    //   '$document', 
    //   configAnchorScrollYOffset,
    // ]);
    
  function configUiViewScrollProvider($uiViewScrollProvider) {
    $uiViewScrollProvider.useAnchorScroll();
  }
  
  // function configAnchorScrollYOffset($log, $anchorScroll, $document) {
  //   $log.log($document.find('header'));
  //   $anchorScroll.yOffset = 1000;
  // }
  
  function SidebarController($log, $scope, $anchorScroll, $document) {
    // Configure $anchorScroll.yOffset
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
