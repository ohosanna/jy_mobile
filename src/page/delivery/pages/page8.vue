<template>
	<div class="wx-full bg-userSet" id="mPic8">
		<div class="pic-userSet housePrice">
			<div class="notecontent">
				<h3>物业费用详情</h3>
				<div class="list">
					<p><span>物业管理费(12个月)(元)</span><input value="3240.12"></p>
					<p><span>物业管理费(12个月)(元)</span><input value="3240.12"></p>
					<p><span>物业管理费(12个月)(元)</span><input value="3240.12"></p>
					<p><span>物业管理费(12个月)(元)</span><input value="3240.12"></p>
					<p><span>物业管理费(12个月)(元)</span><input value="3240.12"></p>
					<p><span>物业管理费(12个月)(元)</span><input value="3240.12"></p>
					<p>注：房屋本体维修基金仅支持银联卡支付</p>
				</div>
			</div>
			<div class="notecontent">
				<h3>费用总计</h3>
				<div class="list">
					<p><span>共需现金缴纳费、电梯费(1年)(元)</span><input value="3240.12"></p>
					<p><span>共需现金缴纳费、电梯费(22个月)(元)</span><input value="3240.12"></p>
				
				</div>
			</div>
			<div class="btnshow">
				<router-link class="btn btn-yellow" :to="{name: 'deliveryPage2', params: {id: $route.params.id}}" >重新选择房源</router-link>
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
        name: "deliveryPage8",
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
                    number: '8'
                }
                this.$US.getHousehandoverInfo(data).then(res => {
                    if (res.code == 0) {
                        this.welcomeBg = res.data.welcome_bg
                    }
                })
            },
			getPropertyCost() {
				let data = {
					deliverId: this.$route.params.id,
					houseId: '42',
					houseName: '1 甲-101'
				}
                this.$US.getPropertyCost(data).then(res => {
                    if (res.code == 0) {
                    } else {
						this.$message.error(res.msg)
					}
                })
			}
		},
        created() {
            this.getInfo()
			this.getPropertyCost();
        }
	}
     
</script>