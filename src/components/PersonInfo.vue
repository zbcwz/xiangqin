<template>
  <div id="personInfo">
    <!-- <van-image class="personInfo-head-img" :lazy-load="true" :src="require('./imgs/rizhaoxiangqin/test_personinfo.jpg')" /> -->
    <van-image class="personInfo-head-img" :lazy-load="true" :src="personinfo.avatar" />
    <div class="personInfo-middle">
      <div class="personInfo-middle-name">{{personinfo.realname}}</div>
      <div class="personInfo-middle-top-tag">
        <van-tag class="personInfo-middle-top-tag-sub" style="background-color: #b3b6f9;" type="primary">淄博</van-tag>
        <van-tag class="personInfo-middle-top-tag-sub" style="background-color: #ffb8c4;" type="primary">{{personinfo.age}}岁</van-tag>
      </div>
      <div class="personInfo-middle-information-title">
        个人资料
      </div>
      <van-divider class="my-divider" />
      <div class="personInfo-middle-information-tag">
        <van-tag class="personInfo-middle-information-tag-sub" round type="primary">{{personinfo.marriage}}</van-tag>
        <van-tag class="personInfo-middle-information-tag-sub" round type="primary">{{personinfo.age}}岁</van-tag>
        <van-tag class="personInfo-middle-information-tag-sub" round type="primary">狮子座(07.23-08.22)</van-tag>
        <van-tag class="personInfo-middle-information-tag-sub" round type="primary">{{personinfo.height}}cm</van-tag>
        <van-tag class="personInfo-middle-information-tag-sub" round type="primary">49kg</van-tag>
        <van-tag class="personInfo-middle-information-tag-sub" round type="primary">月收入：{{personinfo.salary}}</van-tag>
        <van-tag class="personInfo-middle-information-tag-sub" round type="primary">{{personinfo.education}}</van-tag>

      </div>
      <van-divider class="my-divider" />
      <div class="personInfo-middle-information-tag .personInfo-padding-top-20">
        <van-tag class="personInfo-middle-information-tag-sub personInfo-middle-information-tag-sub-pink" round type="primary">未婚</van-tag>
        <van-tag class="personInfo-middle-information-tag-sub personInfo-middle-information-tag-sub-pink" round type="primary">27岁</van-tag>
        <van-tag class="personInfo-middle-information-tag-sub personInfo-middle-information-tag-sub-pink" round type="primary">狮子座(07.23-08.22)</van-tag>
        <van-tag class="personInfo-middle-information-tag-sub personInfo-middle-information-tag-sub-pink" round type="primary">165cm</van-tag>
        <van-tag class="personInfo-middle-information-tag-sub personInfo-middle-information-tag-sub-pink" round type="primary">49kg</van-tag>


      </div>
    </div>
    <div v-if="c_errEnv && c_userInfo && this.$route.params.id != c_userInfo.id && (c_userInfo && c_userInfo.yingcang == 1 && c_userInfo.isshow == 1)" class="personInfo-bottom-h">
      <div class="personInfo-bottom">
        <van-button v-if="userInfoStatus" class="personInfo-bottom-van-button" type="primary" :to='{name:"chatinformation", params: { uniacid: pageconfig.uniacid,yuid: personinfo.id,name: personinfo.realname,avator: personinfo.avatar }}'>打招呼</van-button>
        <van-button v-else class="personInfo-bottom-van-button" type="primary" @click="$toast('报名后才能打招呼')">打招呼</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { Dialog } from 'vant';
  export default {
    components: {
      //ButtonPurplehttp://weixin.zb12351.com/app/index.php?i=3&c=entry&do=others&m=meepo_weixiangqin&openid=ouj_WsxKxy3dZFEfK0PpTAmkwmF3
    },

    data() {
      return {
        personinfo: {}
      }
    },
    created() {
      //console.log(this.$store.state.userInfo);
      //this.pageInit();
    },
    mounted(){
      console.log(2);
    },
    activated(){
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      });
      this.pageInit();
    },

    computed:{
      c_errEnv(){
        return this.$store.state.errEnv;
      },
      userInfoStatus(){
        if(this.$store.state.userInfo){
          return true;
        }
        return false;
      },
      c_userInfo(){
        return this.$store.state.userInfo;
      }
    },

    methods: {
      pageInit() {
        var self = this;
        //
        this.axios({
          // headers: {'Content-Type': 'multipart/form-data'},
          /*          headers:{

                      'Content-Type': 'multipart/form-data'
                    }, */
          //withCredentials:true,
          method: 'get',
          url: "/app/index.php?i=" + this.pageconfig.uniacid + "&c=entry&do=others&m=meepo_weixiangqin",
          //data: values
          //data: this.qs.stringify(values)
          params: {
            uniacid: this.$route.params.uniacid,
            userid: this.$route.params.id,
          },
        })
        .then(function(response) {
          self.$toast.clear();
          console.log(response.data);
          let d = response.data;
          if(d.status == 1){
            self.personinfo = d.personinfo
          }else{
            Dialog.alert({
              message: d.info,
            }).then(() => {
              // on close
            });
          }
          //console.log(self.classList);
        })
        .catch(function(error) {
          console.log(error);
        });
      }

    }
  }
</script>

<style>
  #personInfo {
    font-size: 0;
  }

  .personInfo-head-img {
    width: 100%;
    height: 298px;
  }

  .personInfo-middle {
    margin-top: -11px;
    padding-top: 24px;
    position: relative;
    z-index: 2;
    background: #fff;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }

  .personInfo-middle-name {
    font-size: 23px;
    color: #212121;
    font-weight: bold;
    margin: 0 17px 9px 17px;
    line-height: 23px;

  }

  .personInfo-middle-top-tag {
    margin: 0 17px 17px 17px;
    height: 17px;
    font-size: 0;
  }

  .personInfo-middle-top-tag-sub {
    width: 36px;
    height: 17px;
    margin-right: 5px;
    padding: 0;
    text-align: center;
    line-height: 17px;
    display: inline-block;
  }

  .personInfo-middle-information-title {
    border-left: solid 3px #a088fa;
    padding-left: 7px;
    font-size: 15px;
    color: #302b47;
    font-weight: bold;
    margin-left: 15px;
    line-height: 15px;
    height: 15px;
    margin-bottom: 13px;

  }

  .personInfo-middle-information-tag {
    padding: 11px 15px 10px 15px;
    font-size: 0;
  }

  .personInfo-middle-information-tag-sub {
    height: 27px;
    line-height: 27px;
    color: #4a494d;
    font-size: 13px;
    padding: 0 16px;
    margin: 0 5px 10px 5px;
    background-color: #f3f3ff;
    display: inline-block;
    text-align: center;
  }

  .personInfo-middle-information-tag-sub-pink {
    background-color: #fcf1f5;
  }

  .personInfo-padding-top-20 {
    padding-top: 20px;
  }

  .personInfo-bottom-h{
    height: 51px;
  }
  .personInfo-bottom {
    position: fixed;
    bottom: 0;
    height: 51px;
    width: 100%;
    text-align: center;
    font-size: 0;
    z-index: 3;
    background: #fff;

  }

  .personInfo-bottom .personInfo-bottom-van-button {
    height: 51px;
    line-height: 51px;
    color: #51505d;
    font-weight: bold;
    width: 113px;
    padding: 0;
    border: 0;
    border-top: solid 2px #f5f5f5;
    background-color: transparent;
  }
</style>
