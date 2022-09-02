<template>
    <f7-page class="" id="inicio">

        <div class="vista">
            <nav-bar tipo="inicio" :no_border="1" title="" :backs="1" :logo="0" :profile="0"  />

            <div class="contenedor-page-tabs back-color-negro">

                <div class="row w-100 m-0" v-if="0">
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

                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 px-3 py-3 ">
                        <eventosComponent :row="1"  :data="evento"  />
                    </div>
                </div>

                <div class="row w-100 m-0 px-3 py-2">
                    <div class="row w-100 m-0">
                        <div class="col px-0 letra-blanco-18 fw-600">{{zona.nombre}}</div>
                        <div class="col-auto px-0 letra-rojo2-20 fw-600">{{zona.precio | currency}}</div>
                    </div>
                    <div class="row w-100 m-0">
                        <div class="col px-0 letra-blanco-20">{{boletos.length}} x</div> 
                        <div class="col-auto px-0 letra-rojo2-23 fw-600">{{ (Number(zona.precio) * boletos.length) | currency}}</div>
                    </div>
                    <div class="row w-100 m-0 pl-3" >
                        <div class="row w-100 m-0" v-for="b of boletos" :key="b.id" >
                            <div class="col px-0 letra-blanco-18">Asiento: </div> 
                            <div class="col-auto px-0 letra-rojo2-20 text-center">{{b.fila}}-{{b.asiento}}</div>
                        </div>
                    </div>
                </div>
                
                <div class="row w-100 m-0 pt-2 ">
                    <div class="row w-100 m-0 pl-3 pb-2 fw-600 letra-blanco-18">Selecciona tu metodo de pago</div>
                    <div class="row w-100 m-0 my-auto py-1 pr-4">
                        <div class="col-10 px-0 mr-auto">
                            <div class="row w-100 m-0 pr-3 back-color-blanco border-tr-radius-50px border-br-radius-50px ">
                                <div class="col px-1">
                                    <imagen :icono="true" src="visa" />
                                </div>
                                <div class="col px-1">
                                    <imagen :icono="true" src="amex" />
                                </div>
                                <div class="col px-1">
                                    <imagen :icono="true" src="mastercard" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row w-100 m-0 px-3 py-3">
                    <div class="row w-100 m-0 border-blanco-1 border-radius-10px">
                        <div class="row w-100 m-0 px-3 py-2 ">
                            <div class="col-auto px-0 ">
                                <div class="w-50px">
                                    <imagen :icono="1" formato="png" src="card" />
                                </div>
                            </div>
                            <div class="w-3"></div>
                            <div class="col-auto px-0 pl-3 pt-10px ">
                                <icono icono="keyboard_arrow_right" clase="letra-blanco-29" />
                            </div>

                            <div class="col my-auto px-0 mx-auto" >

                                <template v-if="card && card.id" >
                                    <div class="row m-0 w-100 px-2 ">
                                        <div class="row m-0 w-100 pb-6px justify-content-center back-color-gray4 border-radius-30px ">
                                            <div class="w-70px my-auto p-0" >
                                                <imagen  :src="card.brand.toLowerCase()" icono="1" />
                                            </div>
                                            <div class="col-auto my-auto letra-blanco-23 px-2"  >**** {{card.ending}}</div>
                                        </div>
                                    </div>
                                </template>   

                                <template v-else >
                                    <div class="w-70 mx-auto">
                                        <div class="row w-100 m-0" @click="go('/metodos_pago')">
                                            <botonApp texto="Seleccionar" tipo="app" radius="30px" />
                                        </div>
                                    </div>
                                </template>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="row w-100 m-0 py-4"></div>

            </div>

            <div class="row w-100 m-0 py-3 back-color-gray4 ">
                <div class="row w-100 m-0 px-3 py-2" @click="next()">
                    <botonApp texto="Procesar pago" tipo="app" radius="30px" />
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
            zona(){return this.$store.getters.dataFindLeve1('eventos', 'evento', 'zonas', 'zona') },
            boletos(){return this.$store.getters.infoObj('boletos') },

            metodo_pago(){return this.$store.getters.carritoObject('metodo_pago'); },
            card(){return this.$store.getters.getMetodoPago(this.metodo_pago); }
        },

        mounted(){
            console.log("POST POST POST", this.zona, this.boletos );
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

            next(){
                this.$store.dispatch('postCrearPedido', []);
            },

        }
    }
</script>