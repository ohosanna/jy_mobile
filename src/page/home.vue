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
         this.loadIframe(p.url)
    })
    this.$bus.$on('onmenu', (p) => {
        this.loadIframe(p.url)
    })
    this.$bus.$on('tohome', (p) => {
        this.loadIframe(p.url)
    })
 },
methods:{
    loadIframe(url){
        this.ifsrc=urlc.BASEURL+urlc.BASEPORT+"/"+url;
    }
}
}
</script>
<style>
.home{ width: 100%; height:calc(100% - 34px); padding: 1rem; position: absolute; bottom: 0; left:0 ;}
.home iframe{ width: 100%; height: 100%; position: relative; border: 0;}
</style> 