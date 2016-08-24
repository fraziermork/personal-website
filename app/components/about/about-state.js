/* global template */

(function(){
  angular.module('fm.about')
  .config([
    '$stateProvider', 
    '$urlRouterProvider', 
    aboutStateConfiguration, 
  ]);
  
  function aboutStateConfiguration($stateProvider, $urlRouterProvider) {
    $stateProvider.state('about', {
      template:     template, 
      parent:       'wrapper',
      controller:   'AboutController', 
      controllerAs: 'abtCtrl', 
      url:          '/about',
      data: {
        title: 'about'
      }, 
    });
  }
  
})();
