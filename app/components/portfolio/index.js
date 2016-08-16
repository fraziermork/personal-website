(function() {
  angular.module('fm.portfolio', [
    'ui.router', 
    'fm.services',
  ]);
})();

require('./portfolio-controller');
require('./portfolio-state');
