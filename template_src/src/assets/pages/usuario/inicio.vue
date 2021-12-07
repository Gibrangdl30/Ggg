<template>
    <f7-page class="" id="inicio">
        <modalMensaje
            titulo="Important!"
            :texto="`It´s strcitly forbidden to send objectionable content, such as pornography, nudes and illegal.\n\nIf you do not comply with these terms, your user can be permanently deleted`"
            :oneButton="true"
            :boton="'I agree'"
        />

        <div class="vista">
            <nav-bar tipo="logo" :no_border="1" title="Inicio" :backs="false" :logo="false" :profile="true"  />

            <div class="contenedor-page-tabs back-color-blanco">

                <div class="row w-100 m-0 border-b-gray0-2" >
                    <div class="row w-100 m-0 pl-2 pt-2">
                        <div class="row w-100 m-0">
                            <div class="col-auto px-0 " @click="go('/seleccionar_amigo_request')" v-if="false" >
                                <div class="w-13vw h-13vw mx-auto app-degra border-radius-50 ">
                                    <div class="row w-100 m-0 justify-content-center text-center pt-9px">
                                        <icono icono="add" clase="letra-blanco-35" />
                                    </div>
                                </div>
                                <div class="row w-100 m-0 justify-content-center text-center letra-gray2-14">Request</div>
                            </div>
                            <div class="row w-100 m-0 px-0 mr-auto" v-if="lastrequest && lastrequest.length">
                                <postRequestSlider   />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row w-100 m-0">
                    <div class="row w-100 m-0" v-for=" f of posts.filter(a => !notShow.includes(a.id) ) " :key="f.id">
                        <postCard :data="f" v-model="notShow" />
                    </div>
                </div>

            </div>

            <div class="w-16vw h-16vw position-absolute bottom-3 right-8px ">
                <uploadImagen :custom="true" :post="true" />
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
                //Wishlist (Rojo)
                //Reuniones (Verde)
                //Parties (Amarillo)
                //Mis fechas (Azul)
                b: null,
                c: 15,
                add: 5,
                zona: moment.tz.guess(),
                notShow:[],
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            init(){return this.$store.getters.userStateObject('init');},

            posts(){return this.$store.getters.postStateArray('posts')},
            privados(){return this.$store.getters.postStateArray('privados')},
            lastrequest(){return this.$store.getters.userStateArray('lastrequest')},
        },

        mounted(){
            this.$store.dispatch('initData', [this.$f7]);
            if(!this.init){
                this.$store.commit('op');
                this.$store.commit('setUsD',['init',true]);
            }
            // console.log("···············", this.zona);
        },

        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },

            reco(tipo = 1){
                this.$store.commit('setUsD',['tipo', tipo]);
                this.$store.commit('openModal',['modalHijosRecoleccion']);
            },

        }
    }
</script>