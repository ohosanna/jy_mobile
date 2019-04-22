<template>
    <div class="paging box box-ac box-jc mt-10">
        <btn txt="首页"  class="inline-block plr-10 mr-10"  @inup="startToOne"/>
        <btn txt="上一页"  class="inline-block plr-10 mr-10" @inup="prev"/>
        <sel :value="String(pageStart)" class="inline-block mr-10" inputClass="w4 pl-5" positionClass="up" :option="pageOption"  @change="pagenumChange" id="p"/>
        <btn txt="下一页"  class="inline-block plr-10 mr-10" @inup="next"/>
        <btn txt="末页"  class="inline-block plr-10 mr-10" @inup="startToEnd"/>
        <div>第 <span class="co-m">{{pageStart}}</span>  / {{ Math.ceil(dataCount / pagesize)}} 页,每页</div>
        <sel :value="String(pagesize)" class="inline-block mlr-5" inputClass=" w4 pl-5" positionClass="up" :option="pagesizeOption" @change="pagesizeChange" id="pz"/>
        <div>条记录，共<span class="co-m">{{dataCount}}</span>条记录</div>
    </div>
</template>
<script>
export default {
    name:'paging',
    props:{
        dataCount:{type:Number,default:1},
        startPage:{type:Number,default:1},
        pagesize:{type:Number,default:10},
    },
    data () {
        return {
           pageStart:this.startPage,
           pageOption:[],
           pagesizes:this.pagesize,
           pagesizeOption:[
                {ex:"5",id:"001"},
                {ex:"10",id:"001"},
                {ex:"15",id:"001"},
                {ex:"20",id:"001"},
                {ex:"25",id:"001"},
                {ex:"30",id:"001"},
                {ex:"40",id:"001"}
            ] 
        }
    },
    //创建vue时的钩子
    created(){
        this.pagesizeOptionCreater(10);
        this.pageOptionCreater();
        
    },
    //挂载vue时的钩子
    mounted(){

    },
    //当前vue使用的函数
    methods:{
        pagesizeOptionCreater(interval){ //根据数据总量来生成可分成多少条一页 interva为多少条数为一页的标准
            this.pagesizeOption=[];
            var dc=this.dataCount?this.dataCount:1
            var sizeEnd=Math.ceil(dc/interval)
            for(var k=1;k<=sizeEnd;k++){
                this.pagesizeOption.push({ex:k*interval,id:"00"+k})
            }
            this.pagesizes=Number(this.pagesizeOption[0]["ex"])
        },
        pageOptionCreater(){//改变页数下拉
            this.pageOption=[];
            var dc=this.dataCount?this.dataCount:1
            var kp=Math.ceil(dc/this.pagesizes)
            var ns=[];
            for(var i=1;i<=kp;i++){
                this.pageOption.push({ex:i,id:"00"+i})
                ns.push(i)
            }
            if(ns.indexOf(this.pageStart)==-1){
                this.pageStart=ns[0]
            }
        },
        startToOne(){
            this.pageStart=Number(this.pageOption[0]["ex"])
            this.pageChange()
        },
        prev(){
            var one=Number(this.pageOption[0]["ex"]);
            this.pageStart--
            this.pageStart=this.pageStart<one?one:this.pageStart
            this.pageChange()
        },
        next(){
            var end=Number(this.pageOption[(this.pageOption.length-1)]["ex"]);
            this.pageStart++
            this.pageStart=this.pageStart>end?end:this.pageStart
            this.pageChange()
        },
        startToEnd(){
            this.pageStart=Number(this.pageOption[(this.pageOption.length-1)]["ex"])
            this.pageChange()
        },
        pagesizeChange(value){
            this.pagesizes=Number(value);
            this.pageOptionCreater();
            this.pageChange();
        },
        pagenumChange(value){
            this.pageStart=Number(value);
            this.pageChange()
        },
        pageChange(){
            var sp=(this.pageStart-1)*this.pagesizes;
            var ep=(this.pageStart-1)*this.pagesizes+this.pagesizes
            this.$emit("change",sp,ep,this.pageStart,this.pagesizes);
        }
    }
}
</script>