(function() {
  angular.module('fm.portfolio')
    .controller('BlogController', [
      '$log',
      BlogController,
    ]);
  
  function BlogController($log) {
    const vm    = this;
    vm.articles = require('../../data/articles');
    
    
    
  }
    
})();
