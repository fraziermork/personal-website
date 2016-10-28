'use strict';

// This is only sort of an official test. 
// This sends an email and checks that an appropriate status code was received 
// The non-automated check is whether the email actually shows up in the inbox

// env variables 
const API_PORT      = process.env.API_PORT || 3000;
if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
  throw new Error('Mailgun configuration required');
}

// npm modules 
// const debug         = require('debug')('fm:test-email');
const chai          = require('chai');
const chaiHttp      = require('chai-http');
chai.use(chaiHttp);
const request       = chai.request(`localhost:${API_PORT}/api`);
const expect        = chai.expect;

// internal modules 
const server        = require('../backend-dev-server');
const manageServer  = require('./lib/manage-server')(server, API_PORT);


const emailData = {
  subject: '/contact test', 
  from:    process.env.npm_config_email, 
  name:    'Frazier Mork', 
  text:    Date.now().toString(), 
};


describe('/contact', () => {
  before('start server', (done) => {
    manageServer.startServerAndDbBeforeTests(done);
  });
  after('close server', (done) => {
    manageServer.closeServerAndDropDbAfterTests(done);
  });
  
  it('should let you send an email', (done) => {
    request.post('/contact')
      .send(emailData)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(204);
        done();
      });
  });
});
