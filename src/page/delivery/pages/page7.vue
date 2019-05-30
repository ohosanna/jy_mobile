<template>
	<pull-to :bottom-load-method="pullBottom" >
		<div class="wx-full bg-userSet" id="mPic7">
			<div class="pic-userSet housePrice">
				<div class="notecontent">
					<h3>房价补(退)差价</h3>
					<h4>房屋面积差</h4>
					<div class="list">
						<p><span>合同面积(m²)</span><input v-model="priceData.contractArea" readonly /></p>
						<p><span>实则面积(m²)</span><input v-model="priceData.realArea" readonly /></p>
						<p><span>合同差额(m²)</span><input v-model="priceData.differArea" readonly /></p>
					</div>
					<h4>房款补退差价</h4>
					<div class="list">
						<p><span>实际房款(元)</span><input v-model="priceData.realPrice" readonly /></p>
						<p><span>房屋补(退)差价(元)</span><input v-model="priceData.priceDiffer" readonly /></p>
						<p><span>注：该项费用仅支持现金支付</span></p>
					</div>
					
				</div>
			</div>
			<div class="footPic">
				<img v-if="welcomeBg" :src="welcomeBg" class="fullpic">
			</div>
			<div class="goNext">
				<a @click="goToPage('page8')">
					<img  src="../../../assets/images/delivery/goNext.png"  />
				</a>
			</div>
		</div>
	</pull-to>
</template>
 

<script>
	import PullTo from 'vue-pull-to'
    export default {
        name: "deliveryPage7",
		components: {
			PullTo
		},
        data(){
            return{
                deliverId: this.$route.params.id,
                welcomeBg: null,
				priceData: {},
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
			pullBottom() {
				this.goToPage('page8')
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
			getHousePrice() {
				let data = {
					houseId: this.houseInfo.houseId,
					houseName: this.houseInfo.houseName 
				}
                this.$US.getHousePrice(data).then(res => {
                    if (res.code == 0) {
						this.priceData = res.data
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
				this.getHousePrice();
			})
        }
	}
</script>