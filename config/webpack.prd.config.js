const path = require('path'),
  fs = require('fs'),
  webpack = require('webpack'),
  autoprefixer = require('autoprefixer'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin')
let clientConfig, serverConfig

function getExternals() {
  return fs.readdirSync(path.resolve(__dirname, '../node_modules'))
    .filter(filename => !filename.includes('.bin'))
    .reduce((externals, filename) => {
      externals[filename] = `commonjs ${filename}`

      return externals
    }, {})
}

clientConfig = {
  context: path.resolve(__dirname, '..'),
  entry: {
    bundle: './client',
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'superagent'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: '[name].[chunkhash:8].js',
    chunkFilename: 'chunk.[name].[chunkhash:8].js',
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react', 'stage-0'],
        plugins: ['transform-runtime', 'add-module-exports'],
        cacheDirectory: true
      }
    }, {
      test: /\.styl$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader?modules&camelCase&importLoaders=1&localIdentName=[hash:base64:8]',
          {
            loader:'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer({browsers: ['> 5%']})
              ]
            }
          },
          'stylus-loader'
        ]
      })
    }, {
      test: /\.(jpg|png|gif|webp)$/,
      loader: 'url-loader?limit=8000'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.html$/,
      loader: 'html-loader?minimize=false'
    }]
  },
  resolve: {extensions: ['.js', '.json', '.styl']},
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      filename: '[name].[chunkhash:8].js'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false},
      comments: false
    }),
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),
    new HtmlWebpackPlugin({
      filename: '../../views/prd/index.html',
      template: './views/tpl/index.tpl.html',
      chunksSortMode: 'dependency'
    }),
    new ExtractTextPlugin({filename: '[name].[contenthash:8].css', allChunks: true})
  ]
}

serverConfig = {
  context: path.resolve(__dirname, '..'),
  entry: {server: './server/server.prd'},
  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: '[name].js',
    chunkFilename: 'chunk.[name].js'
  },
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react', 'stage-0'],
        plugins: ['add-module-exports'],
        cacheDirectory: true
      }
    }, {
      test: /\.styl$/,
      loaders: [
        'css-loader/locals?modules&camelCase&importLoaders=1&localIdentName=[hash:base64:8]',
        'stylus-loader'
      ]
    }, {
      test: /\.(jpg|png|gif|webp)$/,
      loader: 'url-loader?limit=8000'
    }, {
      test: /\.json$/,
      loader: 'json'
    }]
  },
  externals: getExternals(),
  resolve: {extensions: ['.js', '.json', '.styl']},
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false},
      comments: false
    }),
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)})
  ]
}

module.exports = [clientConfig, serverConfig]
