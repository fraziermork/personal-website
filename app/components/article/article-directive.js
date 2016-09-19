/* global template */

(function() {
  angular.module('fm.article')
    .directive('fmArticle', [
      '$log',
      '$compile',
      'markdownIt', 
      fmArticle 
    ]);
  
  function fmArticle($log, $compile, markdownIt) {
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
        $log.warn(`rendering article ${ctrl.article.title}`);
        let textToGoInsideArticle = markdownIt.render(ctrl.article.content);
        $log.log('RENDERED HTML: \n', textToGoInsideArticle);
        element.find('div').html(textToGoInsideArticle);
        $compile(element.contents())(scope);
      },
    };
    
  }
  
})();
