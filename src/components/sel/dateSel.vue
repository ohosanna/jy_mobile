<template>
  <div class="box-f1">
    <div class="box box-ac">
      <dps
        :format="format"
        :language="languages"
        :disabledDates="startDisabledDates"
        placeholder="开始时间"
        class="com-select-right box-f1 po-r"
        v-model="startDate"
        @selected="startDateChange"
      >
        <icon name="rili1" class="fz12 co-9 po-ab in-tr" slot="afterDateInput"/>
      </dps>
       <span v-if="dateType=='dateAndDate'">-</span>  
      <dps
        :format="format"
        :language="languages"
        :disabledDates="endDisabledDates"
        placeholder="结束时间"
        v-if="dateType=='dateAndDate'"
        class="com-select-right box-f1 po-r"
        v-model="endDate"
        @selected="endDateChange"
      >
        <icon name="rili1" class="fz12 co-9 po-ab in-tr" slot="afterDateInput"/>
      </dps>
    </div>
  </div>
</template>
<script>
import dps from "vuejs-datepicker/dist/vuejs-datepicker.esm.js";
export default {
  name: "datesel",
  props:{
    dateType:String,
    value:String
  },
  data() {
    return {
      startDate:"",
      endDate:"",
      format: "yyyy-MM-dd",
      languages: {
        rtl: false,
        yearSuffix: "年",
        ymd: false,
        days:["日", "一", "二", "三", "四", "五", "六"],
        language: "Chinese",
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthsAbbr: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
      },
      startDisabledDates:{
        from:""
      },
      endDisabledDates: {
        to: ""
      }
    };
  },
  //实例组件
  components: { dps },
  //创建vue时的钩子
  created() {
      //console.log(this.languages.zh);
      if(this.value && this.value.indexOf('~')!=-1){
        var dval= this.value.split("~");
        if((dval[0] &&  dval[0].indexOf("-")!=-1) && (dval[1] &&  dval[1].indexOf("-")!=-1)){
          this.startDate=new Date(Number(dval[0].split("-")[0]),Number(dval[0].split("-")[1])-1,Number(dval[0].split("-")[2]))
          this.endDate=new Date(Number(dval[1].split("-")[0]),Number(dval[1].split("-")[1])-1,Number(dval[1].split("-")[2]))
          this.endDisabledDates.to=new Date(this.startDate.getFullYear(),this.startDate.getMonth(), this.startDate.getDate())
          this.endDisabledDates.from=this.startDisabledDates.from=new Date();
        }
      }
  },
  //挂载vue时的钩子
  mounted() {},
  //当前vue使用的函数
  methods: {
      startDateChange(data){
          //console.log(this.endDate);
          if(this.endDate<data)this.endDate=data;
          //console.log(data.getFullYear(),data.getMonth(), data.getDate());
          this.endDisabledDates.to=new Date(data.getFullYear(),data.getMonth(), data.getDate())
          this.endDisabledDates.from=this.startDisabledDates.from=new Date();
      },
      endDateChange(data){
         this.$emit("dateChange",this.startDate,data) 
      }
  }
};
</script>
<style>
.vdp-datepicker input {
  position: relative;
  z-index: 22;
  cursor: pointer;
  padding: 0 2rem 0 1rem;
  outline: none;
  background: none;
  border: none;
  width: 100%;
  height: calc(2.5rem - 2px);
  line-height: calc(2.5rem - 2px);
   min-width: 6rem;
}
.vdp-datepicker__calendar {
  top: 120%;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid #ddd;
  border-radius: 0.3rem;
}
.vdp-datepicker__calendar .cell {
  border-radius: 0.4rem;
}
.vdp-datepicker__calendar .cell:hover {
  border-color: #fff !important;
  background: #f6f6f6;
}
.vdp-datepicker__calendar .cell.selected {
  background: #1e92ed;
  color: #fff;
}
</style> 