<template>
  <div id="ChatInformation">
    <van-nav-bar
      :title="$route.params.name"
      :border="true"
      class="chat-information-van-nav-bar"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="chat-information-van-list " ref="dialogListt">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        :immediate-check = "false"
        offset="-1000000"
        v-model="classList[0].loadingMoreStatus" :finished="classList[0].finished" :error.sync="classList[0].error"
        finished-text="没有更多了" direction="up" error-text="请求失败，点击重新加载" @load="omMore()">
        <ChatInformationDialog
          v-for=" (v,k) in message.commentList"
          :key="k"
          :uniacid="pageconfig.uniacid"
          :content="v.text"
          :time="$moment(Number(v.time * 1000)).format('YYYY-MM-DD HH:mm:ss')"
          :imgurl=" v.fromUser == $store.state.userInfo.id ? $store.state.userInfo.avatar : $route.params.avator"
          :isself="v.fromUser != $store.state.userInfo.id "
        />
        <!-- <mt-loadmore  :bottom-method="loadBottom"  :bottom-all-loaded="false" :distance-index="10"  ref="homepage"> -->
        <!-- <LiveList v-for="(n ,index) in listValue[0]" :listvalues="n" title="aa" :key="index"></LiveList> -->



      </van-list>
      </van-pull-refresh>
    </div>

    <div class="chat-information-bottom">

      <!-- <van-cell-group> -->
      <van-field
        class="chat-information-bottom-field"
        v-model="chatSubmitValue"
        center

        :border="false"

        :placeholder="commentPlaceholder"

      >
        <van-button :disabled = "disabled"   slot="button" size="small"  @click="sendMessage()" type="primary">发送</van-button>
      </van-field>
<!--      <van-field
        v-model="commentValue"
        center
        clearable
        :disabled="wsConnected == false"
        :placeholder="commentPlaceholder"

      >
        <van-button v-if="wsConnected" slot="button" size="small"  @click="sendMessage()" type="primary">发送</van-button>
          <van-button v-else slot="button" size="small" :loading="socketLoading"  @click="connectSocket()" type="primary">点我重连</van-button>
      </van-field> -->
      <!-- </van-cell-group> -->

  <!--    <mt-field  placeholder="跟大家说点什么吧" v-model="commentValue"></mt-field>
      <mt-button class="liveRoomBottom-button" type="primary" @click="sendMessage()" size="small" >发送</mt-button> -->

    </div>
  </div>
</template>

