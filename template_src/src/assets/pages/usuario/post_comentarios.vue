<template>
    <f7-page class="" id="inicio">

        <div class="vista">
            <nav-bar tipo="inicio" title="Detalle de propiedad" :fix="1" :backs="true"   />

            <div class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0 px-3 pt-3">
                    <div class="row w-100 m-0 border-radius-10px overflow-hidden position-relative">
                        <sliderFotos :fotos="fotos" />
                        <div @click.stop="$store.dispatch('postAddFavorito',post)" class="w-45px h-45px back-color-gray4 border-bl-radius-10px position-absolute top-0px right-0px z-10000000 ">
                            <div class="row w-100 m-0 pt-6px justify-content-center text-center " >
                                <icono :icono="post.fav?'favorite':'favorite_border'" class="letra-blanco-30" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 px-3 pt-3" >
                        <div class="row w-100 m-0 letra-negro-22 fw-600 " >{{post.nombre}}</div>
                        <div class="row w-100 m-0 pt-3 letra-negro-20  " >{{post.direccion}} {{post.colonia}}</div>
                        <div class="row w-100 m-0 letra-negro-20" >{{post.ciudad}}, {{post.estado}}, CP.{{post.codigo_postal}}</div>

                        <div class="row w-100 m-0 pt-2">
                            <div class="col-auto px-0 letra-gray2-16 ">{{[post.created_at, 'YYYY-MM-DD HH:mm:ss'] |  moment('DD/MM/YY') }}</div>
                        </div>
                        <div class="row w-100 m-0 pt-3">
                            <div class="col-auto px-0 letra-negro-23 fw-600">{{post.precio | currency }} {{post.moneda}}</div>
                        </div>
                        <div class="row w-100 m-0 pt-1">
                            <div class="col-auto px-0 letra-negro-19 ">{{post.metros_cuadrados }} MTS cuadrados de area</div>
                            <div class="col-auto px-0 letra-negro-19 ">{{post.m2_construccion }} MTS cuadrados de construcción</div>
                        </div>
                        <div class="row w-100 m-0 pt-3 letra-blanco-19 fw-600 ">
                            <div class="col-auto back-color-verde border-radius-5px py-2px px-5px" v-if="post.tipo=='renta_venta'" >Venta/Renta</div>
                            <div class="col-auto back-color-verde border-radius-5px py-2px px-5px" v-else-if="post.tipo=='venta'" >Venta</div>
                            <div class="col-auto back-color-azul border-radius-5px py-2px px-5px" v-else >Renta</div>
                        </div>

                        <div class="row w-100 m-0 pt-3 letra-gray3-19 justify-content-start " >
                            <div class="row w-100 m-0 ">{{post.habitaciones}} habitaciones,</div>
                            <div class="row w-100 m-0 " v-if="post.cocina=='1'">Cocina</div>
                            <div class="row w-100 m-0  ">{{post.banios}} baños,</div>
                            <div class="row w-100 m-0 " v-if="post.patio_servicio=='1'">Patio de servicio</div>
                            <div class="row w-100 m-0 " v-if="post.terraza=='1'">Terraza</div>
                            <div class="row w-100 m-0  ">{{post.estacionamientos}} cajon de estacionamiento,</div>
                            <div class="row w-100 m-0  " v-if="post.sala_comedor=='2'">Sala, Comedor</div>
                            <div class="row w-100 m-0 " v-if="post.sala_comedor=='1'">Sala/comedor</div>
                            <div class="row w-100 m-0 " v-if="post.areas_verdes=='1'">Areas verdes, patios o jardinez</div>
                        </div>

                        <div class="row w-100 m-0 pt-3 letra-gray3-19 justify-content-start " v-if="post.descripcion" >
                            <div class="col-auto px-0" v-html="post.descripcion" ></div>
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
                t:1,
                mensaje: null,
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            
            posts(){return this.$store.getters.postStateArray('posts')},
            post(){return this.$store.getters.postStateFind('posts','post')},
            fotos(){return this.post.fotos || []},

            likes(){return this.post.likes || []},
        },

        mounted(){
            this.$store.dispatch('synchronizeData');
        },

        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },

            sendComentario(){
                if(this.mensaje){
                    this.$store.dispatch('postPostSaveComentario',[ this.mensaje ]);
                    this.mensaje = null;
                }
            },

            reco(tipo = 1){
                this.$store.commit('setUsD',['tipo', tipo]);
                this.$store.commit('openModal',['modalHijosRecoleccion']);
            },

        }
    }
</script>