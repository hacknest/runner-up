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

var Pool = pg.Pool;
var pool = new Pool({
  user: 'runnerup',
  host: 'localhost',
  database: 'Runnerdb',
  max: 10,
  idleTimeoutMillis: 1000
});

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
        client.query("CREATE TABLE path (id SERIAL PRIMARY KEY, name STRING, difficulty FLOAT, time INTERVAL," + 
          " elevation INT, url STRING, img STRING);", next);
      },
      function (next) {
        
        client.query("INSERT INTO path (id, name, difficulty, time, elevation, url, img) VALUES "+ 
          "(1, 'Mount Pleasant', 4.0, '2:40:00', 5, 'https://www.google.com/maps/embed?pb=!1m24!1m8!1m3!1d20830.990385480516!2d-123.2459363!3d49.2598379!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m3!3m2!1d49.266027199999996!2d-123.24482049999999!4m3!3m2!1d49.266867399999995!2d-123.2403573!4m3!3m2!1d49.263638099999994!2d-123.22404429999999!5e0!3m2!1sen!2sca!4v1489887905647', 'img'), " + 
          "(2, 'Sky Trail', 6.0, '4:45:00', 7, 'https://www.google.com/maps/embed?pb=!1m24!1m8!1m3!1d20830.990385480516!2d-123.2459363!3d49.2598379!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m3!3m2!1d49.266027199999996!2d-123.24482049999999!4m3!3m2!1d49.266867399999995!2d-123.2403573!4m3!3m2!1d49.263638099999994!2d-123.22404429999999!5e0!3m2!1sen!2sca!4v1489887905647', 'img'), " + 
          "(3, 'Spin Plaza', 6.0, '1:35:00', 4, 'https://www.google.com/maps/embed?pb=!1m24!1m8!1m3!1d20830.990385480516!2d-123.2459363!3d49.2598379!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m3!3m2!1d49.266027199999996!2d-123.24482049999999!4m3!3m2!1d49.266867399999995!2d-123.2403573!4m3!3m2!1d49.263638099999994!2d-123.22404429999999!5e0!3m2!1sen!2sca!4v1489887905647', 'img')", next);
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

module.exports = pool;