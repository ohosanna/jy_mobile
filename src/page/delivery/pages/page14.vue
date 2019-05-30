<template>
	<div class="wx-full bg-userSet" id="mPic15">
		<div class="pic-userSet">
			<div class="notecontent">
				<img src="../../../assets/images/delivery/lastpic.png" class="fullpic"  />
			</div>
		</div>
		<div class="footPic">
            <img v-if="welcomeBg" :src="welcomeBg" class="fullpic">
		</div>
		<div class="goNext" v-if="false">
			<img @click="goToPage('page2')" src="../../../assets/images/delivery/goNext.png"  />
		</div>
	</div>
</template>

<script>
    export default {
        name: "deliveryPage14",
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
                    number: '14'
                }
                this.$US.getHousehandoverInfo(data).then(res => {
                    if (res.code == 0) {
                        this.welcomeBg = res.data.welcome_bg
                    }
                })
            },
		},
        created() {
            this.getInfo()
        }
	}
</script>