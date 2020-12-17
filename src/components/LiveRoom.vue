<template>
  <div>
    <!-- <van-sticky> -->
    <div id="videoBox" ref="videoBoxref">
      <keep-alive>
        <!-- 组件重复渲染 增加v-once -->
        <!--   <ali-player v-once v-if="live.status == 1 && live.source != ''" id="aliplay" class="aliPlayer" :source="live.source"
          :useH5Prism="true" :isLive="true"  :height="aliplayerheight" x5_type="h5" controlBarVisibility="hover"
          :skinLayout="skinLayout"></ali-player> -->
        <ali-player v-once v-if="live.status == 1 && aliplayerOptions.source != ''" id="aliplay" class="aliPlayer"
             :options="aliplayerOptions" ref="VueAliplayerV2"></ali-player>
        <img v-else style="width: 100%;height: 100%;" :src='live.cover'>
      </keep-alive>
      <div class="liveStatus" v-show="live.status != 1 ">
        <div class="live-status-sur" v-show="live.status >= 0">
          <p v-if="live.status <= 0 && !liveTimeStatus">直播未开始</p>
          <p v-else-if="live.status <= 0 && liveTimeStatus">直播已结束</p>

          <p v-else-if="live.status >= 2">直播已暂停</p>

          <p v-show="live.status != 2" class="liveStatus-time">
            <span v-if="!liveTimeStatus">预计开播时间：{{liveStartTime}}</span>
            <span v-else><a class="playback" v-show="live.playbackurl != ''" :href="live.playbackurl">直播回顾</a></span>
          </p>
        </div>
      </div>
      <div v-show="live.showOnlineNum" class="onlineNum">{{initOnline}}人观看</div>
      <div class="liveTitle">{{live.liveTitle}}</div>
    </div>
    <!-- </van-sticky> -->
    <!-- <van-sticky> -->
    <!-- 1 不增加 sticky 而是手动写固定布局，将top设置为videoBox的rem高度-->
    <van-tabs v-if="tablock" class="van-tabs-block" v-model="aselected" :style="{height: tabheight}">
      <!-- <van-tabs v-model="aselected"> -->

      <!-- <img class="commentImg" v-else-if="textLiveValue.type == 'image'" :src="textLiveValue.text"> -->
      <!--       <van-tab class="fixed-tab"  :title="roomClassifyList[0].name" :name="roomClassifyList[0].id">
        <div class="liveroom-tab-container"  ref="textLiveListt">
          <div v-for="(textLiveValue,index) in message.textLiveList"  class="comment" :key="index">
            <p class="username" v-if="textLiveValue.type != 'notice' && textLiveValue.type != 'repeal'">{{ textLiveValue.self ? "你" : textLiveValue.nickname}}:</p>


            <p :class="{
              notice: textLiveValue.type == 'notice',
              repeal: textLiveValue.type == 'repeal'
              }">
              <span v-if="textLiveValue.type == 'notice'">系统提示：</span>

              <span v-if="textLiveValue.type != 'timage'">{{textLiveValue.text}}</span>

              <span class="commentImg" v-else-if="textLiveValue.type == 'timage'" v-html="textLiveValue.text"></span>
            </p>
          </div>
        </div>

      </van-tab> -->

      <!-- <van-tab class="fixed-tab"  :title="live.menu.interaction ? live.menu.interaction : '直播评论'" name="1"> -->
      <!--     <van-tab class="fixed-tab"  :title="roomClassifyList[1].name" :name="roomClassifyList[1].id">
        <div class="liveroom-tab-container" ref="commentListt" >
          <div v-for="(commentValue,index) in message.commentList" class="comment" :key="index">

            <p class="username" v-if="commentValue.type != 'notice' && commentValue.type != 'repeal'">{{ commentValue.self ? "你" : commentValue.nickname}}:</p>

            <p :class="{
              notice: commentValue.type == 'notice',
              repeal: commentValue.type == 'repeal'
              }">
              <span v-if="commentValue.type == 'notice'">系统提示：</span>

              <span v-if="commentValue.type != 'image'">{{commentValue.text}}</span>

              <span class="commentImg" v-else-if="commentValue.type == 'image'" v-html="commentValue.text"></span>
            </p>
          </div>
        </div>

      </van-tab> -->
      <!-- <van-tab class="fixed-tab" :title="live.menu.introduce ? live.menu.introduce : '直播介绍'" name="2"> -->
      <!--   <van-tab class="fixed-tab"  :title="roomClassifyList[2].name" :name="roomClassifyList[2].id">
        <div class="liveroom-tab-container">
          <div class="comment">

            <van-cell-group :border="false" size="large">

              <p style="color: #000;line-height: 26px; font-size: 16px;"><span>直播间：</span><span>{{live.liveTitle}}</span></p>

            </van-cell-group>

            <div class="van-hairline--top" style="height: 1px;"></div>

            <van-cell-group :border="false" size="large">

              <p style="color: #000;line-height: 26px; font-size: 16px;"><span>直播时间：</span><span>{{liveStartTime}}</span></p>

            </van-cell-group>

          </div>

          <van-panel title="直播间介绍：">
            <div slot="footer">
              <p v-html="live.introduce"></p>
            </div>
          </van-panel>
        </div>

      </van-tab> -->
      <!-- <van-tab class="fixed-tab" v-if="roomClassifyListItem.id > 2" v-for="(roomClassifyListItem,index) in roomClassifyList" @click.native="roomClassifyListItem.type == 1 && toLink(roomClassifyListItem.url)" -->

      <van-tab class="fixed-tab" v-for="(roomClassifyListItem,index) in roomClassifyList" @click.native="roomClassifyListItem.type == 1 && toLink(roomClassifyListItem.url)"
        :title="roomClassifyListItem.name" :name="roomClassifyListItem.id" :key="index">

        <div class="liveroom-tab-container" v-if="(typeof roomClassifyListItem.id != 'number' && isNaN(roomClassifyListItem.id)) || roomClassifyListItem.id > 2">
          <div class="comment comment-zi">
            <p v-html="roomClassifyListItem.introduce"></p>
          </div>
        </div>
        <div class="liveroom-tab-container" ref="textLiveListt" v-else-if="roomClassifyListItem.id == 0">
          <div v-for="(textLiveValue,index) in message.textLiveList" class="comment" :key="index">
            <p class="username" v-if="textLiveValue.type != 'notice' && textLiveValue.type != 'repeal'">{{ textLiveValue.self ? "你" : textLiveValue.nickname}}:</p>

            <p :class="{
              notice: textLiveValue.type == 'notice',
              repeal: textLiveValue.type == 'repeal'
              }">
              <span v-if="textLiveValue.type == 'notice'">系统提示：</span>

              <!-- <span v-if="textLiveValue.type != 'image' && textLiveValue.type != 'timage'" v-html="textLiveValue.text">{{textLiveValue.text}}</span> -->
              <span class="commentText" v-if="textLiveValue.type != 'image' && textLiveValue.type != 'timage'" v-html="textLiveValue.text"></span>
              <!-- <span class="commentImg" v-else-if="textLiveValue.type == 'timage'" v-html="textLiveValue.text"></span> -->
              <span class="commentImg" v-else-if="textLiveValue.type == 'image' || textLiveValue.type == 'timage'">
                <img class="commentImg" @click="handleImgsClick(textLiveValue.text)" :src="textLiveValue.text">
              </span>
            </p>
          </div>
        </div>
        <div class="liveroom-tab-container" ref="commentListt" v-else-if="roomClassifyListItem.id == 1">
          <div v-for="(commentValue,index) in message.commentList" class="comment" :key="index">

            <p class="username" v-if="commentValue.type != 'notice' && commentValue.type != 'repeal'">{{ commentValue.self ? "你" : commentValue.nickname}}:</p>

            <p :class="{
                notice: commentValue.type == 'notice',
                repeal: commentValue.type == 'repeal'
                }">
              <span v-if="commentValue.type == 'notice'">系统提示：</span>

              <!-- <span v-if="commentValue.type != 'image'">{{commentValue.text}}</span> -->
              <span class="commentText" v-if="commentValue.type != 'image'" v-html="commentValue.text"></span>

              <!-- <span class="commentImg" v-else-if="commentValue.type == 'image'" v-html="commentValue.text"></span> -->
              <span class="commentImg" v-else-if="commentValue.type == 'image'">
                <img class="commentImg" @click="handleImgsClick(commentValue.text)" :src="commentValue.text">
              </span>


            </p>
          </div>
        </div>

        <div class="liveroom-tab-container" v-else-if="roomClassifyListItem.id == 2">
          <div class="comment">

            <van-cell-group :border="false" size="large">

              <p class="introducesub"><span>直播间：</span><span>{{live.liveTitle}}</span></p>

            </van-cell-group>

            <div class="van-hairline--top" style="height: 1px;"></div>

            <van-cell-group :border="false" size="large">

              <p class="introducesub"><span>直播时间：</span><span>{{liveStartTime}}</span></p>

            </van-cell-group>

          </div>

          <van-panel title="直播间介绍" v-if="live.introduce">
            <div style="font-size: .4rem;" slot="footer">
              <p v-html="live.introduce"></p>
            </div>
          </van-panel>
        </div>




        <!-- </div> -->
        <!--        <van-list
          v-model="classList[classvalue.id].loadingMoreStatus"
          :finished="classList[classvalue.id].finished"
          :error.sync="classList[classvalue.id].error"
          finished-text="没有更多了"
          error-text="请求失败，点击重新加载"
          @load="loadMore"
        >


          <LiveList v-for="n in listValue[classvalue.id]" :listvalues="n" title="aa"></LiveList>

        </van-list> -->

      </van-tab>

    </van-tabs>
    <!-- </van-sticky> -->
    <!--    <mt-navbar v-model="aselected" style='margin-bottom: 2%;'>
      <mt-tab-item id="0">图文直播</mt-tab-item>
      <mt-tab-item id="1">{{live.menu.interaction ? live.menu.interaction : "直播评论"}}</mt-tab-item>
      <mt-tab-item id="2">{{live.menu.introduce ? live.menu.introduce : "直播介绍"}}</mt-tab-item>
      <mt-tab-item v-for="roomClassifyListItem in roomClassifyList" @click.native="roomClassifyListItem.type == 1 && toLink(roomClassifyListItem.url)" :id="roomClassifyListItem.id">{{roomClassifyListItem.name}}</mt-tab-item>

    </mt-navbar> -->
    <!-- v-if="roomClassifyListItem.type == 0" -->
    <!--       <mt-tab-item v-for="roomClassifyListItem in roomClassifyList" v-else-if="roomClassifyListItem.type == 0" @click.native="t(roomClassifyListItem.url)" style="color: red" :id="roomClassifyListItem.id">{{roomClassifyListItem.name}}</mt-tab-item>-->

    <LiveRoomBottom :socketLoading="wsloading" :wsConnected="modal.wsConnected"></LiveRoomBottom>
  </div>

