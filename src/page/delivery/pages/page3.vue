<template>
	<div class="wx-full bg-userSet" id="mPic2">
		<div class="pic-userSet">
				<div class="toppic">
					<img src="../../../assets/images/delivery/text2.png">
				</div>
				<div class="houselist">
					<div v-for="room in rooms" :key="room.houseId" class="list">
						<a class="btn btn-yellow" @click="handleSelectHouse(room)">{{room.houseName}}</a>
					</div>
				</div>
		</div>
		<div class="footPic">
            <img v-if="welcomeBg" :src="welcomeBg" class="fullpic">
		</div>
	</div>
</template>
 
<script>
    export default {
        name: "deliveryPage3",
        data(){
            return{
                deliverId: this.$route.params.id,
                welcomeBg: null,
				rooms: []
            }
        },
        methods:{
            getInfo() {
                let data = {
                    deliverId: this.deliverId,
                    number: '3'
                }
                this.$US.getHousehandoverInfo(data).then(res => {
                    if (res.code == 0) {
                        this.welcomeBg = res.data.welcome_bg;
                    }
                })
            },
			getHouseData() {
				let houseData = this.$fun.getLocalStorage('houseData')
				this.rooms = JSON.parse(houseData)
			},
			handleSelectHouse(house) {
				this.$fun.setLocalStorage('selectedHouse', house)
				this.$router.push({name: 'deliveryPage4', params: {id: this.deliverId}})
			}
        },
        created() {
            this.getInfo()
			this.getHouseData();
        }
    }
</script>