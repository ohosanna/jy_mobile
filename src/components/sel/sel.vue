<template>
  <div class='com-select box box-ac' >
    <label class="fz10 co-5 block" v-if="label"><span class="co-er" v-if="necessary">*</span> {{label}}：</label>
    <date-sel  v-if="dropdownType=='dateAndDate' || dropdownType=='date'" :dateType="dropdownType" :value="value" @dateChange="dateChange" />
    <tree-sel  v-else-if="dropdownType=='tree'"  :option="option" :value="valueC==''?[]:[valueC]" @treeChange="treeChange"/>
    <div v-else class="com-select-right box-f1 po-r" :class="[showDd?'open':'',positionClass,dropdownType=='moreSel'?'msel':'']" :id="id" >
      <div class="com-select-right- po-r" >
        <input type="text" :placeholder="pla" :readonly="!isInp" :class="inputClass"  @click="isSel?dropdownSW():''" v-model="valueC" @input="inputChange">
        <icon v-if="isSel" name="xiangxia3" class="fz12 co-9 po-ab in-tr"  @toup="dropdownSW"/>
      </div>
      <transition name="downin" >
      <div class="com-select-dropdown an"  v-if="dropdownType=='sel' && showDd">
        <a v-for="(opt,optkey) in option" :key="optkey" @click="tovalue(optkey)">{{opt.ex}}</a>
      </div>
      </transition>
      <transition name="downin" >
      <more-sel :sels="option"  v-if="dropdownType=='moreSel' && showDd" @moreChangess="moreChanges" class="an"/>
      </transition>
    </div>
    
  </div>
</template>
<script>

import moreSel from "components/sel/moreSel.vue"
import dateSel from "components/sel/dateSel.vue"
import treeSel from "components/sel/treeSel.vue"
export default {
  name: "comSelect",
  props: {
    label: String,//标题
    necessary:{type:Boolean,default:false},
    id:String,
    isSel:{type:Boolean,default:true},//是否为下拉框
    isInp:{type:Boolean,default:false},//输入框是否可输入
    value:String,//输入框值
    inputClass:String,//给输入框预留class入口
    positionClass:String,//给线框预留class入口
    dropdownType:{type:String,default:'sel'},//下拉类型
    option: Array//下拉配置项
  },
  data() {
    return {
      pla:"",
      valueC:'',
      showDd:false,
    };
  },
  //实例组件
  components: {moreSel,dateSel,treeSel},
  //创建vue时的钩子
  created() {
    this.valueC=this.value;
    this.pla=this.isSel?'请选择'+this.label:'请填写'+this.label
  },
  //挂载vue时的钩子
  mounted(){
      if(this.isSel){
        document.addEventListener('click',(e)=>{
            var sc= document.getElementById(this.id)
            if(!this.$fun.isParent(e.target,sc)){
                this.showDd=false
            }
        })
      }
  },
  //当前vue使用的函数
  methods: {
    
    dropdownSW(){
      this.showDd=!this.showDd
    },
    tovalue(key){
      this.valueC=this.option[key].ex;
      var valueId=this.option[key].id;
      this.showDd=false;
      this.$emit("change",this.valueC,valueId)
    },
    inputChange(){

      this.$emit("inpChange",this.valueC)
    },
    moreChanges(v,id){
      this.valueC=v;
      this.showDd=false;
      this.$emit("moreChange",v,id)
    },
    dateChange(s,e){
      this.$emit("dateChange",s,e) 
    },
    treeChange(v){
      this.$emit("treeChange",v) 
    }
  },
  watch:{
    value(val){
      this.valueC=val;
      this.pla=this.isSel?'请选择'+this.label:'请填写'+this.label
    }
  }
};
</script>
<style>
.com-select label {
  min-width: 2rem;
  padding-right: 0.5rem; margin-bottom: 0; font-weight: normal;
}
.com-select-right{ border: 1px solid #ddd; background: #fff; border-radius: 0.3rem;}
.com-select-right.open{border-bottom: none; border-radius: 0.3rem 0.3rem 0 0;}
.com-select-right.open>.com-select-right-{ border-bottom: 1px dashed #eee;}
.com-select-right.up.open{ border: 1px solid #ddd;  border-top: none; border-radius: 0 0 0.3rem 0.3rem;}
.com-select-right.up.open>.com-select-right-{ border-top: 1px dashed #eee;border-bottom:none;}

.com-select-right.open.msel{border: 1px solid #ddd; border-radius: 0.3rem;}
.com-select-right.open.msel>.com-select-right-{ border-bottom: none;}

.com-select-right input {
  cursor: pointer;
  padding:0 2rem 0 1rem;
  outline: none;
  background: none;
  border: none;
  width: 100%;
  height: calc(2.5rem - 2px);
  line-height:  calc(2.5rem - 2px);
}
.com-select-right i {
  cursor: pointer;
  width: 2rem; text-align: center;
  height: calc(2.5rem - 2px);
  line-height: calc(2.5rem - 2px);
}
.up.com-select-right i { transform: rotateZ(180deg)}
.com-select-dropdown{ position: absolute; top: 100%; left: -1px; width:calc(100% + 2px) ; z-index: 333; display: none;
 background: #fff;border: 1px solid #ddd; border-top: none; border-radius: 0 0 0.3rem 0.3rem; max-height: 20rem; overflow-y:auto; overflow-x: hidden; }
.up>.com-select-dropdown{top: auto; bottom: 100%; border: 1px solid #ddd; border-bottom: none;border-radius:  0.3rem 0.3rem 0 0;}
.com-select-right.open>.com-select-dropdown,.com-select-right.open>.com-select-dropdown-more{ display: block;}
.com-select-dropdown a{display: block; width: 100%; text-align: left; color: #555; font-size: 1rem;
 padding: 0.5rem 1rem; cursor: pointer; position: relative; z-index: 66;}
 .com-select-dropdown a:hover{ background: #eee;}

.com-select-mask{ width: 100%; height: 100%;position: fixed; left: 0; top: 0; z-index: 55; background: rgba(0,0,0,0.1)}
</style>  