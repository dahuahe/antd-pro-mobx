const webpack = require('webpack');
const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const PATHS = require("./PATHS");

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: path.resolve(PATHS.src, 'asset/template/index.html'),
  filename: path.resolve(PATHS.dist, 'index.html'),
  favicon: path.resolve(PATHS.src, 'asset/image/favicon_16.ico')
});

module.exports = {
  entry: {
    main: ['@babel/polyfill', path.resolve(PATHS.src, 'index.js')]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.json$/,
        use: [
          {
            loader: 'json-loader'
          }
        ]
      },
      {
        test: /\.(png|gif|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              name: path.normalize('assets/[name].[ext]')
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              name: path.normalize('assets/[name].[ext]')
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      stylesheet: path.resolve(PATHS.src, 'asset/stylesheet'),
      image: path.resolve(PATHS.src, 'asset/image'),
      layout: path.resolve(PATHS.src, 'layout'),
      component: path.resolve(PATHS.src, 'component'),
      page: path.resolve(PATHS.src, 'page'),
      util: path.resolve(PATHS.src, 'util'),
      constant: path.resolve(PATHS.src, 'constant'),
      store: path.resolve(PATHS.src, 'store')
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: PATHS.root
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    htmlWebpackPlugin
  ]
};
