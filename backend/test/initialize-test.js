'use strict';

// npm modules 
const debug   = require('debug')('fm:test-initialize');
const chai    = require('chai');
const expect  = chai.expect;
const Promise = require('bluebird');
const fs      = Promise.promisifyAll(require('fs'));
const del     = require('del');

// internal modules 
// const manageDb = require('./lib/manage-db');
const articleReader = require('../initialize/lib/article-reader');


// dummy data 
const articleContent = '# hello world';
const articleInfo    = {
  title: 'hello world',
};


describe('testing read directory method', () => {
  before('creating articles directory and test files', (done) => {
    fs.mkdirAsync('./data/articles')
      .then(() => {
        debug('made articles dir');
        return fs.mkdirAsync('./data/articles/example');
      })
      .then(() => {
        debug('made example dir');
        return Promise.all([
          fs.writeFile('./data/articles/example/info.js', JSON.stringify(articleInfo)), 
          fs.writeFile('./data/articles/example/content.md', articleContent)
        ]);
      })
      .then(() => {
        debug('made info and content files');
        done();
      })
      .catch(done);
  });
  after('deleting articles directory', (done) => {
    return del('./data/articles')
      .then(() => {
        debug('articles directory deleted');
        done();
      })
      .catch(done);
  });
  
  
  it('should return the correct list of filenames', (done) => {
    articleReader.readEachArticle('./data/articles')
      .then((files) => {
        debug(files);
        expect(files).to.be.instanceof(Array);
        expect(files[0].title).to.equal(articleInfo.title);
        expect(files[0].content).to.equal(articleContent);
        expect(files.length).to.equal(1);
        done();
      })
      .catch(done);
  });
});


// describe('testing database initialization', () => {
  // before('opening connection to db', () => {
  //   manageDb.startDummyDbBeforeTests();
  // });
  // after('closing connection to db', (done) => {
  //   manageDb.dropDummyDbAfterTests()
  //     .then(done)
  //     .catch(done);
  // });
  
  
  
  
// });
