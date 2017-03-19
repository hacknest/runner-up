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
        var dropSQL = "DROP TABLE IF EXISTS Runnerdb.path";
        var tableSQL = "CREATE TABLE IF NOT EXISTS Runnerdb.path (id SERIAL PRIMARY KEY, name STRING, difficulty FLOAT, time STRING, elevation STRING, distance STRING, url STRING, img STRING);"
        client.query(dropSQL);
        client.query(tableSQL ,next);
      },
      function (next) {

        client.query("INSERT INTO Runnerdb.path (id, name, difficulty, time, elevation, distance, url, img) VALUES " +
          "(1, 'Mount Pleasant', 4.0, '1hr 40min', '500m', '20km', 'https://www.google.com/maps/embed?pb=!1m24!1m8!1m3!1d20830.990385480516!2d-123.2459363!3d49.2598379!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m3!3m2!1d49.266027199999996!2d-123.24482049999999!4m3!3m2!1d49.266867399999995!2d-123.2403573!4m3!3m2!1d49.263638099999994!2d-123.22404429999999!5e0!3m2!1sen!2sca!4v1489887905647', 'img'), " +
          "(2, 'Sky Trail', 2.5, '2hr 40min', '600m', '42.5lm', 'https://www.google.com/maps/embed?pb=!1m24!1m8!1m3!1d20830.990385480516!2d-123.2459363!3d49.2598379!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m3!3m2!1d49.266027199999996!2d-123.24482049999999!4m3!3m2!1d49.266867399999995!2d-123.2403573!4m3!3m2!1d49.263638099999994!2d-123.22404429999999!5e0!3m2!1sen!2sca!4v1489887905647', 'img'), " +
          "(3, 'Spin Plaza', 5.0, '30min', '70m', '1km', 'https://www.google.com/maps/embed?pb=!1m24!1m8!1m3!1d20830.990385480516!2d-123.2459363!3d49.2598379!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m3!3m2!1d49.266027199999996!2d-123.24482049999999!4m3!3m2!1d49.266867399999995!2d-123.2403573!4m3!3m2!1d49.263638099999994!2d-123.22404429999999!5e0!3m2!1sen!2sca!4v1489887905647', 'img')," +
          "(1000,'BRUNSWICK POINT',5.0, '2hr 30min', '500m', '10km', 'https://www.google.com/maps/embed/v1/directions?key=AIzaSyD0byp-RpRoTfcwzb_PiZB-e5kFuVV-_es&center=37.795414, -122.433373&zoom=14&destination=37.7926365,-122.4262736&origin=37.7926498,-122.4261762&waypoints=37.7934806, -122.4246629| 37.7993957, -122.4324956  | 37.8011252,-122.4339288  | 37.8008881 ,-122.4358751 | 37.7974523, -122.4355892 | 37.7973705, -122.4372505 | 37.7977247, -122.438111  | 37.7965764, -122.4421854| 37.7899998,  -122.4398997| 37.7911452, -122.4359966&avoid=tolls|highways&mode=walking', 'img')," +
          "(1001,'BRUNSWICK POINT',5.0, '2hr 30min', '500m', '10km', 'https://www.google.com/maps/embed/v1/directions?key=AIzaSyD0byp-RpRoTfcwzb_PiZB-e5kFuVV-_es&center=37.795414, -122.433373&zoom=14&destination=37.7926365,-122.4262736&origin=37.7926498,-122.4261762&waypoints=37.7934806, -122.4246629| 37.7993957, -122.4324956  | 37.8011252,-122.4339288  | 37.8008881 ,-122.4358751 | 37.7974523, -122.4355892 | 37.7973705, -122.4372505 | 37.7977247, -122.438111  | 37.7965764, -122.4421854| 37.7899998,  -122.4398997| 37.7911452, -122.4359966&avoid=tolls|highways&mode=walking', 'img')," +
          "(1002,'BRUNSWICK POINT',5.0, '2hr 30min', '500m', '10km', 'https://www.google.com/maps/embed/v1/directions?key=AIzaSyD0byp-RpRoTfcwzb_PiZB-e5kFuVV-_es&center=37.795414, -122.433373&zoom=14&destination=37.7926365,-122.4262736&origin=37.7926498,-122.4261762&waypoints=37.7934806, -122.4246629| 37.7993957, -122.4324956  | 37.8011252,-122.4339288  | 37.8008881 ,-122.4358751 | 37.7974523, -122.4355892 | 37.7973705, -122.4372505 | 37.7977247, -122.438111  | 37.7965764, -122.4421854| 37.7899998,  -122.4398997| 37.7911452, -122.4359966&avoid=tolls|highways&mode=walking', 'img')," +
          "(1003, 'Potato Mountain', 5.0, '2hr 40min', '600m', '15km', 'https://www.google.com/maps/embed/v1/directions?key=AIzaSyD0byp-RpRoTfcwzb_PiZB-e5kFuVV-_es&avoid=tolls|highways&mode=walking&center=37.793331, -122.405838&zoom=12&origin=37.7717858,-122.40795&destination=37.7830491,-122.393652&waypoints=37.8073756,-122.420485|37.7758117,-122.4066866|37.7789351,-122.4149749|37.7796626,-122.4135846|37.7807256,-122.4153361|37.7858607,-122.3931962|37.7796458,-122.3981817', 'img');",
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


