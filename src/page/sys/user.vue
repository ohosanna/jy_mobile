<template>
<div class='user-list mt-10' v-if="isList">
    <div class="check-box box box-ac  pa-10 ba-mbg brr-5">
        <div class="box-f1 mr-10" ><treeSel label="公司名" :optionData="companys" :value="company" :multiple="!isTrue" @treeChange="(v)=>{this.company=v;getCommunity(v);}" id="companyName"/></div>
        <div class="box-f1 mr-10"><treeSel label="项目名" :optionData="communitys"  :value="community" :multiple="!isTrue" @treeChange="(v)=>{community=v}" id="communityName"/></div>
        <div class="box-f1 mr-10"><sel label="账号" :isSel="!isTrue" :isInp="isTrue" :value="username" @inpChange="(v)=>{username=v}"/></div>
        <div class="box-f1 mr-10"><sel label="姓名" :isSel="!isTrue" :isInp="isTrue"  :value="petName"  @inpChange="(v)=>{petName=v}"/></div>
        <div class="box-f1 mr-10"><sel label="角色" :option="roleOption" :value="roleEx" id="typeSel"  @change="(v,id)=>{roleEx=v;roleId=id}" /></div>
        <div class="btn btn-primary mr-10 " @click="getUserListAfter"><i class="fa fa-search"></i> 查询</div>
        <div class="btn btn-default" @click="recheck"><i class="fa fa-repeat"></i> 重置</div>
    </div>

    <div class="tl mt-10">
        <a class="btn btn-primary" @click="isList=false;"><i class="fa fa-plus"></i> 新增</a>
		<a class="btn btn-default ml-5" ><i class="fa fa-trash-o"></i> 删除</a>
    </div>

    <loading :loading="isloading" >
        <tab :tabTh="tabTh" :tabTd="tabTd" :tabThe="tabThe" :records="records"  :hasChoise="isTrue" :hasOrder="isTrue"
        specialField="status" :page="page" :pagesize="pagesize" @pageChange="pageChange"  class="mt-10" v-if="records">
        <span class="label " slot="sf" slot-scope="{tdss}" :class="tdss==1?'label-success':'label-danger'">{{tdss==1?'正常':'禁用'}}</span>
        </tab>
        <def  txt="查无数据" v-else />
    </loading>

