/* global template */

(function() {
  angular.module('fm.sidebar')
  .directive('fmSidebar', [
    '$log',
    fmSidebar,
  ]);
  // .config([
  //   '$uiViewScrollProvider',
  //   configUiViewScrollProvider,
  // ])
  // .run([
  //   '$anchorScroll',
  //   configAnchorScrollYOffset,
  // ]);
  // 
  // function configUiViewScrollProvider($uiViewScrollProvider) {
  //   $uiViewScrollProvider.useAnchorScroll();
  // }
  // 
  // function configAnchorScrollYOffset($anchorScroll) {
  //   $anchorScroll.yOffset = 100;
  // }
  // 
  function fmSidebar($log) {
    return {
      template, 
      restrict:         'E',
      bindToController: true, 
      controller:       'SidebarController', 
      controllerAs:     'sideCtrl', 
      
      scope: {
        articles: '=',
        article:  '=',
      }, 
      // link(scope, elem, attrs, ctrl) {
      //   
      //   
      //   
      // }, 
    };  
  }
  
})();
