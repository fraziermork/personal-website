(function() {
  angular.module('fm.blog', [
    'ui.router', 
    'fm.services',
  ]);
})();

require('./blog-controller');
require('./blog-state');
