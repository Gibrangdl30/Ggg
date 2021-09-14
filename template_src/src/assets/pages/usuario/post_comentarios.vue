<template>
    <f7-page class="" id="inicio">

        <div class="vista">
            <nav-bar tipo="inicio" title="Comments" :fix="1" :backs="true"   />

            <div class="contenedor-page-tabs back-color-blanco">

                <div class="row w-100 m-0">
                    <postCard :data="post" />
                </div>
                <div class="row w-100 m-0">
                    <div class="row w-100 m-0">
                        <div class="col px-0 px-1" @click="t=1">
                            <div class="row w-100 m-0 py-5px border-azul1-1 justify-content-center text-center border-radius-30px " 
                                :class="(t==1?'back-color-azul1 letra-blanco-18':'letra-azul1-18')" >Comments</div>
                        </div>
                        <div class="col px-0 px-1" @click="t=2">
                            <div class="row w-100 m-0 py-5px border-azul1-1 justify-content-center text-center border-radius-30px position-relative " 
                                :class="(t==2?'back-color-azul1 letra-blanco-18':'letra-azul1-18')" >
                                <div class="row w-100 m-0 justify-content-center text-center ">likes</div>
                                <div class="row w-100 m-0 justify-content-end text-end position-absolute top-4px right-15px " v-if="likes.length" >{{likes.length}}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <template v-if="t==1">
                    <div class="row w-100 m-0" v-for="(c,x) of comentarios" :key="x" >
                        <comenatarioRow :data="c" />
                    </div>
                </template>

                <template v-if="t==2">
                    <div class="row w-100 m-0" v-for="(c,x) of likes" :key="x" >
                        <comenatarioRow :like="true" :data="c" />
                    </div>
                </template>

            </div>

            <div class="row w-100 m-0 border-t-gray0-1 ">
                <div class="row w-100 m-0 pb-3 pt-3 ">
                    <div class="col-9 my-auto px-1 ">
                        <inputForm type="text" placeholder="" :fixed="true" input="form" v-model="mensaje" @enter="sendComentario()" />
                    </div>
                    <div class="col-3 my-auto pl-0 pr-1">
                        <botonApp tipo="azul" @click="sendComentario()" texto="Send" radius="35px" />
                    </div>
                </div>
            </div>

        </div>

    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
const moment = require('moment-timezone');

    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                t:1,
                mensaje: null,
                zona: moment.tz.guess(),
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            posts(){return this.$store.getters.postStateArray('posts')},
            post(){return this.$store.getters.postStateFind('posts','post')},
            comentarios(){return this.post.comentarios || []},
            likes(){return this.post.likes || []},
        },

        mounted(){
            this.$store.dispatch('synchronizeData');
        },

        created() {
            if(this.$store.getters.deviceReady){
                if(device.platform == 'iOS'){
                    console.log("TECLADO PARA CHATS IOS");
                    Keyboard.shrinkView(true);
                }
            }
        },

        destroyed() {
            if(this.$store.getters.deviceReady){
                if(device.platform == 'iOS'){
                    console.log("DESACTIVO TECLADO PARA CHATS IOS");
                    Keyboard.disableScrollingInShrinkView(false);
                    Keyboard.shrinkView(false);
                }
            }
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