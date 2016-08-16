/* global template */

(function() {
  angular.module('fm.wrapper')
  .config([
    '$stateProvider', 
    '$urlRouterProvider',
    wrapperStateConfiguration,
  ]);
  
  function wrapperStateConfiguration($stateProvider, $urlRouterProvider) {
    $stateProvider.state('wrapper', {
      template:     template, 
      controller:   'WrapperController', 
      controllerAs: 'wrapCtrl', 
      url:          '',
      abstract:     true, 
    });
  }
  
})();
