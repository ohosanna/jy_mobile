<template>
	<div class="wx-full bg-userSet2" id="mPic10">
		<div class="form-hd">
			<h2>
				<img src="../../../assets/images/delivery/text-logo.png" class="slogo"  />
				<b>业主信息登记表</b>
			</h2>
			<p class="notep">亲爱的业主，为节约您交付现场办理时间，请于交付之日前填写以下信息并上传，谢谢！(注:带*为必填项)</p>
			<div class="list">
				<p class="set-col-6"><span>小区：</span><input ></p>
				<p class="set-col-6"><span>房号：</span><input ></p>
				<p class="set-col-6"><span>业主姓名：</span><input ></p>
				<p class="set-col-6"><span>联系方式：</span><input ></p>
				<p class="set-col-12"><span>身份证号：</span><input ></p>
				<div class="clear"></div>
			</div>
		</div>
		<div class="form-bd">
			<div class="list">
				<p class="set-col-6"><span>*我是：</span><input ></p>
				<p class="set-col-6"><span>性别：</span><select ><option>男</option><option>女</option></select></p>
				<p class="set-col-12"><span>出生年月：</span><input type="date" ></p>
				<p class="set-col-12"><span>文化程度：</span><select ><option>大学</option><option>高中</option><option>初中及以下</option></select></p>
				<p class="set-col-6"><span>籍贯：</span><input ></p>
				<p class="set-col-6"><span>政治面貌：</span><input ></p>
				<p class="set-col-12"><span>*兴趣爱好：</span><input ></p>
				<p class="set-col-12"><span>*微信号/QQ号：</span><input ></p>
				<p class="set-col-12"><span>*紧急联系人：</span><input ></p>
				<p class="set-col-12"><span>*紧急联系人联系方式：</span><input ></p>
				<p class="set-col-6"><span>*工作单位：</span><input ></p>
				<p class="set-col-6"><span>*职业：</span><input ></p>
				<p class="set-col-6"><span>职称：</span><input ></p>
				<p class="set-col-6"><span>职务：</span><input ></p>
				<p class="set-col-6"><span>*办公电话：</span><input ></p>
				<p class="set-col-6"><span>*单位地址：</span><input ></p>
				<p class="set-col-6"><span>*是否有车辆：</span><select ><option>有</option><option>无</option></select></p>
				<p class="set-col-6"><span>*是否有子女：</span><select ><option>有</option><option>无</option></select></p>
				<p class="set-col-6"><span>*房屋性质：</span><select ><option>自用</option><option>出租</option></select></p>
				<div class="clear"></div>
			</div>
		</div>
		<div class="form-sumbit">
			<a class="btn">确认上传</a>
		</div>
	</div>
</template>
 

<script>
	export default {
        name: "deliveryPage10",
        data() {
            return{
                welcomeBg: null,
				content: null,
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
                        this.welcomeBg = res.data.welcome_bg
						this.content = this.decodeHTML(res.data.propertyData)
                    }
                })
            },
		},
        created() {
        }
	}
     
</script>