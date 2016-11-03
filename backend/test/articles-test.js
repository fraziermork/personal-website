'use strict';

// env variables 
const API_PORT = process.env.API_PORT || 3000;

// npm modules 
const debug        = require('debug')('fm:test-articles');
const Promise      = require('bluebird');
const chai         = require('chai');
const chaiHttp     = require('chai-http');
const expect       = chai.expect;
chai.use(chaiHttp);
const request      = chai.request(`localhost:${API_PORT}/api`);

// internal modules 
const server       = require('../backend-dev-server');
const manageServer = require('./lib/manage-server')(server, API_PORT);
const Article      = require('../resources/article/article-model');

let dummyPublishedArticle = {
  title:            'Dummy Published Article', 
  url:              'Dummy Published Article', 
  subtitle:         'hello', 
  publication_date: '2016-08-30',
  content:          '# markdown',
};
let dummyUnpublishedArticle = {
  title:            'Dummy Unpublished Article', 
  url:              'Dummy Unpublished Article', 
  subtitle:         'world', 
  publication_date: null,
  content:          '# markdown',
};

describe('/articles', () => {
  before('start server', (done) => {
    manageServer.startServerAndDbBeforeTests(done);
  });
  after('close server', (done) => {
    manageServer.closeServerAndDropDbAfterTests(done);
  });
  before('seed dummy database', (done) => {
    before('seeding database');
    Promise.all([
      Article.create(dummyPublishedArticle), 
      Article.create(dummyUnpublishedArticle), 
    ])
      .then((articles) => {
        debug('setting articles values \n', articles);
        dummyPublishedArticle   = articles[0];
        dummyUnpublishedArticle = articles[1];
        done();
      })
      .catch(done);
  });
  
  it('should return all published articles', (done) => {
    request.get('/articles')
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);
        expect(res.body).to.be.instanceof(Array);
        expect(res.body.length).to.equal(1);
        expect(res.body[0]._id).to.equal(dummyPublishedArticle._id.toString());
        expect(res.body[0]).to.not.have.property('content');
        expect(res.body[0]).to.have.property('url');
        done();
      });
  });
  
  it('should be able to retrieve an article by id', (done) => {
    request.get(`/articles/id/${dummyPublishedArticle._id}`)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);
        expect(res.body._id).to.equal(dummyPublishedArticle._id.toString());
        expect(res.body.content).to.equal(dummyPublishedArticle.content.toString());
        done();
      });
  });
  
  it('should be able to retrieve an article by url', (done) => {
    request.get(`/articles/${dummyPublishedArticle.url}`)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);
        expect(res.body.url).to.equal(dummyPublishedArticle.url.toString());
        expect(res.body._id).to.equal(dummyPublishedArticle._id.toString());
        expect(res.body.content).to.equal(dummyPublishedArticle.content.toString());
        done();
      });
  });
});
