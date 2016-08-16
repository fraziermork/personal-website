(function() {
  angular.module('fm.wrapper', [
    'ui.router', 
    'fm.services',
  ]);
})();

require('./wrapper-controller');
require('./wrapper-state');
