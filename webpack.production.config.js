var path = require('path'),
    webpack = require('webpack'),
    CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin"),
    UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin"),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

var sassPaths = require("node-bourbon").includePaths.map(function(sassPath) {
  return "includePaths[]=" + sassPath;
}).join("&");

var paths = {
  src: path.join(__dirname, 'app/'),
  dist: path.join(__dirname, 'public/assets')
}

module.exports = {
    cache: true,
    devtool: 'sourcemaps',
    entry: {
      app: path.join(paths.src, 'app.js'),
      vendor: ['react', 'react-dom', 'react-router', 'history']
    },
    output: {
        path: path.join(paths.dist),
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
      new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false
          }
      })
    ],
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
};
