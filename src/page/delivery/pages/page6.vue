<template>
	<div class="wx-full bg-userSet" id="mPic6">
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
			<img src="../../../assets/images/delivery/goNext.png"  />
		</div>
	</div>
</template>
 

<script>
    export default {
        name: "deliveryPage6",
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
            getInfo() {
                let data = {
                    deliverId: this.$route.params.id,
                    number: '6'
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