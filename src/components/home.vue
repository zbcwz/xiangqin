<template>
  <div  id="appp" >
    		<!--<transition name="in-out-translate-fade"  style="margin-bottom:60px;" >-->
    			<!-- <keep-alive include="homepage"> -->
    			<keep-alive>
		 	 			<router-view></router-view>
		 	 		</keep-alive>
    <van-tabbar :safe-area-inset-bottom="true" :placeholder="true" route  v-model="tabbarselect" :before-change="changetabbar">
      <van-tabbar-item to="/" icon="search">
        首页
        <template #icon="props">
          <img :src="props.active ? indexTabbar.indexTabbaractive1 : indexTabbar.indexTabbar1" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item v-if="c_errEnv" to="/Attend" icon="search">
        报名
        <template #icon="props">
          <img :src="props.active ? indexTabbar.indexTabbaractive2 : indexTabbar.indexTabbar2" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item v-if="c_errEnv" to="/Chat" icon="setting-o"  :[badgesatus]="chatNum">
        消息
        <template #icon="props">
          <img :src="props.active ? indexTabbar.indexTabbaractive3 : indexTabbar.indexTabbar3" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/My" icon="setting-o">
        我的
        <template #icon="props">
          <img :src="props.active ? indexTabbar.indexTabbaractive4 : indexTabbar.indexTabbar4" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Notify } from 'vant';

