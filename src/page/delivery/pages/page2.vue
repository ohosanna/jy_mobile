<template>
	<div class="wx-full bg-userSet" id="mPic2">
		<div class="pic-userSet">
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
				communityId: '',
				deliverId: this.$route.params.id,
                welcomeBg: null,
				custName: '',
				cardNumber: ''
            }
        },
        methods:{
            getInfo() {
                let data = {
                    deliverId: this.deliverId,
                    number: '2'
                }
                this.$US.getHousehandoverInfo(data).then(res => {
                    if (res.code == 0) {
						this.communityId = res.data.communityId
                        this.welcomeBg = res.data.welcome_bg
                    }
                })
            },
			getHouseList() {
				let data = {
					communityId: this.communityId,
					custName: this.custName,
					cardNumber: this.cardNumber
				}
				if (data.custName === '') {
					return this.$message.error('请输入姓名')
				} else if (data.cardNumber.length !== 6) {
					return this.$message.error('请输入身份证后六位')
				}
                this.$US.getHouseList(data).then(res => {
                    if (res.code == 0) {
						let custInfo = {
							id: res.data.custId,
							name: res.data.custName
						}
						let houseData = res.data.houseData
						this.$fun.setLocalStorage('custInfo', custInfo)
						this.$fun.setLocalStorage('houseData', houseData)
						this.$router.push({name: 'deliveryPage3', params: {id: this.deliverId}})
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