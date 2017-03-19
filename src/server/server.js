var CLIENT_DIR = `${__dirname}/../client`;
var ROOT_DIR = `${__dirname}/../..`;
var VENDOR_DIR = `${__dirname}/../app/js/vendor`;
var DATABASE = require('./database');

var fs = require('fs');
var express = require('express');

var api = require('./api/routes.js');
var app = express();
var port = process.env.PORT || 3000;
var isProd = process.env.NODE_ENV === 'production';

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

// // GET
// // ---

// // Fallback Demo
// app.get('/surprise', function(request, response) {
//     sendFile(CLIENT_DIR, `/assets/surprise.gif`, response, false);
// });

// // Html
// app.get('/', function(request, response) {
//     sendFile(CLIENT_DIR, 'index.html', response, true);
// });

// // Client Files
// app.get('/:filename(client.js|styles.css|fallback.html|sw.js)', function(request, response) {
//     const cached = request.params.filename === 'sw.js' ? false : true;
//     sendFile(CLIENT_DIR, request.url, response, cached);
// });

// app.get('/assets/:filename', function(request, response) {
//     sendFile(CLIENT_DIR, request.url, response, true);
// });

// app.get('/assets/uncached/:filename', function(request, response) {
//     sendFile(CLIENT_DIR, `/assets/${request.params.filename}`, response, false);
// });

// // Vendor Files
// app.get('*/vendor/:filename(sw-toolbox.js)', function(request, response) {
//     sendFile(VENDOR_DIR, request.params.filename, response, true);
// });

app.use('/api', api);

// Start the server on port 3000
app.listen(port, function(err) {
    if (err) {
        return console.log(err);
    }
    console.log(`[ OK ] App is listening on port: ${port} 👂`);
});
