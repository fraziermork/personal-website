/* global template */

(function() {
  angular.module('fm.header')
    .directive('fmHeader', [
      '$log', 
      '$window', 
      fmHeader, 
    ]);
  
  function fmHeader($log, $window) {
    return {
      template:     template, 
      restrict:     'E', 
      controller:   'HeaderController',  
      controllerAs: 'headCtrl', 
      
      link(scope, elem, attrs, ctrl) {
        angular.element($window).on('scroll', shrinkHeaderOnScroll);
        
        function shrinkHeaderOnScroll() {
          // $log.debug('shrinkHeaderOnScroll', this.pageYOffset);
          
          // Check if need to shrink the header
          if (this.pageYOffset < ctrl.scrollPosToShrinkHeaderAt) {
            // $log.warn('growing header');
            scope.$apply(() => {
              ctrl.headerIsSmall = false;
            });

          // Remove the class when they scroll up   
          } else if (ctrl.headerIsSmall === false) {
            // $log.warn('shrinking header');
            scope.$apply(() => {
              ctrl.headerIsSmall = true;
            });
          }
        }
        
      }, 
      
    };
  }
  
  
  
})();
