/* global template */

(function() {
  angular.module('fm.navbar')
  .directive('fmNavbar', [
    fmNavbar,
  ]);
  
  function fmNavbar() {
    return {
      template:     template,
      replace:      true,
      restrict:     'E',
      controller:   'NavbarController', 
      controllerAs: 'navCtrl', 
    };
  }
  
})();
