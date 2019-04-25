<template>
  <div class="box box-ac">
    <div class='choice br  tc' :class="[type=='checkbox'?'brr-5':'brr-y',onSelect?'ba-m  nhb':'ba-f  brc-d1']" @click="change">
      <i class="fa fa-check fz08 co-f"></i>
    </div>
	<div class="pl-5 fz10 co-5" v-if="label">{{label}}</div>
  </div>
</template>
<script>
export default {
  name: "choice",
  props: {
    type: { type: String, default: "radio" }, //radio,checkbox
	onSelect: { type: Boolean, default: false },
	label:String
  },
  methods: {
    change() {
      this.$emit("choiceChange");
    }
  }
};
</script>
<style>
.choice {
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
  display: inline-block;
  position: relative;
}
.choice i {
  width: 1rem;
  height: 1rem;
  display: block;
  line-height: 1rem;
  position: absolute;
  top: 0.1rem;
  left: 0.1rem;
}
</style> 