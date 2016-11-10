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
    '$stateProvider', 
    '$urlRouterProvider',
    '$anchorScrollProvider',
    fmAppConfig,
  ]);
  
  function fmAppConfig($stateProvider, $urlRouterProvider, $anchorScrollProvider) {
    $urlRouterProvider.otherwise('/portfolio');
    $anchorScrollProvider.disableAutoScrolling();
  }
  
})();
