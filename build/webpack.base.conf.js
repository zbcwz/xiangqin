var path = require('path')
var config = require('../config')
/* const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem'); */

var utils = require('./utils')
var webpack = require('webpack');
var projectRoot = path.resolve(__dirname, '../')

var env = process.env.NODE_ENV
// check env & config/index.js to decide weither to enable CSS Sourcemaps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'muse-components': 'muse-ui/src'
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },

  plugins: [
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    jquery: "jquery",
    "window.jQuery": "jquery",
    wx : 'weixin-js-sdk',
    wxApi : path.join(__dirname, '../src/plugins/shareConfig.js')
  }),




/*  new webpack.LoaderOptionsPlugin({
      // webpack 2.0之后， 此配置不能直接写在自定义配置项中， 必须写在此处
      vue: {
          postcss: [require('postcss-pxtorem')({ rootValue: 100, propWhiteList: [] })]
      },
  }), */

],

  module: {
    loaders: [
      {
          test: /.vue$/,
          loader: "vue-loader"
      },
/*      {
        test: /\.vue$/,
        loader: 'vue'
      }, */
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        //include: [path.resolve(__dirname, '../'),path.resolve("~/_vant@2.2.11@vant/es/list/index.js")],
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      },
/*      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['env']
            }
        },
      }, */
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[ext]')
        }
      },
       {test: /\.less$/, loader: 'style!css!less'},
      {
        test: /muse-ui.src.*?js$/,
        loader: 'babel'
      },
      {
			  test: /vux.src.*?js$/,
			  loader: 'babel'
			},
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[ext]')
        }
      },
    ]
  },
  vue: {
    loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      }),

    ],
/*      css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      }
    }
  } */
/*          plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*']
          })
        ]*/
  },
  externals: {

  }
}
