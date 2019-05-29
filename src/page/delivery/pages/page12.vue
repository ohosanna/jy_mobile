<template>
	<div class="wx-full bg-userSet2" id="mPic11">
		<div class="form-hd">
			<h2>
				<img src="../../../assets/images/delivery/text-logo.png" class="slogo"  />
				<b>车辆信息</b>
			</h2>
			<p class="notep">亲爱的业主，为节约您交付现场办理时间，请于交付之日前填写以下信息并上传，谢谢！(注:带*为必填项)</p>
		</div>
		<div class="form-bd">
			<div class="list">
				<p class="set-col-6"><span>*车牌号：</span><input v-model="carInfo.carNumber" /></p>
				<p class="set-col-6"><span>*车辆品牌：</span><input v-model="carInfo.carBrand" /></p>
				<p class="set-col-6"><span>*使用人：</span><input v-model="carInfo.carOwner" /></p>
				<p class="set-col-6"><span>*联系电话：</span><input v-model="carInfo.telephone" /></p>
				<p class="set-col-6">
					<span>车辆颜色：</span>
					<select v-model="carInfo.carColor" >
						<option value="白色">白色</option>
						<option value="黑色">黑色</option>
						<option value="灰色">灰色</option>
						<option value="红色">红色</option>
						<option value="蓝色">蓝色</option>
						<option value="其它色">其它色</option>
					</select>
				</p>
				<div class="clear"></div>
				<div class="addpiclist">
				<ul>	
					
					<li class="imgInputBox">
						<image-uploader name="photo1" @success="handleImageUploaded" text="点击上传行驶证正面照片" />
					</li>
					<li class="imgInputBox">
						<image-uploader name="photo2" @success="handleImageUploaded" text="点击上传行驶证反面照片" />
					</li>
					<li class="imgInputBox" >
						<image-uploader name="photo3" @success="handleImageUploaded" text="点击上传驾驶证正面照片" />
					</li>
				</ul>
				</div>
			</div>
		</div>
		
		<div class="form-sumbit">
			<a class="btn" @click="handleCarInfoSubmit">确认上传</a>
		</div>
	</div>
</template>

<script>
	import imageUploader from '../../../components/image_uploader'
    export default {
        name: "deliveryPage12",
		components: {
			imageUploader
		},
        data(){
            return{
                deliverId: this.$route.params.id,
				companyId: '',
				communityId: '',
                welcomeBg: null,
				custInfo: {},
				carInfo: {}
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
                    number: '12'
                }
                this.$US.getHousehandoverInfo(data).then(res => {
                    if (res.code == 0) {
						this.companyId = res.data.companyId
						this.communityId = res.data.communityId
                    }
                })
            },
			handleImageUploaded(name, res) {
				this.carInfo[name] = res.data.id
			},
			handleCarInfoSubmit() {
				let data = this.carInfo
				data.companyId = this.companyId
				data.communityId = this.communityId
				data.custId = this.custInfo.id
				if (data.carNumber == '' || data.carNumber == undefined) {
					return this.$message.error("请填写车牌号码")
				} else if (data.carBrand == '' || data.carBrand == undefined ) {
					return this.$message.error("请填写车辆品牌")
				} else if (data.carOwner == '' || data.carOwner == undefined) {
					return this.$message.error("请填写车辆使用人")
				} else if (data.telephone == '' || data.telephone == undefined) {
					return this.$message.error("请填写联系电话")
				} else if (data.carColor == '' || data.carColor == undefined) {
					return this.$message.error("请选择车辆颜色")
				} else if (data.photo1 == '' || data.photo1 == undefined) {
					return this.$message.error("请上传行驶证正面照片")
				} else if (data.photo2 == '' || data.photo2 == undefined) {
					return this.$message.error("请上传行驶证反面照片")
				} else if (data.photo3 == '' || data.photo3 == undefined) {
					return this.$message.error("请上传驾驶证正面照片")
				}
                this.$US.uploadCarInfo(data).then(res => {
                    if (res.code == 0) {
						this.$message.success("车辆信息提交成功")
						setTimeout( () => {
							this.$router.push({path: 'page13'})
						}, 2000)
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
        }
	}
</script>