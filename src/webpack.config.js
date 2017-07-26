const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'index.js'),
  },
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, '../')
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: path.resolve(__dirname),
      loaders: 'babel-loader'
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['postcss-loader', 'css-loader', 'sass-loader']
      })
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['postcss-loader', 'css-loader']
      })
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html')
    }),
    new ExtractTextPlugin('[name].[contenthash].css')
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    port: 8080,
    noInfo: true,
    historyApiFallback: true,
  }

}
