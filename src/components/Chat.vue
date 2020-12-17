<template>
  <div id="Chat">
    <van-nav-bar
      title="消息"
      :border="true"
      class="chat-van-nav-bar"
    />
    <van-list v-if="stateuserInfo " v-model="classList[0].loadingMoreStatus" :finished="classList[0].finished" :error.sync="classList[0].error"
          finished-text="没有更多了" error-text="请求失败，点击重新加载" @load="loadMore">

      <!-- <mt-loadmore  :bottom-method="loadBottom"  :bottom-all-loaded="false" :distance-index="10"  ref="homepage"> -->
      <!-- <LiveList v-for="(n ,index) in listValue[0]" :listvalues="n" title="aa" :key="index"></LiveList> -->
      <router-link  v-for="(v,k) in chatList[0]" v-if="v.id != $store.state.userInfo.id && c_errEnv" :to='{name:"chatinformation", params: { uniacid: pageconfig.uniacid,yuid: v.id,name: v.realname,avator: v.avatar }}' :key="k">
      <!-- <router-link v-for="(n ,index) in listValue[0]" :key="index" :to='{name:"chatinformation", params: { uniacid: pageconfig.uniacid,id: n.id }}'> -->
        <van-card desc="24岁|170cm|威亚发动机公司" title="赵女士" :thumb="v.avatar"
          class="chat-van-card">

          <template #title>
            <span class="chat-van-card-name">{{v.realname}}</span>
          </template>
          <template #desc>
            <span class="chat-van-card-middle-desc van-ellipsis">{{v.content}}</span>
            <span class="chat-van-card-dialog-time">{{$moment(Number(v.stime) * 1000).fromNow()}}</span>
            <span v-show="v.unreadnum > 0" class="van-info chat-van-card-dialog-news">{{subUnReadNum(v.unreadnum)}}</span>
          </template>
        </van-card>
      </router-link>
      <!-- <van-divider style="margin:0" /> -->
<!--      <van-card desc="24岁|170cm|威亚发动机公司" title="赵女士" thumb="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=263892426,1852339974&fm=26&gp=0.jpg"
        class="chat-van-card">

        <template #title>
          <span class="chat-van-card-name">酸豆角燃面</span>
        </template>
        <template #desc>
          <span class="chat-van-card-middle-desc">Hi，我觉得你的独白写的蛮好的，...</span>
          <span class="chat-van-card-dialog-time">刚刚</span>
          <span class="van-info chat-van-card-dialog-news">1</span>
        </template>
      </van-card> -->


    </van-list>
    <van-empty v-else  description="没有内容~" />
  </div>
</template>

