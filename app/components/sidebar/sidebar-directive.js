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
      restrict:         'E',
      bindToController: true, 
      controller:       'SidebarController', 
      controllerAs:     'sideCtrl', 
      
      scope: {
        articles: '=',
        article:  '=',
      }, 
    };  
  }
  
})();
