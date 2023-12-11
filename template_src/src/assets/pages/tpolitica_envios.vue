<template>
    <f7-page>
    <div class="vista">
        <nav-bar tipo="inicio" :backs="true" :title="'Política de envíos, Pagos y Devoluciones.'" :fix="1"></nav-bar>

        <div class="contenedor-page-tabs">
            <div class="row w-100 m-0 py-2 justify-content-center">
                
                <div class="col-12 text-justify pt-4" >
                    <div class="row w-100 m-0 p-100 letra-gray3-16 white-space-preline " v-html="data"></div>
                </div>

            </div>

            <div class="row w-100 m-0 py-4"></div>
        </div>
    </div>
    </f7-page>
</template>
<style>
</style>
<script>
import { f7Page } from 'framework7-vue';
import Swiper from 'swiper';
    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                promos_slider: null,
                categorias_slider: null
            } 
        },
        computed: {
            session(){return this.$store.getters.getSession;},
            user(){return this.$store.getters.user;},
            data(){return this.$store.getters.info('politica'); },
        },
        methods:{
            goTo(ruta){
                this.$f7.views.principal.router.navigate(ruta);
            },
        }
    }
</script>