</div>
<div class="user-add mt-10" v-else>
    <div class="panel panel-default" style="">
        <div class="panel-heading">新增用户</div>
        <div class="box  pa-15 pb-5">
            <div class="box-f1 pr-10">
                <treeSel label="公司名称" :necessary="isTrue"  :optionData="companys"  :value="add.company" :multiple="!isTrue" @treeChange="(v)=>{this.add.company=v;getCommunity(v);}" class="mb-10" id="companyName"/>
                <treeSel label="项目名称" :optionData="communitys"  :value="add.community" :multiple="!isTrue" @treeChange="(v)=>{add.community=v}" class="mb-10"  id="communityName"/>
                <sel label="用户账号" :necessary="isTrue" :isSel="!isTrue" :isInp="isTrue" :value="add.username" class="mb-10" @inpChange="(v)=>{add.username=v}"/>
                <sel label="用户姓名" :necessary="isTrue" :isSel="!isTrue" :isInp="isTrue"  :value="add.petName" class="mb-10" @inpChange="(v)=>{add.petName=v}"/>
                <sel label="用户密码" :necessary="isTrue" :isSel="!isTrue" :isInp="isTrue"  :value="add.password" class="mb-10" @inpChange="(v)=>{add.password=v}"/>
                <sel label="用户角色" :option="roleOption" :value="add.roleEx" id="typeSel" class="mb-10" @change="(v,id)=>{add.roleEx=v; add.roleId=id}"/>
                <sel label="用户邮箱" :isSel="!isTrue" :isInp="isTrue"  :value="add.email" class="mb-10" @inpChange="(v)=>{add.email=v}"/>
                <sel label="用户手机" :isSel="!isTrue" :isInp="isTrue"  :value="add.mobile" class="mb-10" @inpChange="(v)=>{add.mobile=v}"/>
                <div class='com-select box box-ac mtb-5' >
                    <label class="fz10 co-5 block">状态：</label>
                    <choice :onSelect="add.status==2" @choiceChange="add.status=2" label="禁用"/>
                    <choice :onSelect="add.status==1" @choiceChange="add.status=1" label="正常" class="ml-10"/>
                </div>
            </div>
            <div class="w50 pl-20">
                <div class="fz-12 co-3 pa-5 mb-5">数据权限</div>
                <treeSel :optionData="companysall"  :valuess="add.companyall" :multiple="isTrue" :alwaysOpen="isTrue" :isloadOption="!isTrue" @treeChange="(v)=>{add.companyall=v}" id="name"/>
            </div>
        </div>
        <div class="tc pb-15">
            <a class="btn btn-primary btn-lg plr-20" >确定</a>
		    <a class="btn btn-default ml-10 btn-lg plr-20" @click="isList=true" >返回</a>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name:'user',
    data () {
        return {
            isList:true,
            isTrue:true,
            isloading:true,
            // 树跟下拉配置
            companys:[],
            roleOption:[],
            communitys:[],
            companysall:[],
            // 查询数据
            company:null,
            
            community:null,
            username:"",
            petName:"",
            roleId:"",
            roleEx:"",
            
            //添加数据
            add:{
                companyall:[],
                company:null,
                community:null,
                username:"",
                petName:"",
                password:"",
                roleId:"",
                roleEx:"",
                email:"",
                mobile:"",
                status:1,

            },


            //表格
            records:0,
            tabTh:['用户ID','公司名称','项目名称','角色名称','用户账号','用户姓名','邮箱','手机号','状态','创建时间','操作'],//表格头
            tabThe:['userId','companyName','communityName','roleName','username','petName','email','mobile','status','createTime','operation'],//表格头对应的字段名
            tabTd:[],//表格数据

            //分页
            page:1,
            pagesize:10
        }
    },
    created(){
        this.getCheckOption()
        this.getUserListAfter()
    },
    watch:{
        isList(val){
            this.getCheckOption()
        }
    },
    methods:{

        recheck(){
            this.company=null
            this.community=null
            this.roleId=null
            this.username=null
            this.petName=null
            this.communitys=[]
        },

        //一进页面就得获取的配置项
        getCheckOption(){
            //获取用户角色配置项
            this.$US.getRole().then(res=>{
                if(res.code==0){
                    this.roleOption=res.list.map(item=>{
                        return {id:item.roleId,ex:item.roleName}
                    })
                }
            })
            //获取公司配置项
            this.$US.getCompany().then(res=>{
                this.companys=res;
            })
            //获取数据权限配置项
            this.$US.getCommunityAll().then(res=>{
                this.companysall=res;
            })
        },
        //获取项目配置项
        getCommunity(companyId){
            if(companyId){
                
                this.$US.getCommunity({companyId:companyId}).then(res=>{
                    this.communitys=res;
                })
            }
        },

        
        //成功获取表格数据后
        getUserListAfter(){
            this.isloading=true
            this.getUserList(this.page,this.pagesize,(res)=>{
                this.tabTd=res.list
                this.records=res.totalCount
                this.isloading=false
            })
        },
        //获取表格数据
        getUserList(page,limit,fun){
            const toget={
                limit: limit,
                page: page,
                sidx: '',
                order: 'asc',
                companyId: this.company,
                communityId: this.community,
                roleId: this.roleId,
                username: this.username,
                petName: this.petName
            }
             this.$US.getUserList(toget).then(res=>{
                 if(res.code==0){
                     fun(res.page)
                 }
                 
             })
        },
        pageChange(p,pz){
            this.page=p
            this.pagesize=pz
            this.getUserListAfter()
        }
    }
}
</script>
<style>
.user-add .com-select>label{ min-width: 7rem; text-align: right;}
</style>
