<template>
<div class='head box box-ac co-f shadow-l plr-20'>
  <div class="box-f1 fz16 fw">劲云平台</div>

  <a >欢迎您 {{user.companyName}}-{{user.petName}}</a>
  <a  @click="logout">退出登录 <icon name="zhixiang-you" class="fz10"/> </a>

</div>
</template>
<script>
export default {
name:'',
data () {
 return {
   user:""
}
},
//实例组件
components: {},
computed:{
    users(){
        return this.$US.userInfo().then(res=>{
          if(res.code==0){
            this.$store.commit(this.$def.USER, res.user)
            return this.$store.state.user
          }else{
            console.log("超时刷新，用户接口无法获取了,会自动把登录状态改成false，并跳转到登录页");
            this.$store.commit(this.$def.LOGIN, false)
            this.$router.push("/login")
          }
        })
    }
},
//创建vue时的钩子
 created(){},
//挂载vue时的钩子
mounted(){
  this.users.then(res=>{
        this.user=res
    });
},
//当前vue使用的函数
methods:{
  logout(){
    this.$store.commit(this.$def.LOGIN, false);
    this.$router.push("/login")
  }
},
}
</script>
<style>
.c2{color: #c2c2c2;}
.head{ position: fixed; top: 0; left: 0; width: 100%; box-sizing: border-box; z-index: 222; background: #4E5465; line-height: 4rem; height: 4rem;}
.head a{ cursor: pointer; text-decoration: none; color: #c2c2c2; padding: 0 0.5rem; font-size: 1rem;}
.head a:hover{ color: #fff;}
</style> 