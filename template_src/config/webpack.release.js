const path = require('path');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const CordovaHtmlOutputPlugin = require('../webpack/plugins/CordovaHtmlOutputPlugin.js');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function() {
  return webpackMerge(commonConfig({ mode: 'production' }), {
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['css-loader']
        }
      ]
    },
    plugins: [
      new CordovaHtmlOutputPlugin(),
      new MiniCssExtractPlugin(),
      new TerserPlugin({
        extractComments: false
      }),
      new CleanWebpackPlugin({
        dry: false,
        verbose: false,
        cleanOnceBeforeBuildPatterns: ['!index.html'],
        cleanAfterEveryBuildPatterns: ['!index.html']
      })
    ]
  });
};
