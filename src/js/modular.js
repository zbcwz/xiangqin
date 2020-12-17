/* export function constant(msg){
 	let RegExp=
 	mail:/^\d{n}$/
 }*/
export function dataformat(format){
		var o = { 
			"M+" : this.getMonth()+1, //month 
			"d+" : this.getDate(), //day 
			"h+" : this.getHours(), //hour 
			"m+" : this.getMinutes(), //minute 
			"s+" : this.getSeconds(), //second 
			"q+" : Math.floor((this.getMonth()+3)/3), //quarter 
			"S" : this.getMilliseconds() //millisecond 
		} 
		
		if(/(y+)/.test(format)) { 
			format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
		} 
		
		for(var k in o) { 
			if(new RegExp("("+ k +")").test(format)) { 
			format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
			} 
		} 
		return format; 
	}






	export function  getauthservice(callback){
		var auths={};
		plus.oauth.getServices( function(services){
			for(var i in services){
				var servic=services[i]
				auths[servic.id]=servic;
			}
//			console.log(JSON.stringify(auths))
			callback&&callback(auths);
		}, function(e){
			mui.toast( "获取登录服务列表失败："+e.message+" - "+e.code );
		} );
	}
	export function authLogin(id,callback){
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
				 
					w&&w.close();w=null;
					console.log( "登录认证成功！" );
					if ( !s.authResult ) {
						plus.nativeUI.toast("未授权登录！");
					} else {
						s.getUserInfo( function(e){
							callback&&callback(e)
							authLogout(s)
						}, function(e){
							console.error( "获取用户信息失败："+e.message+" - "+e.code );
						} );
					}
				}, function(e){
					 
					w&&w.close();w=null;
					callback(e);
		//			mui.toast( "登录认证失败！" );
				} );
			}
		});
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
/*
 * 分享模块：
 * 参数：m{}
 * href:分享的连接地址
 * title：分享的title
 * content：分享的内容
 * thumbs：分享的配图
 * pictures：分享的配图
 * 
 */
export function share(m){
	plus.share.getServices( function(s){
		var shares={};
		for(var i in s){
			var t=s[i];
			shares[t.id]=t;
		}
		shareHref(shares,m);
	console.error(JSON.stringify(shares));
	}, function(e){
		mui.toast( "获取分享服务列表失败："+e.message );
	} );
}
	
function shareHref(shares,m){
	var shareBts=[];
	// 更新分享列表
	ss=shares['qq'];
	ss&&ss.nativeClient&&shareBts.push({title:'QQ',s:ss});
	var ss=shares['weixin'];
	ss&&ss.nativeClient&&(shareBts.push({title:'微信朋友圈',s:ss,x:'WXSceneTimeline'}),
	shareBts.push({title:'微信好友',s:ss,x:'WXSceneSession'}));
//	ss=shares['sinaweibo'];
//	ss&&ss.nativeClient&&shareBts.push({title:'新浪微博',s:ss});
	
	// 弹出分享列表
	shareBts.length>0?plus.nativeUI.actionSheet({title:'分享链接',cancel:'取消',buttons:shareBts},function(e){
		(e.index>0)&&shareAction(shareBts[e.index-1],m);
	}):plus.nativeUI.alert('当前环境无法支持分享链接操作!');
}

function shareAction(sb,m) {
	console.log( "分享操作：" );
	if(!sb||!sb.s){
		console.log( "无效的分享服务！" );
		return;
	}
	var msg={};
	if(!m){
		msg.extra={scene:sb.x};
		msg.href=config.applink;
		msg.title='兜兜小区';
		msg.content='我正在使用兜兜小区APP，赶紧跟我一起来体验！';
		msg.thumbs=["../img/108.png"];
		msg.pictures=["../img/108.png"];
	}else{
		msg=m;
		msg['extra']={scene:sb.x};
	}
	// 发送分享
	if ( sb.s.authenticated ) {
		console.log( "---已授权---" );
		shareMessage(msg,sb.s);
	} else {
		console.log( "---未授权---" );
		sb.s.authorize( function(){
				shareMessage(msg,sb.s);
			},function(e){
			console.log( "认证授权失败："+e.code+" - "+e.message );
		});
	}
}
function shareMessage(msg,s){
	console.log(JSON.stringify(msg));
	s.send( msg, function(){
		mui.toast( "分享到"+s.description+"成功！ " );
	});
}
/*
*支付模块：
* params{url,payid,total}
*	url:调用后台的接口；
* 	payid:支付通道只能是'alipay'或者'wxpay'
* 	total:支付金额，单位是元
* callback:回调函数
*/
export function payments(params,callback){
	console.log('支付参数:'+JSON.stringify(params))
	plus.payment.getChannels(function(channels){
		for(var i in channels){
			var channel=channels[i];
			if(channel.id==='alipay'&&channel.id===params.payid){
				apay(channel,params,callback)
			}
			if(channel.id==='wxpay'&&channel.id===params.payid){
				wpay(channel,params,callback)
			}
		}
		
	},function(e){
		console.log("获取支付通道失败："+e.message);
	});
}
//调用支付宝后台接口
function apay(channel,params,callback){
	mui.toast("正在生成订单")
	mui.ajax(params.url,{
		data:{
			'total':params.total+'',
			'payType':params.payType||''
			},
		type:params.type||'post',
		dataType:'text',//服务器返回json格式数据
		timeout:20000,//超时时间设置为10秒；
		success:function(data){
			console.error(data)
			topayment(channel,data,callback);
		},error:function(xhr){
			mui.toast('您的网络好像不太给力，请稍后再试');
			console.error(xhr.status+":"+xhr.responseURL);
		}
	});
}

//调用微信后台接口
function wpay(channel,params,callback){
	mui.toast("正在生成订单");
	mui.ajax(params.url,{
		data:{
			'total':params.total,//以分为单位的
			'payType':params.payType||''
		},
		type:params.type||'post',
		dataType:'json',//服务器返回json格式数据
		timeout:20000,//超时时间设置为10秒；
		success:function(data){
			console.log(JSON.stringify(data));
			
			var stament = {//参数顺序必须正确
				"retcode":0,
				"retmsg":"ok",
				"appid": data.appid,
				"noncestr": data.noncestr,
				"package": data.package,
				"partnerid": data.partnerid,
				"prepayid": data.prepayid,
				"timestamp":parseInt(data.timestamp),
				"sign": data.sign
			}
			console.log(stament);
			var data=JSON.stringify(stament);
			topayment(channel,data,callback);
		},error:function(xhr){
			mui.toast('您的网络好像不太给力，请稍后再试');
			console.error(xhr.status+":"+xhr.responseURL);
		}
	});
}
//吊起原生支付接口
function topayment(channel,stament,callback){
	plus.nativeUI.closeWaiting();
	plus.payment.request(channel, stament, function(result) {
			console.log(result.rawdata);
			callback(result);
        }, function(e) {
//      	mui.toast("支付失败"+JSON.stringify(e));
			callback('支付失败');
           console.log("支付失败：" +JSON.stringify(e));
    });
}




		
		