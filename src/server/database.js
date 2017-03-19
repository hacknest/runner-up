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

function txnWrapper(client, op, next) {
  client.query('BEGIN; SAVEPOINT cockroach_restart', function (err) {
    if (err) {
      return next(err);
    }

    var released = false;
    async.doWhilst(function (done) {
      var handleError = function (err) {
        // If we got an error, see if it's a retryable one and, if so, restart.
        if (err.code === '40001') {
          // Signal the database that we'll retry.
          return client.query('ROLLBACK TO SAVEPOINT cockroach_restart', done);
        }
        // A non-retryable error; break out of the doWhilst with an error.
        return done(err);
      };

      // Attempt the work.
      op(client, function (err) {
        if (err) {
          return handleError(err);
        }

        // If we reach this point, release and commit.
        client.query('RELEASE SAVEPOINT cockroach_restart', function (err) {
          if (err) {
            return handleError(err);
          }
          released = true;
          return done();
        });
      });
    },
    function () {
      return !released;
    },
    function (err) {
      if (err) {
        client.query('ROLLBACK', function () {
          next(err);
        });
      } else {
        client.query('COMMIT', next);
      }
    });
  });
}
populateInitialDB();

pg.connect(config, function(err, client, done) {
  // Closes communication with the database and exits.
  var finish = function () {
    done();
    process.exit();
  };

  if (err) {
    console.error('could not connect to cockroachdb', err);
    finish();
  }

  //Execute Transaction
  txnWrapper(client,
    function(client, next) {
      //function(){}
      //dostuff
      
    },
    function(err, results) {
      if (err) {
        console.error('error performing transaction', err);
        finish();
      }
    });

});