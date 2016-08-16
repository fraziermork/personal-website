(function() {
  angular.module('fm.header', [
    'ui.router',
    'fm.services',
  ]);
})();

require('./header-controller');
require('./header-directive');
