import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

//webpack按需加载组件

const login = r =>require.ensure([], () => r(require('page/login')), 'login');
const home = r =>require.ensure([], () => r(require('page/home')), 'home');
const user = r =>require.ensure([], () => r(require('page/sys/user')), 'user');
const delivery = r =>require.ensure([], () => r(require('page/delivery/index')), 'delivery');
const deliveryPage1 = r =>require.ensure([], () => r(require('page/delivery/pages/base1')), 'deliveryPage1');
const deliveryPage2 = r =>require.ensure([], () => r(require('page/delivery/pages/base2')), 'deliveryPage2');
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
    },
    {
      path: '/delivery/h5/:id',
      name: 'delivery',
      meta: {
        title: "房产交付",
      },
      component: delivery,
      children: [
        { 
          path: '', 
          name: 'deliveryPage1',
          component: deliveryPage1 
        },
        {
          path: 'page2',
          name: 'deliveryPage2',
          component: deliveryPage2 
        }
      ]
    }
    
  ]
});


