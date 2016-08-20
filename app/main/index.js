(function() {
  angular.module('fm.app', [
    'ui.router',
    'fm.services',
    'fm.header',
    'fm.wrapper',
    'fm.portfolio',
    'fm.about', 
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
