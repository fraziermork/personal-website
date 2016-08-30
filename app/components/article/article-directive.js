/* global template */

(function() {
  angular.module('fm.article')
    .directive('fmArticle', [
      '$log', 
      '$compile',
      'markdownIt', 
      fmArticle,
    ]);
    
  function fmArticle($log, $compile, markdownIt) {
    return {
      template:         template, 
      controller:       'ArticleController', 
      controllerAs:     'articleCtrl',
      bindToController: true, 
      scope:            {
        article: '=',
      },
      
      link(scope, element, attrs, ctrl) {
        $log.warn(`instantiating article ${ctrl.article.title}`);
        let textToGoInsideArticle = markdownIt.render(ctrl.article.body);
        $log.log('RENDERED HTML: \n', textToGoInsideArticle);
        element.find('div').html(textToGoInsideArticle);
        $compile(element.contents())(scope);
      },
    };
  } 
   
})();
