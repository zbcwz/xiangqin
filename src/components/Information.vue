<template>
  <div id="Information">
    <van-nav-bar class="information-van-nav-bar" left-arrow @click-left="onClickLeft" />
    <p class="information-title">{{activityData.title}}</p>
    <div class="information-author"><span class="information-author-name">{{activityData.anchor ? activityData.anchor : '匿名'}}</span>{{activityData.createtime}}</div>
    <div :class="['information-content',{'information-content-actioning':isactioning}]" v-html="activityData.content">
    </div>
    <ButtonPurple @click.native="showPopua()" v-if="isactioning && pageloaded && c_errEnv && (c_userInfo && c_userInfo.yingcang == 1 && c_userInfo.isshow == 1)" class="information-button" :title="active.button.name" :disabled="active.button.disabled" />
    <van-popup v-model="popupShow" closeable :close-on-click-overlay="false" round position="bottom" :style="{ height: '80%', 'padding-top': '8%' }">
      <van-loading v-if="activityFieldData.length <= 0" type="spinner" :style="{ 'text-align': 'center'}" size="30px"/>
      <van-form v-else  @submit="onSubmit">
        <template v-for="(v,k) in activityFieldData">

          <van-field
            :key="k"
            v-if="v.type == 'text'"
            v-model="activityFieldData[k].mvalue"
            :name="v.refid +'_' + v.title"
            :label="v.title"
            :placeholder="'请填写'+v.title"
            :rules="[{ required: v.essential == 1 ? true : false, message: '请填写'+v.title }]"
          />

          <van-field
            :key="k"
            v-else-if="v.type == 'number'"
            v-model="activityFieldData[k].mvalue"
            :name="v.refid +'_' + v.title"
            :label="v.title"
            type="number"
            :placeholder="'请填写'+v.title"
            :rules="[{ required: v.essential == 1 ? true : false, message: '请填写'+v.title }]"
          />

 <!--         <van-field
            v-else-if="v.type == 'checkbox'"
            v-model="activityFieldData[k].value"
            :name="v.title"
            :label="v.title"
            type="number"
            :placeholder="'请填写'+v.title"
            :rules="[{ required: v.essential == 1 ? true : false, message: '请填写'+v.title }]"
          /> -->

<!-- 复选框验证必填 -->
          <van-field v-else-if="v.type == 'checkbox'" :key="k" :name="v.refid +'_' + v.title" :label="v.title"  :rules="[{ required: v.essential == 1 ? true : false, message: '请填写'+v.title }]">
            <template #input>
              <van-checkbox-group v-model="activityFieldData[k].mvalue" direction="horizontal">
                <van-checkbox v-for="(o,p) in v.options"  :key="p" :name="o" shape="square">{{o}}</van-checkbox>

              </van-checkbox-group>
            </template>
          </van-field>

          <van-field v-else-if="v.type == 'radio'" :name="v.refid +'_' + v.title" :label="v.title">
            <template #input>
              <van-radio-group v-model="activityFieldData[k].mvalue" direction="horizontal">
                <van-radio v-for="(o,p) in v.options"  :key="p"  :name="o">{{o}}</van-radio>
              </van-radio-group>
            </template>
          </van-field>

          <template v-else-if="v.type == 'select'">
            <van-field

              readonly
              clickable
              :name="v.refid +'_' + v.title"
              :value="activityFieldData[k].mvalue"
              :label="v.title"
              :placeholder="'点击选择'+v.title"
              @click="activityFieldData[k].showPicker = true;"
            >

            </van-field>
              <van-popup   v-model="activityFieldData[k].showPicker" position="bottom">
                <van-picker
                  show-toolbar
                  :columns="v.options"
                  @confirm="v.onConfirm"
                  @cancel="activityFieldData[k].showPicker = false"
                />
              </van-popup>
          </template>
          <template v-else-if="v.type == 'calendar'">
            <van-field
              readonly
              clickable
              :name="v.refid +'_' + v.title"
              :value="activityFieldData[k].mvalue"
              label="时间选择"
              placeholder="点击选择时间"
              @click="activityFieldData[k].showPicker = true"
            />
            <van-popup v-model="activityFieldData[k].showPicker" position="bottom">
              <van-datetime-picker
                type="date"
                title="选择年月日"

                @confirm="v.onConfirm"
                @cancel="activityFieldData[k].showPicker = false"
              />
            </van-popup>
          </template>

        </template>
        <ButtonPurple :disabled="active.popupButton.disabled"  class="attend-button" title="提交报名" />
      </van-form>

    </van-popup>

  </div>
