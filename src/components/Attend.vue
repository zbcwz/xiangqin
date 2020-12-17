<template>

  <div>
    <img class="attend_top" :src="require('./imgs/attend_top.png')" alt="">
    <van-form  @submit="onSubmit">
      <van-field name="uploader"  :class="['attend-uploader-field',{'attend-uploader-field-disabled':fieldDisabled}]" :border="false" :rules="[{ required: true, message: '请上传照片' }]">
        <template #input>
          <van-uploader class="attend-uploader" :disabled="fieldDisabled" v-model="value.fileList" :max-count="1" :after-read="afterRead">
            <div class="attend-uploader-button">
              <img class="attend-uploader-button-icon" :src="require('./imgs/attend-uploader-icon.png')">
              <span class="attend-uploader-button-span">上传靓照</span>
            </div>
          </van-uploader>

        </template>
      </van-field>

      <van-cell-group class="attend-cell-group" :border="false">
        <!-- <van-cell class="attend-cell-group-cell" title="姓名" value="未选择" :border="false" title-class="attend-cell-group-title"
          value-class="attend-cell-group-value" is-link /> -->
        <van-field class="attend-cell-group-cell" :disabled="fieldDisabled"  name="name" v-model="value.name" label="姓名"
         placeholder="未填写"  :border="false" :is-link="!fieldDisabled"  input-align="right"
         label-class="attend-cell-group-title" :rules="[{ required: true, message: '请填写姓名' }]" />

        <van-field class="attend-cell-group-cell" :disabled="fieldDisabled" readonly clickable name="sex" :value="option.sex.value" label="性别"
          placeholder="未选择" @click=" !fieldDisabled ? option.sex.showPicker = true : ''" :border="false" :is-link="!fieldDisabled" input-align="right"
          label-class="attend-cell-group-title" :rules="[{ required: true, message: '请选择性别' }]" />

        <van-field class="attend-cell-group-cell" :disabled="fieldDisabled" readonly clickable name="age" :value="option.age.value" label="年龄"
          placeholder="未选择" @click="!fieldDisabled ? option.age.showPicker = true : ''" :border="false" :is-link="!fieldDisabled" input-align="right"
          label-class="attend-cell-group-title" :rules="[{ required: true, message: '请选择年龄' }]" />

        <van-field class="attend-cell-group-cell" :disabled="fieldDisabled" readonly clickable name="bodyheight" :value="option.bodyheight.value" label="身高"
          placeholder="未选择" @click="!fieldDisabled ? option.bodyheight.showPicker = true : ''" :border="false" :is-link="!fieldDisabled" input-align="right"
          label-class="attend-cell-group-title" :rules="[{ required: true, message: '请选择身高' }]" />

        <van-field class="attend-cell-group-cell" :disabled="fieldDisabled" readonly clickable name="education" :value="option.education.value" label="学历"
          placeholder="未选择" @click="!fieldDisabled ? option.education.showPicker = true : ''" :border="false" :is-link="!fieldDisabled" input-align="right"
          label-class="attend-cell-group-title" :rules="[{ required: true, message: '请选择学历' }]" />

        <van-field class="attend-cell-group-cell" :disabled="fieldDisabled" readonly clickable name="salary" :value="option.salary.value" label="月薪"
          placeholder="未选择" @click="!fieldDisabled ? option.salary.showPicker = true : ''" :border="false" :is-link="!fieldDisabled" input-align="right"
          label-class="attend-cell-group-title" :rules="[{ required: true, message: '请选择月薪' }]" />


        <van-field class="attend-cell-group-cell" :disabled="fieldDisabled" readonly clickable name="marriage" :value="option.marriage.value" label="婚史"
          placeholder="未选择" @click="!fieldDisabled ? option.marriage.showPicker = true : ''" :border="false" :is-link="!fieldDisabled" input-align="right"
          label-class="attend-cell-group-title" :rules="[{ required: true, message: '请选择婚史' }]" />



      </van-cell-group>
      <ButtonPurple v-if="c_errEnv" class="attend-button" :disabled="fieldDisabled" :title="submitButtonName" />
    </van-form>
    <!-- <van-button class="attend-button" :block="true" color="linear-gradient(to right, #ae61ff, #9157f9)">
      提交报名
    </van-button> -->


    <van-popup v-model="option.sex.showPicker" position="bottom">
      <van-picker show-toolbar :columns="option.sex.columns" @confirm="onSexConfirm" @cancel="option.sex.showPicker = false" />
    </van-popup>

    <van-popup v-model="option.age.showPicker" position="bottom">
      <van-picker show-toolbar :columns="option.age.columns" @confirm="onAgeConfirm" @cancel="option.age.showPicker = false" />
    </van-popup>

    <van-popup v-model="option.bodyheight.showPicker" position="bottom">
      <van-picker show-toolbar :columns="option.bodyheight.columns" @confirm="onBodyheightConfirm" @cancel="option.bodyheight.showPicker = false" />
    </van-popup>

    <van-popup v-model="option.education.showPicker" position="bottom">
      <van-picker show-toolbar :columns="option.education.columns" @confirm="onEducationConfirm" @cancel="option.education.showPicker = false" />
    </van-popup>

    <van-popup v-model="option.salary.showPicker" position="bottom">
      <van-picker show-toolbar :columns="option.salary.columns" @confirm="onSalaryConfirm" @cancel="option.salary.showPicker = false" />
    </van-popup>

    <van-popup v-model="option.marriage.showPicker" position="bottom">
      <van-picker show-toolbar :columns="option.marriage.columns" @confirm="onMarriageConfirm" @cancel="option.marriage.showPicker = false" />
    </van-popup>


  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import ButtonPurple from './template/ButtonPurple.vue';
  import { Dialog } from 'vant';
  export default {
    components: {
      ButtonPurple
    },
    data() {
      return {
        submitButtonName: "提交报名",
        fieldDisabled: false,
        option: {
          sex: {
            value: '',
            columns: ['男', '女'],
            showPicker: false,
          },
          age: {
            value: '',
            columns: ['25岁', '26岁'],
            showPicker: false,
          },
          bodyheight: {
            value: '',
            columns: ['180cm', '175cm','170cm'],
            showPicker: false,
          },
          education: {
            value: '',
            columns: ['中专', '大专'],
            showPicker: false,
          },
          salary: {
            value: '',
            columns: ['1千-2千', '5千-1万'],
            showPicker: false,
          },
          marriage: {
            value: '',
            columns: ['单身', '离异'],
            showPicker: false,
          },


        },
        value: {
          fileList: [
/*            {
              url: "http://rzweixin.zb12351.com/attachment/images/7/2020/09/T8bqmb2MOIqbBAPa2MMpw993bAW3IQ.png"
            } */
          ],
          name: "",
        }

      }
    },
    created(){
      let self = this;
     // setTimeout(function(){

      //},10000);
      if(this.$store.state.userInfo){
        this.fieldDisabled = this.$store.state.userInfo.yingcang == 2 ? false : true;
        this.value.name = this.$store.state.userInfo.realname;
        this.option.sex.value = this.$store.state.userInfo.gender;
        this.option.age.value = this.$store.state.userInfo.age;
        this.option.bodyheight.value = this.$store.state.userInfo.height;
        this.option.education.value = this.$store.state.userInfo.education;
        if(this.value.fileList.length == 0){
          this.value.fileList.push({'url':this.$store.state.userInfo.avatar,'path': this.$store.state.userInfo.avatarpath, 'isImage': true});
        }
        this.submitButtonName = this.$store.state.userInfo.yingcang == 2 ? "提交修改" : "已报名";


      }
console.log(this.value.fileList);
    },
    mounted(){

    },

    computed:{
      c_errEnv(){
        return this.$store.state.errEnv;
      },
     //mapState({
        // 为了能够使用 `this` 获取局部状态，必须使用常规函数
/*        userInfo : {
          get: function () {
            if(this.$store.state.userInfo){
              this.fieldDisabled = this.$store.state.userInfo.yingcang == 2 ? false : true;
              this.value.name = this.$store.state.userInfo.realname;
              this.option.sex.value = this.$store.state.userInfo.gender;
              this.option.age.value = this.$store.state.userInfo.age;
              this.option.bodyheight.value = this.$store.state.userInfo.height;
              this.option.education.value = this.$store.state.userInfo.education;
              this.value.fileList.push({'url':this.$store.state.userInfo.avatar});
              this.submitButtonName = this.$store.state.userInfo.yingcang == 2 ? "提交修改" : "已报名";
               console.log(this.value.fileList);
              return this.$store.state.userInfo.avatar;
            }
          },
        }, */
      //})
    },

    watch: {
      '$store.state.userInfo':{


        handler: function() {

          if(this.$store.state.userInfo){
            this.fieldDisabled = this.$store.state.userInfo.yingcang == 2 ? false : true;
            this.value.name = this.$store.state.userInfo.realname;
            this.option.sex.value = this.$store.state.userInfo.gender;
            this.option.age.value = this.$store.state.userInfo.age;
            this.option.bodyheight.value = this.$store.state.userInfo.height;
            this.option.education.value = this.$store.state.userInfo.education;
            if(this.value.fileList.length == 0){
              this.value.fileList.push({'url':this.$store.state.userInfo.avatar,'path': this.$store.state.userInfo.avatarpath, 'isImage': true});
            }
            this.submitButtonName = this.$store.state.userInfo.yingcang == 2 ? "提交修改" : "已报名";
          }
        },
        deep: true
      },
    },

/*      beforeRouteEnter (to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当守卫执行前，组件实例还没被创建
      }, */

    methods: {
      afterRead(file) {//头像上传
        // 此时可以自行将文件上传至服务器
        console.log(file);
      },
      onSubmit(values){//表单提交
        let self = this;
        let qlghstatus = this.$commonfunc.qlgh.verifyuserinfo(this.$store.state.qlghUser);
        console.log(qlghstatus);
        if(!qlghstatus.status && qlghstatus.content != ""){
          this.$toast(qlghstatus.content);
          return false;
        }
        console.log('submit', values);
/*        this.axios.post('/app/index.php?i=7&c=entry&do=register&m=meepo_weixiangqin', {
          values
        }) */
         this.$toast.loading({
          message: '提交中...',
          forbidClick: true,
          duration: 0
        });

        let formdata = new FormData();
        formdata.append("name",values.name);
        formdata.append("sex",values.sex);
        formdata.append("age",values.age);
        formdata.append("bodyheight",values.bodyheight);
        formdata.append("education",values.education);
        formdata.append("salary",values.salary);
        formdata.append("marriage",values.marriage);
        formdata.append("file",values.uploader[0].file ? values.uploader[0].file : values.uploader[0].path);
        formdata.append("mobile",this.$store.state.qlghUser.userPhone ? this.$store.state.qlghUser.userPhone : "");
/* console.log(formdata.get('mobile'));
return; */
        // 发送 POST 请求
        this.axios({
         // headers: {'Content-Type': 'multipart/form-data'},
          headers:{
            //'Authorization': Vue.ls.get(ACCESS_TOKEN), // 请求头携带的token
            'Content-Type': 'multipart/form-data',
            'X-Requested-With': 'XMLHttpRequest'
          },
          //withCredentials:true,
          method: 'post',
          url: "/app/index.php?i="+this.pageconfig.uniacid+"&c=entry&do=register&m=meepo_weixiangqin",
          //data: values
          //data: this.qs.stringify(values)
          data:formdata
        })
        .then(function (response) {
          console.log(response.data);

          self.$toast.clear();
          //console.log(self.$store.state);
          if(response.data.status == 1){
            self.$store.commit({
              type: 'setUserInfoMerge',
              userinfo: response.data.userinfo
            });

            if(self.$store.state.userInfo.yingcang == 2){
              self.$store.commit('updateUserHidden');
            }
          }
          Dialog.alert({
            message: response.data.info,
          }).then(() => {
            // on close
          });

        })
        .catch(function (error) {
          console.log(error);

          self.$toast.clear();

          Dialog.alert({
            message: '报名失败',
          }).then(() => {
            // on close
          });
        });




      },
      onSexConfirm(value) {//性别选择器
        this.option.sex.value = value;
        this.option.sex.showPicker = false;
      },
      onAgeConfirm(value) {//性别选择器str　
        this.option.age.value = value.replace("岁","");
        this.option.age.showPicker = false;
      },
      onBodyheightConfirm(value) {//性别选择器
        this.option.bodyheight.value = value.replace("cm","");
        this.option.bodyheight.showPicker = false;
      },
      onEducationConfirm(value) {//性别选择器
        this.option.education.value = value;
        this.option.education.showPicker = false;
      },
      onSalaryConfirm(value) {//性别选择器
        this.option.salary.value = value;
        this.option.salary.showPicker = false;
      },
      onMarriageConfirm(value) {//性别选择器
        this.option.marriage.value = value;
        this.option.marriage.showPicker = false;
      },

    }
  }
