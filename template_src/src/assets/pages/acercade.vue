<template>
    <f7-page>
    <div class="vista back-color-blanco">

    <nav-bar tipo="inicio" :backs="true" :logo="true" :title="''" />

    <div class="contenedor-page padding-bottom-20 back-color-blanco">
        <div class="row w-100 m-0 back-color-blanco">
           <div class="row w-100 m-0 py-2 justify-content-center">
                <div class="row w-100 m-0 px-2 position-relative pb-5" >
                    <div class="row w-100 m-0 px-3">
                        <div class="row w-100 m-0 letra-gray3-20 fw-600 py-2 pb-2 justify-content-center">PROXIMAMENTE</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>

    </f7-page>
</template>
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
        },
        mounted(){
        },
        methods:{
            goTo(ruta)
            {
                this.$f7.views.principal.router.navigate(ruta);
            },
            goToDetelle()
            {
                this.goTo('/mensajes_chat');
            }
        }
    }
</script>