<template>
  <div id="ChatInformationDialog" :class="[ 'ChatInformationDialog',{'ChatInformationDialog-his': isself }]">
    <div class="ChatInformationDialog-dialog">
      <div class="ChatInformationDialog-dialog-time">{{time}}</div>
      <div  class="ChatInformationDialog-dialog-content">{{content}}</div>
    </div>
    <!-- <img class="ChatInformationDialog-avator" :src="imgurl"> -->
    <van-image class="ChatInformationDialog-avator" :lazy-load="true" :src="imgurl" />
    <van-divider class="ChatInformationDialog-divider" />
  </div>
</template>

<script>
  export default{
    props: ['uniacid','content','time','imgurl','isself'],
    //name: 'LiveRoomBottom',
    data: ()=>{
      return {


      }
    },

    computed: {
    },

    methods: {
    }
  }
</script>

<style>
  .ChatInformationDialog{
    font-size: 0;
    /* height: 92px; */
    text-align: right;
  }
  .ChatInformationDialog-dialog,.ChatInformationDialog-avator{
    display: inline-block;
    margin-top: 10px;
  }

  .ChatInformationDialog-avator{
    width: 46px;
    height: 46px;
    margin-right: 16px;
    margin-left: 9px;
    border-radius: 10px;
    vertical-align: top;

  }

  .ChatInformationDialog-avator img{
    border-radius: 10px;
    width: 100%;
    height: 100%;
  }

  .ChatInformationDialog-dialog-time{
    font-size: 9px;
    line-height: 9px;
    color: #464544;
    margin-bottom: 6px;
  }

  .ChatInformationDialog-dialog-content{
    font-size: 13px;
    /* line-height: 13px; */
    background-color: #87b2ff;
    color: #fff;
    padding: 17px 10px;
    /* width: 106px; */
    max-width: 236px;
    min-width: 58px;
    text-align: left;
    border-radius: 10px;
    border-top-right-radius: 0;
    margin-bottom: 15px;
  }

  .ChatInformationDialog-divider{
    display: block;
    margin: 0 auto;
    width: 339px;
    background-color: #edeef1;
  }

  .ChatInformationDialog-his{
    text-align: left;
  }

  .ChatInformationDialog-his .ChatInformationDialog-avator{
    text-align: left;
    float: left;
    margin-left: 0.42667rem;
    margin-right: 0.24rem;

  }

  .ChatInformationDialog-his .ChatInformationDialog-dialog-content{
    border-top-left-radius: 0;
    border-top-right-radius: 10px;
  }

</style>
