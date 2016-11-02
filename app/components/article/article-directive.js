/* global template */

(function() {
  angular.module('fm.article')
    .directive('fmArticle', [
      '$log',
      '$compile',
      '$anchorScroll',
      'markdownIt', 
      fmArticle 
    ])
    .config([
      '$uiViewScrollProvider',
      configUiViewScrollProvider,
    ])
    .run([
      '$anchorScroll',
      configAnchorScrollYOffset,
    ]);
  
  function configUiViewScrollProvider($uiViewScrollProvider) {
    $uiViewScrollProvider.useAnchorScroll();
  }
  
  function configAnchorScrollYOffset($anchorScroll) {
    $anchorScroll.yOffset = 100;
  }
  
  function fmArticle($log, $compile, $anchorScroll, markdownIt) {
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
        $log.log(`rendering article ${ctrl.article.title}`);
        let textToGoInsideArticle = markdownIt.render(ctrl.article.content);
        // $log.log('RENDERED HTML: \n', textToGoInsideArticle);
        element.find('div').html(textToGoInsideArticle);
        $compile(element.contents())(scope);
        $log.log('element.contents(): ', element.contents());
        
        let ulElements = element.find('ul');
        let tableOfContentsUl = null;
        for (let i = 0; i < ulElements.length; i++) {
          let UlElementToCheck = ulElements.eq(i);
          if (UlElementToCheck.hasClass('fm-Article-toc')) {
            tableOfContentsUl = UlElementToCheck;
            break;
          }
        }
        $log.warn(tableOfContentsUl);
        
        
        if (tableOfContentsUl) {
          tableOfContentsUl.on('click', (event) => {
            event.preventDefault();
            $log.log(event);
            let anchorHash = event.target.getAttribute('href');
            $log.log(anchorHash);
            $log.log(angular.element(document)[0].getElementById(anchorHash.slice(1)));
            
            $log.warn(anchorHash);
            $log.log($anchorScroll.yOffset);
            $anchorScroll(anchorHash.slice(1));
            $log.log($anchorScroll.yOffset);
          });
        }
        
      },
    };
    
  }
  
})();
