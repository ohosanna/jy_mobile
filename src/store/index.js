import Vue from 'vue';
import Vuex from 'vuex';
import * as def from './def.js';
Vue.use(Vuex);

const store = {
  state: {
    islogin:1,
    user:{},
    token:null,
    routerTab:[]
  },
  mutations: {
    [def.LOGIN]: (state, data) => {
      // localStorage.token = data;
      // state.token = data;
      state.islogin=data;
      localStorage.islogin=data
    },
    [def.LOGOUT]: (state) => {
        localStorage.removeItem('token');
        state.token = null
    },
    [def.USER]: (state,data) => {
      state.user = data
    }
  },
  actions: {
    
  },
  getters: {}
};
export default new Vuex.Store(store);
