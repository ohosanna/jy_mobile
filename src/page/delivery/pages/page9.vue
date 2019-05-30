<template>
	<pull-to :bottom-load-method="pullBottom" >
		<div class="wx-full bg-userSet" id="mPic9" :style="styleObject">
			<div class="pic-userSet housePrice">
				<div class="notecontent">
					<h3>家庭信息登记</h3>
					<div class="list" v-html="content">
					</div>
				</div>
				<div class="btnshow">
					<router-link class="btn btn-yellow" :to="{name: 'deliveryPage10', params: {id: $route.params.id}}" >点击上传家庭信息</router-link>
				</div>
				<div class="note">
					<p>注：如在交付前填写并上传完善家庭信息，可大量节约交付现场办理时间</p>
				</div>
			</div>
			<div class="footPic">
				<img v-if="welcomeBg" :src="welcomeBg" class="fullpic">
			</div>
			<div class="goNext">
				<img @click="goToPage('page10')" src="../../../assets/images/delivery/goNext.png"  />
			</div>
		</div>
	</pull-to>
</template>
 

<script>
	import PullTo from 'vue-pull-to'
    export default {
        name: "deliveryPage9",
		components: {
			PullTo
		},
        data(){
            return{
                welcomeBg: null,
				content: null,
				background: null,
            }
        },
		computed: {
			styleObject() {
				let style = {}
				if (this.background) {
					style.background = 'url(' + this.background + ')'
				}
				return style
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
				this.goToPage('page10')
			},
            getInfo() {
                let data = {
                    deliverId: this.$route.params.id,
                    number: '9'
                }
                this.$US.getHousehandoverInfo(data).then(res => {
                    if (res.code == 0) {
                        this.welcomeBg = res.data.welcome_bg
						this.background = res.data.background
						this.content = this.decodeHTML(res.data.familyTip)
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
        }
	}
</script>