(function() {
  angular.module('fm.portfolio')
    .controller('BlogController', [
      '$log',
      'articleList', 
      BlogController,
    ])
    .controller('BlogListController', [
      '$log', 
      'articleList',
      BlogListController,
    ])
    .controller('BlogArticleController', [
      '$log',
      'article', 
      BlogArticleController,
    ]);
  
  function BlogController($log, articleList) {
    const vm       = this;
    vm.articleList = articleList;
    
    
  }
    
  function BlogListController($log, articleList) {
    const vm       = this;
    vm.articleList = articleList;
  
  }
  
  function BlogArticleController($log, article) {
    const vm   = this;
    vm.article = article;
    
  }
  
})();
