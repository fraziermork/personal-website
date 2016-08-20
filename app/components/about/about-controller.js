const portrait = require('../../assets/images/frazier.png');
const resume   = require('!!file?name=[name].[ext]!../../assets/frazier-mork-cv.pdf');
const skills   = require('../../data/skills');

(function() {
  angular.module('fm.about')
    .controller('AboutController', [
      '$log',
      '$q', 
      'contactMe', 
      AboutController,
    ]);
  
  function AboutController($log, $q, contactMe) {
    const vm    = this;
    vm.portrait = portrait;
    vm.resume   = resume; 
    vm.skills   = skills;
    
    vm.emailData = {
      from:    null, 
      to:      null, 
      subject: null,
      text:    null, 
    };
    
    
    
    
    
  }
    
})();
