<template>
  <router-link v-if="listvalues.livetype != 3" :to="{ name: 'liveroom', params: { id: listvalues.id,uniacid: 3 }}">
  <div class='livelist-children'>
    <van-tag class='livelist-status'>{{getLiveStatus}}</van-tag>
    <!-- <mt-badge size="small" color="#888" >{{getLiveStatus}}</mt-badge>:src="listvalues.thumb" -->
    <img class='livelist-img'  alt="" v-lazy="listvalues.thumb">
    <p class='livelist-tit'>{{listvalues.title}}</p>
    <span class='livelist-starttime'>{{listvalues.livetime}} 开播</span> 
  </div>

  </router-link>

  <a v-else-if="listvalues.livetype == 3" :href="listvalues.video">
    <div class='livelist-children'>
      <van-tag class='livelist-status'>{{getLiveStatus}}</van-tag>
      <!-- <mt-badge size="small" color="#888" >{{getLiveStatus}}</mt-badge>:src="listvalues.thumb" -->
      <img class='livelist-img'  alt="" v-lazy="listvalues.thumb">
      <p class='livelist-tit'>{{listvalues.title}}</p>
      <span class='livelist-starttime'>{{listvalues.livetime}} 开播</span>
    </div>
  </a>

</template>

<script>
  export default {
    props: ["listvalues","title"],
  	name: 'LiveList',
  	data() {
      return {
        //listvalues: ""
        //vv: this.title
      }
    },

    created(){
    },
    mounted(){
      console.log(this.listvalues);
    console.log(this.title);
    },
    methods: {
      liveTimeStatus: function() {
        //alert(2);


        let timestamp = (new Date().getTime() / 1000);
/*        console.log(timestamp);
        console.log(this.live.liveTime);
        console.log(timestamp >= this.live.liveTime); */
/*        console.log(11111111111111111111111111111111);
        console.log(this.live); */
        if (timestamp >= this.listvalues.livetimestarp) {
          return true; //开播
        } else {
          return false;
        }
      }

    },
    computed: {
      getLiveStatus: function(){
        //alert(1);
       // console.log(this.liveTimeStatus());
       let timestatus = this.liveTimeStatus();
       console.log(timestatus);
       console.log(this.listvalues.living);
       //let timestatus = false;
        if(this.listvalues.living <= 0 && !timestatus){
          console.log(1111111111);
          return "未开始";
        }else if(this.listvalues.living >= 1 ){
          console.log(2222222222);
          return "直播中";
        }else if(this.listvalues.living <= 0 && timestatus){
          console.log(3333333333);
          return "结束";
        }
      },

    }

  }
</script>

<style>
  .livelist-children{
    background-color: #fff;
    padding-top: 2%;
    padding-bottom: 2%;
    margin-bottom: 2%;
    position: relative;
  }

  .livelist-img{
    width: 100%;
    border-radius: 5px;
  }

  .livelist-tit{
    margin: 2% auto 2% auto;
    width: 96%;
    /* font-size: 16px; */
    /* font-size: 1rem; */
    font-weight: bold;
    color: #000;
    font-size: 14px;

  }

  .livelist-starttime{
     color: #118cff;
     margin-left: 2%;
     font-size: 0.33rem;

  }

  .livelist-status{
    position: absolute;
    left: 81%;
    top: 4%;
    font-size: 0.34rem;
  }
</style>
