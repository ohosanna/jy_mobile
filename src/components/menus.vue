<template>
    <transition name="leftin">
    <div class="menus po-fix an" v-if="isShowMenu">
        <div class="menu-box" v-if="menuList.length>0">
        <div class="menu-ul"  v-for="(ml,mlkey) in menuList" :key="mlkey">
            <div class="menu-ul-ex box box-ac trn3" :class="mlkey==ulActive?'active':''" @click="menuUlClick(mlkey)">
                <i :class="ml.icon"></i> 
                <div class="box-f1 pl-5">{{ml.name}}</div>
                <icon name="xiangxia1" class="trn3 block fz10" :class="chopen.indexOf(mlkey)!=-1?'tr180':''"/>
            </div>
            <div class="menu-ul-ch" v-if="ml.list.length>0 && ml.list && chopen.indexOf(mlkey)!=-1">
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
            //console.log(res.menuList);
            this.menuList=res.menuList
        }else{
            console.log(res.msg);
        }
        
    })
    this.$bus.$on('tohome', (p) => {
        this.ulActive=-1
        this.liActive=-1
        this.chopen=[]
    })
},
methods:{
    menusclick(p,i,j){
        this.$bus.$emit("onmenu",p)
        if(p.menuId==2){
            p.url=this.$fun.clearUrl(p.url) //过滤url的其他杂质
        }
       if(p.url.indexOf('.html')!=-1){
           this.$router.push('/home');
       }else{
           this.$router.push({name:p.url});
       }
        
        this.ulActive=i;
        this.liActive=j;
    },
    menuUlClick(i){
        this.ulActive=i;
        if(this.chopen.indexOf(i)==-1){
            this.chopen.push(i)
        }else{
            this.chopen.splice(this.chopen.indexOf(i),1)
        }
    }
}

}
</script>
<style>
.menus{ width: 18%;  box-sizing: border-box;  z-index: 111;background: #393D49; height: calc(100% - 4rem); top: 4rem; left: 0; padding-bottom: 2rem; overflow: hidden;}
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