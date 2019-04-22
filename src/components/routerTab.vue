<template>
<div class='routerTab box box-ac box-wp' v-if="tabs.length>0">
    <div class="tab-list trn po-r" v-for="( tl,tlkey) in tabs" :key="tlkey" :class="tlkey==tabActive?'active':''" @click="routerTabClick(tl,tlkey) ">
        <i :class="tl.icon"></i> {{tl.name}}
        <i class="fa fa-close" v-if="tl.menuId!='00'" @click.stop="deleteTab(tlkey)"></i>
    </div>
</div>
</template>
<script>
export default {
name:'routerTab',
data () {
    return {
        tabs:[{name:"控制台",icon:"fa fa-home",url:"main.html",menuId:"00"}],
        tabids:['00'],
        tabActive:0
    }
},

 created(){
    this.$bus.$on('onmenu', (p) => {
        if(this.tabids.indexOf(p.menuId)==-1){
            this.tabids.push(p.menuId);
            this.tabs.push(p);
        }
        //console.log(this.tabids.indexOf(p.menuId));
        this.tabActive=this.tabids.indexOf(p.menuId)
        //console.log(this.tabids);
    })
    //console.log(this.tabActive);
    if(this.tabActive==0){
        this.$router.push('/home')
    }
    
 },

methods:{
    routerTabClick(tl,key){
        console.log(tl);
        if(tl.url.indexOf('.html')==-1){
           this.$router.push({name:tl.url});
        }else{
            this.$router.push('/home');
        }
        this.tabActive=key
        this.$bus.$emit("rtClick",tl)
    },
    deleteTab(key){
        this.tabs.splice(key,1);
        this.$bus.$emit("tohome",this.tabs[key])
        this.$router.push('/home');
        
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