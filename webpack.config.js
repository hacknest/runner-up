var webpack = require('webpack');
var path = require('path');
var rootDir = process.cwd();

var entryPath = path.resolve(rootDir, 'src/app/js/app.js');
var outputPath = path.resolve(rootDir, 'src/client');

var isProd = process.env.NODE_ENV === 'production';

var config = {
    entry: [
        entryPath
    ],
    output: {
        filename: 'client.js',
        path: outputPath,
        publicPath: '/'
    },
    resolve: {
        alias: {
            jquery: path.resolve(rootDir, 'src/app/js/vendor/jquery.min.js'),
            bluebird: path.resolve(rootDir, 'src/app/js/vendor/bluebird.min.js')
        }
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
};

if (isProd) {
    config.plugins = config.plugins.concat([
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        })
    ]);

} else {
    config.devtool = 'inline-source-maps';
    config.entry.unshift('webpack-hot-middleware/client?path/__webpack_hmr&timeout20000');
    config.plugins = config.plugins.concat ([
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]);
}

module.exports = config;
