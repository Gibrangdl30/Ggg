<template>
    <f7-page class="" id="inicio">
   
        <div class="vista back-color-negro ">
            <nav-bar tipo="inicio" title="Bebidas y alimentos" :fix="1" :backs="true"   />

            <div class="row w-100 m-0 px-3 py-2 back-color-negro ">
                <busquedaInput v-model="b" holder="Buscar" />
            </div>

            <div class="contenedor-page-tabs back-color-negro ">

                <div class="row w-100 m-0 pt-2 pb-2 back-color-negro "  >

                    <div class="row w-100 m-0" v-for=" f of productos" :key="f.id">
                        <productoComponent :data="f"  />
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
                b: null,
                modal: null,
                modal2: null,
                c: 15,
                add: 5,
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},

            productos(){return this.$store.getters.getInfo('productos') },
        },

        mounted(){
            this.$store.dispatch('initData', [this.$f7]);
            this.$store.commit('setLogin', 1);
            console.log("POST POST", this.posts, );
        },

        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },

            back(ruta){
                this.router.back(ruta);
            },

            cancelar(){
                let form = this.asignado;
                form.cancelar = 1;
                this.$store.dispatch('userPostCrearPost',[ form ]);
                form.cancelar = 0;
            },

            reco(tipo = 1){
                this.$store.commit('setUsD',['tipo', tipo]);
                this.$store.commit('openModal',['modalHijosRecoleccion']);
            },

        }
    }
</script>