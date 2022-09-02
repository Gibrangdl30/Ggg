<template>
    <f7-page class="" id="inicio">

        <div class="vista">
            <nav-bar tipo="inicio" title="Detalle del boleto" :fix="1" :backs="true"   />

            <div class="contenedor-page-tabs back-color-negro">
                <div class="row w-100 m-0 px-3 pt-3">
                    <div class="row w-100 m-0 border-radius-10px overflow-hidden position-relative">
                        <imagen :src="post.imagen" />
                    </div>
                </div>

                <div class="row w-100 m-0 px-3 pt-4 " >
                    <div class="w-20vw h-20vw my-auto mt-2">
                        <imagen clase="border-radius-10px" :user="1" :src="post.usuario.foto"  />
                    </div>
                    <div class="col px-0 pl-3 my-auto " >
                        <div class="row w-100 m-0 letra-blanco-24 fw-600 " >{{post.usuario.nombre}}</div>
                    </div>

                </div>

                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 px-3 pt-3" >
                        <div class="row w-100 m-0 letra-blanco-20 fw-600 " >{{post.nombre}}</div>
                        <div class="row w-100 m-0 pt-2">
                            <div class="col-auto px-0 letra-rojo2-18 fw-600">{{[post.fecha, post.hora] | fechaE}}</div>
                        </div>
                       
                    </div>
                </div>

                <div class="row w-100 m-0 px-3">
                    <div class="row w-100 m-0 pt-3 letra-blanco-20 fw-600 ">Boletos:</div>
                    <div class="row w-100 m-0">
                        <div class="row w-100 m-0 justify-content-start" v-for="(b, a) of post.boletos">
                            <div class="col-auto px-0 letra-blanco-18">{{a+1}}.</div>
                            <div class="col-auto px-0 pl-2 letra-blanco-18">{{b.zona}}</div>
                            <div class="col-auto px-0 pl-2 letra-blanco-18">/</div>
                            <div class="col-auto px-0 pl-2 letra-blanco-18">{{b.fila}} - {{b.numero}}</div>
                        </div>
                    </div>
                </div>
                
                <div class="row w-100 m-0">
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
            
            post(){ return this.$store.getters.dataFind('allBoletos','id'); },
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