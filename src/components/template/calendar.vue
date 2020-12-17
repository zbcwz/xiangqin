<template>
	<div id="calendar" style=";">
		<div class="month">
			<ul>
				<li class="arrow" @click="pickPre(currentYear,currentMonth)">❮</li>
				<li class="year-month" @click="pickYear(currentYear,currentMonth)">
					<span class="choose-year">{{ currentYear }}</span>
					<span class="choose-month">{{ currentMonth }}月</span>
				</li>
				<li class="arrow" @click="pickNext(currentYear,currentMonth)">❯</li>
			</ul>
		</div>
		<ul class="weekdays">
			<li>一</li>
			<li>二</li>
			<li>三</li>
			<li>四</li>
			<li>五</li>
			<li style="color:red">六</li>
			<li style="color:red">日</li>
		</ul>
		<ul class="days">
			<li @click="pick(day)" v-for="day in days">
   				<span  :class="{'picker1':isPick(day) ,'active': (day.getFullYear() == new Date().getFullYear() && day.getMonth() == new Date().getMonth() && day.getDate() == new Date().getDate()),'other-month':(day.getMonth()+1 != currentMonth)}">
   					{{ getday(day.getDate()) }}
   				</span>
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
	export default{
		name: 'calendar',
		 props:{
		 	pickArr:{
		 		type: Array,
		 		default:[]
		 	},
//		 	style:{
//		 		type:Object,
//		 		default:{}
//		 	},
		 },
		data(){
			return {
				currentDay: 1,
				currentMonth: 1,
				currentYear: 1970,
				currentWeek: 1,
				days: [],
			}
		},
		created: function() {
		
			this.initData(null);
		},
		methods: {
			isPick(date){
				
				var dayStr=this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
				if(this.pickArr.indexOf(dayStr) >-1){
					return true
				}else{
					return false
				}
			},
			getday(day){
				if(day<10){
					return '0'+day
				}else{
					return day
				}
			},
			initData: function(cur) {
				var date;
				if(cur) {
					date = new Date(cur);
				} else {
					date = new Date();
				}
				this.currentDay = date.getDate();
				this.currentYear = date.getFullYear();
				this.currentMonth = date.getMonth() + 1;
				this.currentWeek = date.getDay(); // 1...6,0
				if(this.currentWeek == 0) {
					this.currentWeek = 7;
				}
				var str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay);
				this.days.length = 0;
				// 今天是周日，放在第一行第7个位置，前面6个
				for(var i = this.currentWeek - 1; i >= 0; i--) {
					var d = new Date(str);
					d.setDate(d.getDate() - i);
					this.days.push(d);
				}
				for(var i = 1; i <= 35 - this.currentWeek; i++) {
					var d = new Date(str);
					d.setDate(d.getDate() + i);
					this.days.push(d);
				}
			},
			pick: function(date) {
				this.$emit('pickDate',this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate()) )
			},
			pickPre: function(year, month) {
				// setDate(0); 上月最后一天
				// setDate(-1); 上月倒数第二天
				// setDate(dx) 参数dx为 上月最后一天的前后dx天
				var d = new Date(this.formatDate(year, month, 1));
				d.setDate(0);
				this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
			},
			pickNext: function(year, month) {
				var d = new Date(this.formatDate(year, month, 1));
				d.setDate(35);
				this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
			},
			pickYear: function(year, month) {
//				alert(year + "," + month);
			},

			// 返回 类似 2016-01-02 格式的字符串
			formatDate: function(year, month, day) {
				var y = year;
				var m = month;
				if(m < 10) m = "0" + m;
				var d = day;
				if(d < 10) d = "0" + d;
				return y + "-" + m + "-" + d
			},
		},
	}
</script>
<style scoped type="text/css">
	#calendar {
		width: 100%;
		margin: 0 auto;
		box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.1), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
	}
	ul {
  list-style-type: none;
  }
	.month {
		width: 100%;
		background: #00B8EC;
	}
	
	.month ul {
		margin: 0;
		padding: 0;
		display: flex;
		justify-content: space-between;
	}
	
	.year-month {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}
	
	.year-month:hover {
		background: rgba(150, 2, 12, 0.1);
	}
	
	.choose-year {
		padding-left: 20px;
		padding-right: 20px;
	}
	
	.choose-month {
		text-align: center;
		font-size: 1.5rem;
	}
	
	.arrow {
		padding: 30px;
	}
	
	.arrow:hover {
		background: rgba(100, 2, 12, 0.1);
	}
	
	.month ul li {
		color: white;
		font-size: 20px;
		text-transform: uppercase;
		letter-spacing: 3px;
	}
	
	.weekdays {
		margin: 0;
		padding: 10px 0;
		background-color: #00B8EC;
		display: flex;
		flex-wrap: wrap;
		color: #FFFFFF;
		justify-content: space-around;
	}
	
	.weekdays li {
		display: inline-block;
		width: 13.6%;
		text-align: center;
	}
	
	.days {
		padding: 0;
		background: #FFFFFF;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	
	.days li {
		list-style-type: none;
		display: inline-block;
		width: 14.2%;
		text-align: center;
		padding-bottom: 15px;
		padding-top: 15px;
		font-size: 1rem;
		color: #000;
	}
	
	.days li .active {
		padding: 5px 5px;
		border-radius: 50%;
		background: #00B8EC;
		color: #fff;
	}
	
	.days li .other-month {
		padding: 5px;
		color: gainsboro;
	}
	
	.days li span:hover {
		background: #fd7b27;
		border-radius: 50%;
		padding: 4px 4px;
		color: #FFFFFF;
	}
	.picker1{
		background: gray;
		border-radius: 50%;
		padding: 4px 4px;
		color: #FFFFFF;
	}
</style>