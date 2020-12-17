import 'babel-polyfill'
import 'amfe-flexible';
import Vue from 'vue'
import App from './App'

import VueRouter from "vue-router"
import Vuex from 'vuex'
//import mui from './plugins/mui'
//import ontouch from './plugins/ontouch'
import Store from './vuex/store'
import routers from './routerconfig/routers'
import labor from 'labor';
import commonfunc from './js/common'
import moment from 'moment'
import axios from 'axios'
axios.defaults.withCredentials=true;
import VueAxios from 'vue-axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'


//import 'swiper/swiper-bundle.css'
import 'swiper/css/swiper.css'


import qs from 'qs';
//import Qs from 'qs';
import {
  List,
  Tab,
  Tabs,
  Cell,
  CellGroup,
  Panel /* ,ImagePreview */ ,
  Field,
  Button,
  Toast,
  Search,
  Tag,
  Swipe,
  SwipeItem,
  Lazyload,
  Sticky,
  Card,
  Divider,
  Tabbar,
  TabbarItem,
  Uploader,
  NavBar,
  Image as VanImage,
  Icon,
  Form,
  Picker,
  Popup,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Radio,
  DatetimePicker,
  Loading,
  PullRefresh,
  Notify,
  Empty,
  NoticeBar,
  //Dialog,
} from 'vant';




//import MintUI from 'mint-ui'

//import 'mint-ui/lib/style.css'

//Vue.use(MintUI)
console.log(process);
Vue.use(Vuex)
//Vue.use(mui)
Vue.use(VueRouter);
//Vue.use(ontouch);
Vue.use(List)
  .use(Tab)
  .use(Tabs)
  .use(Cell)
  .use(CellGroup)
  .use(Panel) /* .use(ImagePreview) */
  .use(Field)
  .use(Button)
  .use(Toast)
  .use(Search)
  .use(Tag)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(Sticky)
  .use(Card)
  .use(Divider)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Uploader)
  .use(NavBar)
  .use(VanImage)
  .use(Icon)
  .use(Form)
  .use(Picker)
  .use(Popup)
  .use(VueAxios, axios)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Radio)
  .use(RadioGroup)
  .use(DatetimePicker)
  .use(Loading)
  .use(PullRefresh)
  .use(Notify)
  .use(Empty)
  .use(VueAwesomeSwiper)
  .use(NoticeBar);
  //.use(Dialog);
console.log(process.env.VUE_APP_BUILD_TYPE);



//Vue.prototype.pageconfig = pageconfig;


//if(process.env.VUE_APP_BUILD_TYPE == "rzlive"){
  Vue.prototype.pageconfig = commonfunc.config.rz;
//}
console.log("新的开始");
moment.locale('zh-cn');
Vue.prototype.qs=qs;
Vue.prototype.$moment = moment;//赋值使用
Vue.prototype.$labor = labor;//齐鲁工惠sdk

Vue.prototype.$commonfunc = commonfunc;//自定义公共方法
// 定义时间格式全局过滤器
 Vue.filter('dateFormat', function (daraStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(daraStr).format(pattern)
})




const store = new Vuex.Store(Store)
const router = new VueRouter({
  //mode: 'hash',
  base: __dirname,
  routes: routers,
})

router.beforeEach((to, from, next) => {
  from.meta.scrollY = window.scrollY
  Object.assign(to.meta, to.params, to.query);


  next();

})

router.afterEach(route => {




  //router.app.$store.commit('getQighUser');
  if (route.meta.scrollY) {
    setTimeout(function() {
      window.scrollTo(0, route.meta.scrollY)
    }, 0)
  } else {
    window.scrollTo(0, 0)
  }
})

var vm = new Vue({
  store,
  router,
  created() {

  },
  render: h => h(App),

}).$mount('#app')




import $ from 'jquery'

//const wxSdk = require('./plugins/shareConfig.js')($);
