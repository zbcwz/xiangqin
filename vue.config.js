const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const extractTextPlugin = require('extract-text-webpack-plugin');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const env = process.env.NODE_ENV;
const type = process.env.VUE_APP_BUILD_TYPE;

//console.log(process.env.VUE_APP_BUILD_TYPE);
//const webpackbase = require('build/webpack.base.conf.js');
 const config = {
  publicPath: "",
  assetsDir:'public',
  lintOnSave: false,
  productionSourceMap: false,
  css: {
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps
    loaderOptions: {}, // css预设器配置项
    modules: false // 启用 CSS modules for all css / pre-processor files.
  },
	configureWebpack: {
    module: {
      rules:[

      ]
    },
		plugins: [
		  new webpack.ProvidePlugin({
		    $: "jquery",
		    jQuery: "jquery",
		    jquery: "jquery",
		    "window.jQuery": "jquery",
		    wx : 'weixin-js-sdk',
		    wxApi : path.join(__dirname, 'src/plugins/shareConfig.js')
		  }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true
      }),

		/*  new webpack.LoaderOptionsPlugin({
		      // webpack 2.0之后， 此配置不能直接写在自定义配置项中， 必须写在此处
		      vue: {
		          postcss: [require('postcss-pxtorem')({ rootValue: 100, propWhiteList: [] })]
		      },
		  }), */

		],
    externals: {
      'labor': 'labor',
    },
	},
  css: {
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
  },

 	devServer: {
    //env: require('./dev.env'),
    open: true,
    port: 8888,
    //port: 8080,
/*    assetsSubDirectory: 'public',
    assetsPublicPath: '', */
    overlay: {
        warnings: true,
        errors: true
    }, // 错误、警告在页面弹出
    proxy: {



      //'/':'http://weixin.zb12351.com',
      '/app/index': {
          target: 'http://rzweixin.zb12351.com/',
          changeOrigin: true,
          pathRewrite: {
              '^/proxy': ''
          },
          cookieDomainRewrite: "localhost:8888",
      },
      '/attachment/images': {
          target: 'http://rzweixin.zb12351.com/',
          changeOrigin: true,
          pathRewrite: {
              '^/proxy': ''
          },
          cookieDomainRewrite: "localhost:8888",
      },
      '/mapi': {
          target: 'http://rzweixin.zb12351.com/',
          changeOrigin: true,
          pathRewrite: {
              '^/proxy': ''
          }
      },


      	//测试版原标记0828
 	//'/iface':'http://test.zb12351.com/union-face',

    	//'/iface':'http://139.129.226.92:8080/union-face',
	  //'/iface':'http://192.168.1.107:8082/',//接口地址
  //	'/iface':'http://192.168.1.106:8080/union-face',
//  	'/iface':'http://192.168.1.106:8080/union-face',
//  	'/iface':'http://192.168.1.129:8090/iface'//sl,
//  	'/iface':'http://192.168.2.3:8080/union-face',
//  	'/iface':'http://192.168.1.101:8080/union-face',//hll
//		'/iface':'http://192.168.1.112:8080/union-face',//jiajun
//			'/iface':'http://192.168.2.18:8088/iface',//jiajun
//  	'/iface':'http://192.168.1.109:8080/union-face',
	  	//'/iface':'http://192.168.1.108:8080/',//yr
    	//'/static':'http://139.129.226.92:8080/union-face'
//		'/iface':'http://192.168.1.115:8080/',//yr
//		  '/iface':'http://192.168.2.9:8090/iface',//sl
//			'/iface':'http://192.168.2.3:8080/union-face'
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    //cssSourceMap: false

	},

}

if(type == "rzlive"){
  config.devServer = {
    //env: require('./dev.env'),
    disableHostCheck: true,
    open: true,
    port: 8888,
    //port: 8080,
/*    assetsSubDirectory: 'public',
    assetsPublicPath: '', */
    overlay: {
        warnings: true,
        errors: true
    }, // 错误、警告在页面弹出
    proxy: {



      //'/':'http://weixin.zb12351.com',
      '/app/index': {
          target: 'http://rzweixin.zb12351.com/',
          changeOrigin: true,
          pathRewrite: {
              '^/proxy': ''
          }
      },
      '/mapi': {
          target: 'http://weixin.zb12351.com/',
          changeOrigin: true,
          pathRewrite: {
              '^/proxy': ''
          }
      },


      	//测试版原标记0828
 	//'/iface':'http://test.zb12351.com/union-face',

    	//'/iface':'http://139.129.226.92:8080/union-face',
	  //'/iface':'http://192.168.1.107:8082/',//接口地址
  //	'/iface':'http://192.168.1.106:8080/union-face',
//  	'/iface':'http://192.168.1.106:8080/union-face',
//  	'/iface':'http://192.168.1.129:8090/iface'//sl,
//  	'/iface':'http://192.168.2.3:8080/union-face',
//  	'/iface':'http://192.168.1.101:8080/union-face',//hll
//		'/iface':'http://192.168.1.112:8080/union-face',//jiajun
//			'/iface':'http://192.168.2.18:8088/iface',//jiajun
//  	'/iface':'http://192.168.1.109:8080/union-face',
	  	//'/iface':'http://192.168.1.108:8080/',//yr
    	//'/static':'http://139.129.226.92:8080/union-face'
//		'/iface':'http://192.168.1.115:8080/',//yr
//		  '/iface':'http://192.168.2.9:8090/iface',//sl
//			'/iface':'http://192.168.2.3:8080/union-face'
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    //cssSourceMap: false

	}
}

 if(env == "production"){
  //config.configureWebpack.productionSourceMap = false;
  config.chainWebpack= config => {
    config.optimization.minimize(true);
  }

  config.configureWebpack.plugins.push(
/*    new UglifyJsPlugin( {
      uglifyOptions: {
        warnings: false,
        output:{
          comments:false
        },
        compress: {
          drop_console: true,
          drop_debugger: false,
          pure_funcs:['console.log']
        }
      },
      sourceMap: false,
      parallel: true
    } ) */
    new TerserWebpackPlugin( {
      cache: true,
      parallel: true,
      sourceMap: false,
      terserOptions: {
 /*       warnings: false,
        output:{
          comments:false
        }, */
        compress: {
          drop_console: true,
          drop_debugger: false,
          //pure_funcs:['console.log']
        }
      },
      //parallel: true
    } )

  );

/*  config.configureWebpack.module.rules.push({


  }); */
}
module.exports= config;
