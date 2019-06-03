<template>
	<!--<pull-to :bottom-load-method="pullBottom" >-->
		<div class="wx-full bg-userSet" id="mPic4" :style="styleObject">
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
			<pull-to :bottom-load-method="pullBottom" >
			<div class="goNext">
				<a @click="goToPage('page5')">
					<img src="../../../assets/images/delivery/goNext.png"  />
				</a>
			</div>
			</pull-to>
		</div>
	<!--</pull-to>-->
</template>
 
<script>
//	import PullTo from 'vue-pull-to'
    export default {
        name: "deliveryPage4",
		components: {
//			PullTo
		},
        data(){
            return{
                deliverId: this.$route.params.id,
                welcomeBg: null,
				toOwnerContent: '',
				background: null,
            }
        },
		computed: {
			styleObject() {
				let style = {}
				if (this.background) {
					style.background = 'url(' + this.background + ')'
				}
				return style
			}
		},
		methods: {
			decodeHTML(str) {
				var txt = document.createElement('textarea');
				txt.innerHTML = str;
				return txt.value;
			},
			pullBottom() {
				this.goToPage('page5')
			},
			goToPage(page) {
				this.$router.push({path: page})
			},
            getInfo() {
                let data = {
                    deliverId: this.$route.params.id,
                    number: '4'
                }
                this.$US.getHousehandoverInfo(data).then(res => {
                    if (res.code == 0) {
                        this.welcomeBg = res.data.welcome_bg
						this.background = res.data.background
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