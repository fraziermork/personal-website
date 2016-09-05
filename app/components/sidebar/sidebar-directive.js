/* global template */

(function() {
  angular.module('fm.sidebar')
  .directive('fmSidebar', [
    '$log',
    fmSidebar,
  ]);
  
  function fmSidebar() {
    return {
      template, 
      restrict: 'E',
      scope: {
        articles: '=',
      }, 
      
    };  
  }
  
})();
