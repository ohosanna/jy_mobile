<template>

<div class="sys-table-box">
        <table>
            <thead>
                <tr>
                    <th v-for="(th,thkey) in tableConfig" :key="thkey" :width="th.widthTd">
                        <choice :onSelect="selectOn.length==selectLength" @choiceChange="PchoiceChange"  type="checkbox" v-if="th.bindTh=='tableChoise'"/>
                        <span v-else>{{th.th}}</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(td,trkey) in drawTableData" :key="trkey">
                    <td v-for="(tds,tdskey) in td" :key="tdskey"  >
                        <p v-if="tableThBind[tdskey]=='tableOrder'">{{trkey+1}}</p>
                        <choice v-else-if="tableThBind[tdskey]=='tableChoise'" 
                        :onSelect="selectOn.indexOf(trkey)!=-1" 
                        @choiceChange="choiceChange(trkey)"
                        :isDisabled="choiseDisableds.indexOf(trkey)!=-1"  
                        type="checkbox"
                        />
                        <slot :name="'tableOperation'" v-else-if="tableThBind[tdskey]=='tableOperation'" :datas="tableSourceData[trkey]" :dataIndex="trkey"></slot>
                        <slot :name="tableSlot[tdskey]" :tdss="tds" v-else-if=" tableThBind[tdskey]==tableSlot[tdskey]"/>
                        <P class="ma-0" v-else>
                            <span v-if="!tableConfig[tdskey].hasClick">{{tds}}</span>
                            <a v-else @click="emitKey(trkey,tableThBind[tdskey])">{{tds}}</a>
                        </P>
                    </td>
                </tr>
                
            </tbody>
        </table>
        <paging :dataCount="records" :startPage="page"  :pagesize="pagesize" @change="pageChange" />
    </div>
</template>
<script>


export default {
name:'tab',
props:{
    tableConfig:Array,
    choiseDisabledConfig:Object,
    tableSourceData:Array,
    records:Number,
    page:Number,
    pagesize:Number,
    selectOns:{type:Array,default:()=>[]}
},  
data () {
 return {
    selectOn:this.selectOns,
    drawTableData:[],
    tableThBind:[],
    tableSlot:[],
    choiseDisableds:[],
    selectLength:0
}
},

//创建vue时的钩子
 created(){
    
    //console.log(this.choiseDisableds);
    this.makeChoiseDisableds();
    this.makeDrawTableData();
    this.selectLength=this.drawTableData.length-this.choiseDisableds.length
    
 },

//当前vue使用的函数
methods:{
    // 制作复选不可选下标数组
    makeChoiseDisableds(){
        var i=0;
        this.choiseDisableds=[];
        this.tableSourceData.map(item=>{
            var k=this.choiseDisabledConfig.value.indexOf(item[this.choiseDisabledConfig.field])
            //console.log(this.choiseDisabledConfig.value,this.choiseDisabledConfig.field,item[this.choiseDisabledConfig.field],k);
            if(k!=-1){
                this.choiseDisableds.push(i)
            }
            i++;
        })
    },
    // 制作渲染用的表格数据
    makeDrawTableData(){
        this.tableThBind=this.tableConfig.map(item=>{
            return item.bindTh
        })
        this.tableSlot=this.tableConfig.map(item=>{
            return item.slotName
        })
        var outd=[]
        this.tableSourceData.map(st=>{
            var intd=this.tableThBind.map(item=>{
                return ""
            });
            for(var key in st){
               var  indx=this.tableThBind.indexOf(key)
               if(indx!=-1){
                   intd[indx]=st[key]
               }
            }
            outd.push(intd)
        })
        this.drawTableData=outd;
    },

    //以下是事件抛出
    pageChange(p,pz){
        this.$emit("pageChange",p,pz)
    },
    //头部复选改变事件
    PchoiceChange(){
        if(this.selectOn.length==this.selectLength){
            this.selectOn=[]
        }else{
            this.selectOn=[]
            for(var i=0;i<this.drawTableData.length;i++){
                if(this.choiseDisableds.indexOf(i)==-1){
                    this.selectOn.push(i)
                }
            }
            console.log(this.selectOn);
        }
        this.$emit("choiceChanges",this.selectOn)
    },
    //td里复选改变事件
    choiceChange(key){
        var hasin=this.selectOn.indexOf(key)
        if(hasin==-1){
            this.selectOn.push(key)
        }else{
            this.selectOn.splice(hasin,1)
        }
        this.$emit("choiceChanges",this.selectOn)
    },
    emitKey(tr,td){
        this.$emit('tableTdClick',tr,td);
    },

},
watch:{
    tableSourceData(val){
        this.makeTd();
    },
    selectOns(val){
        this.selectOn=val
    } 
}
}
</script>
<style>
.sys-table-box {
    width: 100%;
    /* min-height: 30rem; */
}

.sys-table-box table {
    width: 100%;
    border: 1px solid #e1e1e1;
    border-width: 1px 0 0 1px;
    border-collapse: 0;
    border-spacing: 0;
}

.sys-table-box table th {
    background: #f2f3f4;
    color: #888;
    font-weight: normal;
    text-align: left;
    padding: 0.5rem 1rem;
    border-right: 1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
}

.sys-table-box table td {
    padding: 1rem 1rem;
    border-right: 1px solid #e1e1e1;
    border-bottom: 1px solid #e1e1e1;
    color: #555;
}
.sys-table-box table td  a{color: #1e92ed; cursor: pointer;}
.sys-table-box table td  a:hover{color: #2667ec;}
</style> 