const prism       = require('prismjs');
const MarkdownIt  = require('markdown-it');
const mdDecorate  = require('markdown-it-decorate');
const mdContainer = require('markdown-it-container');
const mdTOC       = require('markdown-it-toc-and-anchor').default;

(function() {
  angular.module('fm.services')
    .factory('markdownIt', [
      '$log', 
      '$window', 
      markdownIt
    ]);

  function markdownIt($log, $window) {
    
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
        $log.warn('inside md highlight');
        $log.warn('str: ', str);
        $log.log('str.length: ', str.length);
        if (!str.length) return '';
        return `<code data-code="${str}">${prism.highlight(str, prism.languages[lang])}</code>`;
      }, 
    });
    md.use(mdContainer, 'codeblock', {
      render(tokens, idx, _options, env, self) {
        $log.warn('inside mdContainer render');
        $log.log(tokens[idx]);
        $log.log(tokens[idx + 1].content);
        
        // add a class to the opening tag
        if (tokens[idx].nesting === 1) {
          // Add the class .fm-code-block
          tokens[idx].attrPush(['class', 'fm-code-block']);
          
          // Give it the attribute fm-code-block
          tokens[idx].attrPush(['fm-code-block', '']);
          
          // Add the content of the fenced code block inside as a data attribute to this block
          tokens[idx].attrPush(['data-code', tokens[idx + 1].content]);
          
          // Hide the code block that would exist inside of it 
          // tokens[idx + 1].attrPush(['hidden', 'true']);
          // tokens.splice(idx, 1);
          tokens[idx + 1].hidden = true;
          tokens[idx + 1].content = '';
          $log.log(tokens[idx + 1]);
        }

        return self.renderToken(tokens, idx, _options, env, self);
      },
    });
    md.use(mdDecorate);
    md.use(mdTOC, {
      tocClassName:  'fm-Article-toc', 
      tocFirstLevel: 3, 
      tocLastLevel:  6, 
      anchorLink:    false,
    });
    return md;
  }   
    
})();
