<style>
  .clearfix:after {
    content: "\200B";
    display: block;
    height: 0;
    clear: both;
  }

  .clearfix {
    *zoom: 1;
  }

  .nav_ten {
    border-collapse: collapse;
    width: 100%;
    text-align: center;
    background: white;
  }

  .nav_ten,
  .nav_ten tr,
  .nav_ten td {
    border: none;
  }

  .nav_ten p {
    color: #666;
    font-size: 13px;
    margin: 0px;
  }

  .nav_ten td {
    padding: 8px 5px;
  }

  .nav_ten td img {
    /* width: 60%; */
    width: 46%;
  }

  .new_one i {
    display: none;
  }

  .new_one .mint-cell-title .mint-cell-text {
    font-size: 14px;
  }

  .new_one .mint-cell-value.is-link {
    width: 25%;
    margin: 0 0 0 3px;
  }

  .luckly img {
    width: 100%;
    /*height: 100%;*/
  }

  .luckly dd {
    margin: 0;
    font-size: 15px;
    line-height: 20px;
    padding-top: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .luckly dl {
    float: left;
    padding: 4px;
    padding-bottom: 0;
    width: 50%;
    margin-top: 8px;
    margin-bottom: 0;
  }

  /*.ssss {
		font-size: 13px;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		color: #666;
	}*/

  .more .mint-cell-text {
    margin-left: 20px;
    font-size: 13px;
  }

  .morenews .mint-cell-wrapper {
    padding-left: 5px;
  }

  .more .mint-cell-wrapper {
    background-repeat: repeat-x;
  }

  .fuli_border .mint-cell-wrapper {
    background-image: linear-gradient(180deg, #fff, #fff 0%, transparent 50%);
  }

  .mint-cell:last-child {
    background-size: 0% 0px;
  }

  .worker .mint-cell-title span {
    margin-top: 2px;
    display: inline-block;
  }

  .bornone .mint-cell-wrapper {
    background-image: none;
  }

  .bornone .mint-cell-text {
    color: #666;
  }

  .bornone .mint-cell-value span {
    font-size: 14px;

  }

  .ssss {
    animation: move 3s ease infinite;
  }

  @keyframes move {

    /*  此处从75%开始 */
    /*0%{ transform: translateY(0px);}*/
    75% {
      transform: translateY(0px);
    }

    100% {
      transform: translateY(-50px);
    }
  }

  .mui-table-view {
    position: relative;
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 0;
    list-style: none;
    background-color: #fff;
  }

  .mui-table-view-cell {
    position: relative;
    overflow: hidden;
    padding: 11px 15px;
  }

  .mint_line {
    background-image: linear-gradient(rgb(217, 217, 217), rgb(217, 217, 217) 50%, transparent 50%);
    background-size: 120% 1px;
    background-origin: content-box;
    background-repeat: no-repeat;
  }

  .mint-swipe-indicator.is-active {
    opacity: 1;
  }

  .mint-swipe-indicators {
    bottom: 8px;
    width: 100%;
    text-align: right;
    z-index: 1;
    /* z-index: 999; */
    padding-right: 8px;
  }

  .ellips {
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    line-height: 20px;
  }

  .homepage{
    /* padding: 19px 15px 0 15px; */
    /* padding: 19px 0px 0 0px; */
    padding-top: 19px;
  }

  .homepage .answer {
    background-color: #f4f5f7;
    width: 100%;
    position: relative;
    padding: 0px 10px;
    height: auto;
  }

  .homepage .triggle {
    width: 25px;
    height: 10px;
    position: absolute;
    left: 15px;
    top: -10px;
    background-image: url(./imgs/littletip.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .homepage .myanswer {
    overflow: hidden;
    margin: 3px 0;
    font-size: 15px;
    word-wrap: break-word;
    color: #555;
  }

  #miss {
    position: absolute;
    left: 0;
    width: 100%;
    top: 20px;
    margin: 0 auto;
  }

  .missPage {
    width: 210px;
    height: 210px;
    margin: 0 auto;
    margin-top: 100px;
  }

  .missPage img {
    width: 100%;
    height: 100%;
  }

  .missText {
    text-align: center;
  }

  .missText h3 {
    color: #999;
    font-weight: normal;

  }

  .retry {
    width: 150px;
    margin: 0 auto;
    border: 1px solid #FD7B27;
    border-radius: 5px;
    margin-top: 10px;
  }

  .retry h3 {
    margin: 5px;
    padding: 0;
    color: #FD6F27;
  }


  .swipe-img{
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
  .index-banner{
    height: 171px;
    /* border-radius: 10px; */
  }

  .index-search{
    padding-top: 13px;
    /* border-radius: 10px; */
    padding-bottom: 14px;
    padding-left: 0;
    padding-right: 0;
  }

  .index-search .van-search__content--round{
    background-color: #eef0f5;
  }

  /* 重写tab栏样式 */
  .index-van-tab .van-tabs__nav--line .van-tab{
    background: #ff86b4;
    color: #fff;
    border-radius: 100px;
    height: 23px;
    width:66px;
    flex:none;
    margin-right: 16px;
  }

  .index-van-tab .van-tabs__wrap{
    height: 23px;
    margin-bottom: 8px;
  }

  .index-van-tab .van-tabs__nav--line{
    height: 22px;
  }

  /* card组件样式 */
  .index-van-card-name{
    color: #000000;
    font-size: 16px;
    line-height: 16px;
    display: block;
    padding-bottom: 15px;
    padding-top: 4px;
  }

  .index-van-card-middle-desc{
    color: #717171;
    font-size: 12px;
    line-height: 12px;
    display: block;
    padding-bottom: 14px;
  }

  .index-van-card-foot-desc{
    color: #717171;
    font-size: 12px;
    line-height: 12px;
  }

  .index-van-card{
    margin-top: 0;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 0;
    padding-right: 0;
    background-color: transparent;
  }

  .index-van-card .van-card__thumb{
    width: 78px;
    height: 78px;
    margin-right: 13px;
  }

  .index-van-card .van-card__content{
    min-height: 0;
  }

  .index-van-tab .van-card:not(:first-child){
    margin-top: 0;
  }

  .van-swipe-item{
    /* margin: 0 30px; */
  }
  .index-desc {
    padding: 0 14px 2% 14px;
    font-size: 14px;
    color: #666;
    overflow: hidden;

  }

/*  .index-content-actioning {
    padding: 0 14px 30% 14px;
  } */

  .index-desc img {
    width: 100%;
  }
  .index-popup{
    height: 100%;
    width: 100%;
  }

  .index-popu-button-div{
    text-align: center;
    margin-top: 2%;
  }

  .index-popu-button{
    margin: 0 2%;
    width: 156px;
    height: 46px;
    border: 0;
    padding: 0;
    font-size: 16px;
  }

  .homepage .swiper-slide{
    width: 345px ;/*设为固定值*/
    /* width:auto;/*根据内容调整宽度*/
  }

  .homepage-middle-div{
    padding: 0 15px;
  }

  .index-company-div{
    display: inline-block;
    width: 154px;
    font-size: 0;
    height: 156px;
    /* margin-top: 30px; */
    vertical-align: top;
  }
  .index-company-div .index-company-img{
    width: 100%;
    height: 103px;
    margin-bottom: 15px;
  }

  .index-company-div .index-company-title{
    color: #767676;
    font-size: 14px;
    text-align: center;
    margin: 0;
  }

  .index-company-contain{
    display:flex;
    flex-direction: row;
    justify-content:space-between;
    flex-wrap: wrap;
    align-content: flex-start;
    padding-top: 10px;
  }

</style>

<template>
  <div class="homepage">

    <swiper class="index-banner" v-if="bannerList.length > 1" :options="swiperOption" >
      <swiper-slide class="swiper-slide" v-for=" (banner,index) in bannerList" :key="banner.id">
        <a :href="banner.url"><img class="swipe-img" :src="banner.attachment"></a>
      </swiper-slide>
      <!-- 分页器 -->
      <!-- <div class="swiper-pagination" slot="pagination"></div> -->

    </swiper>

    <div class="homepage-middle-div">
<!--      <van-swipe class="index-banner" v-if="bannerList.length > 0 && false" :autoplay="300000" indicator-color="white">
        <van-swipe-item v-for=" (banner,index) in bannerList" :key="banner.id">
          <a :href="banner.url"><img class="swipe-img" v-lazy="banner.attachment"></a>
        </van-swipe-item>

      </van-swipe> -->
      <!-- <router-link   :to='{name:"chat"}'> -->
      <van-search class="index-search" shape="round" placeholder="检索" v-model="keywords" :disabled="true" :readonly="true"
        @click="showSearch" />
      <!-- </router-link> -->
      <!--    <mt-navbar v-model="selected" style='margin-bottom: 2%;'>
      <mt-tab-item id="0">全部</mt-tab-item>
      <mt-tab-item v-if="classvalue" v-for="( classvalue,index) in classList" :id="classvalue.id" :key="index">{{classvalue.name}}
      </mt-tab-item>
    </mt-navbar> -->

      <van-tabs class="index-van-tab" color="#fff" line-height="0.5px" v-model="selected" @click="onClickone">
        <van-tab title-style="" title="找对象" name="0" >
          <van-notice-bar
            v-show="searchData['company']"
            :text="searchCompanyName"
            mode="closeable"
            @close="reloadPersonList"
          />
          <van-list v-model="classList[0].loadingMoreStatus" :finished="classList[0].finished" :error.sync="classList[0].error"
            finished-text="没有更多了" error-text="请求失败，点击重新加载" @load="loadMore">

            <!-- <mt-loadmore  :bottom-method="loadBottom"  :bottom-all-loaded="false" :distance-index="10"  ref="homepage"> -->
            <!-- <LiveList v-for="(n ,index) in listValue[0]" :listvalues="n" title="aa" :key="index"></LiveList> -->
            <router-link v-for="(n ,index) in listValue[0]" :key="index" :to='c_errEnv ?  {name:"personInfo", params: { uniacid: pageconfig.uniacid,id: n.id }} : ""'>
              <van-card :thumb="n.avatar" class="index-van-card">

                <template #title>
                  <span class="index-van-card-name">{{n.realname}}</span>
                </template>
                <template #desc>
                  <span class="index-van-card-middle-desc">{{n.age}}岁|{{n.height}}cm|威亚发动机公司</span>
                </template>
                <template #tags>
                  <span class="index-van-card-foot-desc">有缘千里来相会，无缘对面不相逢</span>
                </template>
              </van-card>
            </router-link>
            <van-divider style="margin:0" />
            <van-card desc="24岁|170cm|威亚发动机公司" title="赵女士" thumb="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=263892426,1852339974&fm=26&gp=0.jpg"
              class="index-van-card">

              <template #title>
                <span class="index-van-card-name">赵女士</span>
              </template>
              <template #desc>
                <span class="index-van-card-middle-desc">24岁|170cm|威亚发动机公司</span>
              </template>
              <template #tags>
                <span class="index-van-card-foot-desc">有缘千里来相会，无缘对面不相逢</span>
              </template>
            </van-card>


          </van-list>
        </van-tab>
        <!-- <van-tab v-if="classvalue && classvalue.id != 0" v-for="( classvalue,index) in classList" :title="classList[classvalue.id].title"
        :name="classvalue.id" :key="index" title-style="background-color:#ffa75f;" to="/Activity"> -->
        <van-tab :title="classList[1].title" :name="1" title-style="background-color:#ff5f5f;">
          <van-list v-model="classList[1].loadingMoreStatus" :finished="classList[1].finished" :error.sync="classList[1].error"
            finished-text="没有更多了" error-text="请求失败，点击重新加载" @load="loadMore">
            <div class="index-company-contain" >
              <!-- <router-link v-for="(n ,index) in listValue[1]" :key="index" :to='c_errEnv ?  {name:"personInfo", params: { uniacid: pageconfig.uniacid,id: n.id }} : ""'> -->
                <div class="index-company-div" v-for="(n ,index) in listValue[1]" :key="index" @click="onCompany(n.reid,n.title)">
                  <img class="index-company-img" :src="n.thumb">
                  <p class="index-company-title">{{n.title}}</p>
                </div>
              <!-- </router-link> -->
            </div>
          </van-list>
        </van-tab>
        <van-tab :title="classList[2].title" :name="2" title-style="background-color:#ffa75f;" to="/Activity">
          <!-- <van-list v-model="classList[1].loadingMoreStatus" :finished="classList[1].finished"
          :error.sync="classList[1].error" finished-text="没有更多了" error-text="请求失败，点击重新加载" @load=""> -->

          <!-- <mt-loadmore  :bottom-method="loadBottom"  :bottom-all-loaded="false" :distance-index="10"  ref="homepage"> -->
          <!-- <LiveList v-for="(n ,index) in listValue[classvalue.id]"  :key="index" :listvalues="n" title="aa"></LiveList> -->
          <!-- <LiveList  v-else @click.native="tolink('http://www.baidu.com')" :key="index" :listvalues="n"  title="aa"></LiveList> -->

          <!-- </van-list> -->

        </van-tab>
        <van-tab :title="classList[3].title" :name="3" title-style="background-color:#86abff;">
          <p class="index-desc" v-html="descHtml"></p>

        </van-tab>

      </van-tabs>


      <!-- 			<mt-swipe :auto="4000" style="height: 150px;" :showIndicators='bannerList.length>1'>
				<mt-swipe-item v-for="obj in bannerList" v-if='obj.bannerPostionY===1' @click.native="bannergo(obj)">
					<img :src="obj.bqPhotoUrl||''" width="100%" height="100%" @error="$event.target.src=errorBanner" />
					<div v-if='obj.template' style="position: absolute; bottom: 0;   z-index:  11; width: 100%;background-color: rgba(0,0,0,.4); padding:8px ;  color: #fff;">
						<p style="width: 90%; margin: 0;-webkit-line-clamp: 1;font-size: 14px;" class="ellip">{{obj.template}}</p>
					</div>
				</mt-swipe-item>
			</mt-swipe> -->


      <!-- tab-container -->




      <!-- 			<mt-swipe :auto="4000" style="height: 150px;">
				<mt-swipe-item v-for="obj in bannerList" v-if='obj.bannerPostionY===2' @click.native="bannergo(obj)">
					<img :src="obj.bqPhotoUrl||''" width="100%" height="100%" @error="$event.target.src=errorBanner" />
				</mt-swipe-item>
			</mt-swipe> -->



      <div id="miss" v-if="offLine == true || offLine == 'true'">

        <div class="missText">
          <h3>呀，页面出错啦！</h3>
        </div>
        <div class="missText retry" @click.native="retry()">
          <h3>请检查网络</h3>
        </div>
      </div>
      <!-- 弹出层 -->

      <van-popup class="index-popup" :close-on-popstate="true" :close-on-click-overlay="false" position="bottom"
        v-model="showPopup">
        <van-nav-bar title="检索" left-arrow @click-left="closePopup" />
        <van-cell-group class="attend-cell-group" :border="false">
          <!-- <van-cell class="attend-cell-group-cell" title="姓名" value="未选择" :border="false" title-class="attend-cell-group-title"
          value-class="attend-cell-group-value" is-link /> -->
          <!-- <van-field class="attend-cell-group-cell" :disabled="fieldDisabled"  name="name" v-model="value.name" label="姓名"
         placeholder="未填写"  :border="false" :is-link="!fieldDisabled"  input-align="right"
         label-class="attend-cell-group-title" :rules="[{ required: true, message: '请填写姓名' }]" /> -->

          <van-field class="attend-cell-group-cell" :disabled="fieldDisabled" readonly clickable name="sex" :value="option.sex.value"
            label="性别" placeholder="未选择" @click=" !fieldDisabled ? option.sex.showPicker = true : ''" :border="false"
            :is-link="!fieldDisabled" input-align="right" label-class="attend-cell-group-title" :rules="[{ required: true, message: '请选择性别' }]" />

          <van-field class="attend-cell-group-cell" :disabled="fieldDisabled" readonly clickable name="age" :value="option.age.value"
            label="年龄" placeholder="未选择" @click="!fieldDisabled ? option.age.showPicker = true : ''" :border="false"
            :is-link="!fieldDisabled" input-align="right" label-class="attend-cell-group-title" :rules="[{ required: true, message: '请选择年龄' }]" />

          <van-field class="attend-cell-group-cell" :disabled="fieldDisabled" readonly clickable name="bodyheight"
            :value="option.bodyheight.value" label="身高" placeholder="未选择" @click="!fieldDisabled ? option.bodyheight.showPicker = true : ''"
            :border="false" :is-link="!fieldDisabled" input-align="right" label-class="attend-cell-group-title" :rules="[{ required: true, message: '请选择身高' }]" />

          <van-field class="attend-cell-group-cell" :disabled="fieldDisabled" readonly clickable name="education"
            :value="option.education.value" label="学历" placeholder="未选择" @click="!fieldDisabled ? option.education.showPicker = true : ''"
            :border="false" :is-link="!fieldDisabled" input-align="right" label-class="attend-cell-group-title" :rules="[{ required: true, message: '请选择学历' }]" />

          <van-field class="attend-cell-group-cell" :disabled="fieldDisabled" readonly clickable name="salary" :value="option.salary.value"
            label="月薪" placeholder="未选择" @click="!fieldDisabled ? option.salary.showPicker = true : ''" :border="false"
            :is-link="!fieldDisabled" input-align="right" label-class="attend-cell-group-title" :rules="[{ required: true, message: '请选择月薪' }]" />


          <van-field class="attend-cell-group-cell" :disabled="fieldDisabled" readonly clickable name="marriage" :value="option.marriage.value"
            label="婚史" placeholder="未选择" @click="!fieldDisabled ? option.marriage.showPicker = true : ''" :border="false"
            :is-link="!fieldDisabled" input-align="right" label-class="attend-cell-group-title" :rules="[{ required: true, message: '请选择婚史' }]" />



        </van-cell-group>
        <div class="index-popu-button-div">
          <van-button class="index-popu-button" style="background-color: #cbcbcb;" round type="info" @click="serarchReset">重置</van-button>
          <van-button class="index-popu-button" style="background-color: #8750f6;" round type="info" @click="onSearch">搜索</van-button>
        </div>
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
      </van-popup>
    </div>
  </div>

</template>
<script>
  import qs from 'qs'
  import LiveList from './LiveList.vue'
  import wxApi from '../plugins/shareConfig.js'
  //	import defaultyhq from './imgs/defaultyhq.png'
  let lun = null;
  export default {
    name: 'homepage',
    data() {
      return {
        active: 0,
        selected: "0",
        keywords: "",
        descHtml: "",
        showPopup: false,
        fieldDisabled: false,
        searchData: {}, //搜索数据
        searchCompanyName: "",
        icon: {
          active: 'https://img.yzcdn.cn/vant/user-active.png',
          inactive: 'https://img.yzcdn.cn/vant/user-inactive.png',
        },
        listValue: [],
        classList: {
          0: {
            id: 0,
            page: 1,
            loadingMoreStatus: false,
            finished: false, //全部加载完成,还没有做
            error: false,
            title: "找对象",
            axiosurl: "/app/index.php?i=" + this.pageconfig.uniacid + "&c=entry&do=alllist&m=meepo_weixiangqin"
          },
          1: {
            id: 1,
            page: 1,
            loadingMoreStatus: false,
            finished: false, //全部加载完成,还没有做
            error: false,
            title: "会员单位",
            axiosurl: "/app/index.php?i=" + this.pageconfig.uniacid + "&c=entry&do=membercompany&m=meepo_weixiangqin"
          },
          2: {
            id: 2,
            page: 1,
            loadingMoreStatus: false,
            finished: false, //全部加载完成,还没有做
            error: false,
            title: "找活动"
          },
          3: {
            id: 3,
            page: 1,
            loadingMoreStatus: false,
            finished: false, //全部加载完成,还没有做
            error: false,
            title: "爱在日照"
          },
        },

        offLine: false,

        bannerList: [{
            thumb: 'http://newweixin.oss-cn-qingdao.aliyuncs.com/images/3/2019/09/XUK08005ON0500UQ2eb8TIvNdt2RI2.jpg',
            link: 'http://newweixin.oss-cn-qingdao.aliyuncs.com/images/3/2019/09/XUK08005ON0500UQ2eb8TIvNdt2RI2.jpg',
            id: 0

          },
          {
            thumb: 'http://newweixin.oss-cn-qingdao.aliyuncs.com/images/3/2019/09/XUK08005ON0500UQ2eb8TIvNdt2RI2.jpg',
            link: 'http://newweixin.oss-cn-qingdao.aliyuncs.com/images/3/2020/07/ol6qtqqO8W3tq6q69634n86Wm6ZFW6.jpg',
            id: 1
          }
        ],
        //				bannerList2: [],

        moduleListL: [],
        carousel: '',
        recommend: {
          first: {
            name: '',
            list: []
          },
          second: {
            name: '',
            list: []
          },
          third: {
            name: '',
            list: []
          },
          fouth: {
            name: '',
            list: []
          }
        },
        goodsList: [],
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
            columns: ['180cm', '175cm', '170cm'],
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
        },
        swiperOption: {
          //显示分页
          /*        pagination: {
                    el: '.swiper-pagination'
                  }, */
          //设置点击箭头
          //自动轮播
          //autoplay: true,

          autoplay: {
            delay: 3000,

            //当用户滑动图片后继续自动轮播
            disableOnInteraction: false,
          },
          //开启循环模式
          loop: true,
          slidesPerView: 'auto',
          centeredSlides: true,
          spaceBetween: 20,
          observer: true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents: false, //修改swiper的父元素时，自动初始化swiper
        }


      };
    },

    created() {
      //console.log(this.$store.getters.qlghUser);
      this.listPageInit();
      //this.getLiveList();
      /* var wxConfig = {
         title: this.pageconfig.sharetitle, // 分享标题
         desc: this.pageconfig.sharedesc,
         link: '', // 分享链接
         imgUrl: this.pageconfig.shareimgUrl, // 分享图标
         success: function() {
           // 用户确认分享后执行的回调函数
         },
         cancel: function() {
           // 用户取消分享后执行的回调函数
         }
       }; */

      //wxApi.shareDetail(wxConfig);

      //this.pageInit();
      //var self = this;
      //			console.log('')
      //			if(window.plus){
      //				console.log('app环境')
      //				self.checkNet()
      //			}else{
      //				console.log('网页环境')
      //				document.addEventListener('plusready',function(){
      //					self.checkNet()
      //				})
      //			}
    },
    computed: {
      c_errEnv() {
        return this.$store.state.errEnv;
      },
    },
    mounted() {
      //alert(1);
    },
    activated() {
      this.selected = "0";
    },
    components: {
      LiveList,
      //[List.name]: List,
    },
    watch: {

      // 如果 `selected` 发生改变，这个函数就会运行
      /*      selected: function (newselected, oldselected) {
              var self = this;
              $.ajax({
                url: "/app/index.php?i=3&c=entry&m=ewei_shopv2&do=mobile&r=live.list.get_list",
                type: "GET",
                data:{
                  page: 1,
                  cate: newselected
                },
                dataType: "json",
                success: function(d){
                  console.log(d);
                  if(d.status == 1){
                    console.log(newselected);
                    console.log(self.listValue[newselected]);
                    if(!self.listValue[newselected]){
                      //self.listValue[newselected] = new Array();
                      self.listValue .push([]);
微信、qq、交管12123、百度地图、滴滴出行、今日头条、京东、手机淘宝、支付宝、网易云、咪咕、百度贴吧、哈罗、腾讯体育、闲鱼、360行车、369出行、幸运破解器
                    }

                    for(let i = 0; i< d.result.list.length; i++){
                      console.log(self.listValue[newselected]);
                        self.listValue[newselected] .push( d.result.list[i]);

                    }

                  }else{
                    console.log('ajax列表获取不到数据，这里需要给一个错误提示');
                  }
                  console.log(self.listValue[newselected]);
                }
              });
              //this.answer = 'Waiting for you to stop typing...'
            } */
    },
    methods: {

      listPageInit() {
        console.log(this.pageconfig);
        var self = this;
        //
        this.axios({
            // headers: {'Content-Type': 'multipart/form-data'},
            headers: {

              //'Content-Type': 'multipart/form-data',
              'X-Requested-With': 'XMLHttpRequest'
            },
            //withCredentials:true,
            method: 'get',
            url: "/app/index.php?i=" + this.pageconfig.uniacid + "&c=entry&do=alllist&m=meepo_weixiangqin",
            allowCredentials: true,
            crossDomain: true,
            //data: values
            //data: this.qs.stringify(values)
            params: {
              page: 1,
              cate: 0,
              type: 'indexdata',
              keywords: self.keywords
            },
          })
          .then(function(response) {
            console.log(response.data);
            let d = response.data;
            /*          for (let i = 0; i < d.result.category.length; i++) {
                        // console.log(d.result.category[i].id);
                        d.result.category[i].finished = false;
                        d.result.category[i].loadingMoreStatus = false;
                        d.result.category[i].error = false;
                        d.result.category[i].page = 1;

                        self.$set(self.classList, d.result.category[i].id, d.result.category[i]);
                      } */

            self.bannerList = d.banner;
            self.descHtml = d.describeHtml;
            //console.log(d.result.banner);
            //console.log(self.classList);


          })
          .catch(function(error) {
            console.log(error);
          });


        /*    $.ajax({
              url: "/app/index.php?i="+this.pageconfig.uniacid+"&c=entry&m=ewei_shopv2&do=mobile&r=live.list.get_list_info",
              type: "GET",
              data: {
                page: 1,
                cate: 0,
                keywords: self.keywords
              },
              dataType: "json",
              success: function(d) {
                //console.log(d.result.category);

                //self.classList = d.result.category;
                //self.classList.push(d.result.category);

                for (let i = 0; i < d.result.category.length; i++) {
                  // console.log(d.result.category[i].id);
                  d.result.category[i].finished = false;
                  d.result.category[i].loadingMoreStatus = false;
                  d.result.category[i].error = false;
                  d.result.category[i].page = 1;

                  self.$set(self.classList, d.result.category[i].id, d.result.category[i]);
                }

                //self.bannerList = d.result.banner;
                console.log(d.result.banner);
                //console.log(self.classList);
              },
              error: function() {

              },
            }); */
      },

      getLiveList() { //弃用

        var self = this;

        $.ajax({
          url: "/app/index.php?i=" + this.pageconfig.uniacid +
            "&c=entry&m=ewei_shopv2&do=mobile&r=live.list.get_list",
          type: "GET",
          data: {
            page: 1,
            cate: 0,
            keywords: self.keywords
          },
          dataType: "json",
          success: function(d) {

            if (d.status == 1) {

              //self.listValue[0] = d.result.list;
              if (!self.listValue[0]) {
                self.listValue.push([]);
              }
              for (let i = 0; i < d.result.list.length; i++) {
                self.listValue[0].push(d.result.list[i]);
              }
            } else {
              console.log('ajax列表获取不到数据，这里需要给一个错误提示');
            }
            //console.log(self.listValue[0]);
          }
        });


      },
      loadMore() {

        var self = this;

        for (let i in this.option) { //搜索数据整理
          if (!this.option[i].value) {
            continue;
          }
          this.searchData[i] = this.option[i].value;


        }
        console.log('this.searchData',this.searchData);

        self.classList[self.selected].loadingMoreStatus = true;

        this.axios({
            // headers: {'Content-Type': 'multipart/form-data'},
            headers: {

              //'Content-Type': 'multipart/form-data',
              'X-Requested-With': 'XMLHttpRequest'
            },
            //withCredentials:true,
            allowCredentials: true,
            crossDomain: true,
            method: 'get',
            url: self.classList[self.selected].axiosurl,
            //data: values
            //data: this.qs.stringify(values)
            params: {
              page: self.classList[self.selected].page,
              //gender:
              sdata: self.searchData

              //cate: 0,
              //keywords: self.keywords
            },
            paramsSerializer: function(params) {
              //alert(params);
              return qs.stringify(params, {
                arrayFormat: 'indices'
              })
            },
          })
          .then(function(response) {
            console.log(response.data);
            //let d = response.data;
            self.classList[self.selected].loadingMoreStatus = false;
            self.classList[self.selected].page++;

            //self.classList[self.selected].finished = true;//临时增加防止死循环
            if (response.data.total <= 0) { //后面已经没有了
              self.classList[self.selected].finished = true;
            }

            if (response.data.status == 1) {



              if (!self.listValue[self.selected]) {

                self.listValue.push([]);

              }

              for (let i = 0; i < response.data.list.length; i++) {



                self.listValue[self.selected].push(response.data.list[i]);

              }

            } else {
              console.log('ajax列表获取不到数据，这里需要给一个错误提示');
            }
            console.log(self.listValue[self.selected]);

          })
          .catch(function(error) {
            console.log(error);

            self.classList[self.selected].error = true;
          });


        console.log(self.classList[self.selected]);

        /*        $.ajax({
                  url: "/app/index.php?i="+this.pageconfig.uniacid+"&c=entry&m=ewei_shopv2&do=mobile&r=live.list.get_list_info",
                  type: "GET",
                  data: {
                    page: self.classList[self.selected].page,
                    cate: self.selected,
                    keywords: self.keywords
                  },
                  dataType: "json",
                  success: function(d) {

                    self.classList[self.selected].loadingMoreStatus = false;
                    self.classList[self.selected].page++;
                    if(d.result.total <= 0){//后面已经没有了
                      self.classList[self.selected].finished = true;
                    }

                    if (d.status == 1) {



                      if (!self.listValue[self.selected]) {

                        self.listValue.push([]);

                      }

                      for (let i = 0; i < d.result.list.length; i++) {



                        self.listValue[self.selected].push(d.result.list[i]);

                      }

                    } else {
                      console.log('ajax列表获取不到数据，这里需要给一个错误提示');
                    }
                    console.log(self.listValue[self.selected]);
                  },
                  error: function(e) {
                    self.classList[self.selected].error = true;

                  }
                }); */
      },
      loadMoree() { //测试
        //console.log(selected);
        alert('aaa');
        var self = this;
        console.log(self.selected);
        this.classList[self.selected].loadingMoreStatus = true;
        console.log(this.loadingMoreStatus);

        $.ajax({
          url: "/app/index.php?i=" + this.pageconfig.uniacid +
            "&c=entry&m=ewei_shopv2&do=mobile&r=live.list.get_list",
          type: "GET",
          data: {
            page: 1,
            cate: self.selected,
          },
          dataType: "json",
          success: function(d) {
            console.log(d);

            self.classList[self.selected].loadingMoreStatus = false;

            if (d.status == 1) {

              console.log(self.listValue[self.selected]);

              if (!self.listValue[self.selected]) {

                self.listValue.push([]);

              }

              for (let i = 0; i < d.result.list.length; i++) {

                console.log(self.listValue[self.selected]);

                self.listValue[self.selected].push(d.result.list[i]);

              }

            } else {
              console.log('ajax列表获取不到数据，这里需要给一个错误提示');
            }
            console.log(self.listValue[self.selected]);
          }
        });
      },
      onCompany: function(id,name){
        this.searchData = {};

        this.classList[0].page = 1;
        this.classList[0].finished = false;
        this.listValue[0] = [];

        if(id){
          this.searchData['company'] =  id;
          this.searchCompanyName = name;
        }
        //console.log('this.searchData2',this.searchData);
        this.selected = 0;
        this.loadMore();
      },
      tolink: function(url) {
        window.location.href = url;
      },
      onSearch: function(val) {
        //console.log(val);
        //var self = this;

        this.classList[this.selected].page = 1;
        this.classList[this.selected].finished = false;
        this.listValue[this.selected] = [];
        this.showPopup = false;
        this.loadMore();
        return;
        //this.searchData =

        self.classList[self.selected].loadingMoreStatus = true;
        console.log(self.classList[self.selected]);

        $.ajax({
          url: "/app/index.php?i=" + this.pageconfig.uniacid +
            "&c=entry&m=ewei_shopv2&do=mobile&r=live.list.get_list_info",
          type: "GET",
          data: {
            page: 1,
            cate: self.selected,
            keywords: self.keywords
          },
          dataType: "json",
          success: function(d) {


            self.classList[self.selected].loadingMoreStatus = false;

            if (d.result.total <= 0) { //后面已经没有了
              self.classList[self.selected].finished = true;
            }

            self.classList[self.selected].page++;

            if (d.status == 1) {


              self.listValue[self.selected] = [];
              if (!self.listValue[self.selected]) {

                self.listValue.push([]);

              }

              for (let i = 0; i < d.result.list.length; i++) {



                self.listValue[self.selected].push(d.result.list[i]);

              }

            } else {
              console.log('ajax列表获取不到数据，这里需要给一个错误提示');
            }
            console.log(self.listValue[self.selected]);
          },
          error: function(e) {
            self.classList[self.selected].error = true;

          }
        });
      },
      serarchReset() {
        for (let i in this.option) {
          this.option[i].value = "";
        }
        this.searchData = {};
      },
      showSearch() {
        if (this.c_errEnv) {
          this.showPopup = true;
        }
      },
      closePopup() {
        this.showPopup = false;
      },
      onClickone(selectid){
        //alert(selectid);
        if(selectid == 0 && this.searchData['company']){
   /*       this.classList[0].page = 1;
          this.classList[0].finished = false;
          this.searchData = [];
          this.listValue[0] = [];
          this.searchCompanyName = ""; */
          this.reloadPersonList();
        }

      },
      reloadPersonList(){//重新初始化候选人列表
        this.classList[0].page = 1;
        this.classList[0].finished = false;
        this.searchData = [];
        this.listValue[0] = [];
        this.searchCompanyName = "";
      },
      onSexConfirm(value) { //性别选择器
        this.option.sex.value = value;
        this.option.sex.showPicker = false;
      },
      onAgeConfirm(value) { //性别选择器
        this.option.age.value = value.replace("岁", "");
        this.option.age.showPicker = false;
      },
      onBodyheightConfirm(value) { //性别选择器
        this.option.bodyheight.value = value.replace("cm", "");
        this.option.bodyheight.showPicker = false;
      },
      onEducationConfirm(value) { //性别选择器
        this.option.education.value = value;
        this.option.education.showPicker = false;
      },
      onSalaryConfirm(value) { //性别选择器
        this.option.salary.value = value;
        this.option.salary.showPicker = false;
      },
      onMarriageConfirm(value) { //性别选择器
        this.option.marriage.value = value;
        this.option.marriage.showPicker = false;
      },



    }
  };
</script>
