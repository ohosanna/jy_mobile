<template>
  <router-view />
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
      if (to.meta.requireAuth) {
        if(localStorage.islogin!="true"){
          this.$router.push("/login")
        }
        //检查是否登录超时  <-- 应该放在需要检测登录的页面来判断而不是这里，否则会影响不需要登录的页面
        // this.$US.userInfo().then(res=>{
        //     if(res.code!=0){
        //       console.log("登录超时，会自动把登录状态改成false，并跳转到登录页");
        //       this.$store.commit(this.$def.LOGIN, false)
        //       this.$router.push("/login")
        //     }
        // })
      }
    }
  }
};
</script>