</script>

<style>
  .attend_top {
    width: 100%;
    /* height: ; */
    display: block;
  }

  .attend-uploader {
    margin: 0 auto;
    width: 94px;
    height: 94px;
    display: block;
    margin-top: 18px;
    margin-bottom: 18px;
    overflow: hidden;
    border-radius: 10px;
  }

  .attend-uploader-button {
    border: #bfbbbc solid 1px;
    width: 94px;
    height: 94px;
    border-radius: 10px;
    text-align: center;
  }

  .attend-uploader-button-icon {
    margin-top: 24px;
    width: 39px;
    height: 32px;
  }

  .attend-uploader-button-span {
    color: #bababa;
    font-size: 12px;
    line-height: 12px;
    display: block;
    width: 100%;
    text-align: center;
    font-weight: 600;
  }

  .attend-cell-group .attend-cell-group-title {
    color: #3b3c3d;
    font-size: 14px;
  }

  .attend-cell-group .attend-cell-group-cell {
    padding-left: 33px;
    padding-right: 31px;
    /* height: 42px; */
  }

  .attend-cell-group .attend-cell-group-value,
  .attend-cell-group-cell input::placeholder {
    font-size: 15px;
    color: #d8d8d8;
    line-height: 22px;
  }

  .attend-cell-group .van-cell__right-icon {
    color: #3f3d43;
    height: 22px;
    line-height: 22px;
  }

  .attend-button {
    width: 239px;
    height: 49px;
    margin: 0 auto;
    margin-bottom: 59px;
    margin-top: 20px;
    border-radius: 10px;
    font-size: 27px;
    color: #fff;
    font-weight: bold;
    -moz-box-shadow: 0 3px 4px 1px #804af8;
    -webkit-box-shadow: 0 3px 4px 1px #804af8;
    box-shadow: 0 3px 4px 1px #804af8;
  }

  /* 图片预览样式 */

  .attend-uploader .van-uploader__preview{
    margin: 0;
  }
  .attend-uploader .van-uploader__preview-image {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  .attend-uploader .van-uploader__preview-delete {
    border-top-right-radius: 10px;
  }

  .attend-uploader .van-uploader__preview{
    width: 100%;
  }

  .attend-uploader-field{
    padding:0;
  }

  .attend-uploader-field-disabled .van-uploader__wrapper--disabled{
    opacity: unset;
  }
  .attend-uploader-field-disabled .van-uploader__preview-delete{
    display: none;
  }
/*
  .attend-uploader-field-disabled .attend-cell-group .van-cell__right-icon{
    display: none;
  } */
</style>
