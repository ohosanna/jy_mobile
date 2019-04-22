<template>
    <sel  
    label="学校名称" 
    :option="op" 
    :isInp="!isTrue" 
    :value="value" 
    id="selSchool" 
    dropdownType="moreSel"
    @moreChange="moreChange"
    />
</template>
<script>
export default {
name:'schoolSel',
data () {
 return {
    isTrue:true,
    value:'',
    op:[
        {label:"所属SA ",type:"sel",value:"",id:"selSa",option:[{ex:"--通过地址找学校--",id:"toaddress"}],isshow:true},
        {label:"所属省份",type:"sel",value:"",id:"selP",option:[{ex:"--通过SA找学校--",id:"tosa"}],isshow:true},
        {label:"所属地市",type:"sel",value:"",id:"selC",option:[],isshow:true},
        {label:"所属镇区",type:"sel",value:"",id:"selCo",option:[],isshow:true},
        {label:"学校名称",type:"sel",value:"",id:"selInschool",option:[],isshow:true}
    ]
}
},
//实例组件
components: {},
//创建vue时的钩子
 created(){
    
    // this.$CMS.getSaList().then(res=>{
    //      if(res.rtnCode=="0000000"){
    //         res.data.map(item=>{
    //             var o0={ex:item.name,id:item.id}
    //             this.op[0].option.push(o0)
    //         })
    //      }
    // })
    // this.$CMS.getAllProvinces().then(res=>{
    //     if(res.rtnCode=="0000000"){
    //         res.data.map(item=>{
    //             var o1={ex:item.provinceName,id:item.id}
    //             this.op[1].option.push(o1)
    //         })
    //     }
         
    // })
    
 },
//挂载vue时的钩子
mounted(){},
//当前vue使用的函数
methods:{
    moreChange(v,id){
        this.$emit("schoolChange",v,id)
    }
},
}
</script>
<style></style> 