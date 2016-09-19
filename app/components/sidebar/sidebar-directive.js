/* global template */

(function() {
  angular.module('fm.sidebar')
  .directive('fmSidebar', [
    '$log',
    fmSidebar,
  ]);
  
  function fmSidebar($log) {
    return {
      template, 
      restrict: 'E',
      scope: {
        articles: '=',
      }, 
      controller:   'SidebarController', 
      controllerAs: 'sideCtrl', 
      // link(scope, elem, attrs, ctrl) {
      //   
      //   
      //   
      // }, 
    };  
  }
  
})();