</template>

<script>
  import config from "../../config/sys.js"
  import {
    ImagePreview
  } from 'vant';
  import labor from 'labor';

/*  import {
    LuoVueAliplayerDom
  } from 'luo-vue-aliplayer'; //网上修改兼容vue的阿里云播放器 */

  import VueAliplayerV2 from 'vue-aliplayer-v2';

  import LiveRoomBottom from './LiveRoomBottom.vue'

  export default {
    name: 'LiveRoom',
    data() {
      return {
        wxurl: "/app/index.php?i=" + this.pageconfig.uniacid + "&c=auth&a=actforward&forward=",
        tabheight: "300px",
        tablock: false,
        screenHeight: window.screen.height,
        wsClient: null,
        wsloading: false,
        // wsClientStatus: 3,
        message: {
          textLiveList: {},
          commentList: {}
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
        live: {
          status: -1, //直播状态
          showOnline: 0, //在线人数
          showOnlineNum: false, //是否显示在线人数
          //source: "", //视频源
          cover: "", //cover图
          realOnline: 0,
          liveTime: 0,
          liveTitle: "",
          showtextlivetab: false,
          introduce: "",
          menu: {},
          playbackurl: "",
          emoji: []
        },
        roomClassifyList: [

          /*         {
                     "id" : 0,
                     "name" : "图文直播",
                     type: 0

                   }
                 , */
          {
            "id": 1,
            "name": "直播评论",
            type: 0
          },
          {
            "id": 2,
            "name": "直播介绍",
            type: 0
          },

        ],
        aselected: "1",
        aliplayerheight: "100%",
        skinLayout: [{
            "name": "bigPlayButton",
            "align": "blabs",
            "x": 30,
            "y": 80
          },
          {
            "name": "errorDisplay",
            "align": "tlabs",
            "x": 0,
            "y": 0
          },
          {
            "name": "infoDisplay"
          },
          {
            "name": "controlBar",
            "align": "blabs",
            "x": 0,
            "y": 0,
            "children": [{
                "name": "liveDisplay",
                "align": "tlabs",
                "x": 15,
                "y": 6
              },
              {
                "name": "fullScreenButton",
                "align": "tr",
                "x": 10,
                "y": 10
              },
              {
                "name": "volume",
                "align": "tr",
                "x": 5,
                "y": 10
              }
            ]
          }
        ],
        "resizetimer": null,
        tbl: [],
        aliplayerOptions:{
          source: "",
          useH5Prism: true,
          playsinline: true,
          controlBarVisibility: "hover",
          isLive: true,
          cover: "",
          height: "",
          skinLayout: "",

        }
      }
    },
    components: {
      //'ali-player': LuoVueAliplayerDom,
      'ali-player': VueAliplayerV2.Player,
      LiveRoomBottom,

    },
    created() {

      var wxref = this.$route.query.wxref;

      if(this.isWeiXin() && !wxref){
        //console.log(this.wxurl + window.location.href);
        window.location.href =  this.wxurl + encodeURIComponent(window.location.href);
      }

      this.initQlgh();
      this.connectWs();
      this.initRoomInfo();

      console.log(labor);
      // this.shareReady();
      //wxApi.shareReady();
    },
    mounted() {

      var self = this;

      this.aliplayerOptions.height = this.aliplayerheight;
      this.aliplayerOptions.skinLayout = this.skinLayout;

      //console.log(this.uniacid);

      //self.screenHeight = window.screen.height;
      self.screenHeight = document.documentElement.clientHeight;
      self.tabheight = (self.screenHeight - self.$refs.videoBoxref.offsetHeight) + "px";
      window.onresize = () => {
        return (() => {

          /* window.screenHeight = document.body.clientHeight
           that.screenHeight = window.screenHeight */
          if (!this.resizetimer) {
            // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
            //console.log();
            //this.resizetimer = true;

            //self.screenHeight = window.screen.height;
            self.screenHeight = document.documentElement.clientHeight;
            // self.tabheight = (self.screenHeight - self.$refs.videoBoxref.offsetHeight) + "px";

            /* setTimeout(function() {

               self.resizetimer = false
             }, 400) */
          }

        })()
      }
    },

    computed: {
      initOnline: function() {

        var online = parseInt(this.live.realOnline) + parseInt(this.live.showOnline);
        if (online <= 0) {
          this.live.showOnlineNum = false;
          return 0;
        }

        this.live.showOnlineNum = true;

        //console.log("执行了计算属性");
        if (online > 10000) {
          online = (online / 10000).toFixed(2);
          online += '万'
        }
        return online;
      },
      liveStartTime: function() {
        let date = new Date(this.live.liveTime * 1000);
        // var d = new Date(timestamp * 1000);    //根据时间戳生成的时间对象
        var datefromate = (date.getFullYear()) + "-" +
          (this.pad(date.getMonth() + 1, 2)) + "-" +
          (this.pad(date.getDate(), 2)) + " " +
          (this.pad(date.getHours(), 2)) + ":" +
          (this.pad(date.getMinutes(), 2));


        console.log(datefromate);
        return datefromate;
        // return date.toJSON().substr(0, 19).replace('T', ' ');
      },
      liveTimeStatus: function() {
        let timestamp = (new Date().getTime() / 1000) /* + 600 */ ;
        /*        console.log(timestamp);
                console.log(this.live.liveTime);
                console.log(timestamp >= this.live.liveTime); */
        if (timestamp >= this.live.liveTime) {
          return true; //开播
        } else {
          return false;
        }
      }
    },
    watch: {
      /*      messages() {
              this.$nextTick(() => {
                let list = this.$els.xx
                list.scrollTop = list.scrollHeight
              })
            } */

      screenHeight(val) {
        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
        console.log(val)

        this.tabheight = (val - this.$refs.videoBoxref.offsetHeight) + "px";

      }


    },

    methods: {
      /* 查表法(过程式版本) by aimingoo */
      /* pad : function() {
       var tbl = []; */
      pad: function(num, n) {
        var len = n - num.toString().length;
        if (len <= 0) return num;
        if (!this.tbl[len]) this.tbl[len] = (new Array(len + 1)).join('0');
        return this.tbl[len] + num;
      },
      //},
      toLink: function(url) {
        //if(type == 0){
        if (!url) {
          return false;
        }

        window.location = url;
        //}
      },
      initRoomInfo: function() { //页面信息、直播信息、分享的初始化

        var self = this;
        console.log(self.roomClassifyList);

        var roomid = this.$route.params.id;
        var pagehost = window.location.href.split('?wxref')[0];//如果将来有新的get参数，可以通过vue来的get参数获取功能来重新组装，去掉wxref sdfjlkjlg


        if (!roomid) {
          console.log('roomid是空的');
          return false;
        }

        $.ajax({
          url: "/app/index.php?i=" + this.pageconfig.uniacid + "&c=entry&m=ewei_shopv2&do=mobile&r=live.room.getRoomInfo",
          type: "GET",
          async: false,
          data: {
            id: roomid,
          },
          dataType: "json",
          success: function(d) {


            self.live.liveTime = d.result.list.room.livetime;
            self.live.liveTitle = d.result.list.room.title;
            self.live.introduce = d.result.list.room.introduce;
            //self.live.source = d.result.list.room.video;
            self.aliplayerOptions.source = d.result.list.room.video;
            self.aliplayerOptions.cover = self.live.cover = d.result.list.room.cover != "" ? d.result.list.room.cover : d.result.list.room.thumb;
            self.live.playbackurl = d.result.list.room.playbackurl;
            self.live.emoji = d.result.list.emoji;

            self.live.status = d.result.list.room.living;

            self.modal.wsConfig.uid = d.result.list.roomwxuser.uid;
            self.modal.wsConfig.nickname = d.result.list.roomwxuser.nickname;

          /*  self.modal.wsConfig.uid = '1';
            self.modal.wsConfig.nickname = '黄焖鸡'; */
            /*        console.log(1111111111111);
                    console.log(self.live); */
            //console.log(d.result.list.room.title.length);
            //console.log(self.pageconfig);
            var wxConfig = {
              title: d.result.list.room.title.length > 0 ? d.result.list.room.title : self.pageconfig.sharetitle, // 分享标题
              desc: d.result.list.room.share_desc.length > 0 ? d.result.list.room.share_desc : self.pageconfig.sharedesc,
              link: pagehost, // 分享链接
              imgUrl: d.result.list.room.share_icon.length > 0 ? d.result.list.room.share_icon : self.pageconfig.shareimgUrl, // 分享图标
              success: function() {
                // 用户确认分享后执行的回调函数
              },
              cancel: function() {
                // 用户取消分享后执行的回调函数textliverecords
              }
            };
            console.log(wxConfig);
            wxApi.shareDetail(wxConfig);

            for (let i = 0; i < d.result.list.records.length; i++) {
              //self.message.commentList.push
              //self.liveMsg(d.result.list.records[i].type,d.result.list.records[i]);
              //self.liveMsg('oldmessage', d.result.list.records[i]);
              if (d.result.list.records[i].status != 2) {
                self.$set(self.message.commentList, d.result.list.records[i].id, d.result.list.records[i]);
              }
            }

            for (let i = 0; i < d.result.list.textliverecords.length; i++) { //图文直播
              //self.message.commentList.push
              //self.liveMsg(d.result.list.records[i].type,d.result.list.records[i]);
              //self.liveMsg('oldmessage', d.result.list.records[i]);
              if (d.result.list.textliverecords[i].status != 2) {
                self.$set(self.message.textLiveList, d.result.list.textliverecords[i].id, d.result.list.textliverecords[
                  i]);
              }

            }
            //self.tablock = true;

            //console.log(self.message.textLiveList);
            /*            console.log(d.result.list.nestables);
                        console.log(d.result.list.menu);
                        console.log(self.roomClassifyList); */
            // self.menu.push(d.result.list.menu);
            //self.$set(self.menu,0, d.result.list.menu);
            //console.log(self.menu);

            for (let i = 0; i < d.result.list.nestables.length; i++) {
              //self.message.commentList.push
              //self.liveMsg(d.result.list.records[i].type,d.result.list.records[i]);
              //self.liveMsg('oldmessage', d.result.list.records[i]);
              /*              {if empty($menu[$row]['name'])}


                                    自定义

                            {else}
                                {$menu[$row]['name']}
                            {/if} */
              //console.log(d.result.list.menu[d.result.list.nestables[i]].isshow);
              self.live.menu.interaction = d.result.list.menu['interaction'].name;
              self.live.menu.goods = d.result.list.menu['goods'].name;
              self.live.menu.introduce = d.result.list.menu['introduce'].name;

              if (d.result.list.menu[d.result.list.nestables[i]].isshow == 0 || (d.result.list.nestables[i] ==
                  "interaction" || d.result.list.nestables[i] == "goods" || d.result.list.nestables[i] ==
                  "introduce")) {
                continue;
              }

              /*        let obj = {
                         "id" : d.result.list.nestables[i],
                         "name" : d.result.list.menu[d.result.list.nestables[i]].name,
                         ""
                      } */
              /*              console.log("AAAAAAA");
                            console.log(self.roomClassifyList); */
              d.result.list.menu[d.result.list.nestables[i]].id = d.result.list.nestables[i];
              self.roomClassifyList.push(d.result.list.menu[d.result.list.nestables[i]]);
              //self.$set(self.message.roomClassifyList,d.result.list.nestables[i].id, d.result.list.nestables[i]);

              //self.$set(self.message.commentList,d.result.list.nestables[i].id, d.result.list.nestables[i]);
            }
            console.log(111111111);
            console.log(self.roomClassifyList);

            setTimeout(function() {
              // alert( self.tablock);
              self.tablock = true; //加载完毕后再显示
              self.$nextTick(() => {


                if (typeof self.$refs.commentListt != "undefined") {

                  self.$refs.commentListt[0].scrollTop = self.$refs.commentListt[0].scrollHeight;
                  //alert(self.$refs.commentListt[0].scrollTop);
                }

                if (typeof self.$refs.textLiveListt != "undefined") {
                  self.$refs.textLiveListt[0].scrollTop = self.$refs.textLiveListt[0].scrollHeight;
                }

              });
            }, 100);
            //console.log(self.message.roomClassifyList);

          },
          error: function() {
            console.log("错误");
          }
        });
        //this.answer = 'Waiting for you to stop typing...'
        //}

      },
      connectWs: function() {
        //alert(1);

        console.log(config);
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
      initheartbeat: function() {
        console.log('心跳启动');
        var self = this;

        clearTimeout(this.hearbeatTimeout);
        // clearTimeout(this.hearbeatTimeoutClose);

        this.hearbeatTimeout = setTimeout(function() {
          console.log(1);
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
      wsSend: function(type, obj) {
        //console.log(obj);

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
        obj.roomid = this.$route.params.id;
        obj.uniacid = this.$route.params.uniacid;
        obj.isqlgh = 0;

        //测试临时
        //console.log(this.modal.qlghuser);
        /*        this.modal.qlghuser.userPhone = '18606431903';
                this.modal.qlghuser.userName = '186xxxx1903'; */
        if (!obj.uid && this.modal.qlghuser.userPhone) {
          obj.uid = this.modal.qlghuser.userPhone;
          obj.nickname = this.modal.qlghuser.userName;
          obj.isqlgh = 1;
        } else {
          obj.uid = wsConfig.uid;
          obj.nickname = wsConfig.nickname;
        }
        console.log(obj.nickname);
        /*          if (!$.isEmptyObject(modal.msgAt)) {
                      obj.at = modal.msgAt;
                      obj = modal.handleAtText(obj)
                  } */
        console.log(111);
        this.wsClient.send(JSON.stringify(obj));
        return true;
      },
      wsMessage: function() {
        var self = this;
        this.wsClient.onmessage = function(evt) {
          var data = JSON.parse(evt.data);
          console.log(data.type);
          if (data.type == 'connected') {
            self.$toast('连接成功');

            /*        if(modal.wsConfig.uid || modal.qlghuser.userPhone){
                      $('.block-input .input-place').html('').hide().siblings().show();
                    } */
            self.modal.wsConnected = true;
            //阻止发言状态
            self.modal.wsBanned = data.banned;
            if (data.banned.all == 1) {
              data.text = "管理员禁止任何人发言";
              self.liveMsg('notice', data)
            } else if (data.banned.self != '') {
              data.text = "你被管理员禁止发言";
              self.liveMsg('notice', data)
            }
            self.live.status = data.settings.status;

            self.live.showOnline = data.settings.virtual || 0;
            self.live.realOnline = data.online || 0;
            console.log(self.roomClassifyList[0].id);
            if (data.settings.showtlive == 1 && self.roomClassifyList[0].id != 0) {

              self.roomClassifyList.unshift({
                "id": 0,
                "name": "图文直播",
                type: 0
              });
              self.aselected = 0;

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
          } else if (data.type == 'notice') {
            self.liveMsg('notice', data)

          } else if (data.type == 'ping') {
            console.log("jieping");
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
      liveMsg: function(type, obj) {
        var atText = '',
          fullscreen = '';
        var self = this;
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

          /*            if(){

                      } */
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
          console.log(this.$refs);
          // console.log(this.$refs.commentListt[0].scrollHeight);
          if (typeof this.$refs.commentListt != "undefined") {

            this.$refs.commentListt[0].scrollTop = this.$refs.commentListt[0].scrollHeight;
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
      textliveMsg: function(type, obj) {
        var atText = '',
          fullscreen = '';
        var self = this;
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
                console.log(self.live);
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

          /*            if(){

                      } */
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
        console.log(type);
        if (type == 'repeal') {
          this.$delete(this.message.textLiveList, obj.msgid);
        } else {
          this.$set(this.message.textLiveList, obj.msgid, obj);
        }

        this.$nextTick(() => {
          console.log(this.$refs);
          if (typeof this.$refs.textLiveListt != "undefined") {
            this.$refs.textLiveListt[0].scrollTop = this.$refs.textLiveListt[0].scrollHeight;
          }

        });
        console.log(this.message.textLiveList);



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

      tomedia: function(src) {
        // console.log("img");
        if (typeof src != 'string') {
          return ''
        }
        if (src.indexOf('http://') == 0 || src.indexOf('https://') == 0 || src.indexOf('../addons/ewei_shopv2/') == 0) {
          return src
        } else if (src.indexOf('images/') == 0 || src.indexOf('audios/') == 0) {
          return this.modal.wsConfig.attachurl + src
        }
      },
      handleImgsClick: function(src) {
        console.log(src);
        ImagePreview({
          images: [
            src
          ],
         // startPosition: 1,
          closeOnPopstate: true,
          showIndex: false,
          onClose() {
            // do something
          }
        })
      },
      initQlgh: function() {
        //var user = {};
        //alert(labor);
        //console.log(labor);
        var self = this;
        labor.getUserInfo(function(userInfo) { //获取用户登录信息先不跳转
          self.modal.qlghuser = userInfo;
          console.log(userInfo);
          //labor.openLogin();

          //console.log(userInfo);
          //alert(JSON.stringify(user));
        });
        //console.log(userInfo);
        //console.log(1111);
        /* 			setTimeout(function(){
            console.log(modal.qlghuser);

          },5000); */
        labor.getLaborStatus(function(status) {
          self.modal.qlghuser.laborStatus = status.laborStatus;
          //alert(JSON.stringify(user));
        });
        //console.log(222);
        //console.log(modal.qlghuser);
        if (self.modal.qlghuser.error) {
          self.modal.qlghuser = {};
        }
        //modal.qlghuser = user;
        /*
            setTimeout(function(){
              console.log(modal.qlghuser);

            },5000); */
        //alert(modal.qlghuser);
        /* modal.qlghuser.userPhone = '18606431903';
        modal.qlghuser.userName = '什么？'; */

      },
      isWeiXin: function() {
          var ua = window.navigator.userAgent.toLowerCase();
          if (ua.match(/MicroMessenger/i) == 'micromessenger') {
              return true; // 是微信端
          } else {
              return false;
          }
      }
      /*      initOnline : function () {
                var online = parseInt(this.live.realOnline) + parseInt(this.live.showOnline);
                if (online > 10000) {
                    online = (online / 10000).toFixed(2);
                    online += '万'
                }
                this.live.showOnline = online;
                //$('#online').text(online)
            }, */

    },
      beforeRouteLeave (to, from, next) {
        //alert(1);//分享问题需要修改微信分享的link参数，不能带有跳转后的get参数
        if(this.$refs.VueAliplayerV2){
          this.$refs.VueAliplayerV2.dispose();
          this.aliplayerOptions.source = "";
        }

        console.log( window.location.host);
        //this.aliplayerOptions.source = "";
        console.log(2222222222);
        console.log(this.aliplayerOptions);

        next();
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
      }

  }
</script>
<style>
  .username {
    color: #118cff;
  }

  .comment {
    padding-left: 4%;
    padding-right: 4%;
    background-color: #fff;
    padding-top: 1%;
    padding-bottom: 1%;
    margin-bottom: 1%;

  }

  .comment .commentImg img {
    /* width: 60%; */
    width: 100%;
  }

  .comment p {
    word-wrap: break-word;
    word-break: break-all;
    font-size: 0.35rem;
  }

  .liveroom-tab-container {
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    /* background-color: #fff; */
    position: absolute;
    height: 100%;
    /*    height: 9.5rem;

    overflow-y: auto; */
    width: 100%;
    padding-bottom: 26%;
  }

  .liveroom-tab-container .mint-tab-container-wrap {
    height: 100%;
  }

  .liveroom-tab-container-item {
    overflow-y: auto;


  }

  .notice {
    color: #ef4f4f;
  }

  .liveStatus {
    position: absolute;
    width: 100%;
    background-color: #000;
    color: #fff;
    top: 0;
    height: 100%;
    z-index: 3;
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
    font-size: 0.4rem;
  }

  .live-status-sur {
    padding-top: .5rem;
  }

  .liveStatus .liveStatus-time {
    color: #118cff;
  }

  #videoBox {
    position: relative;
    height: 216px;


  }

  .aliPlayer {
    z-index: 1;
  }

  .onlineNum {
    position: absolute;
    top: 3%;
    right: 4%;
    color: #fff;
    z-index: 2;
    font-size: 0.34rem;
  }

  .repeal {
    background: #bfbdbd;
    text-align: center;
    color: #fff;
    margin: 0;
    padding: 1% 0;
  }


  .liveTitle {
    position: absolute;
    font-size: 0.34rem;
    top: 3%;
    left: 4%;
    color: #fff;
    z-index: 2;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 3px;
    max-width: 34%;
    padding: 1%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .mt-cell-liveName .mint-cell-value {
    width: 100%;
  }

  .describe-i {
    width: 4px;
    height: 14px;
    background-color: #3482fe;
    margin-right: 2%;
  }

  /*  .fixed-tab {
    padding-top: 13%;
  } */

  .fixed-tab-top {
    position: fixed;
    top: 5.76rem;
    right: 0;
    left: 0;
    z-index: 99;
  }

  .van-tabs-block {
    overflow: hidden;
  }

  .introducesub {
    color: #000;
    line-height: 26px;
    font-size: 16px;
  }

  .face {
    width: 8%;
  }

  .commentText {
    line-height: 0.6rem;
  }

  .playback {
    font-weight: bold;
    color: #fff;
  }

  /*  .comment-zi img{
    width: auto;
  } */
</style>
