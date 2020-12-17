<template>
  <div>
    <img class="my-head-icon" :src="require('./imgs/my_head_icon.jpg')" alt="">
    <van-divider class="my-divider" />
    <van-cell-group :border="false" class="my-cell-group">
      <van-cell  v-if="userInfo && !quiteStatus && userInfo.yingcang != 2" :to="{ name:'myactivity',params:{uniacid: this.pageconfig.uniacid}}" :border="false" :clickable="true"
        class="my-cell">
        <template #title>
          <img class="my-cell-title-icon" :src="require('./imgs/rizhaoxiangqin/my-icon-1.jpg')" alt="">
          <span class="my-cell-title">我的活动</span>

        </template>
      </van-cell>
      <van-cell  v-if="userInfo && !quiteStatus && userInfo.yingcang != 2" :border="false" :clickable="true" class="my-cell" @click="showHelp = true">
        <template #title>
          <img class="my-cell-title-icon" :src="require('./imgs/rizhaoxiangqin/my-icon-2.jpg')" alt="">
          <span class="my-cell-title">帮助与反馈</span>

        </template>
      </van-cell>
      <van-cell :border="false" :clickable="true" class="my-cell" :to="{ name:'about',params:{uniacid: this.pageconfig.uniacid}}">
        <template #title>
          <img class="my-cell-title-icon" :src="require('./imgs/rizhaoxiangqin/my-icon-3.jpg')" alt="">
          <span class="my-cell-title">关于我们</span>

        </template>
      </van-cell>
    </van-cell-group>
    <ButtonPurple v-if="userInfo && !quiteStatus && userInfo.yingcang != 2" @click.native="quitActivity()" class="my-button" title="我要退出" :disabled="quitdisabled" />
    <van-popup class="helpPopup"  :close-on-popstate="true" :close-on-click-overlay="false" :closeable="true" :close-icon-position="'top-left'" position="left"
      v-model="showHelp">
      <van-form  @submit="onSubmit">
        <van-cell-group class="attend-cell-group" :border="false">


          <van-field  :disabled="helpFieldDisabled"  name="satisfy" :value="helpValue.satisfy" label="是否满意"
            placeholder="未选择" @click=" !helpFieldDisabled ? helpOption.satisfy.showPicker = true : ''" :border="true" :is-link="!helpFieldDisabled" input-align="left"
             :rules="[{ required: true, message: '请选择' }]" />
<!--          <van-field class="attend-cell-group-cell" :disabled="helpFieldDisabled"  name="name" v-model="helpValue.name" label="姓名"
           placeholder="未填写"  :border="false" :is-link="!helpFieldDisabled"  input-align="right"
           label-class="attend-cell-group-title" :rules="[{ required: true, message: '请填写姓名' }]" /> -->
          <van-field
            v-model="helpValue.message"
            rows="10"
            name="message"
            autosize
            label="留言"
            type="textarea"
            placeholder="请输入留言"
            maxlength="200"
            show-word-limit
            :rules="[{ required: true, message: '请输入留言' }]"
          />
        </van-cell-group>
        <ButtonPurple class="helpButton"  title="提交" :disabled="quitdisabled" />
      </van-form>

    </van-popup>
    <van-popup v-model="helpOption.satisfy.showPicker" position="bottom">
      <van-picker show-toolbar :columns="helpOption.satisfy.columns" @confirm="onSatisfyConfirm" @cancel="helpOption.satisfy.showPicker = false" />
    </van-popup>
  </div>
</template>

