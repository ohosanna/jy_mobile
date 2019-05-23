<template>
<div class='com-btn ' :class="'btn-'+type" @click="tip">{{txt}}</div>
</template>
<script>
export default {
name:'btn',
props:{
    txt:String,
    type:{type:String,default:"def"}
},
data () {
 return {
}
},
//实例组件
components: {},
//创建vue时的钩子
 created(){},
//挂载vue时的钩子
mounted(){},
//当前vue使用的函数
methods:{
    tip(){
        this.$emit("inup")
    }
},
}
</script>
<style>
.com-btn{height: 2.5rem; line-height: 2.5rem; text-align: center; border-radius: 0.3rem; cursor: pointer;}
.com-btn::after{ border-radius:1rem;}
.btn-main{background:linear-gradient(3deg,#2667ec,#19acee)  !important; color: #fff;}
.btn-def{ background: #fff; color: #555; border: 1px solid #ddd;}
.btn-error{background-color: #f10e47;color: #fff;}
.com-btn.btn-main:hover{ background:linear-gradient(3deg,#1f5cd4,#099bdf)  !important;}
.com-btn.btn-def:hover{ background: #f1f1f1 !important;}
.com-btn.btn-error:hover{ background: #d40a3d !important;}
</style> 