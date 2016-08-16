(function() {
  angular.module('fm.app', [
    'ui.router',
    'fm.services',
    'fm.header',
    'fm.wrapper',
    'fm.portfolio',
  ])
  .config([
    '$stateProvider', 
    '$urlRouterProvider',
    fmAppConfig,
  ]);
  
  function fmAppConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/portfolio');
  }
  
})();
