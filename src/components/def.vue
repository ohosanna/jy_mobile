<template>
<div class='def'>
    <icon :name="icon"/>
    <div>{{txt}}</div>
</div>
</template>
<script>
export default {
    name:'def',
    props:{
        icon:{type:String,default:"yunwei3"},
        txt:{type:String,default:"暂无数据"},
    }
}
</script>
<style>
.def{ width: 100%; padding: 20%; text-align: center;}
.def i{font-size: 4rem; color: #aaa; }
.def div{font-size: 1.4rem;color: #888; margin-top: 1rem}
</style> 