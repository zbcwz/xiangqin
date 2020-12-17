<template>
  <div id="activitycard">
    <van-image  class="activitycard-head-img" :lazy-load="true" :src="imgurl" />
    <div class="activitycard-bottom">
      <div class="activitycard-bottom-left">
        <div class="activitycard-bottom-left-title van-ellipsis">{{title}}</div>
        <div class="activitycard-bottom-left-font activitycard-bottom-left-date">报名截止时间：{{endtime}}</div>
        <div class="activitycard-bottom-left-font">已有<span style="color: #f46210;">{{attendnum}}</span>人报名参与</div>
      </div>
      <div class="activitycard-bottom-right">
        <van-button class="activitycard-bottom-right-button" type="primary" :[buttontoName]="{ name:'information',params:{uniacid: uniacid ,id: id, type: 'actioning'}}" @[buttoneventValue] = "$toast('报名后才能参与活动')">我要报名</van-button>
        <div class="activitycard-bottom-right-readdnum">{{readnum}}</div>

      </div>
    </div>

  </div>
</template>

<script>
  export default{
    props: ['id','uniacid','title','endtime','attendnum','readnum','imgurl'],
    //name: 'LiveRoomBottom',
    data: ()=>{
      return {
        //buttonevent: 'to',


        //buttontoName: 'to',


      }
    },

    computed: {
      buttoneventValue(){
        return this.$store.state.userInfo ? 'null' : 'click';
      },
      buttontoName(){
        if(this.$store.state.userInfo){
          return 'to';
        }
        return null;
        //return 'click';
      },
    },

    methods: {
    }
  }
</script>

<style>

  #activitycard{
    width: 360px;
    height: 211px;
    border: solid 1px #c1c1c1;
    font-size: 0;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  #activitycard .activitycard-head-img{
    width: 100%;
    height: 133px;
  }

  #activitycard .activitycard-bottom-left{
    display: inline-block;
    width: 240px;
    padding-left: 5px;
  }

  #activitycard .activitycard-bottom-left .activitycard-bottom-left-title{
    color: #000;
    font-size: 13px;
    line-height: 13px;
    font-weight: bold;
    margin-top: 12px;
    margin-bottom: 6px;
  }

  #activitycard .activitycard-bottom-left-font{
    color: #808080;
    font-size: 10px;
    line-height: 10px;
  }

  #activitycard .activitycard-bottom-left-date{
    margin-bottom: 9px;
  }

  #activitycard .activitycard-bottom-right{
    display: inline-block;
    vertical-align: top;
  }

  #activitycard .activitycard-bottom-right .activitycard-bottom-right-button{
    background-color: #f84a63;
    width: 77px;
    height: 31px;
    border: 0;
    color: #fff;
    font-size: 11px;
    padding: 0;
    text-align: center;
    margin-left: 36px;
    margin-top: 20px;
    border-radius: 5px;
    line-height: 31px;
  }

  #activitycard .activitycard-bottom-right .activitycard-bottom-right-readdnum{
    font-size: 12px;
    color: #808080;
    line-height: 12px;
    margin-top: 5px;
    margin-left: 68px;
  }
</style>
