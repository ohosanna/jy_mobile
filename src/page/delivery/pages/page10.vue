<template>
	<div class="wx-full bg-userSet2" id="mPic10">
		<div class="form-hd">
			<h2>
				<img src="../../../assets/images/delivery/text-logo.png" class="slogo"  />
				<b>业主信息登记表</b>
			</h2>
			<p class="notep">亲爱的业主，为节约您交付现场办理时间，请于交付之日前填写以下信息并上传，谢谢！(注:带*为必填项)</p>
			<div class="list">
				<p class="set-col-6"><span>小区：</span><input v-model="baseInfo.communityName" readonly /></p>
				<p class="set-col-6"><span>房号：</span><input v-model="baseInfo.houseName" readonly /></p>
				<p class="set-col-6"><span>业主姓名：</span><input v-model="baseInfo.custName" readonly /></p>
				<p class="set-col-6"><span>联系方式：</span><input v-model="baseInfo.telephone" readonly /></p>
				<p class="set-col-12"><span>身份证号：</span><input v-model="baseInfo.cardNumber" readonly /></p>
				<div class="clear"></div>
			</div>
		</div>
		<div class="form-bd">
			<div class="list">
				<p class="set-col-6"><span>*我是：</span><input type="text" v-model="ownerInfo.custName" /></p>
				<p class="set-col-6"><span>性别：</span><select v-model="ownerInfo.sex"><option value="0">男</option><option value="1">女</option></select></p>
				<p class="set-col-12"><span>出生年月：</span><input type="date" v-model="ownerInfo.birthday"></p>
				<p class="set-col-12">
					<span>文化程度：</span>
					<select v-model="ownerInfo.education">
						<option value="4">硕士及以上</option>
						<option value="3">本科</option>
						<option value="2">大专</option>
						<option value="1">高中</option>
						<option value="0">初中及以下</option>
					</select>
				</p>
				<p class="set-col-6"><span>籍贯：</span><input type="text" v-model="ownerInfo.place" /></p>
				<p class="set-col-6"><span>政治面貌：</span><input type="text" v-model="ownerInfo.politics" /></p>
				<p class="set-col-12"><span>*兴趣爱好：</span><input type="text" v-model="ownerInfo.hobbies" /></p>
				<p class="set-col-12"><span>*微信号/QQ号：</span><input type="text" v-model="ownerInfo.wechatOrQQ" /></p>
				<p class="set-col-12"><span>*紧急联系人：</span><input type="text" v-model="ownerInfo.contactName" /></p>
				<p class="set-col-12"><span>*紧急联系人联系方式：</span><input type="text" v-model="ownerInfo.contactTel" /></p>
				<p class="set-col-6"><span>*工作单位：</span><input type="text" v-model="ownerInfo.workUnit" /></p>
				<p class="set-col-6"><span>*职业：</span><input type="text" v-model="ownerInfo.vocation" /></p>
				<p class="set-col-6"><span>职称：</span><input type="text" v-model="ownerInfo.technicalTitle" /></p>
				<p class="set-col-6"><span>职务：</span><input type="text" v-model="ownerInfo.job" /></p>
				<p class="set-col-6"><span>*办公电话：</span><input type="text" v-model="ownerInfo.workTel" /></p>
				<p class="set-col-6"><span>*单位地址：</span><input type="text" v-model="ownerInfo.unitAddress" /></p>
				<p class="set-col-6"><span>*是否有车辆：</span><select v-model="ownerInfo.isHaveCar" ><option value="1">有</option><option value="1">无</option></select></p>
				<p class="set-col-6"><span>*是否有子女：</span><select v-model="ownerInfo.isHaveChildren"><option value="1">有</option><option value="1">无</option></select></p>
				<p class="set-col-6"><span>*房屋性质：</span><select v-model="ownerInfo.houseProperty"><option value="0">自用</option><option value="1">商用</option></select></p>
				<div class="clear"></div>
			</div>
		</div>
		<div class="form-sumbit">
			<a class="btn" @click="handleSubmit">确认上传</a>
		</div>
	</div>
</template>
 

<script>
	export default {
        name: "deliveryPage10",
        data() {
            return{
                deliverId: this.$route.params.id,
				communityId: '',
				houseInfo: {},
				custInfo: {},
				baseInfo: {},
				ownerInfo: {}
            }
        },
		methods: {
			decodeHTML(str) {
				var txt = document.createElement('textarea');
				txt.innerHTML = str;
				return txt.value;
			},
            getInfo() {
                let data = {
                    deliverId: this.$route.params.id,
                    number: '10'
                }
                this.$US.getHousehandoverInfo(data).then(res => {
                    if (res.code == 0) {
						this.communityId = res.data.communityId
                        this.welcomeBg = res.data.welcome_bg
                    }
                })
            },
			getHouseInfo() {
				let houseInfo = this.$fun.getLocalStorage('selectedHouse')
				if (!houseInfo) {
					this.$message.error('请先选择你的房源。')
					setTimeout( () => {
						this.$router.push({name: 'deliveryPage2', params: {id: this.deliverId}})
					}, 2000)
				} else {
					this.houseInfo = JSON.parse(houseInfo)
				}
			},
			getBaseOwnerInfo() {
				let custInfo = JSON.parse(this.$fun.getLocalStorage('custInfo'))
				this.custInfo = custInfo ? custInfo : {}
				let data = {
					custId: custInfo.id,
					houseId: this.houseInfo.houseId
				}
                this.$US.getUploadFamilyInfo(data).then(res => {
                    if (res.code == 0 && res.data) {
						this.baseInfo = res.data
                    } else {
						this.$message.error(res.msg)
					}
                })
			},
			getOwnerInfo() {
				let data = {
					custId: this.custInfo.id,
				}
                this.$US.getCustomerInfo(data).then(res => {
                    if (res.code == 0 && res.data) {
						this.ownerInfo = res.data
                    } else {
						this.$message.error(res.msg)
					}
                })

			},
			handleSubmit() {
				let data = this.ownerInfo
				data.communityId = this.communityId
				data.houseId = this.houseInfo.houseId
				data.custId = this.custInfo.id
                this.$US.ownerRegister(data).then(res => {
                    if (res.code == 0) {
						this.$message.success("业主信息登记成功")
						setTimeout( () => {
							this.$router.push({name: 'deliveryPage11', params: {id: this.deliverId}})
						}, 2000)
                    } else {
						this.$message.error(res.msg)
					}
                })
			}
		},
        created() {
			this.getInfo()
			this.getHouseInfo()
			this.$nextTick(() => {
				this.getBaseOwnerInfo()
				this.getOwnerInfo()
			})
        }
	}
     
</script>