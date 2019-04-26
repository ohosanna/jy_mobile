import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from './store';

//css的引用
import './style/css/main.css'
import './assets/icon/iconfont.js'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

//公用组件的引用
import icon from "components/icon.vue"
import sel from "components/sel/sel.vue"
import treeSel from "components/sel/treeSels.vue"
import btn from "components/btn.vue"
import tab from "components/tab.vue"
import paging from "components/paging.vue"
import def from "components/def.vue"
import loading from "components/loading.vue"
import choice from "components/choice.vue"
import popup from "components/popup.vue"
Vue.component("treeSel", treeSel)
Vue.component("icon", icon)
Vue.component("sel", sel)
Vue.component("btn", btn)
Vue.component("tab", tab)
Vue.component("paging", paging)
Vue.component("def", def)
Vue.component("loading", loading)
Vue.component("choice", choice)
Vue.component("popup", popup)


//抛向全局
import * as util from '@/js/util.js'
import * as deff from '@/store/def.js'
import * as pubServer from "@/server/publicServer.js";
Vue.prototype.$fun = util;
Vue.prototype.$US = pubServer;
Vue.prototype.$def = deff;
Vue.prototype.$bus = new Vue()


new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
