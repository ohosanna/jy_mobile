<template>
<div class='user-list mt-10' v-if="isList">
    <div class="check-box pa-10 ba-mbg brr-5">
        <div  class="box box-ac">
        <div class="box-f1 mr-10" ><treeSel label="公司名" :optionData="companys" :value="company" :multiple="!isTrue" @treeChange="(v)=>{this.company=v;getCommunity(v);}" id="companyName"/></div>
        <div class="box-f1 mr-10"><treeSel label="项目名" :optionData="communitys"  :value="community" :multiple="!isTrue" @treeChange="(v)=>{community=v}" id="communityName"/></div>
        <div class="box-f1 mr-10"><sel label="账号" :isSel="!isTrue" :isInp="isTrue" :value="username" @inpChange="(v)=>{username=v}"/></div>
        
        <div class="box-f1 mr-10"><sel label="姓名" :isSel="!isTrue" :isInp="isTrue"  :value="petName"  @inpChange="(v)=>{petName=v}"/></div>
        <div class="box-f1 mr-10"><sel label="角色" :option="roleOption" :value="roleEx" id="typeSel"  @change="(v,id)=>{roleEx=v;roleId=id}" /></div>
        <div class="btn btn-primary mr-10 " @click="getUserListAfter"><i class="fa fa-search"></i> 查询</div>
        <div class="btn btn-default" @click="recheck"><i class="fa fa-repeat"></i> 重置</div>
        </div>
    </div>

    <div class="tl mt-10">
        <a class="btn btn-primary" @click="toadd"><i class="fa fa-plus"></i> 新增</a>
		<a class="btn btn-default ml-5" @click="deleteUser('userId')"><i class="fa fa-trash-o"></i> 删除</a>
    </div>

    <loading :loading="isloading" >
        <tab v-if="records"  :tableSourceData="tableSourceData" :choiseDisabledConfig="choiseDisabledConfig"  :tableConfig="tableConfig" :records="records"  :selectOns="selectOn" :page="page"  :pagesize="pagesize" 
            @pageChange="pageChange"  @tableTdClick="tableTdClick" @choiceChanges="choiceChanges" class="mt-10">
            <!-- <span class="label label-success" slot="petName" slot-scope="{tdss}">{{tdss}}</span> -->
            <span class="label " slot="status" slot-scope="{tdss}" :class="tdss==1?'label-success':'label-danger'">{{tdss==1?'正常':'禁用'}}</span>
            <p class="ma-0" slot="tableOperation" slot-scope="{datas,dataIndex}">
                <button class="btn btn-primary btn-xs mtb-5 mr-5" @click="toEdit(datas)">修改</button>
                <button class="btn btn-primary btn-xs mtb-5 mr-5" @click="toResetPWD(datas)">重置密码</button>
                <button class="btn btn-danger btn-xs mtb-5 mr-5"  @click="toDelete(datas,dataIndex)">删除</button>
            </p>
        </tab>
        <def  txt="查无数据" v-else />
    </loading>
    
    <popup :show="ResetPWDPopupShow" @confirm="ResetPWDPopupShow=false;resetPWD()" @cancel="ResetPWDPopupShow=!ResetPWDPopupShow" popupBtnClass="pb-10">
        <div slot="popupMain">
            <div class="fz10 co-1 br hb-b brc-d1  pa-10">重置密码</div>
            <div class="pa-10">
                <div class='com-select box box-ac mtb-10' >
                    <label class="fz10 co-5 block">用户名/姓名：</label>
                    <span  class="label label-success block">{{reUser}}</span>
                </div>
                <sel  label="新密码" inputType="password" :isSel="!isTrue" :isInp="isTrue" :value="newPassword" @inpChange="(v)=>{newPassword=v}"/>
            </div>
        </div>
    </popup>
    <popup :show="deletePopupShow" @confirm="deletePopupShow=false; deleteUser('userId')" @cancel="deletePopupShow=!deletePopupShow;selectOn=[]" popupClass="tc pa-10">
        <div class="ptb-10" slot="popupMain">确定要删除选中项</div>
    </popup>

