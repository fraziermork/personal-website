/* global template */

(function() {
  angular.module('fm.header')
    .directive('fmHeader', [
      '$log', 
      '$window', 
      '$timeout',
      fmHeader, 
    ]);
  
  function fmHeader($log, $window, $timeout) {
    return {
      template:     template, 
      restrict:     'E', 
      controller:   'HeaderController',  
      controllerAs: 'headCtrl', 
      
      link(scope, elem, attrs, ctrl) {
        const ngWindow        = angular.element($window);
        const headerElement   = elem.find('header');
        const fmHeaderWrapper = headerElement.find('section');
        
        // Run immediately to set initial header size, then attach to scroll events to handle resizes 
        ngWindow.on('scroll', shrinkHeaderOnScroll);
        $timeout(shrinkHeaderOnScroll);
        
        function shrinkHeaderOnScroll() {
          // Check if need to shrink the header 
          if (ngWindow[0].pageYOffset < ctrl.maxHeaderHeight) {
            let headerHeight = ctrl.maxHeaderHeight - ngWindow[0].pageYOffset;
            if (headerHeight > ctrl.minHeaderHeight) {
              fmHeaderWrapper.css('height', `${headerHeight}px`);
            } else {
              fmHeaderWrapper.css('height', `${ctrl.minHeaderHeight}px`);
            }
            
            // If it's less than maxHeaderHeight, it's not small anymore 
            scope.$apply(() => {
              ctrl.headerIsSmall = false;
            });
          
          // They have scrolled past max header height 
          } else {
            fmHeaderWrapper.css('height', `${ctrl.minHeaderHeight}px`);
            if (!ctrl.headerIsSmall) {
              scope.$apply(() => {
                ctrl.headerIsSmall = true;
              });
            }
          }
        }
      }, 
    };
  }
  
  
  
})();
