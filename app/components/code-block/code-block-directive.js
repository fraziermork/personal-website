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
        let readOnly = element.parent().hasClass('data-read-only') ? true : false;
        $log.log('code block attrs: \n', attrs);
        $log.log('code block element: \n', element);
        element.addClass('fm-code-block');
        
        
        $window.Tonic.createNotebook({
          element:  element[0],  
          source:   attrs.code,
          readOnly: readOnly, 
          
          
          
          /**          
           * onLoad - Runs when the notebook has finished loading, and overrides some of the styles applied by Tonic to be compatible with bootstrap's styling.
           *            
           * @param  {object} nb The Tonic notebook                      
           */           
          onLoad(nb) {
            $log.debug('Tonic notebook loaded \n', nb);
            
            // $log.warn(element.find('iframe'));
            // $log.log(element.find('iframe').css('width'));
            // $log.log(element.find('iframe').css('margin'));
            // if (!readOnly) {
            //   element.find('iframe').css({
            //     width:  'calc(100% + 200px)', 
            //     margin: '0 0 0 calc(-100px)', 
            //   });
            // }
          }, 
          
          // /**          
          //  * onEvaluate - Runs whenever the notebook is evaluated
          //  *            
          //  * @param  {object} nb The Tonic notebook                      
          //  */
          // onEvaluate(nb) {
          //   $log.debug('Tonic notebook evaluated \n', nb);
          // },
          
        });
      },
    };
    
  }
  
})();
