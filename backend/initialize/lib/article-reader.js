'use strict';

const debug     = require('debug')('fm:articleReader');
const Promise   = require('bluebird');
const fs        = Promise.promisifyAll(require('fs'));
const path      = require('path');
const compileMd = require('./compile-markdown');


module.exports  = {
  
  readEachArticle(pathToRead) {
    debug(`readEachArticle in ${pathToRead}`, process.cwd());
    return fs.readdirAsync(pathToRead)
      .then((articleDirectories) => {
        
        // Prevent any weird files like .DS_Store from causing errors
        articleDirectories = articleDirectories.filter((directoryName) => {
          return fs.statSync(path.join(pathToRead, directoryName)).isDirectory();
        });
        
        // read all the article directories 
        return Promise.all(articleDirectories.map((directoryName) => {
          
          // inside of each article directory, look for info.js and content.md
          return Promise.join(
            fs.readFileAsync(path.join(pathToRead, directoryName, 'info.json'), 'utf8'), 
            fs.readFileAsync(path.join(pathToRead, directoryName, 'content.md'), 'utf8'),
            (info, content) => {              
              let articleInfo = JSON.parse(info);
              articleInfo.content = content;
              return articleInfo;
            })
            .then((articleInfo) => {
              return new Promise((resolve, reject) => {
                articleInfo.content = compileMd.render(articleInfo.content, {
                  tocCallback(tocMarkdown, tocArray, tocHtml) {
                    debug(tocHtml);
                    articleInfo.tableOfContents = tocHtml;
                    resolve(articleInfo);
                  },
                });
              });
            });
        }));
      });
  }, 
};
