<template>
    <f7-page id="inicio" >

        <div class="vista  " >

            <nav-bar tipo="inicio" :emitBack="true" @back_click="router.navigate('/inicio',{reloadCurrent: true})" :color="false" :title="'Carrito'" :fix="1" />

            <div class="contenedor-page-tabs  ">
                
                <template v-if="1" >
                    <div class="row w-100 m-0 pt-4" v-if="!productos || !productos.length">
                        <div class="row w-100 m-0 px-4 pt-4 letra-gray3-20 justify-content-center text-center">Tu carrito no tiene bebidas ni alimentos. ¡Agrégale!</div>
                    </div>
                </template>

                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 py-2" v-for="p of productos" :key="p.id">
                        <div class="row w-100 m-0 ">
                            <div class="row w-100 m-0 pb-2  border-b-gray00-1 pt-2 px-3">
                                <div class="col px-0 ">
                                    <div class="row w-100 m-0 letra-gray4-17 ">{{p.nombre}}</div>
                                    <!-- <div class="row w-100 m-0 letra-rojo1-15 " v-if="p.tipo == 'e'" >Experiencia</div> -->
                                    <div class="row w-100 m-0 letra-gray3-15 " v-if="p.descripcion">{{p.descripcion}}</div>
                                </div>
                                <!-- <div class="col-auto my-auto px-0 letra-blanco-16">
                                    <div class="row w-100 m-0" @click="goRestaurante()" >{{restaurante.restaurant_nombre}}</div>
                                </div> -->
                                <div class="w-10 px-0 ml-auto overflow-hidden text-center pt-9px" @click="$store.commit('removeProductoCarrito',p)" >
                                    <icono icono="cancel" clase="letra-rojo1-30 " />
                                </div>
                            </div>

                            <div class="row w-100 m-0 border-b-gray00-1">
                                <div class="row w-100 m-0 px-3 py-2 justify-content-start">
                                    <div class="col-auto my-auto px-0 letra-gray3-18">{{p.cantidad}} {{(p.cantidad>1)?'piezas':'pieza'}}</div>
                                    <div class="col-auto my-auto px-0 letra-gray3-18 pl-2">{{p.precio | currency}}</div>
                                    <div class="col-auto my-auto px-0 ml-auto letra-rojo1-19 fw-800">{{p.total | currency}}</div>
                                </div>
                            </div>

                            <div class="row w-100 m-0" v-if="p.tipo=='calendario'" >
                                <div class="row w-100 m-0 px-3 justify-content-start">
                                    <div class="col-auto my-auto px-0 letra-blanco-16">Fecha:</div>
                                    <div class="col-auto my-auto px-0 letra-rojo-16 pl-2">{{p.fecha | datetamp}}</div>
                                </div>
                            </div>

                            <div class="row w-100 m-0 border-b-gray00-1" v-if="p.comentarios">
                                <div class="row w-100 m-0 px-3 py-2 justify-content-start">
                                    <div class="row w-100 m-0 letra-blanco-16">Instrucciones:</div>
                                    <div class="row w-100 m-0 letra-blanco-16">{{p.comentarios}}</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div class="row w-100 m-0 px-3 pt-3 pb-3  border-t-gray00-1" v-show="data.subtotal" >
                <div class="row w-100 m-0 px-3">
                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0" v-if="1" >
                            <div class="col-auto my-auto px-0 letra-gray3-16 ">Subtotal:</div>
                            <div class="col-auto ml-auto my-auto px-0 letra-gray4-18 fw-600">{{data.subtotal | currency}}</div>
                        </div>
                        <div class="row w-100 m-0" v-if="data.comision" >
                            <div class="col-auto my-auto px-0 letra-gray3-16 " >Comisión:</div>
                            <div class="col-auto ml-auto my-auto px-0 letra-gray4-18 fw-600">{{ data.comision | currency }}</div>
                        </div>
                        <div class="row w-100 m-0" v-if="1">
                            <div class="col-auto my-auto px-0 letra-gray3-16 " >Envio: </div>
                            <div class="col-auto ml-auto my-auto px-0 letra-gray4-18 fw-600">{{ data.costoEnvio | currency}}</div>
                        </div>
                        <div class="row w-100 m-0">
                            <div class="col-auto my-auto px-0 letra-gray3-16 ">Total:</div>
                            <!-- <div class="col-auto ml-auto my-auto px-0 letra-gray4-18 fw-600">{{ ( Number(data.subtotal) + Number(data.comision) + Number(data.costoEnvio) )  | currency}}</div> -->
                            <div class="col-auto ml-auto my-auto px-0 letra-gray4-18 fw-600">{{ ( Number(data.subtotal) + Number(data.costoEnvio) )  | currency}}</div>
                        </div>
                    </div>

                </div>
                <div class="row w-100 m-0 justify-content-center py-2 justify-content-center ">
                    <div class="col-12 px-0">
                        <botonApp texto="Siguiente" radius="30px" tipo="app" @click="next()"/>
                    </div>
                </div>
            </div>

            <tabs />
        </div>
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
const moment = require('moment')
    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                texto: null,
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            data(){return this.$store.getters.carritoObject('desgloce') || {};},
            distancia(){return this.$store.getters.carritoObject('distancia');},
            restaurante(){return this.$store.getters.restaurantesFindId('restaurantes',this.data.restaurantes_id) || {} ;},
            productos(){return this.data.carrito || [];},
            domicilio(){return this.$store.getters.carritoFind('domicilios','domicilio');},
        },
        mounted(){
            this.$store.dispatch('initData', [this.$f7]);
        },
        methods:{
            open(t){
                this.texto = t;
                this.$store.commit('openModal',['tooltip']);
            },
            go(ruta){
                this.router.navigate(ruta);
            },
            goRestaurante(){
                this.$store.commit('setRestauranteState',['restaurante',this.data.restaurantes_id]);
                this.router.navigate('/restaurante');
            },
            next(){
                let t = Number(this.data.subtotal);
                if(t){
                    this.router.navigate('/confirmacion_carrito');
                }
                else{
                    swal("","Agrega productos al carrito, para continuar","")
                }
            }
        }
    }
</script>