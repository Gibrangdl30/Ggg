<template>
    <f7-page class="" id="inicio">

        <div class="vista">
            <nav-bar tipo="inicio" :no_border="1" title="" :backs="1" :logo="0" :profile="0"  />

            <div class="contenedor-page-tabs back-color-negro">

                <div class="row w-100 m-0">
                    <div class="row w-100 m-0">
                        <div class="h-70vw w-100 position-relative">
                            <imagen :src="pres.imagen"  />
                            <div class="w-100 h-100 position-absolute top-0px left-0px back-color-negro1 "></div>
                            <div class="row w-100 m-0 position-absolute bottom-40px left-0px">
                                <div class="row w-100 m-0 letra-blanco-25 fw-600 justify-content-center ">{{pres.nombre}}</div>
                                <div class="row w-100 m-0 letra-blanco-22 justify-content-center text-capitalize ">{{evento.fecha | fechaM }}</div>
                                <div class="row w-100 m-0 pb-40px letra-blanco-22 justify-content-center text-capitalize ">{{evento.hora | horaH }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row w-100 m-0 px-3 pt-3 letra-blanco-18">Costo de boletos</div>
                <div class="row w-100 m-0 pt-2 pb-2"  >
                    <div class="row w-100 m-0 px-3" v-for=" (e) of zonas" :key="e.id">
                        <div class="row w-100 m-0 py-2" >
                            <eventosComponent :zona="1"  :data="e"  />
                        </div>
                    </div>
                </div>

                <div class="row w-100 m-0 py-3 px-3">
                    <div class="h-70vw w-100 position-relative">
                        <imagen class="border-radius-10px" :src="lugar.mapa" :show="1"  />
                    </div>
                </div>

                <div class="row w-100 m-0 py-4"></div>

            </div>

        </div>

    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
const moment = require('moment');

    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                ins: 0,
                b: null,
                modal: null,
                modal2: null,
                c: 15,
                add: 5,
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},

            eventos(){return this.$store.getters.info('eventos') },
            evento(){return this.$store.getters.dataFind('eventos', 'evento') },
            pres(){return this.evento.presentador || {}},
            lugar(){return this.evento.lugar || {}},
            zonas(){return this.evento.zonas || []},
        },

        mounted(){
        },

        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },

            back(ruta){
                this.router.back(ruta);
            },

            cancelar(){
                let form = this.asignado;
                form.cancelar = 1;
                this.$store.dispatch('userPostCrearPost',[ form ]);
                form.cancelar = 0;
            },

            reco(tipo = 1){
                this.$store.commit('setUsD',['tipo', tipo]);
                this.$store.commit('openModal',['modalHijosRecoleccion']);
            },

        }
    }
</script>