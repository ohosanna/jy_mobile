<template>
<div class='popup'>
    <transition name="upIn">
        <div  v-if="show" class="intab-poup in-c ba-f  brr-5 " :class="popupClass">
            <slot name="popupMain"/>
            <slot name="popupBtn" v-if="popupBtnSlot"/>
            <div class="tc mt-10" v-else :class="popupBtnClass">
                <btn txt="确定" type="main" class="inline-block plr-20 mr-5" @inup="popupSure" />
                <btn txt="取消" class="inline-block plr-20" @inup="popupClose" />
            </div>
        </div>
    </transition>
    <transition name="fadeIn">
        <div class="intab-poup-mask" v-if="show" @click="popupClose"></div>
    </transition>
</div>
</template>
<script>
export default {
name:'popup',
props:{
    show:Boolean,
    popupClass:String,
    popupBtnClass:String,
    popupBtnSlot:{type:Boolean,default:false}
},
methods:{
    popupClose(){
        this.$emit("cancel")
    },
    popupSure(){
        this.$emit("confirm")
    }
},
}
</script>
<style>
.intab-poup{
    position: fixed; width:auto; z-index: 999;
}
.intab-poup-mask{ width: 100%; height: 100%; position: fixed; background: rgba(0,0,0,0.4); top: 0; left: 0; z-index: 998;}
</style> 