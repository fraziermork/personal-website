(function() {
  angular.module('fm.app', [
    'ui.router',
    'fm.services',
    'fm.header',
    'fm.wrapper',
    'fm.portfolio',
    'fm.about', 
    'fm.blog', 
    'fm.sidebar',
    'fm.article',
    'fm.code-block', 
  ])
  .config([
    '$locationProvider',
    '$stateProvider', 
    '$urlRouterProvider',
    fmAppConfig,
  ]);
  
  function fmAppConfig($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/portfolio');
  }
  
})();
