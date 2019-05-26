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
				<p class="set-col-6"><span>*姓名：</span><input ></p>
				<p class="set-col-6"><span>家庭角色：</span><select ><option>父亲</option><option>母亲</option></select></p>
				<p class="set-col-6"><span>性别：</span><select ><option>男</option><option>女</option></select></p>
				<p class="set-col-12"><span>*出生年月：</span><input type="date" ></p>
				<p class="set-col-6"><span>文化程度：</span><select ><option>大学</option><option>高中</option><option>初中及以下</option></select></p>
				<p class="set-col-6"><span>工作单位：</span><input ></p>
				<p class="set-col-6"><span>职务：</span><input ></p>
				<p class="set-col-6"><span>*联系电话：</span><input ></p>
				<div class="clear"></div>
			</div>
		</div>
		<div class="next-add">
			<a class="btn">继续添加</a>
		</div>
		<div class="form-sumbit">
			<a class="btn">确认上传</a>
		</div>
	</div>
</template>

<script>
	export default {
        name: "deliveryPage11",
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
                    number: '11'
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
			this.getInfo()
        }
	}
</script>