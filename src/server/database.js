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
  console.log('pg connecting')
  pg.connect(config, function (err, client, done) {
    // Closes communication with the database and exits.
    console.log("Creating tables");
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
        console.log("creating runner db table");
        client.query("DROP TABLE IF EXISTS Runnerdb.path");
        client.query("CREATE TABLE IF NOT EXISTS Runnerdb.path (id SERIAL PRIMARY KEY, name STRING, difficulty FLOAT, time STRING," +
          " elevation INT, url STRING, img STRING);",
          next);
      },
      function (next) {

        client.query("INSERT INTO Runnerdb.path (id, name, difficulty, time, elevation, url, img) VALUES " +
          "(1, 'Mount Pleasant', 4.0, '1:45:3', 5, 'https://www.google.com/maps/embed?pb=!1m24!1m8!1m3!1d20830.990385480516!2d-123.2459363!3d49.2598379!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m3!3m2!1d49.266027199999996!2d-123.24482049999999!4m3!3m2!1d49.266867399999995!2d-123.2403573!4m3!3m2!1d49.263638099999994!2d-123.22404429999999!5e0!3m2!1sen!2sca!4v1489887905647', 'img'), " +
          "(2, 'Sky Trail', 6.0, '2:40:5', 7, 'https://www.google.com/maps/embed?pb=!1m24!1m8!1m3!1d20830.990385480516!2d-123.2459363!3d49.2598379!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m3!3m2!1d49.266027199999996!2d-123.24482049999999!4m3!3m2!1d49.266867399999995!2d-123.2403573!4m3!3m2!1d49.263638099999994!2d-123.22404429999999!5e0!3m2!1sen!2sca!4v1489887905647', 'img'), " +
          "(3, 'Spin Plaza', 6.0, '3:23:3', 4, 'https://www.google.com/maps/embed?pb=!1m24!1m8!1m3!1d20830.990385480516!2d-123.2459363!3d49.2598379!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m3!3m2!1d49.266027199999996!2d-123.24482049999999!4m3!3m2!1d49.266867399999995!2d-123.2403573!4m3!3m2!1d49.263638099999994!2d-123.22404429999999!5e0!3m2!1sen!2sca!4v1489887905647', 'img');",
          next);
      },
      function (results, next) {
        // Print out the balances.
        client.query('SELECT * FROM Runnerdb.path;',
          next);
      },
    ],
    function (err, results) {
      if (err) {
        console.error('error inserting into and selecting from paths', err);
        finish();
      }

      console.log('Path:');
      results.rows.forEach(function (row) {
        console.log(row);
      });
      finish();
    });
  });
};


populateInitialDB();

module.exports = pool;

