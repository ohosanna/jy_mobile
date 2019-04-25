<template>
<div class='routerTab ' ref="tabParent" >
    <div class="tab-socall" ref="tabSocall">
    <div class="box tab-box" ref="tabs">
        <div class="tab-list trn po-r" :class="-1==tabActive?'active':''" @click="routerTabClick(kzt,-1) "><i :class="kzt.icon"></i> {{kzt.name}}</div>
        <div class="tab-list trn po-r" v-for="( tl,tlkey) in tabs" :key="tlkey" :class="tlkey==tabActive?'active':''" @click="routerTabClick(tl,tlkey) ">
            <i :class="tl.icon"></i> {{tl.name}}
            <i class="fa fa-close tab-close" v-if="tl.menuId!='00'" @click.stop="deleteTab(tlkey)"></i>
        </div>
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
        tabActive:-1,
        tabPW:0
    }
},

 created(){
    this.$bus.$on('onmenu', (p) => {
        var midIndex=this.tabids.indexOf(p.menuId)
        if(midIndex!=-1){
            //console.log(midIndex);
            this.tabids.splice(midIndex,1);
            this.tabs.splice(midIndex,1);
        }
        this.tabids.unshift(p.menuId);
        this.tabs.unshift(p);
        this.tabActive=this.tabids.indexOf(p.menuId)
        setTimeout(()=>{this.setW()},20)
        if(this.$refs.tabSocall){
        this.$refs.tabSocall.scrollLeft=0}
    })
    if(this.tabActive==-1){
        this.$router.push('/home')
    }
 },
 mounted(){
    this.tabPW=this.$refs.tabParent.clientWidth
 },

methods:{
    setW(){
        var tabs=this.$refs.tabs.children
        var tabcW=0;
        for (let i = 0; i < tabs.length; i++) {
            tabcW+=tabs[0].clientWidth
        }
        this.$refs.tabs.style.width=tabcW>this.tabPW?tabcW+'px':'auto';
    },
    routerTabClick(tl,key){
        this.$router.push(this.$fun.isIframe(tl.url))//判单url是否带.html，带的话就用iframe去显示，不带就跳相应vue的路由url
        this.tabActive=key
        this.$bus.$emit("rtClick",tl)
    },
    deleteTab(key){
        this.tabs.splice(key,1);
        
        var showRouter=[]
        if(this.tabs.length>0){
            showRouter=this.tabs[0];
        }else{
            this.tabActive=-1;
            showRouter=this.kzt
        }
        this.$bus.$emit("tohome",showRouter);
        this.$router.push(this.$fun.isIframe(showRouter.url))//判单url是否带.html，带的话就用iframe去显示，不带就跳相应vue的路由url
        setTimeout(()=>{this.setW()},20)
    }
},
}
</script>
<style>
.routerTab{ margin: -1rem  -1rem 0;  background: #f2f4f9;  height: 34px; width:calc(100% + 2rem); overflow: hidden;}
.tab-socall{overflow-x: auto; overflow-y: hidden; width:100%; height:calc(100% + 12px);}
.tab-box{ min-width: 100%;}
.tab-list{ cursor: pointer; padding:0.5rem ; min-width:8rem ; text-align: center;  color: #555;}
.tab-list:hover{ background: #fff; padding-right: 2rem;}
.tab-list.active{ background: #4E5465; color: #fff;}
.tab-close{ position: absolute; width: 2rem; height: 100%; top: 0; right: 0; line-height: 34px; text-align: center; display: none;}
.tab-list:hover .tab-close{ display: block;}
</style> 