<template>
    <transition name="leftin">
    <div class="menus po-fix an" v-if="isShowMenu">
        <div class="menu-box" v-if="menuList.length>0">
        <div class="menu-ul"  v-for="(ml,mlkey) in menuList" :key="mlkey">
            <div class="menu-ul-ex box box-ac trn3" :class="mlkey==ulActive?'active':''" @click="menuUlClick(mlkey)">
                <i :class="ml.icon"></i> 
                <div class="box-f1 pl-5">{{ml.name}}</div>
                <icon name="xiangxia1" class="trn3 block fz10" :class="mlkey==ulActive?'tr180':''"/>
            </div>
            <div class="menu-ul-ch" v-if="ml.list.length>0 && ml.list && mlkey==ulActive">
                <div   v-for="(mll,mllkey) in ml.list" :key="mllkey" >
                <div  class="menu-list" v-if="mll.url" :class="mlkey==ulActive&&mllkey==liActive?'active':''" @click="menusclick(mll,mlkey,mllkey)">
                <i :class="mll.icon"></i> {{mll.name}}
                </div>
                </div>
            </div>
        </div>
        </div>
    </div>
    </transition>
</template>
<script>
export default {
name:'menus',
props:{
    isShowMenu:Boolean
},
data () {
 return {
    ulActive:-1,
    liActive:-1,
    chopen:[],
    menuList:[]
}
},
created(){
    
    this.$US.getMenu().then(res=>{
        if(res.code==0){
            this.menuList=res.menuList
        }else{
            console.log(res.msg);
        }
    })
    this.$bus.$on('tohome', (p) => {
        this.ulActive=p.i;
        this.liActive=p.j;
    })
    this.$bus.$on('rtClick', (p) => {
        this.ulActive=p.i;
        this.liActive=p.j;

    })
    
},
methods:{
    menusclick(p,i,j){
        p.i=i;p.j=j; //把选中的双层id附带在菜单条p上
        this.$bus.$emit("onmenu",p)//往外面抛带此菜单条的事件

        if(p.menuId==2){p.url=this.$fun.clearUrl(p.url)}//因为要演示demo，特殊把menuid=2的就是用户管理这个菜单条做成vue路由路径
        this.$router.push(this.$fun.isIframe(p.url))//判单url是否带.html，带的话就用iframe去显示，不带就跳相应vue的路由url
        
        this.ulActive=i;
        this.liActive=j;
    },
    menuUlClick(i){
        this.ulActive=i;
        this.liActive=-1;
        // if(this.chopen.indexOf(i)==-1){
        //     this.chopen.push(i)
        // }else{
        //     this.chopen.splice(this.chopen.indexOf(i),1)
        // }
    }
}

}
</script>
<style>
.menus{ width: 15%;  box-sizing: border-box;  z-index: 111;background: #393D49; height: calc(100% - 4rem); top: 4rem; left: 0; padding-bottom: 2rem; overflow: hidden;}
.menu-box{ width:calc(100% + 2rem); padding-right: 0.7rem; height: 100%; overflow-y:scroll; overflow-x: hidden;}
.menu-ul{ color: #c2c2c2;}
.menu-ul-ex{ padding: 1rem ; cursor: pointer; position: relative;}
.menu-ul-ex::after{ content: ""; display: block; position: absolute; left: 0; top: 5%; height: 90%; width: 0.4rem; border-radius: 0.1rem}
.menu-ul-ex::after{transition: all 0.3s ease-out 0s;}
.menu-ul-ex:hover{background: #4E5465;}
.menu-ul-ex:hover::after{ background:#1E9FFF }
.menu-ul-ex.active::after{ background:#1E9FFF }

.menu-list{ padding: 1rem 2rem; cursor: pointer;}
.menu-list:hover{ background: #4E5465;}
.menu-list.active{color: #fff; background: #1E9FFF;}

</style> 