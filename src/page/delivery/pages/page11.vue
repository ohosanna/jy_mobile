<template>
	<div class="wx-full bg-userSet2" id="mPic11">
		<div class="form-hd">
			<h2>
				<img src="../../../assets/images/delivery/text-logo.png" class="slogo"  />
				<b>家庭成员信息</b>
			</h2>
			<p class="notep">亲爱的业主，为节约您交付现场办理时间，请于交付之日前填写以下信息并上传，谢谢！(注:带*为必填项)</p>
		</div>
		<div class="form-bd">
			<div class="list">
				<p class="set-col-6"><span>*姓名：</span><input type="text" v-model="familyData.familyName" /></p>
				<p class="set-col-6">
					<span>家庭角色：</span>
					<select v-model="familyData.role" >
						<option value="0">父亲</option>
						<option value="1">母亲</option>
						<option value="2">配偶</option>
						<option value="3">子女</option>
						<option value="4">其它</option>
					</select>
				</p>
				<p class="set-col-6"><span>性别：</span><select v-model="familyData.sex" ><option value="0">男</option><option value="1">女</option></select></p>
				<p class="set-col-12"><span>*出生年月：</span><input type="date" v-model="familyData.birthday" /></p>
				<p class="set-col-6">
					<span>文化程度：</span>
					<select v-model="familyData.education">
						<option value="4">硕士及以上</option>
						<option value="3">本科</option>
						<option value="2">大专</option>
						<option value="1">高中</option>
						<option value="0">初中及以下</option>
					</select>
				</p>
				<p class="set-col-6"><span>工作单位：</span><input type="text" v-model="familyData.workUnit" /></p>
				<p class="set-col-6"><span>职务：</span><input type="text" v-model="familyData.vocation" /></p>
				<p class="set-col-6"><span>*联系电话：</span><input type="number" v-model="familyData.telephone" /></p>
				<div class="clear"></div>
			</div>
		</div>
		<div class="next-add">
			<a class="btn" @click="handleFamilyRegister(false)">继续添加</a>
		</div>
		<div class="form-sumbit">
			<a class="btn" @click="handleFamilyRegister(true)">确认上传</a>
		</div>
	</div>
</template>

<script>
	export default {
        name: "deliveryPage11",
        data() {
            return{
                deliverId: this.$route.params.id,
				custInfo: {},
				familyData: {},
                welcomeBg: null,
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
                    number: '11'
                }
                this.$US.getHousehandoverInfo(data).then(res => {
                    if (res.code == 0) {
                        this.welcomeBg = res.data.welcome_bg
						this.content = this.decodeHTML(res.data.propertyData)
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
			handleFamilyRegister(isNext) {
				let data = this.familyData
				data.houseId = this.houseInfo.houseId
				data.custId = this.custInfo.id
                this.$US.ownerFamilyRegister(data).then(res => {
                    if (res.code == 0) {
						this.$message.success("家人信息登记成功")
						if (isNext) {
							setTimeout( () => {
								this.$router.push({name: 'deliveryPage12', params: {id: this.deliverId}})
							}, 2000)
						} else {
							this.familyData = {}
						}
                    } else {
						this.$message.error(res.msg)
					}
                })
			}
		},
        created() {
			let custInfo = JSON.parse(this.$fun.getLocalStorage('custInfo'))
			this.custInfo = custInfo ? custInfo : {}
			this.getInfo()
			this.getHouseInfo()
        }
	}
</script>