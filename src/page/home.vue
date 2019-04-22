<template>
<div class='home'>
    <iframe :src="ifsrc" id="homeIframe"></iframe>
</div>
</template>
<script>
import * as urlc from '@/js/urlConfig.js'
export default {
name:'home',
data () {
return {
    isloading:true,
    ifsrc:urlc.BASEURL+urlc.BASEPORT+'/main.html'
}
},
//实例组件
components: {},
//创建vue时的钩子
 created(){
     this.$bus.$on('rtClick', (p) => {
        console.log('forTab:'+p.url);
        this.loadIframe(p.url)
        
    })
    this.$bus.$on('onmenu', (p) => {
        console.log('forMenu:'+p.url);
        this.loadIframe(p.url)
        
    })

 },
//挂载vue时的钩子
mounted(){},
//当前vue使用的函数
methods:{
    loadIframe(url){
        this.ifsrc=urlc.BASEURL+urlc.BASEPORT+"/"+url;
        //document.getElementById('homeIframe').contentWindow.location.reload(true);
    }
},
}
</script>
<style>
.home{ width: 100%; height:calc(100% - 68px); padding: 1rem; position: absolute; bottom: 0; left:0 ;}
.home iframe{ width: 100%; height: 100%; position: relative; border: 0;}
</style> 