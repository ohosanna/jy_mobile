<template>
<transition name="fadein2" >
    <div class='loading tc an' v-if="loading">
        <div class="loadbox po-ab  in-c">
            <icon name="loading" class="fz60 an-rotates block co-9"/>
            <span class="fz12 mt-10 block co-9">加载中</span>
        </div>
    </div>
    <slot v-else/>
</transition>
</template>
<script>
export default {
name:'loading',
props:{loading:Boolean},
data () {
 return {
    }
},
//实例组件
components: {},
//创建vue时的钩子
 created(){
     this.$emit("startLoading")
 },
//挂载vue时的钩子
mounted(){},
//当前vue使用的函数
methods:{},
}
</script>
<style>
.loading{  position: absolute; left: 0; top: 50%; transform: translateY(-50%); z-index: 9999; width: 100%;}
</style>

