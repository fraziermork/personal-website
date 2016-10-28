'use strict';

const debug    = require('debug')('fm:manageServer');
const manageDb = require('./manage-db');


module.exports = manageServer;

function manageServer(server, port) {
  return {
    startServerAndDbBeforeTests(done) {
      debug('manageServer startServerAndDbBeforeTests');
      if (!server.isRunning) {
        debug('server was not running');
        return manageDb.startDummyDbBeforeTests()
          .then(() => {
            server.listen(port, (err) => {
              server.isRunning = true; 
              done(err);
            });
          })
          .catch(done);
      } 
      debug('server was running');
      return done();
    },
    
    closeServerAndDropDbAfterTests(done) {
      debug('manageServer closeServerAndDropDbAfterTests');
      if (server.isRunning) {
        return server.close(() => {
          debug('server closed');
          manageDb.dropDummyDbAfterTests()
            .then(done)
            .catch(done);
        });
      }
      debug('server wasnt running');
      return manageDb.dropDummyDbAfterTests()
        .then(done)
        .catch(done);
    }, 
  };
}
