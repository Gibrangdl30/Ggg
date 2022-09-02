<template>
    <f7-page class="" id="inicio">
        <div class="vista">
            <nav-bar tipo="inicio" title="Boletos" :fix="1" :backs="true"   />

            <div class="contenedor-page-tabs back-color-negro">

                <div class="row w-100 m-0 pt-2 pb-2"  >
                    <div class="row w-100 m-0 px-3" v-for=" info of boletos" :key="info.id">
                        <div  class="row w-100 m-0 my-2 border-gray0-1 border-radius-10px overflow-hidden "  @click="comentar(info)" >
                            <div class="row w-100 m-0 justify-content-center" :class="info.type == 's'?'app-degra ':''" >
                                <div class="row w-100 m-0 py-5px px-2 " >
                                    <div class="w-20vw h-20vw my-auto mt-2">
                                        <imagen clase="border-radius-10px" :src="info.imagen"  />
                                    </div>
                                    <div class="col px-0 pl-3 my-auto " >
                                        <div class="row w-100 m-0 letra-blanco-17 fw-600 " >{{info.nombre}}</div>
                                        <div class="row w-100 m-0 letra-rojo1-15 " >{{info.place}}</div>
                                        <div class="row w-100 m-0 pt-2px">
                                            <div class="col-auto px-0 letra-blanco-16 ">{{[info.fecha, info.hora] | fechaE}}</div>
                                        </div>
                                        <div class="row w-100 m-0  ">
                                            <div class="col-auto px-0 ml-auto letra-rojo1-16 ">{{[info.creado, 'YYYY-MM-DD HH:mm:ss'] |  moment('from') }}</div>
                                        </div>
                                    </div>

                                </div>
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
const moment = require('moment');

    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                b: null,
                modal: null,
                modal2: null,
                c: 15,
                add: 5,
                // notShow:[],
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},

            boletos(){return this.$store.getters.info('boletos') },
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