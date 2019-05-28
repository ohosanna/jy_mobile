<template>
	<div class="wx-full bg-userSet" id="mPic4">
		<div class="pic-userSet">
			<div class="toppic">
				<img src="../../../assets/images/delivery/text3.png" class="fullpic" />
			</div>
			<div class="note">
				感谢您加入路劲大家庭！为使您更顺利地办理手续，请详细阅读以下内容：
			</div>
			<div class="notecenter" v-html="toOwnerContent">
			</div>
		</div>
		<div class="footPic">
            <img v-if="welcomeBg" :src="welcomeBg" class="fullpic">
		</div>
		<div class="goNext">
			<a @click="goToPage('deliveryPage5')">
				<img src="../../../assets/images/delivery/goNext.png"  />
			</a>
		</div>
	</div>
</template>
 
<script>
    export default {
        name: "deliveryPage4",
        data(){
            return{
                deliverId: this.$route.params.id,
                welcomeBg: null,
				toOwnerContent: ''
            }
        },
		methods: {
			decodeHTML(str) {
				var txt = document.createElement('textarea');
				txt.innerHTML = str;
				return txt.value;
			},
			goToPage(page) {
				this.$router.push({name: page, params: {id: this.deliverId}})
			},
            getInfo() {
                let data = {
                    deliverId: this.$route.params.id,
                    number: '4'
                }
                this.$US.getHousehandoverInfo(data).then(res => {
                    if (res.code == 0) {
                        this.welcomeBg = res.data.welcome_bg
						this.toOwnerContent = this.decodeHTML(res.data.toOwner)
                    }
                })
            },
		},
        created() {
            this.getInfo()
        }
	}
</script>