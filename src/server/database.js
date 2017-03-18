var async = require('async');

// Require the driver.
var pg = require('pg');

// Connect to the "bank" database.
var config = {
  user: 'runnerup',
  host: 'localhost',
  database: 'Runnerdb',
  port: 26257
};

var populateInitialDB = function() {

  pg.connect(config, function (err, client, done) {
    // Closes communication with the database and exits.
    var finish = function () {
      done();
      process.exit();
    };

    if (err) {
      console.error('could not connect to cockroachdb', err);
      finish();
    }
    async.waterfall([
      function (next) {
        
        client.query("BEGIN TRANSACTION");
        client.query("DROP TABLE IF EXISTS path");
        client.query("CREATE TABLE Path (id SERIAL PRIMARY KEY, name STRING, difficulty INT, time INTERVAL);", next);
      },
      function (next) {
        
        client.query("DROP TABLE IF EXISTS path_detail");
        client.query("CREATE TABLE path_detail (id SERIAL PRIMARY KEY, info STRING, " +
          " path INT NOT NULL CONSTRAINT pathID REFERENCES path(id), "
          + "INDEX(path));", next);
      }
    ],
    function (err, results) {
      if (err) {
        console.error('error inserting into and selecting from accounts', err);
        finish();
      }

      finish();
    });
  });
};
populateInitialDB();