<template>

<div class="sys-table-box">
        <table>
            <thead>
                <tr>
                    <td v-if="hasOrder"></td>
                    <td v-if="hasChoise"><choice :onSelect="selectOn.length==tabTds.length" @choiceChange="PchoiceChange"  type="checkbox"/></td>
                    <th v-for="(th,thkey) in tabTh" :key="thkey">{{th}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(td,trkey) in tabTds" :key="trkey">
                    <td v-if="hasOrder">{{trkey+1}}</td>
                    <td v-if="hasChoise"><choice :onSelect="selectOn.indexOf(trkey)!=-1" @choiceChange="choiceChange(trkey)"  type="checkbox"/></td>
                    <td v-for="(tds,tdskey) in td" :key="tdskey" >
                        <P class="ma-0" v-if="tds!='operation' && tabThe.indexOf(specialField)!=tdskey">
                            <span v-if="addADom.length<=0||tdskey<addADom[0]||tdskey>addADom[1]">{{tds}}</span>
                            <a v-else @click="emitKey(trkey,tdskey)">{{tds}}</a>
                        </P>
                        <p class="ma-0" v-else-if="tds=='operation'">
                            <button class="btn btn-primary btn-xs" >修改</button>
                            <button class="btn btn-primary btn-xs">重置密码</button>
                            <button class="btn btn-danger btn-xs">删除</button>
                        </p>
                        <p class="ma-0" v-else-if=" tabThe.indexOf(specialField)==tdskey">
                            <slot name="sf" :tdss="tds"/>
                        </p>
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
    hasOrder:{type:Boolean,default:false},
    hasChoise:{type:Boolean,default:false},
    records:Number,
    page:Number,
    pagesize:Number,
    tabTh:Array,
    tabThe:Array,
    tabTd:Array,
    addADom:{type:Array,default:()=>[]},
    specialField:{type:String,default:''}
},  
data () {
 return {
    selectOn:[],
    tabTds:[],
    hasOperation:this.tabThe.indexOf('operation')
}
},

//创建vue时的钩子
 created(){
    this.makeTd();
 },

//当前vue使用的函数
methods:{
    PchoiceChange(){
        if(this.selectOn.length==this.tabTds.length){
            this.selectOn=[]
        }else{
            for(var i=0;i<this.tabTds.length;i++){
                this.selectOn.push(i)
            }
        }
    },
    choiceChange(key){
        var hasin=this.selectOn.indexOf(key)
        if(hasin==-1){
            this.selectOn.push(key)
        }else{
            this.selectOn.splice(hasin,1)
        }
    },
    emitKey(tr,td){
        this.$emit('aClick',tr,td);
    },
    makeTd(){
        var outd=[];
        this.hasOperation=this.tabThe.indexOf('operation')
        this.tabTd.map(item=>{
            var ind=[]
            for(var key in item){
                var inof=this.tabThe.indexOf(key)
                if(inof!=-1){
                    ind[inof]=item[key]
                }
            }
            if(this.hasOperation!=-1){
                ind.push("operation")
            }
            outd.push(ind)
            
        })
        this.tabTds=outd;
    },
    pageChange(p,pz){
        this.$emit("pageChange",p,pz)
    }

},
watch:{
    tabTd(val){
        this.makeTd();
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