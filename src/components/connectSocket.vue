<template>
  <div class="liveRoomBottom">
    <van-button loading type="info" loading-text="加载中..." />
    <!-- <van-cell-group> -->
<!--      <van-field
        v-model="commentValue"
        center
        clearable

        placeholder="跟大家说点什么吧"

      > -->
        <van-button slot="button" size="small"  @click="sendMessage()" type="primary">发送</van-button>
      </van-field>
    <!-- </van-cell-group> -->

<!--    <mt-field  placeholder="跟大家说点什么吧" v-model="commentValue"></mt-field>
    <mt-button class="liveRoomBottom-button" type="primary" @click="sendMessage()" size="small" >发送</mt-button> -->

  </div>
</template>

<script>
  import labor from 'labor';
  export default{
    name: 'LiveRoomBottom',
    data: ()=>{
      return {
        //username: "",
        commentValue: "",
      }
    },
    methods: {
      sendMessage: function(){
        console.log(this.commentValue);
        if(this.$parent.modal.qlghuser.userPhone == -1){
        	labor.openLogin();
        	return false;
        }

        if(!this.$parent.modal.wsConfig.uid && !this.$parent.modal.qlghuser.userPhone ){
          this.$toast('游客不能发言');
          return false;
        }

        if(this.commentValue){
          console.log('11');
          //consoel.log(value);
          var msg = this.$parent.wsSend('text', {toUser: 'all', text: this.commentValue});

          //this.$parent.aselected = 1;

          if (msg) {
/*              $(this).removeClass('active');
              $("#input").val('');
              modal.msgAt = {} */
          }
          //$('.fui-content').removeClass('show-emoji')
        }else{

          this.$toast('内容不能为空');

        }
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
