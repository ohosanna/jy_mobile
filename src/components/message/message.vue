<template>
<transition name="fade">
    <div class="message box box-ac box-wp" :class="type" v-show="show">
      <icon :name="type" v-if="type!='info'"/>
      <span class="text">{{text}}</span>
    </div>
</transition>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'message',
    props: {
      type: {
        type: String,
        default: 'info',
        validator: val => ['info', 'success', 'warning', 'error'].includes(val)
//['info', 'success', 'warning', 'error'] 表示type只接收这四个字符串作为参数传入message组件
      },
      text: {
        type: String,
        default: ''
      },
      show: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped lang="less">
  .fade-enter-active,
  .fade-leave-active {transition: opacity .3s}
  .fade-enter,
  .fade-leave-to {opacity: 0}
  .message{
    position: fixed;
    top:50%;
    left:50%;
    text-align: center;
    min-width: 10rem;
    min-height: 10rem;
    z-index:9999999999999999999999;
    transform:translate(-50%,-50%);
    padding:1rem 2rem;
    color:#fff;
    background:rgba(0,0,0,0.6);
    font-size:1.2rem;
    border-radius:0.5rem;
    box-shadow:0 0 20px rgba(0, 0, 0, .2);
    & i{ display: block; font-size: 3rem; width: 100%; }
    & span{ display: block; width: 100%; text-align: center;}
    &.info{
      color:#fff
      }
    &.success{
      color:#69c969;
      background:#fff
      }
    &.error{
      color:#ee2720;
      background:#fff
      }
    &.warning{
      color:#e2b747;
      background:#fff
      }
    
  }
    
</style>