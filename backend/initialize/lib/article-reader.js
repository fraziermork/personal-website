'use strict';

const debug    = require('debug')('fm:articleReader');
const Promise  = require('bluebird');
const fs       = Promise.promisifyAll(require('fs'));
const path     = require('path');

const articleReader = {
  // formatPathName(directoryCalledFrom, inputRelPath) {
  //   debug('formatPathName');
  //   let thisDirectory = __dirname;
  //   debug('thisDirectory: \n', thisDirectory);
  //   debug('working directory: \n', process.cwd());
  //   let pathBackToDirCalledFrom = path.relative(thisDirectory, directoryCalledFrom);
  //   debug('pathBackToDirCalledFrom: \n', pathBackToDirCalledFrom);
  //   let pathToRead                 = path.join(pathBackToDirCalledFrom, inputRelPath);
  //   debug('pathToRead: \n', pathToRead);
  //   return pathToRead;
  //   // return fs.readdirAsync(pathToRead);
  // },
  
  
  // readArticleNames(pathToRead, directoryCalledFrom) {
  //   let pathToRead = this.formatPathName(pathToDirectoryToRead, directoryCalledFrom);
  //   return fs.readdirAsync(pathToRead);
  // }, 
  
  
  readEachArticle(pathToRead) {
    debug(`readEachArticle in ${pathToRead}`);
    return fs.readdirAsync(pathToRead)
      .then((articleDirectories) => {
        // read all the article directories 
        return Promise.all(articleDirectories.map((articleName) => {
          
          // inside of each article directory, look for info.js and content.md
          return Promise.join(
            fs.readFileAsync(path.join(pathToRead, articleName, 'info.js'), 'utf8'), 
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

module.exports = articleReader;