</div>
<div class="user-add mt-10" v-else>
    <div class="panel panel-default">
        <div class="panel-heading">{{tmpUserId?'修改':'新增'}}用户</div>
        <div class="box  pa-15 pb-5">
            <div class="box-f1 pr-10">
                <treeSel label="公司名称" :necessary="isTrue"  :optionData="companys"  :value="add.companyId" :multiple="!isTrue" @treeChange="(v)=>{this.add.companyId=v;getCommunity(v);getCommunityAll(v)}" class="mb-10" id="companyName"/>
                <treeSel label="项目名称" :optionData="communitys"  :value="add.communityId" :multiple="!isTrue" @treeChange="(v)=>{add.communityId=v;getCommunityAll(add.companyId,v)}" class="mb-10"  id="communityName"/>
                <sel label="用户账号" :necessary="isTrue" :isSel="!isTrue" :isInp="!tmpUserId" :isDisabled="tmpUserId!=null" :value="add.username" class="mb-10" @inpChange="(v)=>{add.username=v}"/>
                <sel label="用户姓名" :necessary="isTrue" :isSel="!isTrue" :isInp="isTrue"  :value="add.petName" class="mb-10" @inpChange="(v)=>{add.petName=v}"/>
                <sel label="用户密码" :necessary="isTrue" :isSel="!isTrue" :isInp="isTrue" inputType="password" :value="add.password" class="mb-10" @inpChange="(v)=>{add.password=v}" v-if="!tmpUserId"/>
                <sel label="用户角色" :option="roleOption" :value="add.roleName" id="typeSel" class="mb-10" @change="(v,id)=>{add.roleEx=v; add.roleId=id}"/>
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
                <treeSel :optionData="companysall"  :valuess="add.communityIdList" :multiple="isTrue" :alwaysOpen="isTrue" :isloadOption="!isTrue" @treeChange="(v)=>{add.communityIdList=v}" id="name"/>
            </div>
        </div>
        <div class="tc pb-15">
            <a class="btn btn-primary btn-lg plr-20"  @click="saveUser">确定</a>
		    <a class="btn btn-default ml-10 btn-lg plr-20" @click="isList=true" >返回</a>
        </div>
    </div>
    
