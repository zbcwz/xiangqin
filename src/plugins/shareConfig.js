//import $ from "jquery";
//import wx from 'weixin-js-sdk'
const wx = require('weixin-js-sdk');

const wxApi = {
  shareReady(){

 
    //  return function(){
    wx.ready(function(){
      //var urll1 = "http://gh.tsihan.com/vote/zuimeizhigongjiatingtoupiao/index.php";
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
     // 如果需要定制ready回调方法
  /*    if (callback) {
        callback()
      } */
      wx.onMenuShareAppMessage(wxConfig);

      wx.onMenuShareTimeline(wxConfig);

      wx.onMenuShareQQ(wxConfig);
    });
  },
  shareDetail(config){//更新分享内容
    if(!config){
      return;
    }

    //console.log('tttttttttttttf',config);
    wx.ready(function(){
      //var urll1 = "http://gh.tsihan.com/vote/zuimeizhigongjiatingtoupiao/index.php";
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
     // 如果需要定制ready回调方法
  /*    if (callback) {
        callback()
      } */
      wx.onMenuShareAppMessage(config);

      wx.onMenuShareTimeline(config);

      wx.onMenuShareQQ(config);
    });

  }
}
module.exports = wxApi;
