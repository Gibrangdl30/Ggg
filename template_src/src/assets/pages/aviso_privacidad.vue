<template>
    <f7-page>
    <div class="vista">
    <nav-bar tipo="inicio" :backs="true" :fix="1" :title="'Aviso de privacidad'" />
        <div class="contenedor-page-tabs back-color-negro ">

                <div class="row w-100 m-0 py-2 justify-content-center">

                    <div class="col-12 text-justify mt-2" >
                        <div class="row w-100 m-0 letra-blanco-30 white-space-preline justify-content-center">
                            PROXIMAMENTE
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
            session(){return this.$store.getters.getSession;},
            user(){return this.$store.getters.user;},
            chofer(){return this.$store.getters.chofer;},
        },
        methods:{
            goTo(ruta){
                this.$f7.views.principal.router.navigate(ruta);
            },
        }
    }
</script>