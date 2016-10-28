'use strict';

const debug    = require('debug')('fm:articleReader');
const Promise  = require('bluebird');
const fs       = Promise.promisifyAll(require('fs'));
const path     = require('path');

module.exports  = {
  
  readEachArticle(pathToRead) {
    debug(`readEachArticle in ${pathToRead}`, process.cwd());
    return fs.readdirAsync(pathToRead)
      .then((articleDirectories) => {
        // read all the article directories 
        return Promise.all(articleDirectories.map((articleName) => {
          
          // inside of each article directory, look for info.js and content.md
          return Promise.join(
            fs.readFileAsync(path.join(pathToRead, articleName, 'info.json'), 'utf8'), 
            fs.readFileAsync(path.join(pathToRead, articleName, 'content.md'), 'utf8'),
            (info, content) => {              
              let articleInfo = JSON.parse(info);
              articleInfo.content = content;
              debug('articleInfo: \n', articleInfo);
              return articleInfo;
            }
          );
        }));
      });
  }, 
};
