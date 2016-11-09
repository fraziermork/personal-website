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
        const headerElement   = elem.find('header');
        const fmHeaderWrapper = headerElement.find('section');
        // $log.log(fmHeaderWrapper);
        // $log.log(this.pageYOffset);

        function shrinkHeaderOnScroll(e) {
          $log.warn('shrinkHeaderOnScroll', e, this);
          $log.log(this.pageYOffset);
          // Check if need to shrink the header 
          
          
          if (this.pageYOffset < ctrl.maxHeaderHeight) {
            $log.log(`this.pageYOffset: ${this.pageYOffset}, ctrl.maxHeaderHeight: ${ctrl.maxHeaderHeight}`);
            let headerHeight = ctrl.maxHeaderHeight - this.pageYOffset;
            if (headerHeight > ctrl.minHeaderHeight) fmHeaderWrapper.css('height', `${headerHeight}px`);
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
