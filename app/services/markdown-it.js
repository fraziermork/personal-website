const MarkdownIt = require('markdown-it');

(function() {
  angular.module('fm.services')
    .factory('markdownIt', [
      '$log', 
      '$window', 
      markdownIt
    ]);

  function markdownIt($log, $window) {
    // $log.warn('MARKDOWNIT: \n', MarkdownIt);
    
    const md = new MarkdownIt({
      html: true, 
      
      /**  
       * highlight - Responsible for syntax highlighting of code found in source markdown files.    
       *    
       * @param  {string} str  The content of the fenced code block in the markdown file    
       * @param  {string} lang The language the fenced code block is written in    
       * @return {string}      A formatted html string that will be inserted in place of the code block.
       */   
      highlight(str, lang) {
        if (lang === 'javascript') {
          return `<section fm-code-block data-code="${str}"></section>`;
        } 
        return str;
      }, 
    });
    
    return md;
  }   
    
})();
