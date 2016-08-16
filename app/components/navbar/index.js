(function() {
  angular.module('fm.navbar', [
    'ui.router',
    'fm.services',
  ]);
})();

require('./navbar-controller');
require('./navbar-directive');
