import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

//webpack按需加载组件

const login = r =>require.ensure([], () => r(require('page/login')), 'login');
const home = r =>require.ensure([], () => r(require('page/home')), 'home');
const user = r =>require.ensure([], () => r(require('page/sys/user')), 'user');
const delivery = r =>require.ensure([], () => r(require('page/delivery/index')), 'delivery');
const deliveryPage1 = r =>require.ensure([], () => r(require('page/delivery/pages/page1')), 'deliveryPage1');
const deliveryPage2 = r =>require.ensure([], () => r(require('page/delivery/pages/page2')), 'deliveryPage2');
const deliveryPage3 = r =>require.ensure([], () => r(require('page/delivery/pages/page3')), 'deliveryPage3');
const deliveryPage4 = r =>require.ensure([], () => r(require('page/delivery/pages/page4')), 'deliveryPage4');
const deliveryPage5 = r =>require.ensure([], () => r(require('page/delivery/pages/page5')), 'deliveryPage5');
const deliveryPage6 = r =>require.ensure([], () => r(require('page/delivery/pages/page6')), 'deliveryPage6');
const deliveryPage6_1 = r =>require.ensure([], () => r(require('page/delivery/pages/page6_1')), 'deliveryPage6_1');
const deliveryPage7 = r =>require.ensure([], () => r(require('page/delivery/pages/page7')), 'deliveryPage7');
const deliveryPage8 = r =>require.ensure([], () => r(require('page/delivery/pages/page8')), 'deliveryPage8');
const deliveryPage9 = r =>require.ensure([], () => r(require('page/delivery/pages/page9')), 'deliveryPage9');
const deliveryPage10 = r =>require.ensure([], () => r(require('page/delivery/pages/page10')), 'deliveryPage10');
const deliveryPage11 = r =>require.ensure([], () => r(require('page/delivery/pages/page11')), 'deliveryPage11');
const deliveryPage12 = r =>require.ensure([], () => r(require('page/delivery/pages/page12')), 'deliveryPage12');
const deliveryPage13 = r =>require.ensure([], () => r(require('page/delivery/pages/page13')), 'deliveryPage13');
const deliveryPage14 = r =>require.ensure([], () => r(require('page/delivery/pages/page14')), 'deliveryPage14');
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
          component: deliveryPage1, 
          meta: {
            title: "房产交付",
          },
        },
        {
          path: 'page2',
          name: 'deliveryPage2',
          component: deliveryPage2, 
          meta: {
            title: "查询我的房",
          },
        },
        {
          path: 'page3',
          name: 'deliveryPage3',
          component: deliveryPage3 
        },
        {
          path: 'page4',
          name: 'deliveryPage4',
          component: deliveryPage4 
        },
        {
          path: 'page5',
          name: 'deliveryPage5',
          component: deliveryPage5 
        },
        {
          path: 'page6',
          name: 'deliveryPage6',
          component: deliveryPage6 
        },
        {
          path: 'page6-1',
          name: 'deliveryPage6-1',
          component: deliveryPage6_1 
        },
        {
          path: 'page7',
          name: 'deliveryPage7',
          component: deliveryPage7 
        },
        {
          path: 'page8',
          name: 'deliveryPage8',
          component: deliveryPage8 
        },
        {
          path: 'page9',
          name: 'deliveryPage9',
          component: deliveryPage9 
        },
        {
          path: 'page10',
          name: 'deliveryPage10',
          component: deliveryPage10 
        },
        {
          path: 'page11',
          name: 'deliveryPage11',
          component: deliveryPage11 
        },
        {
          path: 'page12',
          name: 'deliveryPage12',
          component: deliveryPage12 
        },
        {
          path: 'page13',
          name: 'deliveryPage13',
          component: deliveryPage13 
        },
        {
          path: 'page14',
          name: 'deliveryPage14',
          component: deliveryPage14 
        },
      ]
    }
    
  ]
});


