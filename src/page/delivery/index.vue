<template>
    <div class="h5-page wx-full" :class="$route.name">
        <router-view />
    </div>
</template>
<script>
import '../../style/css/weui.css';
import '../../style/css/weuix.css';
import '../../style/css/delivery/h5set.css';

export default {
    name:'delivery',
    data () {
        return {
            
        }
    },
    watch:{
    },
    methods:{
        
    },
    created(){
    }
}
</script>
