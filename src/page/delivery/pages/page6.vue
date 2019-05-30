<template>
	<pull-to :bottom-load-method="pullBottom" >
		<div class="wx-full bg-userSet" id="mPic6" :style="styleObject">
			<div class="pic-userSet">
				<div class="toptext">
					<b>公证需要提供的材料</b>
				</div>
				<div class="notecontent" v-html="content">
				</div>
			</div>
			<div class="footPic">
				<img v-if="welcomeBg" :src="welcomeBg" class="fullpic">
			</div>
			<div class="goNext">
				<a @click="goToPage('page6-1')">
					<img  src="../../../assets/images/delivery/goNext.png"  />
				</a>
			</div>
		</div>
	</pull-to>
</template>
 

<script>
	import PullTo from 'vue-pull-to'
    export default {
        name: "deliveryPage6",
		components: {
			PullTo
		},
        data(){
            return{
                welcomeBg: null,
				background: null,
				content: null,
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
			goToPage(path) {
				this.$router.push({path: path})
			},
			pullBottom() {
				this.goToPage('page6-1')
			},
            getInfo() {
                let data = {
                    deliverId: this.$route.params.id,
                    number: '6'
                }
                this.$US.getHousehandoverInfo(data).then(res => {
                    if (res.code == 0) {
                        this.welcomeBg = res.data.welcome_bg
						this.background = res.data.background
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