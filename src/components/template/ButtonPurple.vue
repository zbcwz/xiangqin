<template>
  <van-button class="button-purple" :block="true" color="linear-gradient(to right, #ae61ff, #9157f9)">
    {{title}}
  </van-button>
</template>

<script>
  export default{
    props: ['title'],
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


  .button-purple{
    width: 239px;
    height: 49px;
    border-radius: 10px;
    font-size: 27px;
    color: #fff;
    font-weight: bold;
    -moz-box-shadow:0 3px 4px 1px #804af8;
    -webkit-box-shadow:0 3px 4px 1px #804af8;
    box-shadow:0 3px 4px 1px #804af8;
  }
</style>
