<template>
    <div id="MyActivity">
    <!--  <van-tabs class="activity-van-tab" color="#f8546c" title-active-color="#f8546c" title-inactive-color="#666666" 	  v-model="selected" sticky swipeable >
        <van-tab class="activity-van-tab-sub"  title-style="" title="活动报名" name="0"> -->

          <!-- <van-list
            finished-text="没有更多了" error-text="请求失败，点击重新加载" > -->
            <van-list v-if="showList"  v-model="classList[0].loadingMoreStatus" :finished="classList[0].finished" :error.sync="classList[0].error"
              finished-text="没有更多了" error-text="请求失败，点击重新加载" @load="loadMore">

            <!-- <mt-loadmore  :bottom-method="loadBottom"  :bottom-all-loaded="false" :distance-index="10"  ref="homepage"> -->
            <!-- <LiveList v-for="(n ,index) in listValue[0]" :listvalues="n" title="aa" :key="index"></LiveList> -->

              <ActivityCard   v-for="(n,index) in activityList[0]" :key="index" class="activity-actioning-card" :id="n.reid" :uniacid="n.weid" :imgurl="n.thumb" :title="n.title" :endtime="getTime(n.endtime)" attendnum="0" :readnum="n.readnum" />

            <!-- <van-divider style="margin:0" /> -->
              <!-- <ActivityCard class="activity-actioning-card" :imgurl="require('./imgs/rizhaoxiangqin/testactive.jpg')" title="相亲相亲相亲相亲相亲相亲相亲相亲" endtime="2020-09-08 14:10" attendnum="0" readnum="100" /> -->



          </van-list>
          <van-empty v-else description="没有内容~" />

        <!-- </van-tab> -->
 <!--       <van-tab title="精彩回顾"  title-style="border: 0;">
          <van-list  finished-text="没有更多了" error-text="请求失败，点击重新加载" >

            <router-link  to='Information'>
                <van-card

                  title="赵女士"
                  thumb="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=263892426,1852339974&fm=26&gp=0.jpg"
                  class="activity-van-card"
                >

                  <template #title>
                    <span class="activity-van-card-name">有趣的灵魂终会相遇，于是我遇见了你相亲相亲相亲</span>
                  </template>

                  <template #tags>
                     <span class="activity-van-card-foot activity-van-card-foot-date">2019-05-29</span>
                     <span class="activity-van-card-foot activity-van-card-foot-readnum">阅读量:3000</span>
                  </template>

                  <template #num>
                     <van-icon class="activity-van-card-icon" name="arrow" color="#c9c8cd" />
                  </template>
                </van-card>
                </router-link>

              <router-link to='Information'>
                <van-card

                  title="赵女士"
                  thumb="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=263892426,1852339974&fm=26&gp=0.jpg"
                  class="activity-van-card"
                >

                  <template #title>
                    <span class="activity-van-card-name">有趣的灵魂终会相遇，于是我遇见了你相亲相亲相亲</span>
                  </template>

                  <template #tags>
                     <span class="activity-van-card-foot activity-van-card-foot-date">2019-05-29</span>
                     <span class="activity-van-card-foot activity-van-card-foot-readnum">阅读量:3000</span>
                  </template>

                  <template #num>
                     <van-icon class="activity-van-card-icon" name="arrow" color="#c9c8cd" />
                  </template>
                </van-card>
                </router-link>

          </van-list>

        </van-tab> -->

      <!-- </van-tabs> -->
    </div>
</template>

