(function() {
  angular.module('fm.about', [
    'ui.router', 
    'fm.services',
  ]);
})();

require('./about-controller');
require('./about-state');
