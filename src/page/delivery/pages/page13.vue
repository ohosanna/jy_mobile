<template>
	<pull-to :bottom-load-method="pullBottom" >
		<div class="wx-full bg-userSet" id="mPic14">
			<div class="pic-userSet housePrice">
				<div class="notecontent">
					<h3>温馨提示</h3>
					<div class="list" v-html="content">
					</div>
				</div>
				
			</div>
			<div class="footPic">
				<img v-if="welcomeBg" :src="welcomeBg" class="fullpic">
			</div>
			<div class="goNext">
				<img @click="goToPage('page14')" src="../../../assets/images/delivery/goNext.png"  />
			</div>
		</div>
	</pull-to>
</template>
 
<script>
	import PullTo from 'vue-pull-to'
    export default {
        name: "deliveryPage13",
		components: {
			PullTo
		},
        data(){
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
			goToPage(path) {
				this.$router.push({path: path})
			},
			pullBottom() {
				this.goToPage('page14')
			},
            getInfo() {
                let data = {
                    deliverId: this.$route.params.id,
                    number: '13'
                }
                this.$US.getHousehandoverInfo(data).then(res => {
                    if (res.code == 0) {
                        this.welcomeBg = res.data.welcome_bg
						this.content = this.decodeHTML(res.data.welcomeText)
                    }
                })
            },
		},
        created() {
            this.getInfo()
        }
	}
</script>