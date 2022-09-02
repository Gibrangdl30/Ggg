<template>
    <f7-page class="" id="inicio">

        <div class="vista">
            <nav-bar tipo="inicio" title="Bebidas y alimentos" :fix="1" :backs="true"   />

            <div class="contenedor-page-tabs back-color-negro">

                <div class="row w-100 m-0 px-3 pt-3" v-if="0">
                    <div class="row w-100 m-0 border-radius-10px overflow-hidden position-relative">
                        <imagen :src="post.imagen" />
                    </div>
                </div>

                <div class="row w-100 m-0 px-3 pt-4 " >
                    <div class="row w-100 m-0 " >
                        <div class="w-20vw h-20vw my-auto mt-2">
                            <imagen clase="border-radius-10px" :user="1" :src="post.usuario.foto"  />
                        </div>
                        <div class="col px-0 pl-3 my-auto " >
                            <div class="row w-100 m-0 letra-blanco-24 fw-600 " >{{post.usuario.nombre}}</div>
                        </div>

                    </div>
                </div>

                <div class="row w-100 m-0 px-3">
                    <div class="row w-100 m-0 pt-3 pb-2 letra-blanco-20 fw-600 ">Productos:</div>
                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0 py-2 justify-content-start" v-for="(b, a) of post.productos" >
                            <div class="w-20vw h-20vw">
                                <imagen class="border-radius-10px" :src="b.imagen" />
                            </div>
                            <div class="col my-auto px-0 pl-3">
                                <div class="row w-100 m-0 fw-600 letra-blanco-20 text-capitalize">{{b.nombre}}</div>
                                <div class="row w-100 m-0 letra-blanco-18 text-capitalize" v-if="b.contenido">Contenido: {{b.contenido}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row w-100 m-0 pt-4">
                    <div class="row w-100 m-0 pt-3 px-3 letra-blanco-18 ">Entrega este codigo para recibir tu productos:</div>
                    <div class="row w-100 m-0 py-4">
                        <div class="col-7 px-0 mx-auto">
                            <imagen :src="`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${post.codigo}`" />
                        </div>
                    </div>
                </div>

                <div class="row w-100 m-0 py-4 "></div>
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
            
            post(){ return this.$store.getters.dataFind('allConsumos','id'); },
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