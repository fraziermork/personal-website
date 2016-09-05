(function() {
  angular.module('fm.article', [
    'ui.router', 
    'fm.services',
  ]);
})();
require('./article-controller');
require('./article-directive');
