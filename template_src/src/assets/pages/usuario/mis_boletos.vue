<template>
    <f7-page class="" id="inicio">
        <div class="vista">
            <nav-bar tipo="inicio" title="Mis reservaciones" :fix="1" :backs="true"   />

            <div class="row w-100 m-0" v-if="1">
                <div class="row w-100 m-0">
                    <div class="col px-0" @click="t=1">
                        <div class="row w-100 m-0 border-rojo1-1 justify-content-center text-center py-2"
                            :class="t==1?'back-color-rojo1 letra-blanco-18':'letra-rojo1-18'">Activas</div>
                    </div>
                    <div class="col px-0" @click="t=2">
                        <div class="row w-100 m-0 border-rojo1-1 justify-content-center text-center py-2"
                            :class="t==2?'back-color-rojo1 letra-blanco-18':'letra-rojo1-18'">Historico</div>
                    </div>
                    
                    <div class="col px-0" @click="t=3">
                        <div class="row w-100 m-0 border-rojo1-1 justify-content-center text-center py-2"
                            :class="t==3?'back-color-rojo1 letra-blanco-18':'letra-rojo1-18'">Canceladas</div>
                    </div>
                </div>
            </div>

            <div class="contenedor-page-tabs">

                <div class="row w-100 m-0 pt-5" v-if="!byTab || !byTab.length">
                    <div class="row w-100 m-0 justify-content-center text-center letra-gray3-20" >No existen reservaciones.</div>
                </div>

                <div class="row w-100 m-0 pt-2 pb-2"  >
                    <div class="row w-100 m-0 px-3 py-3" v-for=" info of byTab" :key="info.id">
                       <instalcionesComponent :data="info" :reserva="1" :cancel="t==1" />
                    </div>
                </div>

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
                t:1,
                b: null,
                modal: null,
                modal2: null,
                c: 15,
                add: 5,
                hoy: moment().format('YYYY-MM-DD')
                // notShow:[],
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},

            boletos(){return this.$store.getters.info('misReservaciones') },
            byTab(){
                if(this.t == 1){
                    return this.boletos.filter(s=>s.day_reservation >= this.hoy && s.status != 'cancelada')
                }
                if(this.t == 2){
                    return this.boletos.filter(s=>s.day_reservation < this.hoy && s.status != 'cancelada')
                }
                if(this.t == 3){
                    return this.boletos.filter(s=>s.status == 'cancelada')
                }
                return this.boletos;
            }
        },

        mounted(){
            this.$store.dispatch('initData', [this.$f7]);
        },

        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },

            back(ruta){
                this.router.back(ruta);
            },

            comentar(x){
                this.$store.commit('setStData', ['id', x.id ] );
                this.router.navigate('/mi_boleto_detalle');
            },

        }
    }
</script>