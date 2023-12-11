<template>
    <f7-page id="inicio" >

        <modalMensajeStatic v-if="m"
            :texto="`¿Estas seguro de eliminar este producto?`"
            :boton="'Eliminar'"
            @click="callbackDelete"
            @close="m = 0"
        />

        <div class="vista  " >

            <nav-bar tipo="inicio" :emitBack="true" @back_click="router.navigate('/inicio',{reloadCurrent: true})" :color="false" :title="'Carrito'" :fix="1" />

            <div class="contenedor-page-tabs  ">

                <template v-if="1" >
                    <div class="row w-100 m-0 border-b-rojo-2 pb-2"  >
                        <div class="row w-100 m-0 back-color-rojo py-10px px-3" @click="router.navigate('/mis_domicilios')">
                            <div class="row w-100 m-0 letra-blanco-16 fw-600 text-capitalize">
                                <div class="col-auto px-0">dirección de envío</div>
                                <div class="col-auto px-0 pl-2 mr-auto letra-blanco-14 my-auto ">(Click para cambiar)</div>
                            </div>
                        </div>

                        <div class="row w-100 m-0 px-3">
                            <div class="row w-100 m-0 py-2 " @click="router.navigate('/mis_domicilios')">
                                <div class="row w-100 m-0 px-3">
                                    <div v-if="domicilio && domicilio.id" class="col-auto mr-auto px-0 letra-gray3-16">{{domicilio.calle}}</div>
                                    <div v-else class="col-auto mr-auto px-0 letra-gray3-16">Selecciona una dirección</div>
                                </div>

                                <div class="row w-100 m-0" v-if="data.programada == '0'" >
                                    <div class="row w-100 m-0 px-3 pt-1">
                                        <div class="col-auto px-0 ml-auto text-right px-0 letra-blanco-14">Distancia {{Math.round(distancia)}} km</div>
                                    </div>
                                    <div class="row w-100 m-0 px-3 " >
                                        <div class="col-auto ml-auto text-right px-0 letra-blanco-14 ">Llegara aproximadamente a las {{tiempo}}</div>
                                    </div>
                                </div>
                                <!-- <div class="row w-100 m-0 px-3 pt-1">
                                    <div class="col px-0 letra-blanco-16">{{domicilio.municipio}}, {{domicilio.estado}}</div>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </template>
                
                <template v-if="1" >
                    <div class="row w-100 m-0 pt-4" v-if="!productos || !productos.length">
                        <div class="row w-100 m-0 px-4 pt-4 letra-gray3-20 justify-content-center text-center">Tu carrito no tiene productos. ¡Agrégale!</div>
                    </div>
                </template>

                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 py-2" v-for="p of productos" :key="p.id" >
                        <div class="row w-100 m-0 ">
                            <div class="row w-100 m-0 pb-2  border-b-gray00-1 pt-2 px-3" @click="goes(p.info)" >
                                <div class="w-16vw h-16vw">
                                    <imagen clase="border-radius-10px border-rojo-1" :create="true" :src="p.info.imagen" />
                                </div>
                                <div class="col my-auto px-0 pl-3 ">
                                    <div class="row w-100 m-0 letra-gray4-19 fw-600">{{p.nombre}}</div>
                                    <div class="row w-100 m-0 letra-gray3-15 " v-if="p.cat">{{p.cat}}</div>
                                </div>
                               
                                <div class="w-10 px-0 ml-auto overflow-hidden text-center pt-9px" @click.stop="m = 1; callbackDelete = ()=>{$store.commit('removeProductoCarrito',p)} " >
                                    <icono icono="cancel" clase="letra-rojo1-30 " />
                                </div>
                            </div>

                            <div class="row w-100 m-0 border-b-gray00-1">
                                <div class="row w-100 m-0 px-3 py-2 justify-content-start">
                                    <div class="col-auto my-auto px-0 letra-gray3-18 pl-2 fw-600 ">{{p.precio | currency}}</div>

                                    <div class="col-auto my-auto mx-auto px-1 pl-3 ">
                                        <div class="row w-100 m-0 px-1 justify-content-left back-color-rojo border-radius-30px " >
                                            <div class="col-auto px-0 py-1 my-auto" @click="remove(p)">
                                                <icono  icono="remove" clase="letra-blanco-31 pt-4px"/>
                                            </div>

                                            <div class="w-15 px-2 my-auto letra-blanco-25 w-70px text-center justify-content-center">{{p.cantidad}}</div>

                                            <div class="col-auto px-0 py-1 my-auto" @click="add(p)">
                                                <icono  icono="add" clase="letra-blanco-31 pt-4px" />
                                            </div>

                                        </div>
                                    </div>
                                    <!-- <div class="col-auto my-auto px-0 letra-gray3-18">{{p.cantidad}} {{(p.cantidad>1)?'piezas':'pieza'}}</div> -->
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
                            <div class="col-auto ml-auto my-auto px-0 letra-gray4-18 fw-600">{{ (data.subtotal - data.comision) | currency}}</div>
                        </div>
                        <div class="row w-100 m-0" v-if="data.comision" >
                            <div class="col-auto my-auto px-0 letra-gray3-16 " >Comisión:</div>
                            <div class="col-auto ml-auto my-auto px-0 letra-gray4-18 fw-600">{{ data.comision | currency }}</div>
                        </div>
                        <div class="row w-100 m-0" v-if="data.comision" >
                            <div class="col-auto my-auto px-0 letra-gray3-16 " >Subtotal:</div>
                            <div class="col-auto ml-auto my-auto px-0 letra-gray4-18 fw-600">{{ data.subtotal | currency }}</div>
                        </div>
                        <div class="row w-100 m-0" v-if="1">
                            <div class="col-auto my-auto px-0 letra-gray3-16 " >Costo y tiempo de envio: </div>
                            <div class="col-auto ml-auto my-auto px-0 letra-gray4-18 fw-600" v-if="data.costoEnvio">{{ data.costoEnvio | currency}}</div>
                            <div class="col-auto ml-auto my-auto px-0 letra-gray4-18 fw-600" v-else >{{ 'Por definir'}}</div>
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
                m: 0, 
                callbackDelete: null,
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
            totalProductos(){ return this.$store.getters.carritoObject('totalProductos') || 15;},
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

            set(){
                this.$store.commit('calcularTotal');
            },

            remove(p){
                if(p.cantidad){
                    p.cantidad = p.cantidad -1;
                }
                p.total = Number(p.precio) * p.cantidad;
                this.set();
            },
            
            add(p){
                if( p.cantidad < this.totalProductos ){
                    p.cantidad = p.cantidad + 1;
                    p.total = Number(p.precio) * p.cantidad;
                    this.set();
                }
            },

            goes(info){
                this.$store.commit('setCarritosState',['prod',{ id: info.id }]);
                this.router.navigate('/producto');
            },

            goRestaurante(){
                this.$store.commit('setRestauranteState',['restaurante',this.data.restaurantes_id]);
                this.router.navigate('/restaurante');
            },
            next(){
                if(!this.domicilio.id){
                    swal("","Ingresa la dirección de envio para continuar","");
                    return;
                }
                let t = Number(this.data.subtotal);
                if(t){
                    this.$store.dispatch('postCotizaApiNew');
                    this.router.navigate('/confirmacion_carrito');
                }
                else{
                    swal("","Agrega productos al carrito, para continuar","")
                }
            }
        }
    }
</script>