<script>
  //需要利用导航守卫在返回前更新最后一条消息
  import ChatInformationDialog from './template/ChatInformationDialog.vue';
  export default {
    components: {
      ChatInformationDialog
    },

    data() {
      return {
        selected: "0",
        refreshing: false,
        commentPlaceholder: "",
        chatSubmitValue: "",
        wsClient: null,
        wsloading: false,
        yuid: -1,
        disabled: false,
        // wsClientStatus: 3,
        message: {
          textLiveList: {},
          commentList: []
        },

        modal: {
          hearbeatTimeout: null,
          hearbeatTimeoutClose: null,
          wsConnected: false,
          qlghuser: {},
          wsBanned: {
            self: "",
            all: 0
          },
          wsConfig: {
            attachurl: this.pageconfig.attachurl,
            uid: null,
            nickname: null
          }
        },
        classList: {
          0: {
            id: 0,
            page: 2,
            loadingMoreStatus: false,
            finished: false, //全部加载完成,还没有做
            error: false,
            title: "正在进行"
          },
        },
      }
    },

    created() {

 /*     var wxref = this.$route.query.wxref;

      if(this.isWeiXin() && !wxref){
        //console.log(this.wxurl + window.location.href);
        window.location.href =  this.wxurl + encodeURIComponent(window.location.href);
      } */

      //this.initQlgh();
      //this.connectWs();

      //this.initRoomInfo();

      //console.log(labor);
      // this.shareReady();
      //wxApi.shareReady();
    },
    mounted() {
        //console.log(this.$router.params);
    },

    watch: {
      '$store.state.userInfo':{


        handler: function() {

          if(this.$store.state.userInfo){
            this.connectWs();
          }else{
            this.disabled = true;
          }
        },
        deep: true
      },
    },
    activated(){
      if(this.yuid != this.$route.params.yuid){
        this.yuid = this.$route.params.yuid;
      }
      this.message.commentList = [];
      if(this.$store.state.userInfo){
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          loadingType: 'spinner',
          duration: 0
        });
        this.connectWs();
      }else{
        this.disabled = true;
        this.$notify({
          message: '您还没有报名，报名后才能打招呼',
          duration: 0,
          //type: 'primary',
        });
      }
    },

    methods: {
      omMore: function(){
        //console.log( this.modal.wsConnected);

        if(!this.classList[this.selected].finished && this.modal.wsConnected){
          //alert(1);
          //var self = this;
          this.$toast.clear();
          this.classList[this.selected].loadingMoreStatus = true;
          this.wsSend('pageup', {toUser: 'all', page: this.classList[this.selected].page});
        }

      },
          onRefresh() {
            // 清空列表数据
            //this.finished = false;

            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            //this.loading = true;
            if(!this.classList[this.selected].finished){
              this.omMore();
            }else{
              this.refreshing = false;
            }
          },

      connectWs: function() {
        //alert(1);

        if( !this.$route.params.yuid || $.isEmptyObject(this.$store.state.userInfo)){

          return false;
        }

       // console.log(config);
        var self = this;
        //this.wsClient = new WebSocket(config.ws.address);
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
       // console.log(type,obj);

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
        obj.scene = 'live';
        obj.uid = this.$store.state.userInfo.id;
        obj.yuid = this.$route.params.yuid;
        obj.uniacid = this.$route.params.uniacid;
        obj.avator = this.$store.state.userInfo.avatar;
        obj.nickname = this.$store.state.userInfo.nickname;
        obj.ztype = 'room';
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
          //console.log(data);
          if (data.type == 'connected') {
            self.$toast('连接成功');

            /*        if(modal.wsConfig.uid || modal.qlghuser.userPhone){
                      $('.block-input .input-place').html('').hide().siblings().show();
                    } */
            self.modal.wsConnected = true;
            console.log(self.message.commentList);
            let oldmsg = {};
            for(let i = 0; i < data.oldmessage.length;i++){
              let arr = JSON.parse(data.oldmessage[i]);
              oldmsg[i] = {};
              oldmsg[i].time = arr['stime'];
              oldmsg[i].text = arr['content'];
              oldmsg[i].fromUser = arr['sender'];

              self.message.commentList.unshift(oldmsg[i]);
            }
            self.dialogListtScroll();
            self.$store.commit({
              type: 'removeChatUnreadListSub',
              yuid: self.$route.params.yuid
            });
 /*           if(data.unread){//对象为空需要进一步判断
              self.$store.commit({
                type: 'updateChatUnreadList',
                obj: data.unread,
                //selected: 0
              });
            } */
/*          self.$nextTick(() => {
            //console.log(this.$refs);
            // console.log(this.$refs.commentListt[0].scrollHeight);
            if (typeof self.$refs.dialogListt != "undefined") {

              self.$refs.dialogListt.scrollTop = self.$refs.dialogListt.scrollHeight;
            }

          }); */
            //self.message.commentList = Object.assign([], self.message.commentList, oldmsg);
            //self.message.commentList.push(JSON.parse(data.oldmessage[i]));
            //阻止发言状态
          /*  self.modal.wsBanned = data.banned;
            if (data.banned.all == 1) {
              data.text = "管理员禁止任何人发言";
              self.liveMsg('notice', data)
            } else if (data.banned.self != '') {
              data.text = "你被管理员禁止发言";
              self.liveMsg('notice', data)
            } */




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
          } else if (data.type == 'notice') {
            self.liveMsg('notice', data)

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
          } else if (data.type == 'pageUpRespose') { //聊天分页返回
            //self.classList[self.selected].loadingMoreStatus = false;
            self.classList[self.selected].page++;
            self.refreshing = false;
            //self.classList[self.selected].finished = true;//临时增加防止死循环

            if (data.total <= 0) { //后面已经没有了
              self.classList[self.selected].finished = true;
            }

            if (data.total > 0) {
             //console.log(self.selected);
             //self.$store.commit('updateChatList',d.list,self.selected);
             //console.log(data.oldmsg);
             let oldmsg = {};
             for(let i = 0; i < data.oldmessage.length;i++){
               let arr = JSON.parse(data.oldmessage[i]);

               arr.time = arr['stime'];
               arr.text = arr['content'];
               arr.fromUser = arr['geter'];

                self.message.commentList.unshift(arr);

             }
             console.log(self.message.commentList);
             self.classList[self.selected].loadingMoreStatus = false;

              //self.message.commentList = Object.assign(self.message.commentList, data.oldmessage);



            } else {
              console.log('ajax列表获取不到数据，这里需要给一个错误提示');
            }

            //self.classList[self.selected].error = true;
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
        console.log('心跳启动');
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
         // this.$set(this.message.commentList, obj.msgid, obj);
          this.message.commentList.push(obj);
        }
        this.dialogListtScroll();

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
      sendMessage: function(){
        let newFieldArr = [];


        //this.$parent.modal.wsConnected

  /*      if(!this.$parent.modal.wsConfig.uid && !this.$parent.modal.qlghuser.userPhone ){
          this.$toast('游客不能发言');
          return false;
        } */

        if(this.chatSubmitValue){
         // console.log('11');
          //consoel.log(value);
          var msg = this.wsSend('text', {toUser: 'all', text: this.chatSubmitValue});

          //this.$parent.aselected = 1;


     /*     var wsConfig = this.modal.wsConfig;
          obj.type = type;
          obj.scene = 'live';
          obj.uid = this.$store.state.userInfo.id;
          obj.yuid = this.$route.params.yuid;
          obj.uniacid = this.$route.params.uniacid;
          obj.avator = this.$store.state.userInfo.avatar;
          obj.nickname = this.$store.state.userInfo.nickname; */
          //console.log(this.$store.state.chatList);

          if(this.$store.state.chatList[this.selected]){

            //if(this.$store.state.chatList[this.selected][this.$route.params.yuid] != undefined){

              newFieldArr.push({
                "avatar" : this.$route.params.avator,
                "content" : this.chatSubmitValue,
                "id" : this.$route.params.yuid,
                "realname" : this.$route.params.name,
                "nickname" : "",
                "stime" : new Date().getTime() / 1000,
                "unreadnum" : 0
              });
           // }

            this.$store.commit({
              type: 'updateChatList',
              list: newFieldArr,
              selected: this.selected
            });
          }

          console.log(msg);
          if (msg) {
            this.chatSubmitValue = "";
/*              $(this).removeClass('active');
              $("#input").val('');
              modal.msgAt = {} */
          }
          //$('.fui-content').removeClass('show-emoji')
        }else{

          this.$toast('内容不能为空');

        }
      },
      onClickLeft() {
        this.$router.go(-1);
      },
      dialogListtScroll(){
        this.$nextTick(() => {
          //console.log(this.$refs);
          // console.log(this.$refs.commentListt[0].scrollHeight);
          if (typeof this.$refs.dialogListt != "undefined") {

            this.$refs.dialogListt.scrollTop = this.$refs.dialogListt.scrollHeight;
          }

        });
      },

    },
    beforeRouteLeave (to, from, next) {
      //alert(1);//分享问题需要修改微信分享的link参数，不能带有跳转后的get参数
      if(this.wsClient){
        this.wsClient.close();
      }

      this.$notify.clear();

      next();
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
    }
  }
