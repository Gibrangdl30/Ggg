<template>
    <f7-page class="" id="inicio">
        <div class="vista">

            <nav-bar tipo="inicio" :backs="true" :title="'Notificaciones'" :fix="1"/>
            
            <div class="contenedor-page-tabs back-color-blanco">

                <!-- <div class="row w-100 m-0 px-3 pt-3" v-if="!paginado || !paginado.length" >
                    <div class="row w-100 m-0 px-3 letra-gray4-22 justify-content-center text-center ">No hay notificaciones</div>
                </div> -->

                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 ">

                        <div class="row w-100 m-0 py-3 px-3">
                            <div class="w-50px">
                                <imagen :icono="true" src="buble" />
                            </div>
                            <div class="col px-0 pl-3">
                                <div class="row w-100 m-0 gray4-19">Chat con Docente Sustam</div>
                                <div class="row w-100 m-0 verde-16">{{'hoy,  a las 09:00 hrs'}}</div>
                            </div>
                        </div>

                        <div class="row w-100 m-0 px-3 py-3 ">
                            <div class="w-50px">
                                <imagen :icono="true" src="reporte" />
                            </div>
                            <div class="col px-0 pl-3">
                                <div class="row w-100 m-0 gray4-19">Reporte nuevo</div>
                                <div class="row w-100 m-0 verde-16">{{'hoy,  a las 13:00 hrs'}}</div>
                            </div>
                        </div>

                    </div>
              
                </div>

            </div>
            <tabs />
        </div>
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
// const moment = require('moment-timezone');

    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                info: null,
                c: 15,
                add: 5,
                zona: null,
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},

            eventos(){return this.$store.getters.userStateArray('misEventos'); },
        },
        mounted(){
            this.$store.dispatch('initData', [this.$f7]);
            // console.log("···············", this.zona);
        },
        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },
        }
    }
</script>