</div>
</template>
<script>
import * as userManagerServer from "@/server/userManager.js"
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
                communityIdList:[],
                companyId:null,
                communityId:null,
                username:"",
                petName:"",
                password:"",
                roleId:"",
                roleName:"",
                email:"",
                mobile:"",
                status:1
            },
            tmpUserId:null,

            //表格
            records:0,
            tableConfig:[
                {th:"序号",bindTh:"tableOrder",widthTd:"",slotName:"",hasClick:false},
                {th:"",bindTh:"tableChoise",widthTd:"",slotName:"",hasClick:false},
                {th:"公司名称",bindTh:"companyName",widthTd:"",slotName:"",hasClick:false},
                {th:"项目名称",bindTh:"communityName",widthTd:"",slotName:"",hasClick:false},
                {th:"角色名称",bindTh:"roleName",widthTd:"",slotName:"",hasClick:false},
                {th:"用户账号",bindTh:"username",widthTd:"",slotName:"",hasClick:false},
                {th:"用户姓名",bindTh:"petName",widthTd:"",slotName:"",hasClick:false},
                {th:"邮箱",bindTh:"email",widthTd:"",slotName:"",hasClick:false},
                {th:"手机号",bindTh:"mobile",widthTd:"",slotName:"",hasClick:false},
                {th:"状态",bindTh:"status",widthTd:"",slotName:"status",hasClick:false},
                {th:"创建时间",bindTh:"createTime",widthTd:"",slotName:"",hasClick:false},
                {th:"操作",bindTh:"tableOperation",widthTd:"",slotName:"",hasClick:false}
            ],
            choiseDisabledConfig:{field:"userId",value:[24,23]},//复选框配置对应数据的那个字段等于指定值的时候不可选
            tableSourceData:[],//表格源数据

            //分页
            page:1,
            pagesize:10,

            selectOn:[],

            deletePopupShow:false,
            ResetPWDPopupShow:false,
            newPassword:"",
            reUser:"",
            reUserId:""
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
        tableTdClick(tr,td){
            console.log(tr,td);
            
        },
        recheck(){
            this.company=null
            this.community=null
            this.roleId=null
            this.roleEx=""
            this.username=null
            this.petName=null
            this.communitys=[]
            //this.getUserListAfter()
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
        //获取数据权限
        getCommunityAll(companyId,communityId){
            var k={}
            if(companyId){
                k={changeCompanyId:companyId};
                if(communityId){
                    k={changeCompanyId:companyId,changeCommunityId:communityId};
                }
            }
            this.$US.getCommunityAll(k).then(res=>{
                    this.companysall=res;
            })
        },

        //成功获取表格数据后
        getUserListAfter(){
            this.isloading=true
            this.getUserList(this.page,this.pagesize,(res)=>{
                this.tableSourceData=res.list
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
            userManagerServer.getUserList(toget).then(res=>{
                 if(res.code==0){
                     fun(res.page)
                 }
             })
        },
        pageChange(p,pz){
            this.page=p
            this.pagesize=pz
            this.getUserListAfter()
        },
        saveUser(){
            var checkInfo=this.tocheck(this.add)
            if(checkInfo == true){
                if(!this.tmpUserId){
                    userManagerServer.saveUser(this.add).then((res)=>{
                        if(res.code==0){
                            alert("新增成功")
                            this.isList=true;
                            this.getUserListAfter();
                        }
                    })
                }else{
                    this.add.communityIdList=[];
                    userManagerServer.updateUser(this.add).then((res)=>{
                        if(res.code==0){
                            alert("修改成功")
                            this.isList=true;
                            this.getUserListAfter();
                        }
                    })
                }
            }else{
                alert(checkInfo)
            }
        },
        tocheck(res){
            var pass=true
            if(res.username==""){
                pass=false;
                return "请填写用户名"
            }else if(res.companyId==null ){
                pass=false;
                return "请选择公司名"
            }else if(res.petName==""){
                pass=false;
                return "请填写姓名"
            }else if(!this.$fun.checkUserNameValid(res.password)){
                pass=false;
                return "密码不能为空和必须是6-19位数字带字母"
            }else{
                return pass
            }
        },

        choiceChanges(on){
            //console.log(on);
            this.selectOn=on;
        },
        toadd(){
            this.isList=false;
            this.tmpUserId=null;
            this.add={
                communityIdList:[],
                companyId:null,
                communityId:null,
                username:"",
                petName:"",
                password:"",
                roleId:"",
                roleName:"",
                email:"",
                mobile:"",
                status:1
            }
        },

        toEdit(tr){
            userManagerServer.getUserIdInfo(tr.userId).then((res)=>{
                if(res.code==0){
                    this.isList=false;
                    this.tmpUserId=res.user.userId
                    this.add=res.user
                    this.add.roleName=tr.roleName
                    this.getCommunity(res.user.companyId);
                    this.getCommunityAll(res.user.companyId,res.user.communityId)
                }
            })
        },
        toResetPWD(tr){
            console.log(tr);
            this.ResetPWDPopupShow=true;
            this.reUser=tr.username+"/"+tr.petName;
            this.reUserId=tr.userId;
            this.newPassword=""
        },
        resetPWD(){
            userManagerServer.resetpsdUser({id:this.reUserId,newPassword:this.newPassword}).then((res)=>{
                if(res.code==0){
                   alert("重置密码成功")
                    this.getUserListAfter(); 
                }
            })
        },
        toDelete(tr,dataIndex){
            this.selectOn=[dataIndex];
            this.deletePopupShow=true;
        },
        deleteUser(field){
            if(this.selectOn.length>0){
                var toDeleteIds=[];
                for(var i=0;i<this.selectOn.length;i++){
                    toDeleteIds[i]=this.tableSourceData[Number(this.selectOn[i])][field]
                }
                //console.log(toDeleteIds);
                userManagerServer.deleteUser(toDeleteIds).then((res)=>{
                    if(res.code==0){
                        alert("删除成功")
                        this.isList=true;
                        this.getUserListAfter();
                        this.selectOn=[];
                    }
                })
            }else{
                alert("至少选择一个删除对象再操作")
            }
        }
    }
}
</script>
<style>
.user-add .com-select>label{ min-width: 7rem; text-align: right;}
</style>