</script>

<style>
/*  html,body{
    height: 100%;
  } */

  #ChatInformation{
    background-color: #f4f5f7;
    /* display:flex;  */

    position: absolute;
    display: -ms-flexbox;
    flex-direction: column;
    height: 100%;
    width: 100%;
    display: flex;

  }

  .chat-information-van-list{
      flex: 1;
      overflow-y: scroll;
  }

  .chat-van-card{
    padding-left: 10px;
    padding-right: 11px;
    padding-bottom: 10px;
    padding-top: 10px;
    border-bottom: solid 1px #d8d8d8;
    height: 83px;
  }

  .chat-van-card .van-card__thumb{
    width: 62px;
    height: 62px;
    margin-right: 13px;
  }

  .chat-van-card .chat-van-card-name{
    color: #3b3b3b;
    font-size: 13px;
    line-height: 13px;
    display: block;
    padding-bottom: 18px;
    padding-top: 11px;
  }

  .chat-van-card .chat-van-card-middle-desc{
    color: #b0b0b0;
    font-size: 11px;
    line-height: 11px;
    display: inline-block;
    padding-bottom: 14px;
  }

  .chat-van-card .chat-van-card-dialog-time{
    display: inline-block;
    color: #b3b3b3;
    font-size: 9px;
    line-height: 9px;
    position: absolute;
    right: 0;
    top: 11px;
  }

  .chat-van-card:not(:first-child){
    margin-top: 0;
  }

  .chat-information-van-nav-bar{
    /* height: 100px; */
    /* border-bottom: solid 1px #bcbcbc; */
    -moz-box-shadow:0 3px 4px 1px #dbdbf6;
    -webkit-box-shadow:0 3px 4px 1px #dbdbf6;
    box-shadow:0 3px 4px 1px #dbdbf6;
    background: linear-gradient(to right, #864cd4 , #716bef);

  }

  .chat-information-van-nav-bar .van-nav-bar__title,
  .chat-information-van-nav-bar .van-icon{
    color: #fff;
  }

  .chat-information-bottom{
    background-color: #eceaeb;
    height: 51px;
    /* position: fixed; */
    bottom: 0;
    width: 100%;
  }

  .chat-information-bottom .chat-information-bottom-field{
    background-color: #eceaeb;
    height: 51px;
    padding-left: 46px;


  }
  .chat-information-bottom .van-field__control{
    background-color: #f3f1f2;
    width: 235px;
    height: 36px;
    border-radius: 32px;
    font-size: 16px;
    padding: 0 2%;

  }

  .chat-information-bottom-field .van-button--small{
    background-color: #45c01a;
    border: none;
    height: 34px;
    width: 51px;
    padding: 0;
  }

  .chat-information-bottom-field .van-field__button{
    padding-left: 23px;
  }


</style>
