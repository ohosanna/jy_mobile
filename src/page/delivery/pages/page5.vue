<template>
	<!--<pull-to :bottom-load-method="pullBottom" >-->
		<div class="wx-full bg-userSet" id="mPic5" :style="styleObject">
			<div class="pic-userSet">
				<div class="toppic">
					<img v-if="mapImg" :src="mapImg" class="fullpic">
					<!-- <img src="../../../assets/images/delivery/4.png" class="fullpic" /> -->
				</div>
			</div>
			<div class="footPic">
				<img v-if="welcomeBg" :src="welcomeBg" class="fullpic">
			</div>
			<div class="goNext">
				<a @click="goToPage('page6')">
					<img src="../../../assets/images/delivery/goNext.png"  />
				</a>
			</div>
		</div>
	<!--</pull-to>-->
</template>
 

<script>
//	import PullTo from 'vue-pull-to'
    export default {
        name: "deliveryPage5",
		components: {
//			PullTo
		},
        data(){
            return{
                deliverId: this.$route.params.id,
                welcomeBg: null,
				background: null,
				mapImg: null,
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
				this.goToPage('page6')
			},
            getInfo() {
                let data = {
                    deliverId: this.$route.params.id,
                    number: '5'
                }
                this.$US.getHousehandoverInfo(data).then(res => {
                    if (res.code == 0) {
                        this.welcomeBg = res.data.welcome_bg
						this.background = res.data.background
                        this.mapImg = res.data.map
                    }
                })
            },
		},
        created() {
            this.getInfo()
        }
	}
     
</script>