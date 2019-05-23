<template>
<div class='com-select-dropdown-more shadow-l' v-if="sels && sels.length>0">
    <div  v-for="(s,skey) in selects" :key="skey">
    <sel class="mb-10"
        :label="s.label" 
        :option="s.option" 
        :value="s.value"
        :id="s.id"
        :dropdownType="s.type"
        v-if="s.isshow"
        @change="(v,vid)=>{moresChange(v,vid,s.id,skey)}"
    />
    </div>
</div>
</template>
<script>

export default {
name:'moresel',
props:{
    sels:Array
},
data () {
 return {
     selects:this.sels,
     pid:"",
     cid:"",
     op2:[],
     op3:[],
     op4:[]
    }
},
//实例组件
components: {},
//创建vue时的钩子
 created(){
    //this.selects[1].option=this.cOption(area.province_list,"-1",1); 
    //console.log(this.selects);
    
 },
//当前vue使用的函数
methods:{
    
    moresChange(v,vid,sid,sk){
        this.selects[sk].value=v;
        if(sid==this.selects[0].id ){
            
        }
        if(sid==this.selects[1].id){
            
        }
        if(sid==this.selects[2].id){
           
        }
        if(sid==this.selects[3].id){
            
        }
        if(sid==this.selects[this.selects.length-1].id){
            this.$emit("moreChangess",v,vid)
        }
    }
}

}
</script>
<style>
.com-select-dropdown-more{
    position: absolute; top: 120%; left: -50%; width:200% ; z-index: 333; display: none; padding: 1rem 1rem 0;
 background: #fff;border: 1px solid #ddd;  border-radius: 0.5rem; 
}
</style> 