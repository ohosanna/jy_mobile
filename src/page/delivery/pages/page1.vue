<template>
    <div class="wx-full bg-userSet" id="mPic1" :style="backgroundObject">
        <div class="pic-userSet">
            <img v-if="welcomePic" :src="welcomePic" class="fullpic">
            <router-link class="btn btn-bigger btn-yellow" :to="{name: 'deliveryPage2'}">点击进入交付查询通道</router-link>
        </div>
        <div class="footPic">
            <!-- <img v-if="welcomeBg" :src="welcomeBg" class="fullpic"> -->
        </div>
    </div>
</template>
<script>
    export default {
        name: "deliveryPage1",
        data(){
            return{
                welcomePic: null,
                welcomeBg: null,
                background: null
            }
        },
        computed: {
            backgroundObject() {
                let style = {
                }
                if (this.background)  {
                    style['background'] = 'url(' + this.background + ')'
                }
                return style
            }

        },
        methods:{
            getInfo() {
                let data = {
                    deliverId: this.$route.params.id,
                    number: '1'
                }
                this.$US.getHousehandoverInfo(data).then(res => {
                    if (res.code == 0) {
                        this.welcomePic = res.data.welcome;
                        this.welcomeBg = res.data.welcome_bg;
                        this.background = res.data.background
                    }
                })
            }
        },
        created() {
            this.getInfo()
        }
    }
     
</script>