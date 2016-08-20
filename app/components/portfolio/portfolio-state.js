/* global template */

(function() {
  angular.module('fm.portfolio')
  .config([
    '$stateProvider', 
    '$urlRouterProvider',
    portfolioStateConfiguration,
  ]);
  
  function portfolioStateConfiguration($stateProvider, $urlRouterProvider) {
    $stateProvider.state('portfolio', {
      template:     template, 
      parent:       'wrapper',
      controller:   'PortfolioController', 
      controllerAs: 'portCtrl', 
      url:          '/portfolio',
      data: {
        title: 'portfolio'
      }, 
      
    });
  }
  
})();
