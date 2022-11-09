<template>
    <f7-page class="" id="inicio">
        <div class="vista">
            <nav-bar tipo="inicio" title="Pedidos" :fix="1" :backs="true"   />

            <div class="contenedor-page-tabs ">

                <div class="row w-100 m-0 pt-2 pb-2" v-if="1"  >
                    <div class="row w-100 m-0 px-3" v-for=" info of consumos" :key="info.id">
                        <div  class="row w-100 m-0 my-2 border-gray01-1 border-radius-10px overflow-hidden "  @click="comentar(info)" >
                            <div class="row w-100 m-0 justify-content-center" :class="info.type == 's'?'app-degra ':''" >
                                <div class="row w-100 m-0 py-5px px-2 " >
                                    <div class="w-23vw h-23vw my-auto mt-2">
                                        <imagen clase="border-radius-10px border-rojo-1 py-30px px-5px" :logo="2" />
                                    </div>
                                    <div class="col px-0 pl-3 my-auto " >
                                        <div class="row w-100 m-0 letra-gray4-17 fw-600 " >Pedido #{{info.id}}</div>
                                        <div class="row w-100 m-0 letra-gray3-17 fw-600 " ></div>
                                        <div class="row w-100 m-0 letra-rojo1-19 fw-600 " >
                                            <div class="col-auto px-0 my-auto">Total: {{info.total | currency}}</div>
                                            <!-- <div class="col-auto px-0 my-auto mr-auto ml-2 letra-rojo1-23" v-if="info.productos.length-1">+{{info.productos.length-1}}</div>    -->
                                        </div>
                                        <div class="row w-100 m-0  ">
                                            <div class="col-auto px-0 ml-auto letra-gray3-16 " v-if="info.creado">{{ [info.creado, 'YYYY-MM-DD HH:mm:ss'] |  moment('HH:mm [hrs] DD/MM/YYYY') }}</div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div class="row w-100 m-0 ">
                                <div class="row w-100 m-0 mt-2 mb-2 mx-3 border-t-gray01-2">
                                    <div class="row w-100 m-0 letra-gray3-17">Productos:</div>
                                    <div v-for="p of info.productos" :key="p.id" class="row w-100 m-0 py-1">
                                        <div class="row w-100 m-0">
                                            <div class="w-50px h-50px">
                                                <imagen clase="border-radius-5px border-gray01-1" :src="p.imagen" />
                                            </div>
                                            <div class="col px-0 pl-2">
                                                <div class="row w-100 m-0 letra-gray4-16">{{p.nombre}}</div>
                                                <div class="row w-100 m-0">
                                                    <div class="col px-0 letra-gray3-13">Precio: {{p.precio | currency}}</div>
                                                    <div class="col-auto px-0 px-2 letra-rojo-13">Cantidad: {{p.cantidad}}</div>
                                                    <div class="col px-0  letra-gray4-13">Total: {{p.total | currency}}</div>
                                                </div>
                                            </div>
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

            consumos(){return this.$store.getters.info('pedidos') },
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
                this.router.navigate('/mis_consumos_detalle');
            },

        }
    }
</script>