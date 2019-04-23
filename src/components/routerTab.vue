<template>
<div class='routerTab ' >
    <div class="box box-ac">
        <div class="tab-list trn po-r" :class="-1==tabActive?'active':''" @click="routerTabClick(kzt,-1) "><i :class="kzt.icon"></i> {{kzt.name}}</div>
        <div class="tab-list trn po-r" v-for="( tl,tlkey) in tabs" :key="tlkey" :class="tlkey==tabActive?'active':''" @click="routerTabClick(tl,tlkey) ">
            <i :class="tl.icon"></i> {{tl.name}}
            <i class="fa fa-close" v-if="tl.menuId!='00'" @click.stop="deleteTab(tlkey)"></i>
        </div>
    </div>
</div>
</template>
<script>
export default {
name:'routerTab',
data () {
    return {
        kzt:{name:"控制台",icon:"fa fa-home",url:"main.html",menuId:"00",i:-1,j:-1},
        tabs:[],
        tabids:[],
        tabActive:-1
    }
},

 created(){
    this.$bus.$on('onmenu', (p) => {
        var midIndex=this.tabids.indexOf(p.menuId)
        if(midIndex!=-1){
            console.log(midIndex);
            
            this.tabids.splice(midIndex,1);
            this.tabs.splice(midIndex,1);
        }
        this.tabids.unshift(p.menuId);
        this.tabs.unshift(p);
        this.tabActive=this.tabids.indexOf(p.menuId)
    })
    if(this.tabActive==-1){
        this.$router.push('/home')
    }
 },

methods:{
    routerTabClick(tl,key){
        this.$router.push(this.$fun.isIframe(tl.url))//判单url是否带.html，带的话就用iframe去显示，不带就跳相应vue的路由url
        this.tabActive=key
        this.$bus.$emit("rtClick",tl)
    },
    deleteTab(key){
        this.tabs.splice(key,1);
        var showRouter=[]
        if(this.tabs.length>0){
            showRouter=this.tabs[0]
        }else{
            showRouter=this.kzt
        }
        this.$bus.$emit("tohome",this.tabs[0]);
        this.$router.push(this.$fun.isIframe(showRouter.url))//判单url是否带.html，带的话就用iframe去显示，不带就跳相应vue的路由url
    }
},
}
</script>
<style>
.routerTab{ margin: -1rem  -1rem 0;  background: #f2f4f9;}
.tab-list{ cursor: pointer; padding:0.5rem 1rem;  color: #555;}
.tab-list:hover{ background: #fff;}
.tab-list.active{ background: #4E5465; color: #fff;}

</style> 