<script>
  import { Dialog } from 'vant';
  import ButtonPurple from './template/ButtonPurple.vue';
  export default {
    components: {
      ButtonPurple
    },
    data() {
      return {
        quitdisabled: false,
        quiteStatus: false,
        showHelp: false,
        helpFieldDisabled: false,
        helpValue: {
          satisfy: "",
          message: ""
        },
        helpOption: {
          satisfy: {
            showPicker: false,
            value: '',
            columns: ['是', '否'],
          }
        }
      }
    },
    computed: {
      userInfo() {

        this.quiteStatus = false;
        //console.log(this.userInfo );
        //console.log(!this.quiteStatus);
        //console.log(this.userInfo.yingcang != 2);
        //console.log(this.$store.state.userInfo);
        return this.$store.state.userInfo;
      }
    },
    methods: {
      quitActivity() {
       // if(this.$store.state.weixinPage){
/*          if(!){
            this.$toast(this.pageconfig.preventInfo);
            return false;
          } */
        //}else{
          let qlghstatus = this.$commonfunc.qlgh.verifyuserinfo(this.$store.state.qlghUser);
          if (!qlghstatus.status && qlghstatus.content &&  qlghstatus.content != "") {
            this.$toast(qlghstatus.content);
            return false;
          }
       // }


        let self = this;

        let formdata = new FormData();
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0,
        });

        self.quitdisabled = true;

 /*       Object.keys(values).forEach((key) => {

          formdata.append("field_" + key, values[key]);
          console.log(formdata);
        }); */

        //formdata.append('id', this.id);
        formdata.append('uid', this.$store.state.userInfo.id);
        //formdata.append('submit', 1);
        /* for(){
         formdata.append("name",values.name);
        }
        */

        this.axios({
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-Requested-With': 'XMLHttpRequest'
          },
          /*          headers:{/app/index.php?i=" + this.pageconfig.uniacid + "&c=entry&do=research&m=meepo_weixiangqin

                   'Content-Type': 'multipart/form-data'
                 }, */
          //withCredentials:true,
          method: 'post',
          url: "/app/index.php?i=" + this.pageconfig.uniacid + "&c=entry&do=quitActivity&m=meepo_weixiangqin",
          //data: values
          //data: this.qs.stringify(values)
          data: formdata,
        })
        .then(function(response) {
          console.log(response.data);
          self.$toast.clear();
          let d = response.data;
          console.log(d.status);
          console.log(111111111);
          if (d.status == 1) {
            self.quiteStatus = true;
            //self.active.button.name = '已报名';
            self.quitdisabled = true;
            self.$store.commit('updateUserHidden');
            console.log(self.$store.state);
            Dialog.alert({
              message: d.info,
            }).then(() => {

              // on close
            });

          } else {
            Dialog.alert({
              message: d.info,
            }).then(() => {
              // on close
              self.quitdisabled = false;
            });
          }
          //console.log(self.classList);
        })
        .catch(function(error) {
          self.$toast.clear();
          console.log(error);
          self.quitdisabled = false;
          Dialog.alert({
            message: '网络错误',
          }).then(() => {
            // on close
          });
        });
      },
      onSubmit(obj){
        //console.log(val);
        var self = this;

        this.helpFieldDisabled = true;
        //this.searchData =
        //return;
        $.ajax({
          url: "/app/index.php?i=" + this.pageconfig.uniacid + "&c=entry&do=userhelper&m=meepo_weixiangqin",
          type: "get",
          data: {
            uid: self.$store.state.userInfo.id,
            satisfy: obj.satisfy,
            message: obj.message,
          },
          dataType: "json",
          success: function(d) {
            self.helpFieldDisabled = false;
            let kname = "";
            for(kname in self.helpValue){
              self.helpValue[kname] = "";
            }

            self.showHelp = false;

            self.$toast("您的留言我们已经收到~");
          },
          error: function(e) {
            console.log(e);
            self.helpFieldDisabled = false;
            self.$toast("网络错误");

          }
        });
      },
      onSatisfyConfirm(value) {//性别选择器

        this.helpValue.satisfy = value;
        this.helpOption.satisfy.showPicker = false;
      },
    }
  }
</script>

<style>
  .my-head-icon {
    width: 100%;
    display: block;
    margin-bottom: 23px;
  }

  .my-cell {
    /* height: 59px; */
    line-height: 15px;
    font-size: 15px;
    padding: 22px 0 22px 19px;
  }

  .my-cell-group .my-cell-title {
    color: #000000;
    font-size: 15px;
    line-height: 15px;
    display: inline-block;
    vertical-align: middle;

  }

  .my-cell-group .my-cell-title-icon {
    width: 21px;
    /* height: 18px; */
    vertical-align: middle;
    margin-right: 17px;
  }

  .my-cell-group {
    margin-top: 25px;
  }

  .my-button {
    margin: 0 auto;
    margin-top: 87px;
    margin-bottom: 10%;

  }

  .my-divider {
    width: 344px;
    margin: 0 auto;
  }

  .helpPopup{
    height: 78%;
    width: 100%;
    padding-top: 12%;
    background-color: #f7f8fa;

  }

  .helpButton{
    margin: 0 auto;
    margin-top: 4%;
  }
</style>
