<template>
	<div>
		<div id="box" class="box">
        <div class="outer KinerLottery KinerLotteryContent"><img src="./imgs/lotteryContent.png"></div>
        <!-- 大专盘分为三种状态：活动未开始（no-start）、活动进行中(start)、活动结束(completed),可通过切换class进行切换状态，js会根据这3个class进行匹配状态 -->
        <div class="inner KinerLotteryBtn start"></div>
    </div>
	</div>
</template>
<script>

import  getKinerLottery  from './../js/kinerLottery'
export default{
	name:'luckDraw',
	mounted(){
	 	var whichAward = function(deg) {
	        if ((deg > 330 && deg <= 360) || (deg > 0 && deg <= 30)) { //10M流量
	            return "三网通流量 10M";
	        } else if ((deg > 30 && deg <= 90)) { //IPhone 7
	            return "iPhone7";
	        } else if (deg > 90 && deg <= 150) { //30M流量
	            return "三网通流量 30M";
	        } else if (deg > 150 && deg <= 210) { //5元话费
	            return "话费5元";
	        } else if (deg > 210 && deg <= 270) { //IPad mini 4
	            return "ipad mini4";
	        } else if (deg > 270 && deg <= 330) { //20元话费
	            return "话费20元";
	        }
	
	    }
	 	let KinerLottery = getKinerLottery();
	 	new KinerLottery({
	        rotateNum: 5, //转盘转动圈数
	        body: "#box", //大转盘整体的选择符或zepto对象
	        direction: 0, //0为顺时针转动,1为逆时针转动
	
	        disabledHandler: function(key) {
	
	            switch (key) {
	                case "noStart":
	                    alert("活动尚未开始");
	                    break;
	                case "completed":
	                    alert("活动已结束");
	                    break;
	            }
	
	        }, //禁止抽奖时回调
	
	        clickCallback: function() {
	
	            //此处访问接口获取奖品
	            function random() {
	                return Math.floor(Math.random() * 360);
	            }
	
 
	            this.goKinerLottery(random());
	
	        }, //点击抽奖按钮,再次回调中实现访问后台获取抽奖结果,拿到抽奖结果后显示抽奖画面
	
	        KinerLotteryHandler: function(deg) {
                alert("恭喜您获得:" + whichAward(deg));
            } //抽奖结束回调
	    });


	}
}
</script>
<style  scoped="scoped">
 
p,li,b,span,div,strong,h1,h2,h3,h4,h5,h6,a,ul{
    margin: 0;
    padding: 0;
    text-decoration: none;
    list-style: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.box {
    width: 14rem;
    height: 14rem;
    position: relative;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);
}

.box .outer {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
}

.box .outer img{
    width: 100%;
}

.box .inner{
    position: relative;
    width: 5rem;
    height: 5rem;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 2;
    background-image: url(./imgs/lotteryBtn.png);
    background-size: auto 5rem;
    background-repeat: no-repeat;
}
.box .inner.start:active{

    -webkit-transform: translate(-50%, -50%) scale(.95);
    -moz-transform: translate(-50%, -50%) scale(.95);
    -ms-transform: translate(-50%, -50%) scale(.95);
    -o-transform: translate(-50%, -50%) scale(.95);
    transform: translate(-50%, -50%) scale(.95);
}

.box .inner.start{
    background-position: 0 0;
}
.box .inner.no-start{
    background-position: -5rem 0;
}
.box .inner.completed{
    background-position: -10rem 0;
}


</style>