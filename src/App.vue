<template>
  <div id="app" class="app" v-if="pathName!='login'">
    <h/>
    <div class="menus-btn trn3" :class="menuOpen?'w15':''" @click="menuOpen=!menuOpen"><icon name="rightBlock" :class="menuOpen?'tr180 trn3':'trn3'"/></div>
    <menus :isShowMenu="menuOpen"/>
    <div class="rv trn3" :class="menuOpen?'':'w100'">
      <router-tab />
      <router-view  />
    </div>
  </div>
  <router-view  v-else/>
</template>
<script>
import h from "components/head.vue";
import menus from "components/menus.vue";
import routerTab from "components/routerTab.vue";
export default {
  name: "app",
  data(){
    return{
      pathName:'login',
      menuOpen:true
    }
  },
  components: { menus,h,routerTab },
  methods:{
  },
  watch: {
    $route(to, from) {
      console.log(to.name);
      
      /* 路由发生变化修改页面title */
      if (to.meta.title) {
        document.title = to.meta.title;
      }
      // 把新挑战的路由明赋值给pathname，以方便判断跳转
      this.pathName=to.name;

      //检查登录状态
      //console.log("是否为登录状态："+localStorage.islogin);
      if(localStorage.islogin!="true"){
        this.$router.push("/login")
      }
      //检查是否登录超时
      this.$US.userInfo().then(res=>{
          if(res.code!=0){
            console.log("登录超时，会自动把登录状态改成false，并跳转到登录页");
            this.$store.commit(this.$def.LOGIN, false)
            this.$router.push("/login")
          }
      })
    }
  }
};
</script>
<style>

.rv{ position: absolute; width: 85%; right: 0; top: 4rem; z-index: 99; padding: 1rem; min-height: calc(100% - 4rem);}
.menus-btn{ cursor: pointer; width: auto; padding: 0 0.5rem; z-index: 99999; position: fixed; text-align: center; bottom: 0; left: 0; background: #596074; color: #c2c2c2; line-height: 2rem;height: 2rem;}
.menus-btn i{display: inline-block;}
.menus-btn:hover{ background: #4E5465; color: #fff;}
.w15{ width: 15%;}
</style>

