/* global template */

(function() {
  angular.module('fm.footer')
    .directive('fmFooter', [
      fmFooter
    ]);
    
  function fmFooter() {
    return {
      template, 
      restrict:     'E', 
    };
  }  
  
})();
