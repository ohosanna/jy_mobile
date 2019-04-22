<template>
<div class='box-f1'>
    <tree v-model="values" :multiple="true" :options="option" placeholder="选择消费机"  @select="onTreeSel" @input="inp" @deselect="des"/>
</div>
</template>
<script>
// import the component
  import tree from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
name:'treeSelect',
props:{
    value:Array,
    option:Array
},
data () {
 return {
     values:this.value,
     inSel:[]
 }
},
//实例组件
components: {tree},
//创建vue时的钩子
 created(){
     //console.log(this.values);
     
 },
//挂载vue时的钩子
mounted(){},
//当前vue使用的函数
methods:{
    onTreeSel(n){
        
        //this.inSel.push(this.values);
        
    },
    inp(v,i){
        //console.log('inp');
        console.log(v);
        this.$emit("treeChange",v)
        //console.log(i);
    },
    des(v){
        //console.log('des');
        
    }
},
}
</script>
<style></style> 