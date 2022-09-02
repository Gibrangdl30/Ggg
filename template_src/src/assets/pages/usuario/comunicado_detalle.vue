<template>
    <f7-page class="" id="inicio">

        <div class="vista">
            <nav-bar tipo="inicio" title="Detalle de comunicado" :fix="1" :backs="true"   />

            <div class="contenedor-page-tabs back-color-negro">
                <div class="row w-100 m-0 px-3 pt-3">
                    <div class="row w-100 m-0 border-radius-10px overflow-hidden position-relative">
                        <imagen :src="post.imagen" />
                    </div>
                </div>

                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 px-3 pt-3" >
                        <div class="row w-100 m-0 letra-blanco-20 fw-600 " >{{post.titulo}}</div>
                        <div class="row w-100 m-0 pt-2">
                            <div class="col-auto px-0 letra-blanco-16 ">{{[post.creado, 'YYYY-MM-DD HH:mm:ss'] |  moment('from') }}</div>
                        </div>
                        <div class="row w-100 m-0 pt-3 letra-blanco-19 justify-content-start " v-if="post.contenido" >
                            <div class="col-auto px-0 text-align-justify white-space " v-html="post.contenido" ></div>
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
            
            post(){ return this.$store.getters.dataFind('comunicados','comunicado'); },
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