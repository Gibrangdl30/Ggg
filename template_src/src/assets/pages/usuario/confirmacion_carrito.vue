<template>
    <f7-page class="" id="inicio">
        <div class="vista">
            <nav-bar tipo="inicio" :backs="true" :title="'Confirmar pedido'" />
            <div class="contenedor-page">
                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 px-3 pt-3">
                        <div class="row w-100 m-0 letra-verde3-17 text-uppercase">productos del pedido</div>
                    </div>
                    <div class="row w-100 m-0 py-2" v-for="(p, ex) of productos" :key="ex" >
                        <div class="row w-100 m-0 back-color-blanco">
                            <div class="row w-100 m-0 back-color-blanco border-b-gray00-1 py-2 px-3">
                                <div class="col px-0 letra-gray4-22">{{p.nombre}}</div>
                                <!-- <div class="w-10 px-0 overflow-hidden text-center ">
                                    <icono icono="delete_outline" clase="letra-gray3-25 pl-8px" />
                                </div> -->
                            </div>
                            <div class="row w-100 m-0 border-b-gray00-1">
                                <div class="row w-100 m-0 px-3 py-1 justify-content-start">
                                    <div class="col-auto my-auto px-0 letra-gray3-18">{{p.cantidad}}x</div>
                                    <div class="col-auto my-auto px-0 letra-gray3-18 pl-2">{{p.precio | currency}}</div>
                                    <div class="col-auto my-auto px-0 ml-auto letra-gray3-19 fw-800">{{p.precio | currency}}</div>
                                </div>
                                <div class="row w-100 m-0 px-3 py-1 justify-content-start" v-if="p.shipping_cost" >
                                    <div class="col my-auto px-0 letra-gray3-16">Costo de envio</div>
                                    <div class="col-auto my-auto px-0 ml-auto letra-gray3-17 fw-800">{{ p.shipping_cost | currency}} MXN</div>
                                </div>
                            </div>
                            <div class="row w-100 m-0 border-b-gray00-1" v-if="p.comentarios">
                                <div class="row w-100 m-0 px-3 py-2 justify-content-start">
                                    <div class="row w-100 m-0 letra-gray4-16">Instrucciones:</div>
                                    <div class="row w-100 m-0 letra-gray3-16">{{p.comentarios}}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <template v-if="!eventos_id">
                        <template v-if="!onlyServicios">
                            <div class="row w-100 m-0 px-3 pt-4" v-if="!acepto">
                                <div class="row w-100 m-0 letra-verde3-17 text-uppercase">dirección de envío</div>
                            </div>
                            <div class="row w-100 m-0 back-color-blanco py-2" @click="router.navigate('/mis_domicilios')" v-if="!acepto">
                                <template v-if="domicilio && domicilio.id">
                                    <div class="row w-100 m-0 px-3">
                                        <div class="col px-0 letra-gray3-17">{{domicilio.calle}} {{domicilio.numero}}</div>
                                    </div>
                                    <div class="row w-100 m-0 px-3 pt-1">
                                        <div class="col px-0 letra-gray3-16">{{domicilio.municipio}}, {{domicilio.estado}}</div>
                                    </div>
                                </template>
                                <div class="row w-100 m-0 px-3" v-else >
                                    <div class="col-auto my-auto px-0 py-2 letra-gray3-16"> Selecciona una dirección de entrega</div>
                                </div>
                            </div>
                            <div class="row w-100 m-0" >
                                <div class="row w-100 m-0 pr-3">
                                    <div class="row m-0 w-100 mt-4">
                                        <div class="col my-auto letra-verde3-17 p-0 pl-3">No necesita dirección de entrega, enviarme un QR</div>
                                        <div class="col-auto my-auto px-0 pl-3 pr-2 my-auto" >
                                            <toggle :checked="acepto" @change="acepto = !acepto" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </template>

                    <div class="row w-100 m-0 px-3 pt-4">
                        <div class="row w-100 m-0 letra-verde3-17 text-uppercase">información de pago</div>
                    </div>
                    <div class="row w-100 m-0 back-color-blanco py-2" @click="router.navigate('/metodos_pago')">
                        <div class="row w-100 m-0 px-3" v-if="metodo_pago && metodo_pago.id" >
                            <div class="col-auto my-auto px-0">
                                <div class="w-80px">
                                    <imagen :icono="true" :src="metodo_pago.brand.toLowerCase()" />
                                </div>
                            </div>
                            <div class="col my-auto px-0 letra-gray3-17">**** {{metodo_pago.ending}}</div>
                        </div>
                        <div class="row w-100 m-0 px-3" v-else >
                            <div class="col-auto my-auto px-0 py-2 letra-gray3-16">Selecciona una metodo de pago</div>
                        </div>
                        
                    </div>
                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0 pt-3 pb-3 px-3">
                            <botonApp tipo="azul" texto="Confirmar pedido" radius="10px" @click="next()"/>
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
const moment = require('moment')
    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                acepto: false,
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            data(){return this.$store.getters.carritoObject('desgloce');},
            eventos_id(){return this.$store.getters.carritoObject('eventos_id');},
            metodoPagoId(){return this.$store.getters.carritoObject('metodo_pago');},
            metodo_pago(){return this.$store.getters.getMetodoPago(this.metodoPagoId);},
            productos(){return this.data.carrito || [];},
            onlyServicios(){ return this.productos.find(x=>{return x.tipo == 'producto' }) == undefined },
            domicilio(){return this.$store.getters.carritoFind('domicilios','domicilio');},
        },
        mounted(){
            this.$store.dispatch('initData', [this.$f7]);
        },
        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },
            next(){
                if(!this.metodoPagoId){
                    swal("","Agrega un metdodo de pago para continuar","");
                    return;
                }
                if(this.data.total){
                    this.$store.dispatch('postCrearPedido',[this.acepto]);
                }
            }
        }
    }
</script>