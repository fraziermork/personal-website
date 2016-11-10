/* global template */

(function() {
  angular.module('fm.article')
    .directive('fmArticle', [
      '$log',
      '$compile',
      '$anchorScroll',
      fmArticle, 
    ]);
    
  function fmArticle($log, $compile, $anchorScroll) {
    return {
      template, 
      controller:       'ArticleController',     
      controllerAs:     'articleCtrl',   
      bindToController: true, 
      restrict:         'E', 
      scope: {
        article: '=',
      },
      
      link(scope, element, attrs, ctrl) {
        if (__DEVONLY__) $log.debug(`rendering article ${ctrl.article.title}`);
        
        // Compile html of article to trigger the code block directive embedded inside 
        let textToGoInsideArticle = ctrl.article.content;
        element.find('div').html(textToGoInsideArticle);
        $compile(element.contents())(scope);
        
      },
    };
    
  }
  
})();
