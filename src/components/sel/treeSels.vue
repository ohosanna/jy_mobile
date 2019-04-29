<template>
<div class='com-select box box-ac' >
    <label class="fz10 co-5 block" v-if="label"><span class="co-er" v-if="necessary">*</span> {{label}}：</label>
    <tree 
    v-model="values" 
    :multiple="multiple"
    :options="options" 
    :alwaysOpen="alwaysOpen"
    :placeholder="placeholder"  
    :load-options="isloadOption?loadOptions:()=>{}"  
    :openOnClick="!isTrue"
    @select="onTreeSel" 
    @input="inp" 
    @deselect="des" 
    class="box-f1"/>
</div>
</template>
<script>
// import the component
  import tree from '@riophae/vue-treeselect'
  // import the styles
  //import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
name:'treeSelect',
props:{
    label:{type:String,default:""},
    necessary:{type:Boolean,default:false},
    multiple:{type:Boolean,default:true},
    alwaysOpen:{type:Boolean,default:false},
    isloadOption:{type:Boolean,default:true},
    optionData:Array,
    valuess:Array,
    value:Number,
    id:String
},
data () {
 return {
     values:this.multiple?this.valuess:this.value,
     isTrue:true,
     inSel:[],
     options:[],
     placeholder:'请选择'+this.label,
     normalizer(node) {
      return {
        id:node.id,
        label: node.name,
        children:node.children,
      }
    },
 }
},
//实例组件
components: {tree},

//创建vue时的钩子
 created(){
    
 },
 watch:{
     optionData(val){
        if(val.length>0){
            if(this.isloadOption){
                this.options=this.coption(val,0);
            }else{
                this.options=val.map(item=>{
                    return { id:item.id,label:item[this.id]}
                })
            }
            
        }else{
            this.options=[]
        }
     },
     value(val){
        this.values=this.multiple?this.valuess:val
     },
     valuess(val){
        this.values=this.multiple?val:this.value
     }
     
 },
 

methods:{
    onTreeSel(n){
        //this.inSel.push(this.values); 
    },
    inp(v,i){
        this.$emit("treeChange",v)
    },
    des(v){
        //console.log('des');
    },
    coption(data,pid){
        var kk=[]
        data.map(item => {
            if (item.parentId == pid) {
                let flage = false;
                data.every((value, index) => {
                    if (value.parentId == item.id) {
                        flage = true;
                        return false;
                    } else {
                        return true;
                    }
                });
                if (flage) {
                    kk.push({id: item.id, label: item[this.id], children: null})
                }else{
                    kk.push({id: item.id, label: item[this.id]})
                }
            }
        })
        return kk
    },
    loadOptions({ action, parentNode, callback }){
        parentNode.children=this.coption(this.optionData,parentNode.id)
        callback()
    }
},
}
</script>
<style></style> 