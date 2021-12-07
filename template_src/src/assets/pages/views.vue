<template>
    <div class="views tabs">    
        <f7-view url="/login" tabActive       tab name="login"        class="ios-edges" :iosSwipeBack="false" id="view-login"></f7-view>
        <f7-view url="/inicio"                tab name="usuario"      class="ios-edges" :iosSwipeBack="false" id="view-usuario"></f7-view>
        <f7-view url="/inicio_coor"           tab name="coor"         class="ios-edges" :iosSwipeBack="false" id="view-coor"></f7-view>
        <f7-view url="/inicio_maestro"        tab name="maestro"      class="ios-edges" :iosSwipeBack="false" id="view-maestro"></f7-view>
        <!-- <f7-view url="/scanner"               tab name="scanner"      class="ios-edges" :iosSwipeBack="false" id="view-scanner"></f7-view> -->
    </div>
</template>
<script>
import { f7Page, f7View } from 'framework7-vue';
    export default{
        components:{
            f7Page,
            f7View,
        },
        data(){
            return{
                open: true,
            } 
        },
        computed: {
        },
        created() {
            this.$store.dispatch('initData', [this.$f7]);
        },
        mounted(){
        },
        methods:{
        }
    }
</script>