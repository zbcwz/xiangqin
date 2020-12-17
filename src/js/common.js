import labor from 'labor';
export default {
    config: {
      rz:{
        uniacid : 7,
        websiteurl : "",
        wsurl : "",
        sharetitle: "爱在",
        sharedesc: "快来体验",
        shareimgUrl: "",
        attachurl: "",
        appid: "",
        //wxurl: "/app/index.php?i=" + this.config.rz.uniacid + "&c=auth&a=actforward&forward=",
        //wxurl: "http://rzweixin.zb12351.com/app/index.php?i=" + 7 + "&c=auth&a=actforward&forward=",
        wxurl: "",
        preventInfo:''
      }
    },
    qlgh: {
      dislocation: 3703,
      initQlgh: function() {
        //var user = {};
        //alert(labor);
        //console.log(labor);
        //var self = this;



        let data;
        labor.getUserInfo(function(userInfo) { //获取用户登录信息先不跳转
          data = userInfo;
          console.log(userInfo);
          //labor.openLogin();

          //console.log(userInfo);
          //alert(JSON.stringify(user));
        });
        //console.log(userInfo);
        //console.log(1111);
        /* 			setTimeout(function(){
            console.log(modal.qlghuser);

          },5000); */
        labor.getLaborStatus(function(status) {
          data.laborStatus = status.laborStatus;
          //alert(JSON.stringify(user));
        });
        //console.log(222);
        //console.log(modal.qlghuser);
     /*   if (data.error) {
          data = {};
        } */


        return data;
      },
      verifyuserinfo: function(user){
       // console.log(user);
        if(this.isWeiXin()){
          return {
            status: true
          };
        }
        //user.serialNum = "";
        if(user.error){
    /*      layer.open({
            content: "请到齐鲁工惠APP或日照职工e家微信公众号参与活动"
            ,skin: 'msg'
            ,time: 2 //2秒后自动关闭
          }); */
          return {
             content: "请到齐鲁工惠APP或日照职工e家微信公众号参与活动",
             status: false
          }

          //return false;
        }
        //return false;
          //如果加积分就开
    /* 		if(!user.serialNum){

          //alert("活动编号错误");
          layer.open({
            content: "活动编号错误"
            ,skin: 'msg'
            ,time: 2 //2秒后自动关闭
          });

          //window.location.href = "http://www.zb12351.com/huodong/rizhaopintu2019-06-10/index.html";
          return false;
        } */

        if(user.userId == -1){
      //alert(JSON.stringify(user));

          labor.openLogin();
          return {
           content: "",
           status: false
          }
        }

        //增加判断是否是淄博市3703
        var sheng = user.districtCode.substr(0,4);

     		if(sheng != this.dislocation){
  /*        layer.open({
            content: "本活动仅限已下载“齐鲁工惠”手机APP并完成实名认证的日照市工会会员参加!"
            ,skin: 'msg'
            ,time: 2 //2秒后自动关闭
          }); */
          return {
            content: "本活动仅限已下载“齐鲁工惠”手机APP并完成实名认证的日照市工会会员参加!",
            status: false
          }
        }

     		if(user.laborStatus <= 0 || user.laborStatus >= 5){
/*          layer.open({
            //content: "本活动仅限已下载“齐鲁工惠”手机APP并完成实名认证的日照市工会会员参加"
            content: "您的账号" +user.userPhone+ "会员状态异常"
            ,skin: 'msg'
            ,time: 2 //2秒后自动关闭
          }); */
          return {
            content: "您的账号" +user.userPhone+ "会员状态异常",
            status: false
          }
        }

        return {
          content: "",
          status: true
        }
      },
      isWeiXin: function() {
          var ua = window.navigator.userAgent.toLowerCase();
          if (ua.match(/MicroMessenger/i) == 'micromessenger') {
              return true; // 是微信端
          } else {
              return false;
          }
      }
    },
    common: {
      isWeiXin: function() {
          var ua = window.navigator.userAgent.toLowerCase();
          if (ua.match(/MicroMessenger/i) == 'micromessenger') {
              return true; // 是微信端
          } else {
              return false;
          }
      }
    }
  }
