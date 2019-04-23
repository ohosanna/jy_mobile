import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

//webpack按需加载组件

const login = r =>require.ensure([], () => r(require('page/login')), 'login');
const home = r =>require.ensure([], () => r(require('page/home')), 'home');
const user = r =>require.ensure([], () => r(require('page/sys/user')), 'user');
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
      meta:{title:"劲云"},
    },
    {
      path: '/login',
      name: 'login',
      meta:{title:"劲云登录"},
      component: login
    },
    {
      path: '/home',
      name: 'home',
      meta:{
        title:"主页",
        requireAuth:true
      },
      component: home
    },
    {
      path: '/user',
      name: 'user',
      meta:{
        title:"用户信息",
        requireAuth:true
      },
      component: user
    }
    
  ]
});


