(function() {
  angular.module('fm.blog')
    .config([
      '$stateProvider', 
      '$urlRouterProvider',
      blogStateConfiguration,
    ]);
    
  function blogStateConfiguration($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('blog', {
        template:     require('./blog-view.html'), 
        parent:       'wrapper',
        controller:   'BlogController', 
        controllerAs: 'blogCtrl', 
        url:          '/blog', 
        abstract:     true,
        resolve: { 
          articleList: ['$log', 'articleManager', 
            function(    $log,   articleManager) {
              $log.debug('attempting to resolve articles');
              return articleManager.getAllArticles();
            }], 
        }, 
      })
      .state('blog.list', {
        template:     require('./blog-list-view.html'), 
        url:          '', 
        controller:   'BlogListController', 
        controllerAs: 'blogListCtrl',
        data: {
          title: 'Blog',
        }, 
      })
      .state('blog.article', {
        template:     require('./blog-article-view.html'), 
        url:          '/article/:articleUrl', 
        controller:   'BlogArticleController', 
        controllerAs: 'blogArtCtrl', 
        data: {
          title: 'Blog', 
        },
        resolve: {
          article: ['$log', '$stateParams', 'articleManager', 
            function($log,   $stateParams,   articleManager) {
              $log.debug(`attempting to resolve article with id ${$stateParams.articleUrl}`);
              return articleManager.getArticleByUrl($stateParams.articleUrl);
            }
          ], 
        },        
      });
  } 
   
})();
