(function() {
  angular.module('fm.services')
  .factory('navVisible', [
    '$log',
    '$q', 
    navVisible,
  ]);
  
  // This sets the visibility of the navbar, but only below the md breakpoint 
  // It's a service to make it accessible to both the header and the navbar components
  function navVisible($log, $q) {
    return {
      visible: false, 
      
      
      toggleNavVisibility() {
        if (__DEVONLY__) $log.debug('navVisible toggleNavVisibility ', this.visible);
        this.visible = !this.visible;
      },
      
    };
  }
  
})();
