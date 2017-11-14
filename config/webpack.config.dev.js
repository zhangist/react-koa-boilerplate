const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    bundle: [
      './src/client',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    ],
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
    filename: '[name].js',
    chunkFilename: 'chunk.[name].js',
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
  resolve: { extensions: ['.js', '.jsx', '.json', '.styl'] },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      filename: '[name].js',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
    new HtmlWebpackPlugin({
      filename: '../client/index.html',
      template: './src/client/index.tpl.html',
      favicon: path.resolve(__dirname, '../src/client/favicon.ico'),
    }),
    new ExtractTextPlugin({ filename: '[name].css', allChunks: true }),
    new ProgressBarPlugin({ summary: false }),
  ],
};
