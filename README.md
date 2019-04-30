# webpack构建一个vue脚手架

webpac3.0+vue全家桶 构建一个spa版脚手架
需要安装node.js

```
使用说明：
1、克隆 
2、安装模块 npm install
3、开发运行 npm run dev
4、打包项目 npm run build

come on ,lets go to try it!
```
关于3，开发运行是把项目打包到内存中进行跑的，会自动起一个服务，自动弹出浏览器打开，并支持热更新，就是你改了代码保存后不用刷新页面自动更新

关于4，第一次打包需要手动在跟目录建一个static文件夹，默认克隆是没有这个文件夹的，打包好的项目都在根目录public上，把public上打包好的项目全部拷贝，启动一个web服务器，npm也有web服务（自行百度），也可以用tomcat，或者其他

```
项目结构说明：
一、表格组件 tab
支持参数：
	tableConfig:Array, //表格模板配置 需要严格按照例子中的json格式进行传入 th：表头显示，bindTh:该列绑定哪个字段,widthTd:该列宽度,slotName:该列是否需要slot,如一些状态显示，数据值是1，但要显示对应的中文，就得用此配置,hasClick:此列的td是否可点击
    例如：tableConfig:[
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
    choiseDisabledConfig:Object,//复选框指定字段指定值不可选
    tableSourceData:Array,//接口返回传进来的表格源数据
    records:Number,//数据条数
    page:Number,//第几页
    pagesize:Number,//每页多少条数据
    selectOns:{type:Array,default:()=>[]}//复选框选中的下标数组
回抛事件：
    @pageChange="(page,pagesize)=>{console.log(page,pagesize)}"  //当分页器做出改变时回抛事件,带两个参数，第几页，每页多少条数据
    @tableTdClick="(trkey,tdfelid)=>{console.log(trkey,tdfelid)}" //当td点击时回抛事件,带两个参数，trkey为第几行的下标，tdfelid为第几列对应的字段，此事件需要设置对应列的hasClick才有回抛
    @choiceChanges="(selecton)=>{console.log(selecton)}" //当表格中的复选框改变时回抛事件，带一个参数 ，selecton为选中行的下标
父类装载器slot：
	slot=tableOperation：操作栏装载器，转载器上回调两个参数datas当前行的所有数据json，dataIndex当前行的下标， 
    其他配置项 通过配置项的slotName配置对应的bindTh，这两个配置成一样，就会启动特殊转载器，会返回一个参数 tdss 当前行当前列的值

```