(function() {
  angular.module('fm.wrapper')
    .controller('WrapperController', [
      '$log',
      '$state', 
      '$anchorScroll',
      '$rootScope',
      '$scope',
      WrapperController, 
    ]);
  
  
  // TODO: attach article title to state data params for wrapper to access 
  function WrapperController($log, $state, $anchorScroll, $rootScope, $scope) {
    const vm  = this;
    vm.$state = $state;
    
    // Prevent scroll level from one page from being kept when the user goes to another 
    const removeSetRootScopeScrollToTop = $rootScope.$on('$stateChangeSuccess', () => {
      $anchorScroll();
    });
    $scope.$on('$destroy', removeSetRootScopeScrollToTop);
  }

  
})();
