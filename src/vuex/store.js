import axios from 'axios'
import common from '../js/common'
import $ from 'jquery'
import Qs from 'qs'
import wxApi from '../plugins/shareConfig.js'

const state = {
  popupVisible: false,
  shareDetail: {
    title: common.config.rz.sharetitle, // 分享标题
    desc: common.config.rz.sharedesc,
    link: '', // 分享链接
    imgUrl: common.config.rz.shareimgUrl, // 分享图标
    success: function() {
      // 用户确认分享后执行的回调函数
    },
    cancel: function() {
      // 用户取消分享后执行的回调函数textliverecords
    }
  },
  shares: '', //分享服务列表
  huodongActionOnce: false, //确保路由切换后活动第一页只加载一次
  weixinPage: false,
  qlghUser: null,
  userInfo: null,
  chatList: {},
  chatNum: 0,
  chatUnreadList: [],
  noEntry: false,
  errEnv: true

}
const mutations = {
  updatePopupVisible(state, popupVisible) {
    state.popupVisible = popupVisible
  },
  updateShareDetail(state, shareDetail) {
    //state.shareDetail = shareDetail
    if(!shareDetail.obj){
      //console.log('aaaaaaaaaaaaaa',state.shareDetail);
      wxApi.shareDetail(state.shareDetail);
    }else{
      wxApi.shareDetail(shareDetail.obj);
    }

  },
  updateShares(state, shares) {
    state.shares = shares
  },
  updatehuodongActionOnce(state, shares) {
    state.huodongActionOnce = true;
  },
  updateUserHidden(state) {

    if (state.userInfo) {
      if (state.userInfo.yingcang != 2) {
        state.userInfo.yingcang = 2;
        //this._vm.$set(state.userInfo, 'yingcang', 2);

        state.userInfo = Object.assign({}, state.userInfo, state.userInfo);
      } else {
        state.userInfo.yingcang = 1;
        state.userInfo = Object.assign({}, state.userInfo, state.userInfo);
        //this._vm.$set(state.userInfo, 'yingcang', 1);
      }
    }
   // console.log(state.userInfo);
  },

  setUserInfo(state, userinfo) {//首次初始化
  //console.log(2222222222);
    state.userInfo = Object.assign({}, state.userInfo, userinfo.data);
    //console.log(state.userInfo);
    //state.userInfo = userinfo.data;
  },
  setUserInfoMerge(state, py){//力求实现merge
    state.userInfo = Object.assign({}, state.userInfo, py.userinfo);
    console.log(state.userInfo);
  },
  setWeixinPage(state) {
    state.weixinPage = true;
    console.log(state.weixinPage);
  },
  updateChatList(state, py) { //初始化聊天列表
    //state.chatList[15]= {};
    if (!state.chatList[py.selected]) {

      //state.chatList.push([]);
      //state.chatList= {};
      this._vm.$set(state.chatList, py.selected, {});
      //state.chatList[py.selected]= {};
    }

    if (py.list.length > 0) {




      let arr = new Array();
      for (let i = 0; i < py.list.length; i++) {
        //Vue.$set(state.chatList[py.selected], py.list[i].id, py.list[i]);
        //console.log(py.list[i]);

        /* state.chatList[py.selected][py.list[i].id]=py.list[i];
        state.chatList[py.selected][py.list[i].id]['unreadnum'] = 0; */
        if(state.chatList[py.selected][py.list[i].id]){

          if( py.list[i].stime < state.chatList[py.selected][py.list[i].id].stime){

            continue;

          }
        }

        arr[py.list[i].id] = py.list[i];
        arr[py.list[i].id]['unreadnum'] = py.list[i].unreadnum ? py.list[i].unreadnum : 0;
        state.chatList[py.selected] = Object.assign({}, state.chatList[py.selected], arr);
        //console.log(state.chatList);
        //this._vm.$set(state.chatList[py.selected], py.list[i].id, arr);
        //console.log(state.chatList);
        //state.chatList[py.selected].push(py.list[i]);
        //arr.push(py.list[i]);

      }
      console.log(state.chatList);
    }
  },
  updateChatListSub(state, py) { //初始化聊天列表
    let arr = {};
    //if(py.list.length > 0){
    //state.chatList[py.selected][py.obj.suid].content = py.obj.message;
    /* state.chatList[py.selected][py.obj.suid].content = py.obj.message;
    state.chatList[py.selected][py.obj.suid].unreadnum++;
    state.chatList= {}; */
    //arr['sendtime'] = py.obj.sendtime;
    // arr['content'] = py.obj.message;

    this._vm.$set(state.chatList[py.selected][py.obj.suid], 'content', py.obj.message);
    this._vm.$set(state.chatList[py.selected][py.obj.suid], 'stime', py.obj.sendtime);
    //this._vm.$set(state.chatList[py.selected][py.obj.suid], 'unreadnum',  state.chatList[py.selected][py.obj.suid].unreadnum );
    this._vm.$set(state.chatList[py.selected][py.obj.suid], 'unreadnum', py.obj.unreadnum);
    //state.chatList[py.selected][py.obj.suid] = Object.assign({}, state.chatList[py.selected][py.obj.suid], arr);
    //state.chatList[py.selected][py.obj.suid] = {};
    //console.log(state.chatList[py.selected]);
    // }
  },
  updateChatNum(state, num) { //更新列表数量
    state.chatNum = num;
  },
  updateChatUnreadList(state, py) {
    //state.chatUnreadList = py.obj;
    let amonted = 0;
    //this.$store.commit('updateChatNum',amonted);
    for (let i in py.obj) {
      py.obj[i] = JSON.parse(py.obj[i]);

      if (i.indexOf("_info") == -1) {
        //alert("Hi,Tara");
        amonted += py.obj[i];
      }
    }

    state.chatNum = amonted;
    //this.updateChatNum(state,amonted);
    console.log(state.chatUnreadList);
    state.chatUnreadList = Object.assign({}, state.chatUnreadList, py.obj);
    console.log(state.chatUnreadList);
  },
  removeChatUnreadListSub(state, py) {
    if (py.yuid) {

      if (state.chatUnreadList[py.yuid]) {
        console.log(py.yuid);
        //state.chatUnreadList.splice(py.yuid,1);
        delete state.chatUnreadList[py.yuid];
        console.log(state.chatUnreadList[py.yuid]);
      }

      if (state.chatUnreadList[py.yuid + "_info"]) {
        console.log(py.yuid);
        //state.chatUnreadList.splice(py.yuid,1);
        delete state.chatUnreadList[py.yuid + "_info"];
        //this._vm.$set(state.chatList[py.selected][py.yuid], 'unreadnum',  0 );
      }
    }
  },
  updateNoEntry(state, py){
    state.noEntry = py;
  },
  updateErrEnv(state){
    state.errEnv = false;
  }
}
const getters = {
  /*  qlghUser: (context) => {
      //console.log('11111111111111111');
      //let arr = Object.keys(data);

      if(!state.qlghUser){
        console.log('aaaaaaaaaaaaaa');
       state.qlghUser = this._vm.$commonfunc.qlgh.initQlgh();
      }
      return state.qlghUser;
    } */
}

