import home from '../components/home'
import homepage from '../components/homepage'
import LiveRoom from '../components/LiveRoom'
import Attend from '../components/Attend'
import My from '../components/My'
import MyActivity from '../components/MyActivity'
import Chat from '../components/Chat'
import PersonInfo from '../components/PersonInfo'
import Activity from '../components/Activity'
import Information from '../components/Information.vue'
import ChatInformation from '../components/ChatInformation'
import About from '../components/About'
//console.log(Chat)
/* import activity from 'components/activity'
import integral from 'components/integral'
import mine from 'components/mine' */

let routers = [
  {
		path: '/',
    name: '/',
		component: home,
		meta: {
			requiresAuth: true,
			title: '首页'
		},
		children: [{
			path: '/',
			component: homepage,
			name: 'homepage',
			meta: {
				title: "首页",
				backShow: false,
        keepAlive: true
			}
		}, {
      path: '/LiveRoom/:uniacid/:id',
      name: 'liveroom',
      component: LiveRoom,
      meta: {
        title: "直播间",
      }
    }, {
      path: '/Attend',
      name: 'attend',
      component: Attend,
      meta: {
        title: "报名",
        keepAlive: true // 需要被缓存
      }
    }, {
      path: '/My',
      name: 'my',
      component: My,
      meta: {
        title: "我的",
        keepAlive: true
      }
    }, {
      path: '/Chat',
      name: 'chat',
      component: Chat,
      meta: {
        title: "消息",
        keepAlive: true
      }
    }]
	}, {
    path: '/PersonInfo/:uniacid/:id',
    name: 'personInfo',
    component: PersonInfo,
    meta: {
      title: "个人资料",
    }
  }, {
    path: '/Activity',
    name: 'activity',
    component: Activity,
    meta: {
      title: "活动",
      keepAlive: true
    }
  }, {
    path: '/Information/:uniacid/:id/:type?',
    name: 'information',
    component: Information,
    props: true,
    meta: {
      title: "活动回顾详情",
    }
  }, {
    path: '/MyActivity/:uniacid',
    name: 'myactivity',
    component: MyActivity,
    props: true,
    meta: {
      title: "我的活动",
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: '/ChatInformation/:uniacid/:yuid/:name?/:avator?',
    name: 'chatinformation',
    component: ChatInformation,
    //props: true,
    meta: {
      title: "聊天",
      keepAlive: true // 需要被缓存
    }
  },
  {
    path: '/About/:uniacid',
    name: 'about',
    component: About,
    //props: true,
    meta: {
      title: "关于我们",
      keepAlive: true // 需要被缓存
    }
  },



]

export default routers;
