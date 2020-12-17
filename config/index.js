// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '',
    productionSourceMap: false,//控制map文件的导出，便于调试
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8888,
    //port: 8080,
    assetsSubDirectory: 'public',
    assetsPublicPath: '',
    proxyTable: {



        	//'/':'http://weixin.zb12351.com',
          '/app/index': {
              target: 'http://rzweixin.zb12351.com/',
              changeOrigin: true,
              pathRewrite: {
                  '^/proxy': ''
              }
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
    	'/static':'http://139.129.226.92:8080/union-face'
//		'/iface':'http://192.168.1.115:8080/',//yr
//		  '/iface':'http://192.168.2.9:8090/iface',//sl
//			'/iface':'http://192.168.2.3:8080/union-face'
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
