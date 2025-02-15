const path = require('path');
const webpack = require('webpack');
const pkg = require('../package');

const now = new Date();
const banner = `
 ${pkg.name} v${pkg.version}
 ${pkg.repository.url}

 Copyright (c) 2019 ${pkg.author}
 Released under the ${pkg.license} license

 Date: ${now.toISOString()}
`;

module.exports = (env = {}) => {
  return {
    entry: path.join(__dirname, "../src/connectors/js/index.js"),
    output: {
      path: path.join(__dirname, `../build/${pkg.version}`),
      filename: `${pkg.name}.min.js`,
      chunkFilename: `[name].min.js`,
      jsonpFunction: 'webpackJsonp' + Date.now(),
      publicPath: `https://cdn.scaleflex.it/plugins/${pkg.name}/`
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: "babel-loader",
          exclude: /(node_modules|bower_components)\/(?!pretty-bytes\/).*/,
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          loader: 'file-loader',
          options: {
            context: 'src',
            emitFile: false,
            name: '[path][name].[ext]'
          }
        },
        {
          test: /\.(woff|ttf|otf|eot|woff2|svg)$/i,
          loader: 'file-loader',
          options: {
            context: 'src',
            emitFile: false,
            name: '[path][name].[ext]',
            esModule: false
          }
        }
      ]
    },
    plugins: [
      new webpack.BannerPlugin(banner)
    ],
    resolve: {
      extensions: ["*", ".js", ".jsx"]
    }
  }
};