const actions = {
  getUserInfo: (context) => {
    let uniacid = common.config.rz.uniacid;



    return new Promise((resolve, reject) => {
      if (!context.state.userInfo) {
        /*        $.ajax({
                  url: "",
                  type: "GET",
                  async: false,
                  data: {
                    mobile: context.state.qlghUser.userPhone,
                  },
                  dataType: "json",
                  success: function(d) {


                  },
                  error: function() {
                    console.log("错误");
                  }
                }); */
        /* Accept: application/json, text/javascript; q=0.01
        Accept-Encoding: gzip, deflate, br
        Accept-Language: zh-CN,zh;q=0.9
        Cache-Control: no-cache
        Connection: keep-alive
        Host: localhost:8888
        Pragma: no-cache
        Referer: http://localhost:8888/
        sec-ch-ua: nwjs 75
        Sec-Fetch-Dest: empty
        Sec-Fetch-Mode: cors
        Sec-Fetch-Site: same-origin
        User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.3 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1 wechatdevtools/1.03.2005140 MicroMessenger/7.0.4 Language/zh_CN webview/1601258434504418 webdebugger port/12175
        X-Requested-With: XMLHttpRequest

        Accept: application/json
        Accept-Encoding: gzip, deflate, br
        Accept-Language: zh-CN,zh;q=0.9
        Access-Control-Allow-Origin: *
        Cache-Control: no-cache
        Connection: keep-alive
        Cookie: PHPSESSID=0bf7ee6ae87cb75b8a350734b2d62c89
        Host: localhost:8888
        Pragma: no-cache
        Referer: http://localhost:8888/
        sec-ch-ua: nwjs 75
        Sec-Fetch-Dest: empty
        Sec-Fetch-Mode: cors
        Sec-Fetch-Site: same-origin
        User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.3 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1 wechatdevtools/1.03.2005140 MicroMessenger/7.0.4 Language/zh_CN webview/1601258434504418 webdebugger port/12175
 */
        console.log(context.state.qlghUser);

        axios({
            headers: {
              //'Content-Type': 'multipart/form-data',
              /*  'Access-Control-Allow-Origin': "*",
                 "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                  'Accept': 'application/json', */
              //'Content-Type': 'application/x-www-form-urlencoded',
              'X-Requested-With': 'XMLHttpRequest'
            },
            /*          headers:{

                        'Content-Type': 'multipart/form-data'
                      }, */
            //withCredentials:true,
            allowCredentials: true,
            crossDomain: true,
            method: 'get',
            url: "/app/index.php?i=" + uniacid + "&c=entry&do=userinfo&m=meepo_weixiangqin",
            //data: values
            //data: this.qs.stringify(values)
            params: {
              //uniacid: this.$route.params.uniacid,
              user: context.state.qlghUser,
            },
            paramsSerializer: function(params) {
              //alert(params);
              return Qs.stringify(params, {
                arrayFormat: 'indices'
              })
            },
            //changeOrigin: true,
          })
          .then(function(response) {
            //console.log(response.data);
            let d = response.data;
           // console.log(3333);
            if (d.act) {
              //alert(1);
              window.location.href = common.config.rz.websiteurl + d.url;
              //rzweixin.zb12351.com/./index.php?i=7&c=entry&do=module&forward=aT03JmM9…Vwb193ZWl4aWFuZ3Fpbg%3D%3D&m=aigonghui_index&url=
              //console.log('http://rzweixin.zb12351.com/' + d.url);
            }
            //return d;
            if (d.status == 1) {
              d.sex == 1 ? "男" : "女";
              //d.yingcang = 2;
              //console.log(111111111);
              context.commit('setUserInfo', d);
              resolve(d);
            } else {
              /*          Dialog.alert({
                          message: d.info,
                        }).then(() => {
                          // on close
                        }); */
              reject(1);
            }
            //console.log(self.classList);
          })
          .catch(function(error) {
            console.log(error);

            reject(error);
          });
      }
    });

    //return state.qlghUser;
  },
  getQighUser() {

    return new Promise((resolve,reject) => {
//alert(1);
      if (!state.qlghUser) {

        state.qlghUser = this._vm.$commonfunc.qlgh.initQlgh();
        //return true;

      }
      //console.log(2222222222);
      resolve(true);
    });

  },
}



export default {
  state,
  mutations,
  getters,
  actions
}
