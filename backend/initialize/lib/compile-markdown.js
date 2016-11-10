'use strict';

const debug       = require('debug')('fm:compileMarkdown');
const prism       = require('prismjs');
const MarkdownIt  = require('markdown-it');
const mdDecorate  = require('markdown-it-decorate');
const mdContainer = require('markdown-it-container');
const mdTOC       = require('markdown-it-toc-and-anchor').default;

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
    debug('inside md highlight');
    if (!str.length) return '';
    let highlightedStr = prism.highlight(str, prism.languages[lang]);
    return `<code data-code="${str}">${highlightedStr}</code>`;
  }, 
});

md.use(mdContainer, 'tonicCodeBlock', {
  render(tokens, idx, _options, env, self) {
    debug('inside mdContainer render');
    // debug(tokens[idx]);
    // debug(tokens[idx + 1].content);
    
    // add a class to the opening tag
    if (tokens[idx].nesting === 1) {
      // Add the class .fm-code-block
      tokens[idx].attrPush(['class', 'fm-code-block']);
      
      // Give it the attribute fm-code-block
      tokens[idx].attrPush(['fm-code-block', '']);
      
      // Add the content of the fenced code block inside as a data attribute to this block
      tokens[idx].attrPush(['data-code', tokens[idx + 1].content]);
      
      // Hide the code block that would exist inside of it. This removes the content to prevent duplication, but directive will have to delete the pre tags that markdown-it will insert anyway
      // tokens[idx + 1].hidden = true;
      // tokens[idx + 1].content = '';
      // debug(tokens[idx + 1]);
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

module.exports = md;
 
