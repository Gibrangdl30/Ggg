<template>
    <f7-page id="inicio" >
        <modalLista />
        <div class="vista" v-vistak>
            <div v-if="$store.getters.deviceIos"  
                @click="$store.dispatch('scrollBottom','detal456')" 
                class="w-45px h-45px border-radius-50 position-absolute bottom-22 right-44 opacity-4 back-color-gray1 justify-content-center text-center align-content-center z-index-10000 ">
                <icono icono="keyboard_arrow_down" clase="letra-blanco-45 pt-1px" />
            </div>

            <nav-bar tipo="inicio" :backs="true" :title="''"></nav-bar>

            <div id="detal456" class="contenedor-page">
                <div class="row w-100 m-0 h-65vw" v-if="producto.imagen">
                    <imagen :fit="true" :src="producto.imagen" />
                </div>
                <div class="row w-100 m-0 px-3 py-3">
                    <div class="row w-100 m-0 letra-gray3-16 justify-content-center">Compra mejor con SocialFlow</div>
                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0">
                            <div class="col my-auto px-0 letra-gray4-21 fw-600">{{producto.nombre}}</div>
                            <div class="col-auto my-auto px-0 letra-azul1-25">{{producto.precio | currency}} {{producto.currency}}</div>
                        </div>
                        <div class="row w-100 m-0 pt-3" v-if="producto.partner && producto.partner.id">
                            <div class="row w-100 m-0 letra-gray4-17">Ubicación</div>
                            <div class="row w-100 m-0 letra-azul1-18">{{producto.partner.ciudad }}, {{producto.partner.estado}}</div>
                        </div>
                        <div class="row w-100 m-0 pt-3 letra-gray3-16 text-justify white-space-preline">{{producto.descripcion}}</div>

                    </div>
                </div>

                <div class="row w-100 m-0 py-2 px-3 justify-content-end">
                    <div class="col-auto px-0">
                        <!-- <botonApp tipo="azul" texto="Agregar a wishlists" radius="30px" @click="router.navigate('/agregar_alista')"/> -->
                        <botonApp tipo="azul" texto="Agregar a wishlists" radius="30px" @click="$store.commit('openModal',['modalLista'])"/>
                    </div>
                </div>

                    <div class="row w-100 m-0 px-3 pb-5">
                        <div class="row w-100 m-0 " v-if="productos && productos.length" >
                            <div class="row w-100 m-0 letra-gray3-19 px-3">Productos relacionado</div>
                            <div class="row w-100 m-0">
                                <scollX >
                                    <div class="swiper-slide w-auto" v-for="p of productos" :key="p.id">
                                        <cardProducto :data="p" />
                                    </div>
                                </scollX>
                            </div>
                        </div>
                    </div>
            </div>
            <div class="row w-100 m-0 pb-4 back-color-blanco border-t-gray1-1">
                <div class="row w-100 m-0 py-2">
                    <div class="row w-100 m-0 px-3 justify-content-center">
                        <div class="col-5 px-0 mx-auto">
                            <div class="row w-100 m-0">
                                <div class="col-auto px-2 back-color-azul1 border-radius-5px" @click="cantidad>1?cantidad -= 1:cantidad = cantidad">
                                    <icono icono="remove" clase="letra-blanco-30 pt-4px" />
                                </div>
                                <div class="col px-0">
                                    <div class="row w-100 m-0 letra-azul1-25 text-center justify-content-center">{{cantidad}}</div>
                                </div>
                                <div class="col-auto px-2 back-color-azul1 border-radius-5px" @click="cantidad += 1">
                                    <icono icono="add" clase="letra-blanco-30 pt-4px" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row w-100 m-0 pt-2 pb-4 px-3">
                    <div class="col-12 px-0 pb-ios-20px">
                        <botonApp tipo="azul" texto="Agregar a carrito" radius="30px" @click="add()"/>
                    </div>
                </div>
            </div>
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
                total: 0,
                cantidad: 1,
                form: {},
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            producto(){return this.$store.getters.catalogoGetFind('productos','producto') || {}},
            productos(){return this.$store.getters.getCatalogo('productos').filter(w=>{ return w.partner_id == this.producto.partner_id }).filter((x,y)=>{return y < 3});},
        },
        methods:{
            set(platillo){
                this.total = platillo.total;
                this.form = platillo;
            },
            add(){
                this.producto.cantidad = this.cantidad;
                this.$store.commit('addProductoCarrito',this.producto);
                this.$store.commit('setCarritosState',['para_usuarios_id', null]);
                this.$store.commit('setCarritosState',['listas_id', null]);
                this.$store.commit('setCarritosState',['eventos_id', null]);
                this.$store.commit('openMsn',['Producto añadido al carrito','Finalizar pedido',false,false]);
                this.router.back('/regalos');
            }
        }
    }
</script>