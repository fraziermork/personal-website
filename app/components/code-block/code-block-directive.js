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
        $log.warn('TONIC ELEMENT: \n', element);
        $window.Tonic.createNotebook({
          element: element[0],  
          source:  attrs.code,
          // readOnly: true, 
          
          
          
          /**          
           * onLoad - Runs when the notebook has finished loading 
           *            
           * @param  {object} nb The Tonic notebook                      
           */           
          onLoad(nb) {
            $log.debug('Tonic notebook loaded \n', nb);
          }, 
          
          /**          
           * onEvaluate - Runs whenever the notebook is evaluated
           *            
           * @param  {object} nb The Tonic notebook                      
           */
          onEvaluate(nb) {
            $log.debug('Tonic notebook evaluated \n', nb);
          },
          
        });
      },
    };
    
  }
  
})();
