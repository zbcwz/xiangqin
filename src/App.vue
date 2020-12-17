<template>
	<div id="app">

		<header class="mint-header is-fixed" v-if="$route.meta.headershow!==false" style="display:none; background: rgb(253, 123, 39);height: 46px; z-index: 99999;">
		<!--<header class="mint-header is-fixed" v-if="$route.meta.headershow!==false" style=" background: rgb(253, 123, 39);height: 46px; z-index: 3;display:none;">-->
			<div class="mint-header-button is-left">
				<a>
<!-- 					<button class="mint-button mint-button--default mint-button--normal" @click="back" v-show="$route.meta.backShow===undefined">
	    				<span class="mint-button-icon">
	    					<i class="mintui mintui-back"></i>
	    				</span>
	    				<label class="mint-button-text">返回</label>
    				</button> -->
					<!-- <img src="./components/imgs/xx.png" @click="goto({name:'message'})" width="23px" height="23px" v-show="$route.meta.backShow===false"> -->
				</a>
			</div>
<!-- 			<h1 class="mint-header-title" style="display:block;font-size: 16px;max-width: 70%;">
    			{{$route.meta.title}}
      </h1> -->
    		<!--<h1 style="font-size: 16px;font-weight:normal;display:block; width: 60%;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;>
    			{{$route.meta.title}}
    		</h1>-->
			<div class="mint-header-button is-right">
<!-- 				<a v-show="$route.meta.backShow===false" @click="goto({name:'signin'})">
					<img src="./components/imgs/qd.png" width="23px" height="23px">
				</a> -->

			</div>
		</header>

		<!--<transition   :name="$route.meta.headershow===false?'':'in-out-translate-fade'">-->
		<!-- <keep-alive> -->   <!--&& $route.meta.showShare!=true-->
		<!--<router-view ></router-view>-->
    <keep-alive>
		<router-view v-if="(wxEnvironment && $store.state.weixinPage) || (!wxEnvironment && loadedQlgh)"></router-view>
    </keep-alive>
		<!-- </keep-alive> -->

		<!--</transition>-->

<!-- 		<mt-popup v-model="popupVisible" position="bottom" style='width: 100%;z-index: 10001'>
			<div class="share">
				<img src="./components/imgs/wechat.png" @click='share("weixin","WXSceneSession")' />
				<img src="./components/imgs/wechat_moment.png" @click='share("weixin","WXSceneTimeline")' />
				<img src="./components/imgs/qq .png" @click='share("qq")' />

			</div>

		</mt-popup> -->
	</div>
</template>
<script>
var backButtonPress = null;
import statistic from './routerconfig/statistic'


	export default {
		name: 'app',
		data() {
			return {
				inspect:false ,
				statistic:statistic,
        wxEnvironment: false,
        loadedQlgh: false,
        locationing: false,
        indexTabbar: {
          indexTabbar1 : require("./components/imgs/rizhaoxiangqin/index-tabbar-1.png"),
          indexTabbar2 : require("./components/imgs/rizhaoxiangqin/index-tabbar-2.png"),
          indexTabbar3 : require("./components/imgs/rizhaoxiangqin/index-tabbar-3.png"),
          indexTabbar4 : require("./components/imgs/rizhaoxiangqin/index-tabbar-4.png"),
          indexTabbaractive1 : require("./components/imgs/rizhaoxiangqin/index-tabbar-1-active.png"),
          indexTabbaractive2 : require("./components/imgs/rizhaoxiangqin/index-tabbar-2-active.png"),
          indexTabbaractive3 : require("./components/imgs/rizhaoxiangqin/index-tabbar-3-active.png"),
          indexTabbaractive4 : require("./components/imgs/rizhaoxiangqin/index-tabbar-4-active.png"),

        },
        shareNotInitArr: [''],
        userErrMsg : "请到齐鲁工惠APP或日照职工e家微信公众号参与",


			}
		},
    beforeRouteEnter (to, from, next) {

//alert(2);

/*      if(this.isWeiXin() && !wxref){
        //console.log(this.wxurl + window.location.href);
        window.location.href =  wxurl + encodeURIComponent(window.location.href);
      } */
        //next()
/*      getPost(to.params.id, (err, post) => {
        next(vm => vm.setData(err, post))
      }) */
    },
		computed: {
/* 			popupVisible: {
				get() {
					return this.$store.state.popupVisible
				},
				set(value) {
					this.$store.commit('updatePopupVisible', value)
				}
			},
			shares() {
				return this.$store.state.shares
			},
     shareConfig(){
       return this.$store.state.shareDetail
     } */
		},
		created(){
      // 自定义加载图标
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      });
      if(this.$route.name == 'chatinformation' ){
        this.$router.replace('/');
      }
      if(this.$commonfunc.common.isWeiXin()){
        this.wxEnvironment = true;
      }
      this.shareInit();
      this.systemInit();



