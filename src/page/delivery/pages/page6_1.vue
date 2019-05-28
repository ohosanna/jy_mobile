<template>
	<div class="wx-full bg-userSet" id="mPic6">
		<div class="pic-userSet">
			<div class="toptext">
				<b>契税申报办理指南</b>
			</div>
			<div class="notecontent" v-html="content">
			</div>
		</div>
		<div class="footPic">
            <img v-if="welcomeBg" :src="welcomeBg" class="fullpic">
		</div>
		<div class="goNext">
			<a @click="goToPage('page7')">
				<img  src="../../../assets/images/delivery/goNext.png"  />
			</a>
		</div>
	</div>
</template>
 

<script>
    export default {
        name: "deliveryPage6-1",
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
            getInfo() {
                let data = {
                    deliverId: this.$route.params.id,
                    number: '16'
                }
                this.$US.getHousehandoverInfo(data).then(res => {
                    if (res.code == 0) {
                        this.welcomeBg = res.data.welcome_bg
						this.content = this.decodeHTML(res.data.taxReportGuide)
                    }
                })
            },
		},
        created() {
            this.getInfo()
        }
	}
</script>