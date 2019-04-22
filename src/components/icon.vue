<template>
    <i :class='"xzbicon "+beforName+name' v-if="drawType=='class'" @click="tip"></i>
    <svg class="icon"  aria-hidden="true" v-else v-html="use" @click="tip">{{use}}</svg>
</template>
<script>
export default {
    name:'icon',
    props:{
        drawType:{type:String,default:'class'},
        name:String

    },
    data () {
        return {
            beforName:"micon-",
            use:"<use xlink:href='#"+this.name+"'></use>"
        }
    },methods:{
        tip(){
            this.$emit("toup")
        }
    }
}
</script>
<style>
.icon {
  width: 1rem;
  height: 1rem;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style> 