/* (function(doc, win) {
	var docEl = doc.documentElement,
	    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
	    recalc = function() {
	        var clientWidth = docEl.clientWidth;
	        if (!clientWidth) return;
	        if (clientWidth == 640) {
	            docEl.style.fontSize = '20px';
	        } else {
	            docEl.style.fontSize = 20 * (clientWidth / 640) + 'px';
	        }
	    };
	  console.log(resizeEvt);
	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window); */
		},
		watch: {
			$route(to,from){
      /*  console.log('$routeto',to);
        console.log('$routefrom',from); */
        if(this.shareNotInitArr.indexOf(to.name) == -1){
          this.$store.commit({
            type: 'updateShareDetail',
            obj: null,
          });
        }
   /*     let wxurl = this.$commonfunc.config.rz.wxurl;
        var weixinPage = this.$store.state.weixinPage;
        var wxref =  from.query.wxref;
//console.log(wxref);
       if(this.$commonfunc.common.isWeiXin() && wxref){

          this.$store.commit('setWeixinPage');
          weixinPage = true;
        }
       // console.log(weixinPage);

        if(this.$commonfunc.common.isWeiXin() && !weixinPage){
          //console.log(wxurl + window.location.href);
          //http://rzweixin.zb12351.com/app/&i=7&wxref=mp.weixin.qq.com
          window.location.href =  wxurl + encodeURIComponent(window.location.href);

        }else{
        } */


        //console.log('to',to);
        /* if(this.$commonfunc.common.isWeiXin() && typeof wxref == 'undefined'){
          //console.log(wxurl + window.location.href);
          //http://rzweixin.zb12351.com/app/&i=7&wxref=mp.weixin.qq.com
          window.location.href =  wxurl + encodeURIComponent(window.location.href);

        }else{
        } */

			}
		},
		mounted() {
			var self = this;

/* 			window.JumpPage = function(obj) {
				self.$router.push(obj)
				plus.webview.getWebviewById('blank').close();
			} */


		},
		methods: {
      async systemInit(){
        //alert(1);
        await this.wxRefStatus();

        //alert(a);
        //console.log('self.locationing',self.locationing);
        if((this.wxEnvironment && this.$store.state.weixinPage) || !this.wxEnvironment){

          await this.$store.dispatch('getQighUser');
          console.log(this.$store.state.qlghUser);
          let qlghstatus = await this.$commonfunc.qlgh.verifyuserinfo(this.$store.state.qlghUser);

          if(!qlghstatus.status && qlghstatus.content != ""){
            //this.$toast(qlghstatus.content);
            this.userErrMsg = qlghstatus.content;
            //return false;
          }
     /*     if(!this.wxEnvironment){
          } */
          //let self = this;
          console.log(this.wxEnvironment);
          console.log(this.$store.state.qlghUser.error);

          if(((!this.wxEnvironment && !this.$store.state.qlghUser.error) || (this.wxEnvironment && this.$store.state.qlghUser.error)) && qlghstatus.status && !qlghstatus.content){


            await this.$store.dispatch('getUserInfo')
            .then((v) =>{

              if (v.status == 1) {

              } else {

              }
            })
            .catch((e) => {

            });
          }else{
            this.$store.commit('updateErrEnv');
            this.$notify({
              message: this.userErrMsg,
              duration: 0,
              type: 'primary',
            });
            //alert(this.$route.name);
            if(this.$route.name != 'homepage' && this.$route.name != 'information' && this.$route.name != 'personInfo'){
              this.$router.replace('/');
            }
          }

          this.loadedQlgh = true;
          this.$toast.clear();
        }
      },
      wxRefStatus(){
        return new Promise((resolve, reject)=>{
          let self = this;
          //setTimeout(function(){


            let wxurl = self.$commonfunc.config.rz.wxurl;
            var weixinPage = self.$store.state.weixinPage;
            var wxref =  self.$route.query.wxref;
      //console.log(wxref);
            if(this.wxEnvironment && wxref){

              self.$store.commit('setWeixinPage');
              weixinPage = true;
            }
           // console.log(weixinPage);

            if(this.wxEnvironment && !weixinPage){
              //console.log(wxurl + window.location.href);
              //http://rzweixin.zb12351.com/app/&i=7&wxref=mp.weixin.qq.com
              //self.locationing = true;
              console.log("授权链接",wxurl + encodeURIComponent(window.location.href));
              window.location.href =  wxurl + encodeURIComponent(window.location.href);

            }else{
            }
            console.log(11111111111111);
            resolve(true);
            //return true;
          //},5000);
        });
      },

      shareInit(){
        var self = this;
        let shareUrl = location.href.split('#')[0];


        $.ajax({
        	url:"/mapi/shareConfig.php",
        	type: "get",
        	async:false,
        	data: {
        		url: shareUrl
        		//url: 'http://weixin.zb12351.com'
        	},
        	dataType: "json",
        	success: function(c){


          //var test = wxSdk.then((c) => {
            // 请求成功的结果
            //console.log(c);
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: self.pageconfig.appid, // 必填，公众号的唯一标识
                timestamp: c.timestamp, // 必填，生成签名的时间戳
                nonceStr: c.nonceStr, // 必填，生成签名的随机串
                signature: c.signature,// 必填，签名，见附录1
                jsApiList: [
                  'onMenuShareAppMessage',
                  'onMenuShareTimeline',
                  'onMenuShareQQ'
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });

            self.$store.commit({
              type: 'updateShareDetail',
              obj: null,
            });

           // }

              //return ret;
          },
          error: function(e){

          }
        });
        //});
        //console.log("分享");
       // console.log(test);
      },

		  //  checkArguments(){// 判断启动方式//从分享出去的网页里启动app
			//    console.log("plus.runtime.launcher: "+plus.runtime.launcher);
			 //   var args= plus.runtime.arguments;
			//    if(args){
			        // 处理args参数，如打开新页面等
			//        console.log(args)			    }
			//},
		},
/*   beforeRouteEnter (to, from, next) {
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当守卫执行前，组件实例还没被创建
    }, */

	}
</script>

<style>
  body{
        /* font: 14px "微软雅黑";
        background: #f7f7f7; */
        margin: 0px;
  }

	.multloginbutton {
		border-radius: 50%;
		height: 50px;
		width: 50px;
		margin: 20px
	}

	td>p {
		margin-top: 3px;
	}

	.share {
		text-align: center;
		padding: 6x;
	}

	.share img {
		width: 11%;
		margin: 15px;
	}
	.mint-msgbox-message{
		text-align: left;
	}
	.mint-header-button *{
		-webkit-touch-callout:none;
		-webkit-user-select:none;
		-khtml-user-select:none;
		-moz-user-select:none;
		-ms-user-select:none;
		user-select:none;
	}

</style>