export default {
  name: 'home',
  data () {
    return {
      tabbarselect: 0,
      selected:this.$route.name,
      indexTabbar: {
        indexTabbar1 : require("./imgs/rizhaoxiangqin/index-tabbar-1.png"),
        indexTabbar2 : require("./imgs/rizhaoxiangqin/index-tabbar-2.png"),
        indexTabbar3 : require("./imgs/rizhaoxiangqin/index-tabbar-3.png"),
        indexTabbar4 : require("./imgs/rizhaoxiangqin/index-tabbar-4.png"),
        indexTabbaractive1 : require("./imgs/rizhaoxiangqin/index-tabbar-1-active.png"),
        indexTabbaractive2 : require("./imgs/rizhaoxiangqin/index-tabbar-2-active.png"),
        indexTabbaractive3 : require("./imgs/rizhaoxiangqin/index-tabbar-3-active.png"),
        indexTabbaractive4 : require("./imgs/rizhaoxiangqin/index-tabbar-4-active.png"),

      },
      wsClient: null,
      wsloading: false,
      // wsClientStatus: 3,

      modal: {
        hearbeatTimeout: null,
        hearbeatTimeoutClose: null,
        wsConnected: false,
        wsConfig: {
          attachurl: this.pageconfig.attachurl,
          uid: null,
          nickname: null
        }
      },

    }
  },

  created(){
    this.$store.commit({
      type: 'updateChatList',
      list: [],
      selected: '0'
    });
  },
  computed:{
    chatNum(){
      if(this.$store.state.chatNum < 100){
        return this.$store.state.chatNum;
      }else{
        return 99 + "+";
      }
    },
    badgesatus(){
      return this.$store.state.chatNum > 0 ? "badge" : null;
    },
    c_errEnv(){
      return this.$store.state.errEnv;
    },
  },

  watch:{
  	$route(){

  		this.selected=this.$route.name;
  	},

    '$store.state.userInfo':{


      handler: function() {
        //alert(1);
        if(this.$store.state.userInfo && !this.wsClient){
          this.connectWs();
        }
      },
      deep: true,
      immediate: true
    },


  },
  activated(){
    if(this.$store.state.userInfo){
      //this.connectWs();
    }
  },


  methods:{
/*    onChange(index) {
      Notify({ type: 'primary', message: index });
      if(index == 2 || index == 1){
        if(!this.$store.state.userInfo){
          this.$toast(this.pageconfig.preventInfo);
          return false;
        }
      }

    }, */
    changetabbar:function(index){
     // console.log(1111111);
          return false;

    },
    connectWs: function() {


      if($.isEmptyObject(this.$store.state.userInfo)){

        return false;
      }

     // console.log(config);
      var self = this;
      //this.wsClient = new WebSocket(config.ws.address); 60028745107085376043
      this.wsloading = true;

      this.wsClient = new WebSocket(this.pageconfig.wsurl);

      this.wsClient.onopen = function() {

        self.wsSend('login', {
          toUser: 'system'
        })
        //启动心跳
        self.wsMessage();
        self.initheartbeat();
        window.onbeforeunload = function() {
          self.wsClient.close();
        }
      };

      this.wsClient.onclose = function() {
        //console.log(self.wsClient.readyState);
        self.modal.wsConnected = false;
        self.wsloading = false;
        self.$toast('连接断开');
      };



      //ws
    },
    wsSend: function(type, obj) {
      console.log(type,obj);

      if (!type || $.isEmptyObject(obj)) {
        console.log("返回了");
        return false;
      }

      /*        var self = this;//临时
              setTimeout(function(){
                console.log(self.aselected);
              },2000);

              if(this.modal.wsConnected){
              var self = this;//!!!!!!
              setTimeout(function(){
                self.$toast('执行');
                self.modal.wsConnected = false;
              },10000);
              } */

      if (type != 'login' && type != "ping") {
        if (!this.modal.wsConnected) {

          this.$toast('连接失败');
          return false;
        }
        if (type != 'redpackget' && type != 'redpackdraw' && type != 'coupondraw' && type != 'communication' &&
          type != 'ping') {
          if (this.modal.wsBanned.all == 1) {
            this.$toast('管理员禁止任何人发言');
            return false
          }
          if (this.modal.wsBanned.self != '') {
            this.$toast('你被管理员禁止发言');
            return false
          }
        }
      }
      var wsConfig = this.modal.wsConfig;
      obj.type = type;
      //obj.scene = 'live';
      obj.uid = this.$store.state.userInfo.id;
      obj.yuid = '-1';
      obj.uniacid = this.pageconfig.uniacid;
      obj.ztype = 'index';
      obj.isqlgh = 0;

      //测试临时
      //console.log(this.modal.qlghuser);
      /*        this.modal.qlghuser.userPhone = '18606431903';
              this.modal.qlghuser.userName = '186xxxx1903'; */

  /*        if (!obj.uid && this.modal.qlghuser.userPhone) {
        obj.uid = this.modal.qlghuser.userPhone;
        obj.nickname = this.modal.qlghuser.userName;
        obj.isqlgh = 1;
      } else {
        obj.uid = wsConfig.uid;
        obj.nickname = wsConfig.nickname;
      } */

      //console.log(obj.nickname);
      /*          if (!$.isEmptyObject(modal.msgAt)) {
                    obj.at = modal.msgAt;
                    obj = modal.handleAtText(obj)
                } */
      //console.log(111);
      this.wsClient.send(JSON.stringify(obj));
      return true;
    },
    wsMessage: function() {
      var self = this;
      this.wsClient.onmessage = function(evt) {

        var data = JSON.parse(evt.data);

        if (data.type == 'connected') {
          self.$toast('连接成功');

          /*        if(modal.wsConfig.uid || modal.qlghuser.userPhone){
                    $('.block-input .input-place').html('').hide().siblings().show();
                  } */
          self.modal.wsConnected = true;

          //self.$store.commit('',);
          if(data.unread){//对象为空需要进一步判断
            self.$store.commit({
              type: 'updateChatUnreadList',
              obj: data.unread,
              //selected: 0
            });
          }


          /* else {
                       self.$delete(self.roomClassifyList,0);

                     } */

          /*            self.live.showtextlivetab = data.settings.showtlive == 1 ? true : false;
                      self.aselected = "1"; */

          //console.log(self.live.showtextlivetab);
          // self.initOnline();
          /* self.live.wsCanAt = data.settings.canat == 1 ? true : false;
           self.live.wsCanRepeal = data.settings.canrepeal == 1 ? true : false;
           modal.initStatus();
           if (modal.wsCanAt) {
               modal.inputTip.push('点击蓝色昵称可@Ta')
           } else {
               modal.inputTip.splice(2, 1)
           } */
          /*                if (modal.wsCanRepeal) {
                              $('.btn-repeal').addClass('show')
                          } else {
                              $('.btn-repeal').removeClass('show')
                          }
                          setTimeout(function () {
                              modal.scrollBottom()
                          }, 10) */
        } else if (data.type == 'unread') {
          //self.liveMsg('notice', data)
          //self.$store.commit('updateChatNum');
/*          self.$store.commit({
            type: 'updateChatListSub',
            obj: data,
            selected: 0
          }); */

          if(data.unread){//对象为空需要进一步判断
            self.$store.commit({
              type: 'updateChatUnreadList',
              obj: data.unread,
              //selected: 0
            });
          }
          //self.$store.commit('');

        } else if (data.type == 'ping') {

          //指定时间内没有收到回应那么视为断开连接，调用websocket断开连接事件
          self.initheartbeat();

        } else if (data.type == 'setting') { //管理员调整直播视频状态等设置时触发
          var settings = data.settings;
          console.log(settings);
          if (!settings) {
            return
          }
          if (self.live.status != settings.status) {
            self.live.status = settings.status;
            //modal.initStatus()
          }
          if (self.live.showOnline != settings.virtual) { //增加虚拟观看人数
            self.live.showOnline = settings.virtual;
            //modal.initOnline()
          }

          // console.log(self.roomClassifyList[0].id);
          if (settings.showtlive == 1 && self.roomClassifyList[0].id != 0) {
            self.roomClassifyList.unshift({
              "id": 0,
              "name": "图文直播",
              type: 0
            });
            self.aselected = 0;
          } else if (settings.showtlive == 0 && self.roomClassifyList[0].id == 0) {
            self.$delete(self.roomClassifyList, 0);

          }


          //self.live.wsCanAt = settings.canat == 1 ? true : false;
          //self.live.wsCanRepeal = settings.canrepeal == 1 ? true : false;
          /*                if (modal.wsCanAt) {
                              modal.inputTip.push('点击蓝色昵称可@Ta')
                          } else {
                              modal.inputTip.splice(2, 1)
                          }
                          if (modal.wsCanRepeal) {
                              $('.btn-repeal').addClass('show')
                          } else {
                              $('.btn-repeal').removeClass('show')
                          } */
          if (settings.nickname_old) {
            data.text = '管理员"' + settings.nickname_old + '"更名为"' + settings.nickname + '"';
            self.liveMsg('notice', data)
          }
        } else if (data.type == 'userEnter') { //应该是用户进入
          /*                if (data.role != 'manage') {
                              modal.userEnter(data.nickname)//新人进入动画效果
                          } */
          self.live.realOnline++;
          //modal.initOnline()
        } else if (data.type == 'userLeave') { //应该是用户离开
          self.live.realOnline--;
          // modal.initOnline()
        } else if (data.type == 'text' || data.type == 'sent') { //用户评论等消息
          self.liveMsg('text', data)
        } else if (data.type == 'image') { //图片
          self.liveMsg('image', data)
        } else if (data.type == 'repeal') { //撤回消息
          //现在还没办法判断谁是管理员
          if (data.msgid) {
            /*            var text = '"' + data.nickname + '"';
                        if (data.fromUser == self.modal.wsConfig.uid) {
                            text = '你'
                        } */
            //var fullscreen = '';
            /*            if (modal.wsConfig.fullscreen) {
                            fullscreen += 'nopadding'
                        } */
            data.text = data.nickname + "撤回了一条消息";
            self.liveMsg('repeal', data);
            //$('.tab-content .msg[data-msgid="' + data.msgid + '"]').addClass(fullscreen).html('<div class="tip"><div class="text">' + text + '撤回了一条消息</div></div></div>')
            //  $('.tab-content .msg[data-msgid="' + data.msgid + '"]').addClass(fullscreen).html('<div class="tip"><div class="text"></div></div></div>')
          }
        } else if (data.type == 'delete') { //删除消息
          //现在还没办法判断谁是管理员
          if (data.msgid) {
            /*              var text = '"' + data.deleteNick + '"撤回了一条消息';
                          if (data.deleteUid == modal.wsConfig.uid) {
                              text = '管理员"' + data.nickname + '"删除了你的一条消息'
                          } */
            /*                 var fullscreen = '';
                             if (modal.wsConfig.fullscreen) {
                                 fullscreen += 'nopadding'
                             } */

            data.text = data.nickname + "撤回了一条消息";
            self.liveMsg('repeal', data);
            //$('.tab-content .msg[data-msgid="' + data.msgid + '"]').addClass(fullscreen).html('<div class="tip"><div class="text">' + text + '</div></div></div>')
          }
        } else if (data.type == 'tdelete') { //删除消息
          //现在还没办法判断谁是管理员
          if (data.msgid) {
            /*              var text = '"' + data.deleteNick + '"撤回了一条消息';
                          if (data.deleteUid == modal.wsConfig.uid) {
                              text = '管理员"' + data.nickname + '"删除了你的一条消息'
                          } */
            /*                 var fullscreen = '';
                             if (modal.wsConfig.fullscreen) {
                                 fullscreen += 'nopadding'
                             } */

            //data.text = data.nickname + "撤回了一条消息";
            self.textliveMsg('repeal', data);
            //$('.tab-content .msg[data-msgid="' + data.msgid + '"]').addClass(fullscreen).html('<div class="tip"><div class="text">' + text + '</div></div></div>')
          }
        } else if (data.type == 'banned') {
          if (data.banned == 1) {
            self.modal.wsBanned.self = true;
            //self.liveMsg('notice', '你被管理员禁止发言');
            data.text = "你被管理员禁止发言";
            self.liveMsg('notice', data);
            //$('.btn-send').removeClass('active')
          } else {
            if (self.modal.wsBanned.all == '') {
              /*        var value = $.trim($('#input').val());
                      if (value) {
                          $('.btn-send').addClass('active')
                      } */
            }
            self.modal.wsBanned.self = false;
            data.text = "你被管理员允许发言";
            //modal.liveMsg('notice', '你被管理员允许发言')
            self.liveMsg('notice', data);
          }
        } else if (data.type == 'bannedAll') {
          if (data.banned == 1) {
            //$('.btn-send').removeClass('active');
            self.modal.wsBanned.all = true;
            data.text = "管理员禁止任何人发言";
            self.liveMsg('notice', data);
            // $('.btn-send').removeClass('active')
          } else {
            if (self.modal.wsBanned.self == '') {
              /* var value = $.trim($('#input').val());
               if (value) {
                   $('.btn-send').addClass('active')
               } */
            }
            self.modal.wsBanned.all = false;
            data.text = "管理员解除全体禁言";
            self.liveMsg('notice', data)
          }
        } else if (data.type == 'clicklike') { //点击喜欢动画，暂不考虑，后面可以根据长连接同步
          //modal.clickLike()
        } else if (data.type == 'textlive' /* || data.type == 'sent' */ ) { //用户评论等消息
          self.textliveMsg('text', data)
        } else if (data.type == 'timage') { //图片
          self.textliveMsg('image', data)
        }
        /* else if (data.type == 'goods') {
                       modal.liveGoods(data)
                   } else if (data.type == 'redpack') {
                       modal.liveMsg('redpack', data)
                   } else if (data.type == 'redpackget') {
                       if (data.prestatus == 0) {
                           FoxUI.toast.show('红包不存在或已过期')
                       } else if (data.prestatus == 1) {
                           $('.layer-mask').fadeIn(200);
                           $('.layer-redpack').addClass('in open').find('.price').html('<span>￥</span>' + data.money)
                       } else if (data.prestatus == 2) {
                           $('.layer-redpack .redpack-info .price').addClass('small').html('手速慢太慢了，没抢到..');
                           $('.msg .content .redpack[data-pushid="' + data.redpackid + '"]').addClass('drew').find('.desc').text('已抢光');
                           $('.layer-mask').fadeIn(200);
                           $('.layer-redpack').addClass('in open')
                       } else if (data.prestatus == 3) {
                           $('.layer-mask').fadeIn(200);
                           $('.layer-redpack').removeClass('open').addClass('in')
                       }
                       modal.initRedpackList(data.list);
                       FoxUI.loader.hide();
                       $(document).find('.redpack[data-pushid="' + data.redpackid + '"]').removeClass('stop')
                   } else if (data.type == 'redpackdraw') {
                       if (data.status == 0) {
                           setTimeout(function () {
                               $('.layer-redpack').removeClass('in');
                               $('.layer-mask').fadeOut(200);
                               FoxUI.loader.show('领取失败', 'icon icon-cry');
                               $('.layer-redpack .redpack-draw').removeClass('rotate');
                               setTimeout(function () {
                                   FoxUI.loader.hide()
                               }, 1500)
                           }, 1500)
                       } else if (data.status == 1 || data.status == 3) {
                           setTimeout(function () {
                               if (data.status == 3) {
                                   $('.msg .content .redpack[data-pushid="' + data.redpackid + '"]').addClass('drew').find('.desc').text('已领取')
                               }
                               $('.layer-mask').fadeIn(200);
                               $('.layer-redpack').addClass('in open').find('.price').html('<span>￥</span>' + data.money);
                               $('.layer-redpack .redpack-draw').removeClass('rotate')
                           }, 1500)
                       } else if (data.status == 2) {
                           setTimeout(function () {
                               $('.layer-redpack .redpack-info .price').addClass('small').html('手速慢太慢了，没抢到..');
                               $('.layer-mask').fadeIn(200);
                               $('.layer-redpack').addClass('in open');
                               $('.layer-redpack .redpack-draw').removeClass('rotate')
                           }, 1500)
                       }
                       modal.initRedpackList(data.list);
                       $('.layer-redpack').removeClass('stop')
                   } else if (data.type == 'coupon') {
                       modal.liveMsg('coupon', data)
                   } else if (data.type == 'coupondraw') {
                       if (data.status == 0) {
                           FoxUI.loader.show('领取失败', 'icon icon-cry');
                           setTimeout(function () {
                               FoxUI.loader.hide()
                           }, 1000)
                       } else if (data.status == 1 || data.status == 3) {
                           if (data.status == 3) {
                               $('.msg .content .coupon[data-pushid="' + data.couponid + '"]').addClass('drew').find('.desc').text('已领取')
                           }
                           $('.layer-mask').fadeIn(200);
                           $('.layer-coupon .coupon-title').text('优惠券已到账');
                           var html = '';
                           if (data.couponvaluetext == 0) {
                               html += '￥'
                           }
                           html += '<span class="money">' + data.couponvaluetotal + '</span>';
                           if (data.couponvaluetext != 0) {
                               html += data.couponvaluetext
                           }
                           $('.layer-coupon .price').html(html);
                           $('.layer-coupon .desc').html(data.couponuselimit || '无使用条件');
                           $('.layer-coupon').removeClass('roomcoupon').removeClass('fail').addClass('in')
                       } else if (data.status == 2) {
                           $('.layer-mask').fadeIn(200);
                           $('.layer-coupon .coupon-title').text('很遗憾，没抢到');
                           $('.layer-coupon').addClass('fail').addClass('in')
                       }
                   } */
      };
    },
    initheartbeat: function() {
      console.log('心跳启动index');
      var self = this;

      clearTimeout(this.hearbeatTimeout);
      // clearTimeout(this.hearbeatTimeoutClose);

      this.hearbeatTimeout = setTimeout(function() {
        //console.log(1);
        self.wsSend('ping', {
          toUser: 'system'
        });
        self.initheartbeat();
        /*          self.hearbeatTimeoutClose = setTimeout(function() {
                    console.log(2);
                    self.wsClient.close();
                  }, 6000); */
      }, 6000);
    },
    liveMsg: function(type, obj) {
      var self       = this;
      var atText     = '',
          fullscreen = '';
      //看上去是@
      /*          if (obj.atUsers && !$.isEmptyObject(obj.atUsers)) {
                    $.each(obj.atUsers, function (uid, nickname) {
                        atText += '<span class="nickname';
                        if (uid == modal.wsConfig.uid) {
                            atText += ' self', nickname = '你';
                            modal.liveAt(obj.nickname, obj.msgid)
                        }
                        atText += '" data-uid="' + uid + '" data-nickname="' + nickname + '">@' + nickname + '</span> '
                    })
                } */
      if (type == 'image') {
        console.log(obj);

        obj.text = this.tomedia(obj.text);
        //obj.text = '<img src="' + obj.text + '" />'
      } else if (type == 'text' && obj.text) {
        //判断有无表情，有表情对表情做处理
        if (obj.text.indexOf("[") > -1 && obj.text.indexOf("]") > -1) {
          var res = obj.text.match(/\[([^\]]+)\]/g);
          if (res) {
            $.each(res, function(index, val) {
              var text = val.replace('[', '');
              text = text.replace(']', '');
              var emojikey = self.live.emoji.indexOf(text);
              // var elm = $('.block-emoji .item[title="' + text + '"]');
              if (emojikey > 0) {
                //if (elm.data('index')) {
                var face =
                  '<img class="face" src="/addons/ewei_shopv2/plugin/live/static/images/face/' +
                  emojikey + '.gif?v=2" />';
                obj.text = obj.text.replace(val, face)
                //}
              }
            })
          }
        }
      }
      /* else if (type == 'redpack') {
                    var redpackTitle = obj.redpack.title || '红包来袭，手慢无！';
                    obj.text = '<div class="redpack" data-pushid="' + obj.redpack.id + '" data-title="' + redpackTitle + '"><p class="name">' + redpackTitle + '</p><p class="desc">点击领取</p></div>';
                    if (modal.wsConfig.fullscreen) {
                        fullscreen += 'nopadding'
                    }
                } else if (type == 'coupon') {
                    var couponTitle = obj.coupon.title || '优惠券来袭，手慢无！';
                    obj.text = '<div class="coupon" data-pushid="' + obj.coupon.id + '" data-title="' + couponTitle + '">' + couponTitle + '</div>';
                    if (modal.wsConfig.fullscreen) {
                        fullscreen += 'nopadding'
                    }
                } */
      else if (type == 'notice') {
        obj.type = "notice";


      } else if (type == 'repeal') {

        obj.type = 'repeal';

      } else if (type == 'oldmessage') {
        /* if (d.result.list.records[i].type == "image" && d.result.list.records[i].text.indexOf('<img') == 0){
           d.result.list.records[i].type = "text";
         } */
      }

      //console.log(obj);


      /*        if( ){

              } */
      if (type == 'repeal') {
        this.$delete(this.message.commentList, obj.msgid);
      } else {
        this.$set(this.message.commentList, obj.msgid, obj);
      }

      this.$nextTick(() => {
        //console.log(this.$refs);
        // console.log(this.$refs.commentListt[0].scrollHeight);
        if (typeof this.$refs.dialogListt != "undefined") {

          this.$refs.dialogListt.scrollTop = this.$refs.dialogListt.scrollHeight;
        }

      });
      console.log(this.message.commentList);



      //this.$set(this.message.commentList, 0, obj);
      //console.log(this.message.commentList);
      //开始生成消息dom
      /*          var html = '';
                html += '<div data-msgid="' + obj.msgid + '" class="msg ' + fullscreen;
                if (type == 'notice') {
                    html += ' notice'
                }
                if (obj.self) {
                    html += ' self'
                }
                html += '">';
                if (type == 'notice') {
                    html += '系统提醒：' + obj
                } else {
                    if (obj.self) {
                        obj.nickname += '(你)';
                        if (modal.wsCanRepeal) {
                            obj.text += '<span class="btn-repeal show"> <i class="icon icon-chexiao"></i></span>'
                        } else {
                            obj.text += '<span class="btn-repeal"> <i class="icon icon-chexiao"></i></span>'
                        }
                    }
                    if (type != 'redpack' || !modal.wsConfig.fullscreen) {
                        html += '<div class="nickname ';
                        if (obj.self) {
                            html += ' self'
                        }
                        html += '" data-uid="' + obj.fromUser + '" data-nickname="' + obj.nickname + '">' + obj.nickname + '：</div>'
                    }
                    html += '<div class="content">' + atText + obj.text + '</div>'
                }
                html += '</div>'; */
      //$('.tab-content[data-tab="interaction"]').append(html);
      /*          if (type == 'redpack') {
                    $('.block-content .msg[data-msgid="' + obj.msgid + '"]').find('.redpack').click();
                    $('.layer-coupon').removeClass('in')
                }
                if (type != 'redpackget' && type != 'redpackdraw' && type != 'coupondraw') {
                    modal.scrollBottom()
                } */
    },
  /* 	goto(page){
  		if(page === 'mall'){


				let outURL =this.mui.mallUrl + 'i=3&c=entry&m=ewei_shopv2&do=mobile';

				if(!window.plus) {
	    			window.location.href = outURL;
				} else {
		  			this.$router.push({
								name: 'mall',
								params: {
									url: outURL
								}
						})
				}

  		} else {
  			this.$router.replace(page)
  		}
  	} */
  },

}
</script>

<style>
.mint-tabbar > .mint-tab-item.is-selected {
    background-color: transparent;
    color: #fd7b27;
}
 </style>
