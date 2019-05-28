<template>
	<div class="wx-full bg-userSet" id="mPic8">
		<div class="pic-userSet housePrice">
			<div class="notecontent">
				<h3>物业费用详情</h3>
				<div class="list">
					<p><span>物业管理费(12个月)(元)</span><input v-model="propertyData.manageFee1" readonly /></p>
					<p><span>物业管理费(22个月)(元)</span><input v-model="propertyData.manageFee2" readonly /></p>
					<p><span>电梯费(1年)(元)</span><input v-model="propertyData.liftFee1" readonly /></p>
					<p><span>电梯费(2年)(元)</span><input v-model="propertyData.liftFee2" readonly /></p>
					<p><span>装修管理服务费(元)</span><input v-model="propertyData.decorate" readonly /></p>
					<p><span>房屋本体维修基金(元)</span><input v-model="propertyData.repair" readonly /></p>
					<p>注：房屋本体维修基金仅支持银联卡支付</p>
				</div>
			</div>
			<div class="notecontent">
				<h3>费用总计</h3>
				<div class="list">
					<p><span>共需现金缴纳费、电梯费(1年)(元)</span><input v-model="propertyData.total1" readonly /></p>
					<p><span>共需现金缴纳费、电梯费(22个月)(元)</span><input v-model="propertyData.total2" readonly /></p>
				
				</div>
			</div>
			<div class="btnshow">
				<router-link class="btn btn-yellow" :to="{name: 'deliveryPage3', params: {id: $route.params.id}}" >重新选择房源</router-link>
			</div>
		</div>
		<div class="footPic">
            <img v-if="welcomeBg" :src="welcomeBg" class="fullpic">
		</div>
		<div class="goNext">
			<img @click="goToPage('page9')" src="../../../assets/images/delivery/goNext.png"  />
		</div>
	</div>
</template>
 

<script>
    export default {
        name: "deliveryPage8",
        data(){
            return{
                deliverId: this.$route.params.id,
                welcomeBg: null,
				propertyData: {},
				houseInfo: {}
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
                    number: '8'
                }
                this.$US.getHousehandoverInfo(data).then(res => {
                    if (res.code == 0) {
                        this.welcomeBg = res.data.welcome_bg
                    }
                })
            },
			getHouseInfo() {
				let houseInfo = this.$fun.getLocalStorage('selectedHouse')
				if (!houseInfo) {
					this.$message.error('请先选择你的房源。')
					setTimeout( () => {
						this.$router.push({name: 'deliveryPage2', params: {id: this.deliverId}})
					}, 2000)
				} else {
					this.houseInfo = JSON.parse(houseInfo)
				}
			},
			getPropertyCost() {
				let data = {
					deliverId: this.$route.params.id,
					houseId: this.houseInfo.houseId,
					houseName: this.houseInfo.houseName
				}
                this.$US.getPropertyCost(data).then(res => {
                    if (res.code == 0) {
						this.propertyData = res.data
                    } else {
						this.$message.error(res.msg)
					}
                })
			}
		},
        created() {
            this.getInfo()
			this.getHouseInfo()
			this.$nextTick(() => {
				this.getPropertyCost();
			})
        }
	}
     
</script>