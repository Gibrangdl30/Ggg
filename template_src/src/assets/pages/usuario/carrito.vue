<template>
    <f7-page class="" id="inicio">
        <div class="vista">
            <nav-bar tipo="init" :backs="false" :logo="true" :profile="true" :chat="true" />
            <!-- <nav-bar tipo="inicio" :backs="false" :title="'Carrito'" :chat="true" /> -->

            <div class="contenedor-page">
                <div class="row w-100 m-0 pt-4" v-if="!productos || !productos.length">
                    <div class="row w-100 m-0 px-3 letra-gray3-18 justify-content-center text-center">Aqui estarán los productos, pero no has agregado nada. ¡Animate!</div>
                </div>
                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 py-2" v-for="(p, ex) of productos" :key="ex">
                        <div class="row w-100 m-0 back-color-blanco">
                            <div class="row w-100 m-0 back-color-blanco pt-2 px-3">
                                <div class="w-13vw h-13vw my-auto">
                                    <imagen :fit="true" clase="border-radius-10px" :src="p.imagen" />
                                </div>
                                <div class="col my-auto px-0 pl-1">
                                    <div class="row w-100 m-0 letra-gray4-15">{{p.nombre}}</div>
                                    <!-- <div class="row w-100 m-0 letra-gray3-16">{{p.descripcion}}</div> -->
                                </div>
                                <div class="w-10 px-0 overflow-hidden text-center " @click="$store.commit('removeProductoCarrito',p)" >
                                    <icono icono="delete_outline" clase="letra-gray3-25 pl-8px" />
                                </div>
                            </div>
                            <div class="row w-100 m-0 border-b-gray00-1">
                                <div class="row w-100 m-0 px-3 py-1 justify-content-start">
                                    <div class="col-auto my-auto px-0 letra-gray3-18">{{p.cantidad || 1}}x</div>
                                    <div class="col-auto my-auto px-0 letra-gray3-18 pl-2">{{p.precio | currency}} {{p.currency}}</div>
                                    <div class="col-auto my-auto px-0 ml-auto letra-gray3-19 fw-800">{{Number(p.precio) * Number(p.cantidad) | currency}} {{p.currency}}</div>
                                </div>
                                <div class="row w-100 m-0 px-3 py-1 justify-content-start" v-if="p.shipping_cost" >
                                    <div class="col my-auto px-0 letra-gray3-16">Costo de envio</div>
                                    <div class="col-auto my-auto px-0 ml-auto letra-gray3-17 fw-800">{{ p.shipping_cost | currency}} MXN</div>
                                </div>
                            </div>
                            <!-- <div class="row w-100 m-0 border-b-gray00-1" v-if="p.comentarios">
                                <div class="row w-100 m-0 px-3 py-2 justify-content-start">
                                    <div class="row w-100 m-0 letra-gray4-16">Instrucciones:</div>
                                    <div class="row w-100 m-0 letra-gray3-16">{{p.comentarios}}</div>
                                </div>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
            <div class="row w-100 m-0 pt-3 pb-3 pb-ios-40px back-color-blanco border-t-gray00-1">
                <div class="row w-100 m-0 px-3">
                    <div class="row w-100 m-0" v-if="false" >
                        <div class="row w-100 m-0">
                            <div class="col-auto px-0 ml-auto" @click="t='mxn'">
                                <div class="row w-100 m-0 px-2 py-1 border-radius-5px" :class="t=='mxn'?'back-color-azul1 border-azul1-1 letra-blanco-16':'border-azul1-1 letra-azul1-16'">MXN</div>
                            </div>
                            <div class="col-auto px-0 pl-2" @click="t='usd'">
                                <div class="row w-100 m-0 px-2 py-1 border-radius-5px" :class="t=='usd'?'back-color-azul1 border-azul1-1 letra-blanco-16':'border-azul1-1 letra-azul1-16'">USD</div>
                            </div>
                        </div>
                    </div>
                    <div class="row w-100 m-0" v-if="productos.find(x=>{return x.currency == 'USD'})" >
                        <div class="col my-auto px-0 letra-gray3-16">Subtotal:</div>
                        <div class="col-auto my-auto px-0 letra-gray3-18">{{data.subtotal / cambioUSD | currency}} USD</div>
                    </div>
                    <template v-if="t=='mxn'" > 
                        <div class="row w-100 m-0" v-if="productos.find(x=>{return x.currency == 'USD'})">
                            <div class="col my-auto px-0 letra-gray3-16">Conversion a pesos: (MXN)</div>
                            <div class="col-auto my-auto px-0 letra-gray3-18">{{data.subtotal | currency}} MXN</div>
                        </div>
                        <div class="row w-100 m-0" v-else >
                            <div class="col my-auto px-0 letra-gray3-16">Subtotal: </div>
                            <div class="col-auto my-auto px-0 letra-gray3-18">{{data.subtotal | currency}} MXN</div>
                        </div>
                        <div class="row w-100 m-0">
                            <div class="col my-auto px-0 letra-gray3-16">IVA del producto:</div>
                            <div class="col-auto my-auto px-0 letra-gray3-18">{{data.iva | currency}} MXN</div>
                        </div>
                        <div class="row w-100 m-0">
                            <div class="col my-auto px-0 letra-gray3-16">Costo envió:</div>
                            <div class="col-auto my-auto px-0 letra-gray3-18">{{data.costoEnvio | currency}} MXN</div>
                        </div>
                        <div class="row w-100 m-0">
                            <div class="col my-auto px-0 letra-gray3-16">IVA del costo de envió:</div>
                            <div class="col-auto my-auto px-0 letra-gray3-18">{{ data.ivaEnvio | currency}} MXN</div>
                        </div>
                        <div class="row w-100 m-0">
                            <div class="col my-auto px-0 letra-gray3-16">Total:</div>
                            <div class="col-auto my-auto px-0 letra-gray3-18">{{ data.total | currency}} MXN</div>
                        </div>
                    </template>
                    <template v-if="t=='usd'" > 
                         <div class="row w-100 m-0">
                            <div class="col my-auto px-0 letra-gray3-16">Costo envio:</div>
                            <div class="col-auto my-auto px-0 letra-gray3-18">{{ (data.costoEnvio / cambioUSD) | currency}} USD</div>
                        </div>
                        <div class="row w-100 m-0">
                            <div class="col my-auto px-0 letra-gray3-16">IVA:</div>
                            <div class="col-auto my-auto px-0 letra-gray3-18">{{ (data.iva / cambioUSD) | currency}} USD</div>
                        </div>
                        <div class="row w-100 m-0">
                            <div class="col my-auto px-0 letra-gray3-16">Total:</div>
                            <div class="col-auto my-auto px-0 letra-gray3-18">{{ (data.total / cambioUSD) | currency}} USD</div>
                        </div>
                    </template>
                    <div class="row w-100 m-0 justify-content-center px-1 py-2 pb-ios-65px">
                        <botonApp tipo="azul" texto="Siguiente" radius="10px" @click="next()"/>
                    </div>
                    <div class="row w-100 m-0 px-3 pb-3">
                        <div class="row w-100 m-0 pb-1 letra-gray3-15 justify-content-center text-center">Socialflow convertira a moneda nacional mexicana (pesos) el total para hacer el cobro.</div>
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
                t: 'mxn',
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            cambioIva(){return this.$store.getters.catalogoGetObject('cambioIva');},
            cambioUSD(){return this.$store.getters.catalogoGetObject('cambioUSD');},
            data(){return this.$store.getters.carritoObject('desgloce') || {};},
            restaurante(){return this.$store.getters.restaurantesFindId('restaurantes',this.data.restaurantes_id) || {} ;},
            productos(){return this.data.carrito || [];},
            domicilio(){return this.$store.getters.carritoFind('domicilios','domicilio');},
        },
        mounted(){
            this.$store.dispatch('initData', [this.$f7]);
        },
        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },
            goRestaurante(){
                this.$store.commit('setRestauranteState',['restaurante',this.data.restaurantes_id]);
                this.router.navigate('/restaurante');
            },
            next(){
                if(!this.session.token){
                    this.$store.commit('openModal',['modalSession']);
                    return;
                }
                if(this.data.total){
                    this.router.navigate('/confirmacion_carrito');
                }
            }
        }
    }
</script>