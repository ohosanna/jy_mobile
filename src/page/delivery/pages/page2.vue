<template>
	<div class="wx-full bg-userSet" id="mPic2">
		<div class="pic-userSet">
			<template v-if="hasResult">
				<div class="toppic">
					<img src="../../../assets/images/delivery/text2.png">
				</div>
				<div class="houselist">
					<div v-for="room in rooms" :key="room.houseId" class="list">
						<a class="btn btn-yellow">{{room.houseName}}</a>
					</div>
				</div>
			</template>
			<template v-else>
				<div class="toppic">
					<img src="../../../assets/images/delivery/text1.png">
				</div>
				<div class="formset">
					<div class="list">
						<span>姓&nbsp;&nbsp;　　　名：</span>
						<input class="input-userSet" type="text" v-model="custName" />
					</div>
					<div class="list">
						<span>身份证后6位：</span>
						<input class="input-userSet" type="text" v-model="cardNumber" />
					</div>
					<p class="note">
						注：填写内容以购房合同签署信息为准，如购房合同签署人不止一个，选择其一即可。
					</p>
					<div class="btnshow">
						<a class="btn btn-yellow" @click="getHouseList">查询</a>
					</div>
				</div>
			</template>
		</div>
		<div class="footPic">
            <img v-if="welcomeBg" :src="welcomeBg" class="fullpic">
		</div>
	</div>
</template>
 
<script>
    export default {
        name: "deliveryPage2",
        data(){
            return{
                welcomeBg: null,
				hasResult: false,
				rooms: [],
				custName: '',
				cardNumber: ''
            }
        },
        methods:{
            getInfo() {
                let data = {
                    deliverId: this.$route.params.id,
                    number: '2'
                }
                this.$US.getHousehandoverInfo(data).then(res => {
                    if (res.code == 0) {
                        this.welcomeBg = res.data.welcome_bg;
                    }
                })
            },
			getHouseList() {
				let data = {
					communityId: this.$route.params.id,
					custName: this.custName,
					cardNumber: this.cardNumber
				}
                this.$US.getHouseList(data).then(res => {
                    if (res.code == 0) {
						this.rooms = res.data.houseData
						this.hasResult = true
                    } else {
						this.$message.error(res.msg)
					}
                })
			}
        },
        created() {
            this.getInfo()
        }
    }
</script>