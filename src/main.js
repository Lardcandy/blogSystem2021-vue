import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
import CryptoJS from 'crypto-js'
// import COS from 'cos-js-sdk-v5'
// var COS = require('cos-js-sdk-v5')
// import * as qiniu from 'qiniu-js'
// import NodeRSA from 'node-rsa'

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.use(Vuex)
Vue.use(VueCookies)
Vue.use(CryptoJS)
// Vue.use(COS)
// Vue.use(qiniu)
// Vue.use(NodeRSA)
// Vue.use(cors)

Vue.config.productionTip = false

Vue.prototype.$axios = axios.create({
  baseURL: 'http://119.23.68.153:3000/'
})
let myAxios = axios.create({
  baseURL: 'http://119.23.68.153:3000/'
})
Vue.prototype.$crypto = CryptoJS
// Vue.prototype.$qiniu = qiniu
Vue.prototype.$cookies = VueCookies
Vue.$cookies.config('3d')

// vuex 状态管理
let store = new Vuex.Store({
  state: {
    loginFlag: false,
    userInfo: {
      userId: '',
      username: '',
      description: '',
      submittedAtc: [],
      savedAtc: [],
      deletedAtc: []
    },
    atcList: [],
    operateAtc: {},
    deleteFlag: false
  },
  mutations: {
    // 登录
    login(state, info) {
      state.loginFlag = true
      state.userInfo.userId = info.userId
      state.userInfo.username = info.username
      state.userInfo.description = info.description
    },
    // 退出登录
    logout(state) {
      state.loginFlag = false
      state.userInfo.userId = ''
      state.userInfo.username = ''
      state.userInfo.description = ''
    },
    // 首页 请求所有 已发表 文章信息
    setArticleList(state, list) {
      state.atcList = list
    },
    // 修改个人信息
    updatePersonalInfo(state, info) {
      state.userInfo.description = info.description
    },
    // 要操作的文章的 文章信息
    setOperateAtc(state, info) {
      state.operateAtc = info
    },
    // 完成删除文章的标志，用于刷新 我的博客 组件的数据
    setDeleteFlag(state, flag) {
      state.deleteFlag = flag
    }
  },
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 如果页面需要登录
  if (to.meta.requireLogin) {
    // 由于新标签页无法获取这里的vuex的数据，所以要向数据库验证
    // cookies验证登录
    if (Vue.$cookies.get('user_id') && Vue.$cookies.get('user_pw')) {
      let id = parseInt(Vue.$cookies.get('user_id'))
      let pw = Vue.$cookies.get('user_pw')
      myAxios
        .post("/login/validateLogin", {
          userId: id,
          password: pw
        })
        .then(ret => {
          if (ret.data.length === 1) {
            // cookies验证登陆成功，跳转到对应的路由
            let info = {
              userId: ret.data[0].user_id,
              username: ret.data[0].username,
              description: ret.data[0].description
            };
            store.commit("login", info);
            next()
          } else {
            // 验证登录失败，跳转到登录页面
            console.log("cookies验证登录失败,估计有扑街修改了cookie");
            next({
              path: '/loginRegister'
            })
          }
        });
    } else {
      console.log('未登录啊老哥')
      next({
        path: '/loginRegister'
      })
    }
  } else {
    next()
  }
})


new Vue({
  render: h => h(App),
  router,
  store,
  created() {
    // cookies验证登录
    if (Vue.$cookies.get('user_id') && Vue.$cookies.get('user_pw')) {
      let id = parseInt(Vue.$cookies.get('user_id'))
      let pw = Vue.$cookies.get('user_pw')
      myAxios
        .post("/login/validateLogin", {
          userId: id,
          password: pw
        })
        .then(ret => {
          if (ret.data.length === 1) {
            // cookies验证登陆成功，将用户信息存到vuex
            let info = {
              userId: ret.data[0].user_id,
              username: ret.data[0].username,
              description: ret.data[0].description
            };
            store.commit("login", info);
          } else {
            // 验证登录失败，跳转到登录页面
            console.log("cookies验证登录失败");
          }
        });
    }
  }
}).$mount('#app')