</template>

<script>

  import {
    Dialog
  } from 'vant';
  import ButtonPurple from './template/ButtonPurple.vue';
  export default { //
    props: ['uniacid', 'id', 'type'],
    components: {
      ButtonPurple
    },
    //name: 'LiveRoomBottom',
    data: () => {
      return {
        cid: 0,
        oldid: null,
        pagetype: "information",
        pageloaded: false,
        activityData: {},
        activityFieldData: [],
        isactioning: false,
        popupShow: false,
        test: false,
        showpupuabolan: false,
        active: {
          button: {
            name: "立即报名",
            disabled: false,
          },
          popupButton: {
            disabled: false,
          }
        },

      }
    },
    created() {
      //alert(1);
/*      this.pagetype = this.$route.params.type;
      console.log(this.pagetype == 'actioning' && (this.$store.state.userInfo || this.$store.state.weixinPage));
      console.log(this.$store.state.weixinPage);
      if (this.pagetype == 'actioning' && (this.$store.state.userInfo || this.$store.state.weixinPage)) {
        this.isactioning = true;
      }

      if(this.pagetype != 'actioning'){
        this.cid = 1;
      }
      this.pageInit(); */
    },
    activated(){



      if(!this.oldid || this.id != this.oldid || this.$route.params.type != this.pagetype){
        // 自定义加载图标
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          loadingType: 'spinner',
          duration: 0
        });

        let self = this;
/*        setTimeout(function(){
          alert(self.$store.state.qlghUser.userPhone);
        },5000); */

        this.isactioning = false;
        this.cid = 0;
        this.pageloaded = false;
        this.oldid = this.id;
        this.pagetype = this.$route.params.type;
        this.active.button.name = '立即报名';
        this.active.button.disabled = false;
   /*     console.log(this.pagetype == 'actioning' && (this.$store.state.userInfo || this.$store.state.weixinPage));
        console.log(this.$store.state.weixinPage); */
        //alert( this.$store.state.userInfo);
        if (this.pagetype == 'actioning' && (this.$store.state.userInfo || this.$store.state.weixinPage)) {
          this.isactioning = true;
        }

        if(this.pagetype != 'actioning'){
          this.cid = 1;
        }
        this.pageInit();
      }

      if(this.pagetype == 'actioning'){
        let timestamp=new Date().getTime();
        this.active.button.name = '立即报名';
        this.active.button.disabled = false;


        if(this.activityData.starttime && this.activityData.endtime){

          if(timestamp < (this.activityData.starttime * 1000)){
            this.active.button.name = '未开始';
            this.active.button.disabled = true;
          }else if(timestamp > (this.activityData.endtime* 1000)){

            this.active.button.name = '已结束';
            this.active.button.disabled = true;
          }

          if(this.activityData.status == 2){
            this.active.button.name = '已报名';
            this.active.button.disabled = true;
          }
        }

      }
    },

    computed: {
      c_errEnv(){
        return this.$store.state.errEnv;
      },
      c_userInfo(){
        return this.$store.state.userInfo;
      }
    },

    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      pageInit() {
        var self = this;
        let timestamp=new Date().getTime();
        //let timestamp = 1501449600 * 1000;
        //
        //alert(this.$store.state.userInfo.id);
        this.axios({
            // headers: {'Content-Type': 'multipart/form-data'},
            headers:{
              //'Content-Type': 'multipart/form-data'
              'X-Requested-With': 'XMLHttpRequest'
            },
            //withCredentials:true,
            method: 'get',
            url: "/app/index.php?i=" + this.pageconfig.uniacid + "&c=entry&do=huodongcontent&m=meepo_weixiangqin",
            //data: values
            //data: this.qs.stringify(values)
            params: {
              uniacid: this.$route.params.uniacid,
              id: this.id,
              uid: this.$store.state.userInfo ? this.$store.state.userInfo.id : "",
              //mobile: this.$store.state.qlghUser.userPhone,
              cid: this.cid
            },
          })
          .then(function(response) {
            //console.log(response.data);
            self.$toast.clear();
            let d = response.data;
            //console.log(d.data);
            if (d.data) {
              self.activityData = d.data;
              self.activityData.status = d.status;

              var wxConfig = {
                title: self.activityData.title, // 分享标题
                desc: '爱在日照',
                link: '', // 分享链接
                imgUrl: '', // 分享图标
                success: function() {
                  // 用户确认分享后执行的回调函数
                },
                cancel: function() {
                  // 用户取消分享后执行的回调函数textliverecords
                }
              };
              console.log(wxConfig);
              self.$store.commit({
                type: 'updateShareDetail',
                obj: wxConfig,
              });

              self.activityData.createtime = self.$moment(Number(self.activityData.createtime) * 1000).fromNow();
              console.log(self.activityData);
 /* alert(timestamp < (d.data.starttime * 1000));
alert(timestamp > (d.data.endtime* 1000)); */
              if(timestamp < (d.data.starttime * 1000)){
                self.active.button.name = '未开始';
                self.active.button.disabled = true;
              }else if(timestamp > (d.data.endtime* 1000)){

                self.active.button.name = '已结束';
                self.active.button.disabled = true;
              }

              if(d.status == 2){
                self.active.button.name = '已报名';
                self.active.button.disabled = true;
              }
            } else {
              Dialog.alert({
                message: d.info,
              }).then(() => {
                // on close
              });
            }
            self.pageloaded = true;
            //console.log(self.classList);
          })
          .catch(function(error) {
            console.log(error);
          });


      },
      getField() {
        var self = this;
        //

        this.axios({
            // headers: {'Content-Type': 'multipart/form-data'},
            headers:{

                     //'Content-Type': 'multipart/form-data'
              'X-Requested-With': 'XMLHttpRequest'
            },
            //withCredentials:true,
            method: 'get',
            url: "/app/index.php?i=" + this.pageconfig.uniacid + "&c=entry&do=research&m=meepo_weixiangqin",
            //data: values
            //data: this.qs.stringify(values)
            params: {
              uniacid: this.$route.params.uniacid,
              id: this.id,
              uid: this.$store.state.userInfo.id
            },
          })
          .then(function(response) {
            console.log(response.data);
            let d = response.data;

            if (d.status == 1){


              if (d.list) {

                let listlength = d.list.length;
                console.log(self.activityFieldData);
                for(let i = 0;i<listlength;i++){
                  if(d.list[i].type == 'select' || d.list[i].type == 'calendar'){
                    d.list[i].showPicker = false;
                    d.list[i].mvalue = "";
                    if(d.list[i].type == 'calendar'){
                      d.list[i].onConfirm = function(value){
                        d.list[i].showPicker = false;
                        d.list[i].mvalue = self.$moment(value).format('YYYY-MM-DD');
                      };
                    }else{
                      d.list[i].onConfirm = function(value){
                        d.list[i].showPicker = false;
                        d.list[i].mvalue = value;
                      };
                    }

                  }
                }

                self.activityFieldData = d.list;
              } else {
                Dialog.alert({
                  message: "数据错误",
                }).then(() => {
                  // on close
                   self.popupShow = false;
                });
              }
            }else{
              Dialog.alert({
                message: d.info,
              }).then(() => {
                // on close
                self.popupShow = false;
              });
            }
            //console.log(self.classList);
          })
          .catch(function(error) {
            console.log(error);
          });

      },
      showPopua(){
        let qlghstatus = this.$commonfunc.qlgh.verifyuserinfo(this.$store.state.qlghUser);
        if(!qlghstatus.status && qlghstatus.content != ""){
          this.$toast(qlghstatus.content);
          return false;
        }

        this.getField();
        this.popupShow = true;
      },
      onSubmit(values){
        let qlghstatus = this.$commonfunc.qlgh.verifyuserinfo(this.$store.state.qlghUser);
        if(!qlghstatus.status && qlghstatus.content != ""){
          this.$toast(qlghstatus.content);
          return false;
        }

        let self = this;

        let formdata = new FormData();
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0,
        });

        self.active.popupButton.disabled = true;

        Object.keys(values).forEach((key) => {

          formdata.append("field_"+key, values[key]);
          console.log(formdata);
        });

        formdata.append('id',this.id);
        formdata.append('uid',this.$store.state.userInfo.id);
        formdata.append('submit',1);
       /* for(){
          formdata.append("name",values.name);
        }
 */

        this.axios({
          headers: {'Content-Type': 'multipart/form-data','X-Requested-With': 'XMLHttpRequest'},
          /*          headers:{/app/index.php?i=" + this.pageconfig.uniacid + "&c=entry&do=research&m=meepo_weixiangqin

                   'Content-Type': 'multipart/form-data'
                 }, */
          //withCredentials:true,
          method: 'post',
          url: "/app/index.php?i=" + this.pageconfig.uniacid + "&c=entry&do=research&m=meepo_weixiangqin",
          //data: values
          //data: this.qs.stringify(values)
          data: formdata,
        })
        .then(function(response) {
          console.log(response.data);
          self.$toast.clear();
          let d = response.data;

          if (d.status == 1) {
            Dialog.alert({
              message: d.info,
            }).then(() => {
              self.popupShow = false;
              self.active.button.name = '已报名';
              self.active.button.disabled = true;

              // on close
            });

          } else {
            Dialog.alert({
              message: d.info,
            }).then(() => {
              // on close
              self.active.popupButton.disabled = false;
            });
          }
          //console.log(self.classList);
        })
        .catch(function(error) {
          self.$toast.clear();
          console.log(error);
          self.active.popupButton.disabled = false;
          Dialog.alert({
            message: '网络错误',
          }).then(() => {
            // on close
            active.popupButton.disabled = false;
          });
        });

      },
      onConfirm(value){
        console.log(this);

        /* this.activityFieldData[key].showPicker = false;
        this.activityFieldData[key].value = 1; */
      }
    }
  }
</script>

<style>
  .information-van-nav-bar {
    height: 46px;
  }

  .information-title {
    color: #2a2a2a;
    font-size: 20px;
    line-height: 29px;
    padding: 0 15px;
    margin-top: 16px;
    margin-bottom: 16px;
  }

  .information-author {
    font-size: 13px;
    line-height: 13px;
    padding: 0 15px;
    color: #c6c6c6;
    margin-bottom: 5px;
  }

  .information-author .information-author-name {
    color: #082560;
    margin-right: 8px;
  }

  .information-content {
    padding: 0 14px 2% 14px;
    font-size: 14px;
    color: #666;
    overflow: hidden;

  }

  .information-content-actioning {
    padding: 0 14px 30% 14px;
  }

  .information-button {
    position: fixed;
    bottom: 51px;
    margin: 0 auto;
    left: 0;
    right: 0;
  }

  .information-content img {
      width: 100%;
  }
</style>
