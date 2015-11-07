var path = require('path'),
    webpack = require('webpack'),
    CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin"),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

var sassPaths = require("node-bourbon").includePaths.map(function(sassPath) {
  return "includePaths[]=" + sassPath;
}).join("&");

var paths = {
  src: path.join(__dirname, 'app/'),
  dist: path.join(__dirname, 'public')
}

module.exports = {
    devtool: 'sourcemaps',
    cache: true,
    entry: {
      dev: [
        'webpack/hot/only-dev-server',
        'webpack-dev-server/client?http://localhost:8080'
      ],
      app: path.join(paths.src, 'app.js'),
      vendor: ['react', 'react-dom', 'react-router', 'history']
    },
    output: {
        path: path.join(paths.dist),
        publicPath: 'http://localhost:8080/assets/',
        filename: '[name].js'
    },
    module: {
      loaders: [
        {
          test: /\.js$|\.jsx$/,
          exclude: /node_modules/,
          loaders: ['babel-loader']
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style', 'css!sass?' + sassPaths)
        }
      ]
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          BROWSER: JSON.stringify(true)
        }
      }),
      new ExtractTextPlugin('[name].css'),
      new CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
};
