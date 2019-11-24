const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const R = require('ramda')
const Dotenv = require('dotenv-webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const postcssSafeParser = require('postcss-safe-parser')
const fs = require('fs')
const dotenv = require('dotenv')
const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin')

const abs = str => path.resolve(__dirname, str)
// const prAbs = str => path.resolve(abs('../..'), str)

function loadDotEnv () {
  const result = dotenv.config({
    path: abs('.env')
  })

  if (result.error) {
    throw result.error
  }
}

loadDotEnv()

const htmlEntries = R.pipe(
  R.toPairs,
  R.map(([name, path]) => (
    new HtmlWebpackPlugin({
      title: 'Loading ...',
      filename: `${name}.html`,
      chunks: [name],
      template: abs('src/js/entries/template.ejs')
      // favicon: abs('src/imgs/favicon.ico')
    })
  ))
)

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
  mode: process.env.NODE_ENV,
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        uglifyOptions: {
          output: {
            comments: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: postcssSafeParser,
          discardComments: {
            removeAll: true
          }
        }
      })
    ]
  },
  entry: {
    index: abs('src/js/entries/index.js')
  },
  output: {
    path: abs('public'),
    filename: 'cache/js/[name]-[hash].js',
    publicPath: '/'
  },
  resolve: {
    modules: [
      abs('node_modules'),
      abs('src/js'),
      abs('src/sass'),
      abs('src'),
      abs('.')
    ],
    extensions: ['.js', '.json', '.scss']
  },
  node: {
    __filename: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',

        /**
         * babel-loader doesn't load the .babelrc
         * @todo Remove once the issue is addressed
         * {@link https://github.com/babel/babel-loader/issues/624}
         */
        options: Object.assign(
          {
            babelrc: false
          },
          JSON.parse(fs.readFileSync(abs('.babelrc'), 'utf-8'))
        )
      },
      {
        test: /\.(mp4|mp3|jpe?g|png|gif|swf|ttf|eot|svg|woff2?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader',
        query: {
          name: 'cache/assets/[name]-[hash].[ext]'
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader?sourceMap',
          'resolve-url-loader?sourceMap',
          'sass-loader?sourceMap',
          'import-glob-loader'
        ]
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: abs('.env'),
      safe: abs('.env.example')
    }),
    new MiniCssExtractPlugin({
      filename: 'cache/css/[name]-[chunkhash].css',
      chunkFilename: 'cache/css/[name]-[chunkhash].chunks.css'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new UnusedFilesWebpackPlugin({
      failOnUnused: process.env.WEBPACK_MOD === 'fail-on-unused',
      patterns: ['src/**/*.*']
    })
  ],
  devServer: {
    before (app) {
      for (const host of module.exports.devServer.allowedHosts) {
        console.info(`Project is running at http://${host}:${module.exports.devServer.port}/`)
      }
    },
    contentBase: abs('public'),
    historyApiFallback: {
      disableDotRule: true
    },
    https: false,
    host: '0.0.0.0',
    noInfo: false,
    allowedHosts: [
      'local-argus.edu.ge'
    ],
    port: parseInt(process.env.SERVER_PORT)
  },
  devtool: false,
  context: __dirname
}

module.exports.plugins = module.exports.plugins.concat(htmlEntries(module.exports.entry))

if (process.env.NODE_ENV !== 'production' && process.env.WEBPACK_MOD !== 'show-unused') {
  const WebpackBuildNotifierPlugin = require('webpack-build-notifier')

  module.exports.plugins.push(
    new WebpackBuildNotifierPlugin({
      sound: 'Tink',
      suppressSuccess: true
    })
  )
}

if (process.env.WEBPACK_MOD === 'circular-dependency') {
  const CircularDependencyPlugin = require('circular-dependency-plugin')

  module.exports.stats = 'minimal'
  module.exports.plugins.push(
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
      cwd: process.cwd()
    })
  )
}
