<template>
    <div class="h5-page wx-full" :class="$route.name">
        <router-view />
    </div>
</template>
<script>
import '../../style/css/weui.css';
import '../../style/css/weuix.css';
import '../../style/css/delivery/h5set.css';

import '../../js/jquery.min.js';

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
        $(function() {
            $("input").blur(function () {
                console.log(" ");
                setTimeout(function () {
                    var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
                    window.scrollTo(0, Math.max(scrollHeight - 1, 0));
                }, 100);
            });
        })

    }
}
</script>
