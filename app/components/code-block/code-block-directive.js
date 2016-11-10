/* global template */

(function() {
  angular.module('fm.code-block')
    .directive('fmCodeBlock', [
      '$log',
      '$window', 
      fmCodeBlock
    ]);
  
  
  function fmCodeBlock($log, $window) {
    return {
      restrict: 'A', 
      
      link(scope, element, attrs) {
        // Hack to remove the pre tags that markdown it automatically puts in whenever it sees a fenced code block 
        
        $window.Tonic.createNotebook({
          element:  element[0],  
          source:   attrs.code,
          readOnly: false, 
          onLoad: () => {
            $log.debug('REMOVING CODE');
            element.find('pre').remove();
          },
        });
      },
    };
    
  }
  
})();
