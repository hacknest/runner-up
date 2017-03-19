var CLIENT_DIR = `${__dirname}/../client`;
var ROOT_DIR = `${__dirname}/../..`;
var VENDOR_DIR = `${__dirname}/../app/js/vendor`;

var fs = require('fs');
var express = require('express');

var api = require('./api/routes.js');
var app = express();
var port = process.env.PORT || 3000;
var isProd = process.env.NODE_ENV === 'production';

// for our routes
var pg = require('pg')

var connectionString = process.env.DATABASE_URL || 'postgresql://root@localhost:26257?sslmode=disable';
var client = new pg.Client(connectionString);

var sendFile = function(rootDir, relPath, response, cached) {
    var options = {
        root: rootDir
    };

    if (cached) {
        options.headers = {'Cache-Control': 'max-age=1800'}
    }

    response.sendFile(relPath, options, function(err) {
        if (err) {
            console.log(err);
            response.sendStatus(err.status);
        }
    });
};

// Hot load js files when in development
if (!isProd) {
    var webpack = require('webpack');
    var webpackConfig = require(`${ROOT_DIR}/webpack.config.js`);
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');
    var compiler = webpack(webpackConfig);

    app.use(webpackDevMiddleware(compiler, {
        hot: true,
        filename: 'client.js',
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true
        },
        historyApiFallback: true
    }));

    app.use(webpackHotMiddleware(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000
    }));
}

// MIDDLEWARE
// ---

app.use(function(request, response, next) {
    // Log all incoming requests
    console.log(`\n[ ${request.method} ] ${request.url}\n`);
    next();
});

// GET
// ---

// CRUD on database

app.get('/paths', function(request,response) {

    try {
        pg.connect(connectionString, function(err, client, done) {
            if(err) {
              done();
              console.log(err);
              return response.status(500).json({ success: false, data: err});
            }
            var query = client.query("SELECT * FROM Runnerdb.path;");
            var results = []
            query.on('row', function(row) {
                console.log(row);
                results.push(row);
                         });
            query.on('end', function() {
                response.send(results);
            });

            query.on('error', function(err) {
              console.log(err);
              response.status(500).json({ success: false, data: err});
              done();
            });
        })
    } catch (ex) {
        callback(ex);
    }
});

app.post('/paths', function(request, response) {

});

// Html
app.get('/', function(request, response) {
    sendFile(CLIENT_DIR, 'index.html', response, true);
});

// Client Files
app.get('/:filename(client.js|styles.css)', function(request, response) {
    const cached = request.params.filename === 'sw.js' ? false : true;
    sendFile(CLIENT_DIR, request.url, response, cached);
});

app.get('/assets/:filename', function(request, response) {
    sendFile(CLIENT_DIR, request.url, response, true);
});

app.use('/api', api);

// Start the server on port 3000
app.listen(port, function(err) {
    if (err) {
        return console.log(err);
    }
    console.log(`[ OK ] App is listening on port: ${port} 👂`);
});
