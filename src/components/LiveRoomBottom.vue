<template>
  <div class="liveRoomBottom">

    <!-- <van-cell-group> -->
      <van-field
        v-model="commentValue"
        center
        clearable
        :disabled="wsConnected == false"
        :placeholder="commentPlaceholder"

      >

        <van-button v-if="wsConnected" slot="button" size="small"  @click="sendMessage()" type="primary">发送</van-button>
        <van-button v-else slot="button" size="small" :loading="socketLoading"  @click="connectSocket()" type="primary">点我重连</van-button>
      </van-field>
    <!-- </van-cell-group> -->

<!--    <mt-field  placeholder="跟大家说点什么吧" v-model="commentValue"></mt-field>
    <mt-button class="liveRoomBottom-button" type="primary" @click="sendMessage()" size="small" >发送</mt-button> -->

  </div>
</template>

<script>
  import labor from 'labor';
  export default{
    props: ["socketLoading","wsConnected"],
    name: 'LiveRoomBottom',
    data: ()=>{
      return {
        //username: "",
        commentValue: "",
        //socketLoading: false

      }
    },
    computed: {
      commentPlaceholder: function(){
        if(this.wsConnected){

          return "跟大家说点什么吧";
        }else if(!this.wsConnected && !this.socketLoading){
          this.commentValue = "";
          return "连接断开";
        }else if(!this.wsConnected && this.socketLoading){
          this.commentValue = "";
          return "连接中...";
        }
      }
    },
    methods: {
      sendMessage: function(){

        if(this.$parent.modal.qlghuser.userPhone == -1 || this.$parent.modal.qlghuser.userId == -1 ){
        	labor.openLogin();
        	return false;
        }

        //this.$parent.modal.wsConnected

        if(!this.$parent.modal.wsConfig.uid && !this.$parent.modal.qlghuser.userPhone ){
          this.$toast('游客不能发言');
          return false;
        }

        if(this.commentValue){
          console.log('11');
          //consoel.log(value);
          var msg = this.$parent.wsSend('text', {toUser: 'all', text: this.commentValue});

          //this.$parent.aselected = 1;
          console.log(msg);
          if (msg) {
            this.commentValue = ""; 
/*              $(this).removeClass('active');
              $("#input").val('');
              modal.msgAt = {} */
          }
          //$('.fui-content').removeClass('show-emoji')
        }else{

          this.$toast('内容不能为空');

        }
      },
      connectSocket:function(){
        var self = this;

       // this.socketLoading = true;

        if(this.$parent.wsClient.readyState == 3){

          this.$parent.connectWs();
        }

/*        setTimeout(function(){
          self.socketLoading = false;
        },2000); */
      }
    }
  }
</script>

<style>
  /* http://weixin.zb12351.com/addons/ewei_shopv2/plugin/live/static/images/icon-like.png */
  .liveRoomBottom-input{
    vertical-align: middle;
    display: inline-block;
  }

  .liveRoomBottom-button{
    vertical-align: middle;
    display: inline-block;
    margin-left: 4%;
  }

  .liveRoomBottom{
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #f7f7f7;
    border-top: 1px solid #d2d2d2;

  }
</style>