<script>
  import ActivityCard from './template/ActivityCard.vue';
  import { Dialog } from 'vant';
  export default {
  	components: {//http://rzweixin.zb12351.com
      ActivityCard
  	},
    data () {
      return {
        tbl: [],
        selected: "0",
        activityList: [],
        showList: true,
        classList: {
          0: {
            id: 0,
            page: 1,
            loadingMoreStatus: false,
            finished: false, //全部加载完成,还没有做
            error: false,
            title: "正在进行"
          },
          1: {
            id: 1,
            page: 1,
            loadingMoreStatus: false,
            finished: false, //全部加载完成,还没有做
            error: false,
            title: "历史回顾"
          },
        },
      }
    },
    created() {
      //this.pageInit();
    },
/*    computed: {
      liveStartTime: function() {
        let date = new Date(this.live.liveTime * 1000);
        // var d = new Date(timestamp * 1000);    //根据时间戳生成的时间对象
        var datefromate = (date.getFullYear()) + "-" +
          (this.pad(date.getMonth() + 1, 2)) + "-" +
          (this.pad(date.getDate(), 2)) + " " +
          (this.pad(date.getHours(), 2)) + ":" +
          (this.pad(date.getMinutes(), 2));


        console.log(datefromate);
        return datefromate;
        // return date.toJSON().substr(0, 19).replace('T', ' ');
      },
    }, */
  	methods: {
      pageInit(){
        var self = this;
        //
        this.axios({
          // headers: {'Content-Type': 'multipart/form-data'},
          /*          headers:{

                      'Content-Type': 'multipart/form-data'
                    }, */
          //withCredentials:true,
          method: 'get',
          url: "/app/index.php?i=" + this.pageconfig.uniacid + "&c=entry&do=myresearch&m=meepo_weixiangqin",
          //data: values
          //data: this.qs.stringify(values)
          params: {
            op: 'display',
            mobile: this.$store.state.qlghUser.userPhone,
          },
        })
        .then(function(response) {
          console.log(response.data);
          let d = response.data;
          if(d.status == 1){
            self.activityList = d.list;
            console.log(self.activityList);
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


      },
      loadMore() {

        var self = this;
        self.classList[self.selected].loadingMoreStatus = true;

        this.axios({
          // headers: {'Content-Type': 'multipart/form-data'},
          /*          headers:{

                      'Content-Type': 'multipart/form-data'
                    }, */
          //withCredentials:true,
          method: 'get',
          url: "/app/index.php?i=" + this.pageconfig.uniacid + "&c=entry&do=myresearch&m=meepo_weixiangqin",
          //data: values
          //data: this.qs.stringify(values)
          params: {
            op: 'display',
            page: self.classList[self.selected].page,
            mobile: this.$store.state.qlghUser.userPhone,
          },
        })
        .then(function (response) {
          console.log(response.data);
          let d = response.data;
          self.classList[self.selected].loadingMoreStatus = false;
          self.classList[self.selected].page++;

          //self.classList[self.selected].finished = true;//临时增加防止死循环

          if(response.data.total <= 0){//后面已经没有了
            self.classList[self.selected].finished = true;
          }

          if(response.data.total <= 0 && self.classList[self.selected].page == 2){
            self.showList = false;
          }

          if (d.status == 1) {



            if (!self.activityList[self.selected]) {

              self.activityList.push([]);

            }
            console.log(d);
            for (let i = 0; i < d.list.length; i++) {



              self.activityList[self.selected].push(d.list[i]);

            }

          } else {
            console.log('ajax列表获取不到数据，这里需要给一个错误提示');
          }
          console.log(self.activityList[self.selected]);

        })
        .catch(function (error) {
          console.log(error);

            self.classList[self.selected].error = true;
        });


        console.log(self.classList[self.selected]);

      },
      getTime: function(timestamp) {
        let date = new Date(timestamp * 1000);
        // var d = new Date(timestamp * 1000);    //根据时间戳生成的时间对象
        var datefromate = (date.getFullYear()) + "-" +
          (this.pad(date.getMonth() + 1, 2)) + "-" +
          (this.pad(date.getDate(), 2)) + " " +
          (this.pad(date.getHours(), 2)) + ":" +
          (this.pad(date.getMinutes(), 2));


        console.log(datefromate);
        return datefromate;
        // return date.toJSON().substr(0, 19).replace('T', ' ');
      },
      /* 查表法(过程式版本) by aimingoo */
      /* pad : function() {
       var tbl = []; */
      pad: function(num, n) {
        var len = n - num.toString().length;
        if (len <= 0) return num;
        if (!this.tbl[len]) this.tbl[len] = (new Array(len + 1)).join('0');
        return this.tbl[len] + num;
      },
  	}
  }
</script>

<style>
  .activity{
    background-color: #f7f8fa;
  }

  .activity-van-tab .van-tabs__wrap{
    border-bottom: solid 1px #b7b7b7;
    height: 51px;
    color: #666666;
  }

  .activity-van-tab .van-tab{
    border-right: solid 1px #b7b7b7;
    font-size: 16px;
    font-weight: bold;
  }

  .activity-van-tab .van-tabs__line{
    height: 1px;
    width: 71px;
    bottom: 26px;
  }

  .activity-van-card{
    height: 93px;
    padding: 17px 0 0 14px;

    font-size: 0;
  }

  .activity-van-card .van-card__thumb{
    width: 105px;
    height: 68px;
  }

  .activity-van-card .activity-van-card-name{
    font-size: 15px;
    color: #070707;
    line-height: 21px;
    display: block;
    margin-bottom: 14px;
    width: 200px;
  }

  .activity-van-card .activity-van-card-foot{
    color: #898989;
    font-size: 11px;
    line-height: 11px;
  }

  .activity-van-card .activity-van-card-foot-date{
    margin-right: 67px;
  }
  .activity-van-card .activity-van-card-icon{
    position: absolute;
    top: 17px;
    font-size: 10px;
    right: 6px;
  }

  .activity-actioning-card{
    margin: 0 auto;
    margin-top: 2%;
  }

  .activity-van-tab .activity-van-tab-sub{


  }


</style>
