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
        
        // render the article and compile contents to trigger the code block directive embedded inside 
        // let textToGoInsideArticle = markdownIt.render(ctrl.article.content);
        let textToGoInsideArticle = ctrl.article.content;
        element.find('div').html(textToGoInsideArticle);
        $compile(element.contents())(scope);
        
        // Check if there is a table of contents 
        let ulElements = element.find('ul');
        let tableOfContentsUl = null;
        for (let i = 0; i < ulElements.length; i++) {
          let UlElementToCheck = ulElements.eq(i);
          if (UlElementToCheck.hasClass('fm-Article-toc')) {
            tableOfContentsUl = UlElementToCheck;
            break;
          }
        }
        
        // If there is a table of contents, attach the event handlers 
        if (tableOfContentsUl) {
          tableOfContentsUl.wrap('<nav></nav>');
          tableOfContentsUl.on('click', (event) => {
            event.preventDefault();
            let anchorHash = event.target.getAttribute('href');
            if (anchorHash) {
              $anchorScroll(anchorHash.slice(1));
            }
          });
        }
        
      },
    };
    
  }
  
})();
