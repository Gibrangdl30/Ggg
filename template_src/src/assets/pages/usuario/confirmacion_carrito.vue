<template>
    <f7-page  >

        <modalSeleccionarEnvios 
            v-if="show" 
            :prod="prod"
            @close="show = 0"
        />

        <div class="vista  ">

            <nav-bar tipo="inicio" :backs="true" :color="false" :fix="1" :title="'Confirmar pedido'" />

            <div id="car789" class="contenedor-page-tabs  ">

                <template v-if="1" >
                    <div class="row w-100 m-0 border-b-rojo-2 pb-2">
                        <div class="row w-100 m-0 back-color-rojo py-10px px-3">
                            <div class="row w-100 m-0 letra-blanco-16 fw-600 text-capitalize">dirección de envío</div>
                        </div>

                        <div class="row w-100 m-0 px-3">
                            <div class="row w-100 m-0 py-2 " >
                            <!-- <div class="row w-100 m-0 py-2 " @click="router.navigate('/mis_domicilios')"> -->
                                <div class="row w-100 m-0 px-3">
                                    <div v-if="domicilio && domicilio.id" class="col-auto mr-auto px-0 letra-gray3-16">{{domicilio.calle}} {{domicilio.numero}}</div>
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

                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 px-3 pt-3 ">
                        <div class="row w-100 m-0 py-2" v-for="p of productos" :key="p.id">
                            <div class="row w-100 m-0 border-b-gray00-1">
                                <div class="w-16vw h-16vw">
                                    <imagen clase="border-radius-10px border-rojo-1" :create="true" :src="p.info.imagen" />
                                </div>
                                <div class="col px-0 pl-3">
                                    <div class="row w-100 m-0 ">
                                        <div class="row w-100 m-0 letra-gray4-19 fw-600">{{p.nombre}}</div>
                                        <div class="row w-100 m-0 letra-gray3-15 " v-if="p.cat">{{p.cat}}</div>
                                    </div>
                                </div>
                            </div>

                            <div class="row w-100 m-0 border-b-gray00-1">
                                <div class="row w-100 m-0 px-3 pt-2 justify-content-start">
                                    <div class="col-auto my-auto px-0 letra-gray3-18">{{p.cantidad}} {{(p.cantidad>1)?'piezas':'pieza'}}</div>
                                    <div class="col-auto my-auto px-0 letra-gray3-18 pl-2">{{p.precio | currency}}</div>
                                    <div class="col-auto my-auto px-0 ml-auto letra-rojo1-19 fw-800">{{p.total | currency}}</div>
                                </div>
                                <div v-if="p.envio" class="row w-100 m-0 ">
                                    <div class="row w-100 m-0 px-2 pt-2 pb-2 ">
                                        <div class="row w-100 m-0">
                                            <div class="w-15vw mx-1 my-auto mr-2">
                                                <imagen :icono="1" formato="png" :src="p.envio.nombre" />
                                            </div>
                                            <div class="col px-0 ">
                                                <div class="row w-100 m-0 letra-gray4-18">{{p.envio.nombre}}</div>
                                                <div class="row w-100 m-0 letra-rojo-14 fw-600">{{p.envio.tipo}}</div>
                                            </div>
                                            <div class="col-auto px-0 my-auto letra-rojo1-17 fw-800 " v-if="p.envio.precio" >{{p.envio.precio | currency}}</div>
                                            <div class="col-auto px-0 my-auto letra-rojo1-17 fw-800 " v-else >Gratis</div>
                                        </div>
                                        <div class="row w-100 m-0 letra-gray3-14">{{p.envio.dias}} dias aproximados Despues de la recolección con el emprendedor</div>
                                    </div>
                                </div>
                            </div>

                            <div class="row w-100 m-0 border-b-gray00-1" v-if="p.comentarios">
                                <div class="row w-100 m-0 px-3 py-2 justify-content-start">
                                    <div class="row w-100 m-0 letra-blanco-16">Instrucciones:</div>
                                    <div class="row w-100 m-0 letra-blanco-16">{{p.comentarios}}</div>
                                </div>
                            </div>

                            <div class="row w-100 m-0">
                                <div class="row w-100 m-0">
                                    <div class="col-7 px-0 ml-auto" @click="prod = p; show = 1;">
                                        <div class="row w-100 m-0 justify-content-center text-center back-color-rojo letra-blanco-16 py-2 border-radius-10px">Seleccionar tipo de envio</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                 

                    <template v-if="0" >
                        <div class="row w-100 m-0 py-10px mt-3 px-3">
                            <div class="row w-100 m-0 letra-rojo-16 fw-600 text-capitalize">
                                <div class="col px-0">Programar entrega</div>
                                <div class="col-auto px-0 pr-2">
                                    <toggle v-model="data.programada" :v="'1'" :f="'0'" />
                                </div>
                            </div>
                        </div>
                        <div class="row w-100 m-0 px-3" v-if="data.programada=='1'">
                            <div class="row w-100 m-0 pb-2 " >
                                <div class="col-6 px-2">
                                    <div class="row w-100 m-0">
                                        <inputForm type="date" texto="Fecha:" placeholder="" v-model="data.fecha" />
                                    </div>
                                </div>
                                <div class="col-6 px-2">
                                    <div class="row w-100 m-0">
                                        <inputForm type="time" texto="Hora:" placeholder="" v-model="data.hora" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                    
                    <template v-if="0" >
                        <div class="row w-100 m-0 py-10px mt-3 px-3">
                            <div class="row w-100 m-0 letra-rojo-16 fw-600 text-capitalize">Propina</div>
                        </div>
                        <div class="row w-100 m-0 px-3">
                            <div class="row w-100 m-0 pt-2">
                                <!-- <div class="row w-100 m-0 px-1 py-2 text-center letra-blanco-16">Deseas agregar propina al servicio:</div> -->
                                <div class="row w-100 m-0">
                                    <scollX cantidad="auto">
                                        <div class="swiper-slide w-auto px-1 text-center" v-for="c of cantidades" :key="c" @click="$store.commit('agregarPropina',c)" >
                                            <div class="w-auto px-1 py-1 ">
                                                <div class="w-65px h-65px border-radius-50" :class="(data.propina == c)?'border-rojo-2':'border-blanco-2'">
                                                    <div class="row w-100 m-0 pt-21px text-capitalize justify-content-center fw-800" :class="(data.propina == c)?'letra-rojo-12':'letra-blanco-12'">{{c | currency}}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </scollX>
                                </div>
                            </div>
                        </div>
                    </template>

                    <!-- <div class="row w-100 m-0 pt-3 px-3">
                        <desgloceCarrito />
                    </div> -->

                    <template v-if="1" >
                        <div class="row w-100 m-0 py-10px mt-3 px-3">
                            <div class="row w-100 m-0 letra-rojo-18 fw-600 text-capitalize">información de pago</div>
                        </div>
                        <div class="row w-100 m-0 py-2" @click="router.navigate('/metodos_pago')">
                        <!-- <div class="row w-100 m-">{{metodoPagoId}}</div> -->
                            <template v-if="metodo_pago.id" >
                                <div class="row w-100 m-0 px-3"  >
                                    <div class="col-auto my-auto px-0">
                                        <div class="w-80px my-auto">
                                            <imagen :icono="true" :src="metodo_pago.brand.toLowerCase()" />
                                        </div>
                                    </div>
                                    <div class="col my-auto px-0 letra-gray3-20">**** {{metodo_pago.ending}}</div>
                                </div>
                            </template>

                            <div class="row w-100 m-0 px-3" v-else>
                                <div class="col-auto my-auto px-0 py-2 letra-gray3-16">Seleccionar metodo de pago</div>
                            </div>
                        </div>
                    </template>

                    <template>
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
                                        <div class="col-auto ml-auto my-auto px-0 letra-gray4-18 fw-600" v-else-if="productos.some(s=>s.envio)" >{{ 'Gratis'}}</div>
                                        <div class="col-auto ml-auto my-auto px-0 letra-gray4-18 fw-600" v-else >{{ 'Por definir'}}</div>
                                    </div>
                                    <div class="row w-100 m-0">
                                        <div class="col-auto my-auto px-0 letra-gray3-16 ">Total:</div>
                                        <!-- <div class="col-auto ml-auto my-auto px-0 letra-gray4-18 fw-600">{{ ( Number(data.subtotal) + Number(data.comision) + Number(data.costoEnvio) )  | currency}}</div> -->
                                        <div class="col-auto ml-auto my-auto px-0 letra-gray4-18 fw-600">{{ ( Number(data.subtotal) + Number(data.costoEnvio) )  | currency}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>

                    <div class="row w-100 m-0 pb-4">
                        <div class="row w-100 m-0 pt-3 pb-3 px-3 justify-content-center">
                            <div class="col-12 px-0" @click="next()">
                                <botonApp texto="Confirmar pedido" radius="35px" tipo="app" />
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
const moment = require('moment');
    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                show:       0,
                prod:       null,
                propina:    0,
                cantidades: [0,5,10,15,20,25,30,35,40,45,50],
                dia:        moment().format('d'),
            } 
        },

        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            data(){return this.$store.getters.carritoObject('desgloce');},
            restaurante(){return this.$store.getters.restaurantesFindId('restaurantes',this.data.restaurantes_id) || {} ;},
            distancia(){return this.$store.getters.carritoObject('distancia');},

            tiempo(){return moment().add( Math.round((this.distancia*5)+5) > 25? Math.round((this.distancia*3)+5):30, 'minutes').format('HH:mm [hrs]')},
            metodoPagoId(){return this.$store.getters.carritoObject('metodo_pago');},
            metodo_pago(){return this.$store.getters.getMetodoPago(this.metodoPagoId);},
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

            next(){
                console.log("CARIRTOS", this.data.total);

                // this.$store.dispatch('postPago');
                // return;
                // if(!this.metodoPagoId){
                //     swal("","Agrega un método de pago para continuar","");
                //     return;
                // }

                this.$store.commit('calcularTotal');
                
                if(this.data.total){
                    if( Number(this.session.minimo) ){
                        if( this.data.total < Number(this.session.minimo) ){
                            // swal("",`El minimo de compra es de $${Number(this.session.minimo)}`,"");
                            // return;
                        }
                    }
                    this.$store.dispatch('postCrearPedido',[null]);
                }
            }
        }
    }
</script>