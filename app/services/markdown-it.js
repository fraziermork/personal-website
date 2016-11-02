const prism      = require('prismjs');
const MarkdownIt = require('markdown-it');
const decorate   = require('markdown-it-decorate');
const mdTOC      = require('markdown-it-toc-and-anchor').default;

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
      html:       true, 
      linkify:    true, 
      typography: true,
      
      
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
        } else {
          return prism.highlight(str, prism.languages[lang]);
        }
      }, 
    });
    md.use(decorate);
    md.use(mdTOC, {
      tocClassName:  'fm-Article-toc', 
      tocFirstLevel: 3, 
      tocLastLevel:  6, 
      anchorLink:    false,
      // tocCallback(tocMarkdown, tocArray, tocHtml) {
      //   $log.debug('Table of contents constructed');
      //   $log.log(tocMarkdown);
      // },
    });
    return md;
  }   
    
})();
