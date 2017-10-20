const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');

function getExternals() {
  return fs.readdirSync(path.resolve(__dirname, '../node_modules'))
    .filter(filename => !filename.includes('.bin'))
    .reduce((externals, filename) => {
      const el = externals;
      el[filename] = `commonjs ${filename}`;

      return el;
    }, {});
}

const clientConfig = {
  context: path.resolve(__dirname, '..'),
  entry: {
    bundle: './src/client',
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'superagent',
      'babel-polyfill',
    ],
  },
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: '[name].[chunkhash:8].js',
    chunkFilename: 'chunk.[name].[chunkhash:8].js',
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.js[x]?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react'],
        plugins: ['transform-runtime', 'add-module-exports'],
        cacheDirectory: true,
      },
    }, {
      test: /\.styl$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer({ browsers: ['> 5%'] }),
              ],
            },
          },
          'stylus-loader',
        ],
      }),
    }, {
      test: /\.(jpg|png|gif|webp)$/,
      loader: 'url-loader?limit=8000',
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /\.html$/,
      loader: 'html-loader?minimize=false',
    }],
  },
  resolve: { extensions: ['.js', '.jsx', '.json', '.less'] },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      filename: '[name].[chunkhash:8].js',
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: { warnings: false },
    //   comments: false,
    // }),
    new MinifyPlugin({}), // for es6 minify
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
    new HtmlWebpackPlugin({
      filename: '../client/index.html',
      template: './src/client/index.tpl.html',
      chunksSortMode: 'dependency',
    }),
    new ExtractTextPlugin({ filename: '[name].[contenthash:8].css', allChunks: true }),
  ],
};

const serverConfig = {
  context: path.resolve(__dirname, '..'),
  entry: { server: './src/server/server.prd' },
  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: '[name].js',
    chunkFilename: 'chunk.[name].js',
  },
  target: 'node',
  node: {
    __filename: true,
    __dirname: true,
  },
  module: {
    rules: [{
      test: /\.js[x]?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react'],
        plugins: ['transform-runtime', 'add-module-exports'],
        cacheDirectory: true,
      },
    }, {
      test: /\.styl$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer({ browsers: ['> 5%'] }),
              ],
            },
          },
          'stylus-loader',
        ],
      }),
    }, {
      test: /\.(jpg|png|gif|webp)$/,
      loader: 'url-loader?limit=8000',
    }, {
      test: /\.json$/,
      loader: 'json',
    }],
  },
  externals: getExternals(),
  resolve: { extensions: ['.js', '.jsx', '.json', '.less'] },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: { warnings: false },
    //   comments: false,
    // }),
    new MinifyPlugin({}), // for es6 minify
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
    new ExtractTextPlugin({ filename: '[name].[contenthash:8].css', allChunks: true }),
  ],
};

module.exports = [clientConfig, serverConfig];
