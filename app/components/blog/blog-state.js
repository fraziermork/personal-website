/* global template */

(function() {
  angular.module('fm.blog')
    .config([
      '$stateProvider', 
      '$urlRouterProvider',
      blogStateConfiguration,
    ]);
    
  function blogStateConfiguration($stateProvider, $urlRouterProvider) {
    $stateProvider.state('blog', {
      template:     template, 
      parent:       'wrapper',
      controller:   'BlogController', 
      controllerAs: 'blogCtrl', 
      url:          '/blog',
      data: {
        title: 'blog',
      }, 
      
    });
  } 
   
})();