<script>
  import {
    Dialog
  } from 'vant';
  export default {
    components: {
      //ButtonPurple
    },

    data() {
      return {
        //chatList: [],
        tbl: [],
        selected: "0",
        showEmpty: false,
        //chatList: [],
        classList: {
          0: {
            id: 0,
            page: 1,
            loadingMoreStatus: false,
            finished: false, //全部加载完成,还没有做
            error: false,
            title: "正在进行"
          }
        },
      }
    },
    computed: {


      stateuserInfo: function() {

        return this.$store.state.userInfo;
        // return date.toJSON().substr(0, 19).replace('T', ' ');
      },
      chatList(){
        //alert(11);
        //console.log(this.$store.state.chatList);
        //return [];
/*        if(this.$store.state.chatUnreadList){

        } */
        //let key = Object.keys(this.$store.state.chatUnreadList);
        //console.log(key);
/*        if(!this.$store.state.chatList[this.selected]){
          this.showEmpty = true;
        }else{
          //alert(1);
          this.showEmpty = false;
        } */

        return this.$store.state.chatList;

      },
      chatListStatus(){
        //alert(11);
        //console.log(this.$store.state.chatList);
        //return [];
/*        if(this.$store.state.chatUnreadList){

        } */
        //let key = Object.keys(this.$store.state.chatUnreadList);
        //console.log(key);
        if(!this.$store.state.chatList[this.selected]){
          return true;
        }else{
          alert(1);
          return false;
        }

        //return this.$store.state.chatList;

      },
      c_errEnv(){
        return this.$store.state.errEnv;
      },
    },
    watch:{
      '$store.state.chatUnreadList' : {


        handler: function() {
          //alert(1);
          this.pageInit();

        },
        //immediate: true,
        //deep: true
      },

    },
    activated(){
      this.pageInit();
    },

    methods: {
      pageInit() {
        //alert(1);
        if(this.$store.state.chatList[this.selected]){


          //console.log("under");
          if( !$.isEmptyObject(this.$store.state.chatUnreadList)){

            let newFieldArr = [];
            for(let i in this.$store.state.chatUnreadList){

              if(i.indexOf("_info") !== -1){
                //alert("Hi,Tara");
                continue;
              }
              let infokey = i + "_info";

              if(!this.$store.state.chatUnreadList[infokey]){
                continue;
              }

             // this.$store.state.chatUnreadList[infokey] = JSON.parse(this.$store.state.chatUnreadList[infokey] );
              if(this.$store.state.chatList[this.selected][i] != undefined){

                this.$store.commit({
                  type: 'updateChatListSub',
                  obj: {
                    'message' : this.$store.state.chatUnreadList[infokey].message,
                    'sendtime' : this.$store.state.chatUnreadList[infokey].sendtime,
                    'suid' : this.$store.state.chatUnreadList[infokey].suid,
                    'unreadnum' : this.$store.state.chatUnreadList[i],
                  },
                  selected: 0
                });

              }else{

                newFieldArr.push({
                  "avatar" : this.$store.state.chatUnreadList[infokey].userInfo.avator,
                  "content" : this.$store.state.chatUnreadList[infokey].userInfo.message,
                  "id" : this.$store.state.chatUnreadList[infokey].userInfo.uid,
                  "realname" : this.$store.state.chatUnreadList[infokey].userInfo.nickname,
                  "nickname" : "",
                  "stime" : this.$store.state.chatUnreadList[infokey].sendtime,
                  "unreadnum" : this.$store.state.chatUnreadList[i]
                });

              }

            }

            this.$store.commit({
              type: 'updateChatList',
              list: newFieldArr,
              selected: this.selected
            });


          }else{
            for(let i in this.$store.state.chatList[this.selected]){





             // this.$store.state.chatUnreadList[infokey] = JSON.parse(this.$store.state.chatUnreadList[infokey] );


                this.$store.commit({
                  type: 'updateChatListSub',
                  obj: {
                    'message' : this.$store.state.chatList[this.selected][i].content,
                    'sendtime' : this.$store.state.chatList[this.selected][i].stime,
                    'suid' : this.$store.state.chatList[this.selected][i].id,
                    'unreadnum' : 0,
                  },
                  selected: 0
                });



            }

          }
        }



      },
      loadMore() {

        var self = this;
        self.classList[self.selected].loadingMoreStatus = true;

        this.axios({
            // headers: {'Content-Type': 'multipart/form-data'},
            headers: {

              //'Content-Type': 'multipart/form-data',
              'X-Requested-With': 'XMLHttpRequest'
            },
            //withCredentials:true,
            method: 'get',
            url: "/app/index.php?i=" + this.pageconfig.uniacid + "&c=entry&do=mynews&m=meepo_weixiangqin",
            //data: values
            //data: this.qs.stringify(values)
            params: {
              //uid: this.$store.state.qlghUser.uid,
              uid: this.$store.state.userInfo.id,
              page: self.classList[self.selected].page,
            },
          })
          .then(function(response) {
            console.log(response.data);
            let d = response.data;
            self.classList[self.selected].loadingMoreStatus = false;
            self.classList[self.selected].page++;

            //self.classList[self.selected].finished = true;//临时增加防止死循环

            if (response.data.total <= 0) { //后面已经没有了
              self.classList[self.selected].finished = true;
            }

            if(response.data.total <= 0 && self.classList[self.selected].page == 2){
              self.showEmpty = true;
            }

            if (d.status == 1) {
              //console.log(self.selected);
              //self.$store.commit('updateChatList',d.list,self.selected);
              self.$store.commit({
                type: 'updateChatList',
                list: d.list,
                selected: self.selected
              });
              if(self.classList[self.selected].page == 2){
                self.pageInit();
              }


            } else {
              console.log('ajax列表获取不到数据，这里需要给一个错误提示');
            }
            //console.log(self.activityList[self.selected]);

          })
          .catch(function(error) {
            console.log(error);
            //alert(1);
            self.classList[self.selected].error = true;
          });


        console.log(self.classList[self.selected]);

      },
      subUnReadNum(num) {
        if(num && num > 99){
          return 99 + "+";
        }else{
          return num;
        }
      },
/*      getUserInfo(){

      } */

    }
  }
</script>

<style>

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
  .chat-van-card .chat-van-card-dialog-news{
/*    display: inline-block;
    width: 10%;
    height: 10%; */
    position: absolute;
    right: 4%;
    top: 49%;

  }

  .chat-van-card:not(:first-child){
    margin-top: 0;
  }

  .chat-van-nav-bar{
    border-bottom: solid 1px #bcbcbc;
  }
</style>
