<template>
    <f7-page class="" id="inicio">

        <modalMensajeStatic
            v-if="show"
            boton="twooptions"
            @set1="router.navigate('/crear_post')"
            @set2="router.navigate('/crear_post_res')"
            @close="show = 0"
        />

        <div class="vista">
            <nav-bar tipo="logo" :no_border="1" title="" :backs="false" :logo="false" :profile="true"  />

            <div class="contenedor-page-tabs back-color-blanco">
                <div v-if="0" class="row w-100 m-0 px-3">
                    <postCard :publicar="true" />
                </div>

                <div class="row w-100 m-0" v-for="p of posts" :key="p.id" >
                    <postCard :row="true" :data="p" :last="1" />
                </div>
            </div>

            <div class="row w-100 m-0 position-absolute bottom-13 ios-bottom-16 left-0px">
                <div class="col-10 px-0 mx-auto">
                    <botonApp texto="Crear post" radius="30px" py="py-5px" tipo="app" @click="show = 1" />
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
                show: 0,
                b: null,
                c: 15,
                add: 5,
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            init(){return this.$store.getters.userStateObject('init');},

            posts(){return this.$store.getters.info('posts')},
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