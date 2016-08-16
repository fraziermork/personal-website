const projects = require('../../data/projects');

(function() {
  angular.module('fm.portfolio')
    .controller('PortfolioController', [
      '$log',
      PortfolioController,
    ]);
  
  function PortfolioController($log) {
    const vm    = this;
    vm.projects = projects;
    
  }
    
})();
