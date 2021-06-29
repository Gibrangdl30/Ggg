<template>
    <f7-page id="inicio" >
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="''"></nav-bar>
            <div class="contenedor-page">
                <div class="row w-100 m-0 h-65vw" v-if="producto.imagen">
                    <imagen :fit="true" :src="producto.imagen" />
                </div>
                <div class="row w-100 m-0 px-3 py-3">
                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0">
                            <div class="col my-auto px-0 letra-gray4-21 fw-600">{{producto.nombre}}</div>
                            <div class="col-auto my-auto px-0 letra-azul1-25">{{producto.precio | currency}} {{producto.currency}}</div>
                        </div>
                        <div class="row w-100 m-0 pt-2 letra-gray3-16 text-justify">{{producto.descripcion}}</div>
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
            restaurante(){return this.$store.getters.restaurantesFind('restaurantes','restaurante') || {};},
            producto(){return this.$store.getters.catalogoGetFind('productos','producto') || {}},
            tipo(){ return this.$store.getters.userStateObject('tipo') },
            nuevaFecha(){ return this.$store.getters.userStateObject('tipo') == 'nuevaFecha' },
        },
        methods:{
            set(platillo){
                this.total = platillo.total;
                this.form = platillo;
            },
            add(){
                console.log("TIPOS", this.tipo );
                this.producto.cantidad = this.cantidad;
                this.$store.commit('addRegalo',this.producto);
                if( this.tipo == 'nuevoEvento' ){    
                    this.router.back( '/nuevo_evento_calendario',{force: true} );
                    return;
                }
                if( this.tipo == 'editarEvento' ){
                    this.router.back( '/editar_evento_calendario', {force: true} );
                    return;
                }
                if( this.tipo == 'nuevaFecha' ){
                    this.router.back( '/lista_nuevo_evento', {force: true} );
                    return;
                }
                if( this.tipo == 'editarFecha' ){
                    this.router.back( '/editar_evento_fecha', {force: true} );
                    return;
                }
            }
        }
    }
</script>