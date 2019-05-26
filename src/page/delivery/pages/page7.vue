<template>
	<div class="wx-full bg-userSet" id="mPic7">
		<div class="pic-userSet housePrice">
			<div class="notecontent">
				<h3>房价补(退)差价</h3>
				<h4>房屋面积差</h4>
				<div class="list">
					<p><span>合同面积(m²)</span><input value="135.12"></p>
					<p><span>实则面积(m²)</span><input value="135.11"></p>
					<p><span>合同差额(m²)</span><input value="-0.01"></p>
				</div>
				<h4>房款补退差价</h4>
				<div class="list">
					<p><span>实际房款(元)</span><input value="822496.00"></p>
					<p><span>房屋补(退)差价(元)</span><input value="-61.00"></p>
					<p><span>注：该项费用仅支持现金支付</span></p>
				</div>
				
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
        name: "deliveryPage7",
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
                    number: '7'
                }
                this.$US.getHousehandoverInfo(data).then(res => {
                    if (res.code == 0) {
                        this.welcomeBg = res.data.welcome_bg
                    }
                })
            },
			getHousePrice() {
				let data = {
					houseId: '42',
					houseName: '1 甲-101'
				}
                this.$US.getHousePrice(data).then(res => {
                    if (res.code == 0) {
                    } else {
						this.$message.error(res.msg)
					}
                })
			}
		},
        created() {
            this.getInfo()
			this.getHousePrice();
        }
	}
</script>