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
				<p class="set-col-6"><span>*车牌号：</span><input ></p>
				<p class="set-col-6"><span>*车辆品牌：</span><input ></p>
				<p class="set-col-6"><span>*使用人：</span><input ></p>
				<p class="set-col-6"><span>*联系电话：</span><input ></p>
				<p class="set-col-6"><span>车辆颜色：</span><select ><option>白色</option><option>红色</option><option>黑色</option></select></p>
				<div class="clear"></div>
				<div class="addpiclist">
				<ul>	
					
					<li class="imgInputBox">
						<image-uploader text="点击上传行驶证正面照片" />
					</li>
					<li class="imgInputBox">
						<b>点击上传行驶证正面照片</b>
						<input id="headFile1" type="file" class="imgInputBox_imgInput" name="headFile1" onchange="getObjectURL(this,'headIcon1')">
						<img class="imgInputBox_img" id="headIcon1"  >
					</li>
					
					<li class="imgInputBox">
						<b>点击上传行驶证反面照片</b>
						<input id="headFile2" type="file" class="imgInputBox_imgInput" name="headFile2" onchange="getObjectURL(this,'headIcon2')">
						<img class="imgInputBox_img" id="headIcon2"  >
					</li>
					
					<li class="imgInputBox">
						<b>点击上传驾驶证正面照片</b>
						<input id="headFile3" type="file" class="imgInputBox_imgInput" name="headFile3" onchange="getObjectURL(this,'headIcon3')">
						<img class="imgInputBox_img" id="headIcon3"  >
					</li>
					</ul>
		
					
				</div>
			</div>
		</div>
		
		<div class="form-sumbit">
			<a class="btn">确认上传</a>
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
                welcomeBg: null,
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
                        this.welcomeBg = res.data.welcome_bg
                    }
                })
            },
		},
        created() {
        }
	}
</script>