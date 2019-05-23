<template>
    <loading :loading="isloading">
        <div class='home'>
            <iframe :src="ifsrc"></iframe>
        </div>
    </loading>
</template>
<script>
import * as urlc from '@/js/urlConfig.js'
export default {
name:'home',
data () {
return {
    isloading:false,
    ifsrc:""
}
},
//实例组件
components: {},
//创建vue时的钩子
created(){
    this.ifsrc=this.loadIframe(this.$route.query.url)
},
methods:{
    loadIframe(url){
       return  urlc.BASEURL+urlc.BASEPORT+(url?url:'/main.html')
    }
},
watch:{
    $route(to, from) {
        this.ifsrc=this.loadIframe(to.query.url);
        // this.isloading=true;
        // setTimeout(()=>{
        //     this.isloading=false;
        // },500)
    }
}
}
</script>
<style>
.home{ width: 100%; height:calc(100% - 34px); padding: 1rem; position: absolute; bottom: 0; left:0 ;}
.home iframe{ width: 100%; height: 100%; position: relative; border: 0; min-height: 50rem;}
</style> 