var mui= {};
(function($, window, undefined) {
	var jsonType = 'application/json';
	var htmlType = 'text/html';
	var rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
	var scriptTypeRE = /^(?:text|application)\/javascript/i;
	var xmlTypeRE = /^(?:text|application)\/xml/i;
	var blankRE = /^\s*$/;
	$.noop = function() {};
	$.isArray = Array.isArray ||
		function(object) {
			return object instanceof Array;
		};
	$.now = Date.now || function() {
		return +new Date();
	};
	$.root="";
	$.shearRoot='';
	$.updateurl="";
	$.islog=false;
	$.mallUrl="";

	$.each = function(elements, callback, hasOwnProperty) {
		if (!elements) {
			return this;
		}
		if (typeof elements.length === 'number') {
			[].every.call(elements, function(el, idx) {
				return callback.call(el, idx, el) !== false;
			});
		} else {
			for (var key in elements) {
				if (hasOwnProperty) {
					if (elements.hasOwnProperty(key)) {
						if (callback.call(elements[key], key, elements[key]) === false) return elements;
					}
				} else {
					if (callback.call(elements[key], key, elements[key]) === false) return elements;
				}
			}
		}
		return this;
	};
	var class2type = {};
	var arr=['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Object', 'Error'];
	$.each(['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Object', 'Error'], function(i, name) {
		class2type["[object " + name + "]"] = name.toLowerCase();
	});
	$.type = function(obj) {
		return obj == null ? String(obj) : class2type[{}.toString.call(obj)] || "object";
	};
	$.isFunction = function(value) {
		return $.type(value) === "function";
	};
	$.isObject = function(obj) {
		return $.type(obj) === "object";
	};
	$.isWindow = function(obj) {
		return obj != null && obj === obj.window;
	};
	$.isPlainObject = function(obj) {

		return $.isObject(obj) && !$.isWindow(obj) && Object.getPrototypeOf(obj) === Object.prototype;
	};
	$.plusReady = function(callback) {
		if (window.plus) {
			setTimeout(function() { //解决callback与plusready事件的执行时机问题(典型案例:showWaiting,closeWaiting)
				callback();
			}, 0);
		} else {
			document.addEventListener("plusready", function() {
				callback();
			});
		}
		return this;
	};

	$.ajaxSettings = {
		type: 'GET',
		beforeSend: $.noop,
		success: $.noop,
		error: $.noop,
		complete: $.noop,
		context: null,
		xhr: function(protocol) {
			return new window.XMLHttpRequest();
		},
		accepts: {
			script: 'text/javascript, application/javascript, application/x-javascript',
			json: jsonType,
			xml: 'application/xml, text/xml',
			html: htmlType,
			text: 'text/plain'
		},
		timeout: 20000,
		processData: true,
		cache: true
	};
	var ajaxBeforeSend = function(xhr, settings) {
		var context = settings.context
		if(settings.beforeSend.call(context, xhr, settings) === false) {
			return false;
		}
	};
	var ajaxSuccess = function(data, xhr, settings) {
		settings.success.call(settings.context, data, 'success', xhr);
		ajaxComplete('success', xhr, settings);
	};
	// type: "timeout", "error", "abort", "parsererror"
	var ajaxError = function(error, type, xhr, settings) {
		settings.error.call(settings.context, xhr, type, error);
		ajaxComplete(type, xhr, settings);
	};
	// status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
	var ajaxComplete = function(status, xhr, settings) {
		settings.complete.call(settings.context, xhr, status);
	};

	var serialize = function(params, obj, traditional, scope) {

		var type, array = $.isArray(obj),
			hash = $.isPlainObject(obj);
	$.each(obj, function(key, value) {
			var value=obj[key];
			type = $.type(value);
			if(scope) {
				key = traditional ? scope :
					scope + '[' + (hash || type === 'object' || type === 'array' ? key : '') + ']';
			}
			// handle data in serializeArray() format
			if(!scope && array) {
				params.add(value.name, value.value);
			}
			// recurse into nested objects
			else if(type === "array" || (!traditional && type === "object")) {
				serialize(params, value, traditional, key);
			} else {
				params.add(key, value);
			}
		});
	};
	var serializeData = function(options) {
		if(options.processData && options.data && typeof options.data !== "string") {
			var contentType = options.contentType;
			if(!contentType && options.headers) {
				contentType = options.headers['Content-Type'];
			}
			if(contentType && ~contentType.indexOf(jsonType)) { //application/json
				options.data = JSON.stringify(options.data);
			} else {
				options.data = $.param(options.data, options.traditional);
			}
		}
		if(options.data && (!options.type || options.type.toUpperCase() === 'GET')) {
			options.url = appendQuery(options.url, options.data);
			options.data = undefined;
		}
	};
	var appendQuery = function(url, query) {
		if(query === '') {
			return url;
		}
		return(url + '&' + query).replace(/[&?]{1,2}/, '?');
	};
	var mimeToDataType = function(mime) {
		if(mime) {
			mime = mime.split(';', 2)[0];
		}
		return mime && (mime === htmlType ? 'html' :
			mime === jsonType ? 'json' :
			scriptTypeRE.test(mime) ? 'script' :
			xmlTypeRE.test(mime) && 'xml') || 'text';
	};
	var parseArguments = function(url, data, success, dataType) {
		if($.isFunction(data)) {
			dataType = success, success = data, data = undefined;
		}
		if(!$.isFunction(success)) {
			dataType = success, success = undefined;
		}
		return {
			url: url,
			data: data,
			success: success,
			dataType: dataType
		};
	};
	$.ajax = function(url, options) {
		if(typeof url === "object") {
			options = url;
			url = undefined;
		}
		var settings = options || {};
		settings.url = url || settings.url ;
		for(var key in $.ajaxSettings) {
			if(settings[key] === undefined) {
				settings[key] = $.ajaxSettings[key];
			}
		}
		serializeData(settings);
		var dataType = settings.dataType||'json';

		if(settings.cache === false || ((!options || options.cache !== true) && ('script' === dataType))) {
			settings.url = appendQuery(settings.url, '_=' + $.now());
		}
		var mime = settings.accepts[dataType && dataType.toLowerCase()];
		var headers = {};


		var setHeader = function(name, value) {
			headers[name.toLowerCase()] = [name, value];
		};
		var protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : window.location.protocol;
		var xhr = settings.xhr(settings);
		var nativeSetHeader = xhr.setRequestHeader;
		var abortTimeout;

		setHeader('X-Requested-With', 'XMLHttpRequest');
		setHeader('Accept', mime || '*/*');
		if(!!(mime = settings.mimeType || mime)) {
			if(mime.indexOf(',') > -1) {
				mime = mime.split(',', 2)[0];
			}
			xhr.overrideMimeType && xhr.overrideMimeType(mime);
		}
		if(settings.contentType || (settings.contentType !== false && settings.data && settings.type.toUpperCase() !== 'GET')) {
			setHeader('Content-Type', settings.contentType || 'application/x-www-form-urlencoded');
		}
		if(settings.headers) {
			for(var name in settings.headers)
				setHeader(name, settings.headers[name]);
		}
		xhr.setRequestHeader = setHeader;

		xhr.onreadystatechange = function() {
			if(xhr.readyState === 4) {
				xhr.onreadystatechange = $.noop;
				clearTimeout(abortTimeout);
				var result, error = false;
				var isLocal = protocol === 'file:';
				if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304 || (xhr.status === 0 && isLocal && xhr.responseText)) {
					dataType = dataType || mimeToDataType(settings.mimeType || xhr.getResponseHeader('content-type'));
					result = xhr.responseText;
					try {
						// http://perfectionkills.com/global-eval-what-are-the-options/
						if(dataType === 'script') {
							(1, eval)(result);
						} else if(dataType === 'xml') {
							result = xhr.responseXML;
						} else if(dataType === 'json') {
							result = blankRE.test(result) ? null : JSON.parse(result);
						}
					} catch(e) {
						error = e;
					}

					if(error) {
						ajaxError(error, 'parsererror', xhr, settings);
					} else {
						ajaxSuccess(result, xhr, settings);
					}
				} else {
					var status = xhr.status ? 'error' : 'abort';
					var statusText = xhr.statusText || null;
					if(isLocal) {
						status = 'error';
						statusText = '404';
					}
					ajaxError(statusText, status, xhr, settings);
				}
			}
		};
		if(ajaxBeforeSend(xhr, settings) === false) {
			xhr.abort();
			ajaxError(null, 'abort', xhr, settings);
			return xhr;
		}

		if(settings.xhrFields) {
			for(var name in settings.xhrFields) {
				xhr[name] = settings.xhrFields[name];
			}
		}

		var async = 'async' in settings ? settings.async : true;

		xhr.open(settings.type.toUpperCase(), settings.url, async, settings.username, settings.password);

		for(var name in headers) {
			if(headers.hasOwnProperty(name)) {
				nativeSetHeader.apply(xhr, headers[name]);
			}
		}
		if(settings.timeout > 0) {
			abortTimeout = setTimeout(function() {
				xhr.onreadystatechange = $.noop;
				xhr.abort();
				ajaxError(null, 'timeout', xhr, settings);
			}, settings.timeout);
		}

		xhr.send(settings.data ? settings.data : null);
		return xhr;
	};

	$.param = function(obj, traditional) {
		var params = [];
		params.add = function(k, v) {
			this.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
		};
		serialize(params, obj, traditional);
		return params.join('&').replace(/%20/g, '+');
	};
	$.get = function( /* url, data, success, dataType */ ) {
		return $.ajax(parseArguments.apply(null, arguments));
	};

	$.post = function( /* url, data, success, dataType */ ) {
		var options = parseArguments.apply(null, arguments);
		options.type = 'POST';
		return $.ajax(options);
	};

	$.getJSON = function( /* url, data, success */ ) {
		var options = parseArguments.apply(null, arguments);
		options.dataType = 'json';
		return $.ajax(options);
	};

	$.plusReady(function() {
		var originAnchor = document.createElement('a');
		originAnchor.href = window.location.href;
		$.ajaxSettings.xhr = function(settings) {
			if (settings.crossDomain) { //强制使用plus跨域
				return new plus.net.XMLHttpRequest();
			}
			//仅在webview的url为远程文件，且ajax请求的资源不同源下使用plus.net.XMLHttpRequest
			if (originAnchor.protocol !== 'file:') {
				var urlAnchor = document.createElement('a');
				urlAnchor.href = settings.url;
				urlAnchor.href = urlAnchor.href;
				settings.crossDomain = (originAnchor.protocol + '//' + originAnchor.host) !== (urlAnchor.protocol + '//' + urlAnchor.host);
				if (settings.crossDomain) {
					return new plus.net.XMLHttpRequest();
				}
			}
			return new window.XMLHttpRequest();

		}

		 $.authLogin=function (id,callback,errorback){
			getauthservice(function(auths){

				var s = auths[id];
				if ( !s.authResult ) {
					var w=null;
					if(plus.os.name=="Android"){
						w=plus.nativeUI.showWaiting('处理中...');
					}
					document.addEventListener("pause",function(){
						setTimeout(function(){
							w&&w.close();w=null;
						},2000);
					}, false );
					s.login( function(e){


						console.log( "登录认证成功！" );
						if ( !s.authResult ) {
							w&&w.close();w=null;
							plus.nativeUI.toast("未授权登录！");
						} else {
							s.getUserInfo( function(e){
								w&&w.close();w=null;
								callback&&callback(e)
								authLogout(s)
							}, function(e){
								w&&w.close();w=null;
								console.error( "获取用户信息失败："+e.message+" - "+e.code );
							} );
						}
					}, function(e){

						w&&w.close();w=null;
						errorback(e);
					} );
				}
			});
		}
		  function  getauthservice(callback){
			var auths={};
			plus.oauth.getServices( function(services){
				for(var i in services){
					var servic=services[i]
					auths[servic.id]=servic;
				}
				callback&&callback(auths);
			}, function(e){
				mui.toast( "获取登录服务列表失败："+e.message+" - "+e.code );
			} );
		}
		function authLogout (s){

			if ( s.authResult ) {
				s.logout(function(e){
					console.log( "注销登录认证成功！" );
				}, function(e){
					console.log( "注销登录认证失败！" );
				});
			}
		}
	});
})(mui, window);
var w=null;
var s=null;
const install=function(Vue){
	 if (install.installed) return;
	 	  	Vue.mixin({
		    created() {
		   		this.mui=mui;
		    },
		    filters: {
			    formatDate: function (value,format) {//时间格式化
				    if (!value) return ''
				    value = value.toString()
				    if(format=="yyyy-MM-dd"){
				        return value.substring(0,10)
				    }
				    return value.substring(0,16)
			    }
			 },
			/* beforeRouteEnter (to, from, next) {
			    if(to.meta.login && to.meta.login==true && !localStorage.userId){
	                next({name: 'login',title:'登录'})
			    	return
			    }
			    next()
			},*/
		    methods:{
		    	ajax(options,successback,errorback){
//		    		this.log(JSON.stringify(options))
		    		var self=this;
		    		var ajaxData=options.data||{};
		    		if(ajaxData.start == undefined){
		    			if(window.plus){
			    			if(w===null&&s===null){
			    				w='123'
			    				plus.nativeUI.showWaiting();
			    			}
			    		}else{
			    			if(s===null&&w===null){
			    				s='123'
					    		this.$indicator.open({
								  spinnerType: 'fading-circle'
								});
							}
			    		}
		    		}
		    		const url=options.fullPath?options.fullPath:(this.mui.root+options.url);

		    		var ajaxType=options.type||'GET';
		    		ajaxData["clientId"]="browser"

		    		if(ajaxType.toUpperCase()==="POST" && !ajaxData.userId && localStorage.userId){
		    			ajaxData["userId"]=localStorage.userId
		    		}
		    		if(ajaxType.toUpperCase()==="POST" && window.plus){
		    			ajaxData["clientId"]=plus.push.getClientInfo().clientid;
		    		}
		    		this.mui.ajax(url,{
						data:ajaxData,
						cache:options.cache===false?false:true,
						dataType:options.dataType||'json',//服务器返回json格式数据
						type:ajaxType,//HTTP请求类型
						timeout:options.timeout||60000,//超时时间设置为60秒；
						success:function(data){
				    		if(w!=null){
				    			plus.nativeUI.closeWaiting();
				    			w=null;
				    		}else{
				    			self.$indicator.close()
								s=null;
				    		}
				    		if(typeof successback==='function'){
				    			self.validatorUser(data)
				    			successback(data)
				    		}else{
				    			console.log('successback必须是个函数')
				    		}

						},
						error:function(xhr,type,errorThrown){
								if(w!=null){
					    			plus.nativeUI.closeWaiting();
					    			w=null;
					    		}else{
					    			self.$indicator.close()
									s=null;
					    		}
							if(typeof errorback==='function'){
								 errorback(xhr,type,errorThrown)
							}else{
								if(window.plus){

									plus.nativeUI.toast(options.error||'您的网络好像不太给力，请稍后再试');
					    		}else{
					    			console.log(self.$route.name)
									self.$toast({
									  message: options.error||'您的网络好像不太给力，请稍后再试！',
									  position: 'bottom',
									  duration: 2000
									})
					    		}
								self.log(xhr.status + ":" + xhr.responseURL);
							}
						}
					});
		    	},
		    	log(o){
		    		if(this.mui.islog){
		    			console.log(o)
		    		}
		    	},

			    filterContent(value){
			    	if (!value) return ''
			    	value=value.replace(/(^\s+)|(\s+$)/g,"");//去掉首尾的空白字符
				    value = value.replace(/<[\/\!]*?[^<>]*?>/gi, "");//过滤掉html标签和script标签
				    value = value.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");//过滤emoji标签
				    return value
			    },

		    	tologin(msg){
		    		this.$messagebox.confirm('您还没有登录'+(msg||'')+',是否登录?').then(action => {
						this.$router.push({name:'login',params: { title: '登录' }})
					});
		    	},
		    	validatorUser(data){//用户身份验证
		    		if(data && !data.result && data.obj==='toLogin'){
		    			localStorage.removeItem('userId');
						localStorage.removeItem('userPhone');

						localStorage.removeItem('bindcard');
						localStorage.removeItem('bindstate');

						localStorage.removeItem('userName');
						localStorage.removeItem('userSex');
						localStorage.removeItem('headurl');

					    localStorage.removeItem('isFormal');
						localStorage.removeItem('canTransfer');
						localStorage.removeItem('isFormaldes');
						localStorage.removeItem('transferdes');
		    			this.$router.push({name:'login',params: { title: '登录' }})
		    			return

		    		}
		    	},
		    	update(callback) {
		    		var updateurl=this.mui.updateurl;//升级地址
		    		let self=this;
				if(!updateurl){
					return;
				}
				this.ajax({
					fullPath: updateurl,
					cache: false,
					timeout: 15000,
					dataType: 'json',
					type: 'get'},
					 function(response) {
						self.log(JSON.stringify(response))
						plus.runtime.getProperty(plus.runtime.appid, function(inf) {
							var localVersion = inf.version.replace(/\./g, "");

							if(localVersion.length==2){
								localVersion=localVersion+'0';
							}
							self.log(localVersion + '本地')
								//android
							if(plus.os.name == "Android") {
								var appversion = response.app.version.replace(/\./g, "");
								var wgtversion = response.wgt.version.replace(/\./g, "");
								//全量
                console.log(appversion);
								console.log(localVersion);
if((appversion - localVersion) > 0) {
									self.log(appversion + '全量')
									if(response.app.updatenote!=""){
										self.$messagebox.confirm(response.app.updatenote,'版本更新V'+response.app.version).then(action => {
											self.downWgt(response.app.link)
										});
									}else{
										self.downWgt(response.app.link)
									}
									localStorage.appversion="V"+response.app.version;
									//增量
								} else if((wgtversion - localVersion) > 0) {
									self.log(wgtversion + '增量')
									if(response.wgt.updatenote!=""){
										self.$messagebox.confirm(response.wgt.updatenote,'版本更新V'+response.wgt.version).then(action => {
											self.downWgt(response.wgt.link)
										});
									}else{
										self.downWgt(response.wgt.link)
									}
									localStorage.appversion="V"+response.app.wgt;
								} else {
									callback && callback('当前版本已经是最新版本');
								}
							} else {
								//ios
								var iosversion = response.ios.version.replace(/\./g, "");
								self.log(iosversion + 'ios')
								if((iosversion - localVersion) > 0) {
									if(response.ios.updatenote!=""){
										self.$messagebox.confirm(response.ios.updatenote,'版本更新V'+response.ios.version).then(action => {
											self.downWgt(response.ios.link)
										});
									}else{
										self.downWgt(response.ios.link)
									}
									localStorage.appversion="V"+response.ios.version;
								} else {
									callback && callback('当前版本已经是最新版本');
								}
							}
						});
					});
			},

		 	downWgt(url) {
				 plus.nativeUI.showWaiting("版本更新中，请稍等...");
				var self = this;
				plus.downloader.createDownload(url, {
					filename: "_doc/update/"
				}, function(d, status) {
					plus.nativeUI.closeWaiting();
					if(status == 200) {
						self.log(d.filename)
						self.log("下载wgt成功：" + d.filename);
						self.installWgt(d.filename); // 安装wgt包
					} else {
						plus.nativeUI.toast("下载更新包失败！");
					}
				}).start();
			},
			// 更新应用资源
			installWgt(path) {
				var self=this
				plus.nativeUI.showWaiting("安装更新包...");
				plus.runtime.install(path, {}, function() {
					plus.nativeUI.closeWaiting();
					self.log("安装wgt文件成功！");
					plus.io.resolveLocalFileSystemURL(path, function(entry) {
						plus.nativeUI.alert("版本更新完成,重启应用程序", function() {
							plus.runtime.restart();
						});
					});
				}, function(e) {
					alert(JSON.stringify(e));
					plus.nativeUI.closeWaiting();
					self.log(JSON.stringify(e));
				});
			}
		    }
	  })
}
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};
export default {
	 install,
	 config:mui
}
