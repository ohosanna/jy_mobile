<template>
	<div class="wx-full bg-userSet" id="mPic5">
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
			<a>
				<img src="../../../assets/images/delivery/goNext.png"  />
			</a>
		</div>
	</div>
</template>
 

<script>
    export default {
        name: "deliveryPage5",
        data(){
            return{
                welcomeBg: null,
				mapImg: null,
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
                    number: '5'
                }
                this.$US.getHousehandoverInfo(data).then(res => {
                    if (res.code == 0) {
                        this.welcomeBg = res.data.welcome_bg
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