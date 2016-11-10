/* global __DEVONLY__ */

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
    '$logProvider',
    fmAppConfig,
  ]);
  
  function fmAppConfig($stateProvider, $urlRouterProvider, $anchorScrollProvider, $logProvider) {
    $urlRouterProvider.otherwise('/portfolio');
    $anchorScrollProvider.disableAutoScrolling();
    $logProvider.debugEnabled(__DEVONLY__);
  }
  
})();
