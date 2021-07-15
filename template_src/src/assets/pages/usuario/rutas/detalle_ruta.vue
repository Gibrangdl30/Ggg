<template>
    <f7-page class="" id="inicio">
        <div class="vista">
            <nav-bar tipo="inicio" title="Detelle ruta" :backs="true" :logo="false" :profile="true"  />

            <div class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0 px-3 ">
                    <div class="row w-100 m-0 " v-for="r of [ruta]" :key="r.id">
                        <rutasRow 
                        :data="r"
                        :full="true" />
                    </div>
                </div>
            </div>
            <tabs />
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
                hoy: moment().format('YYYY-MM-DD'),
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            rutas(){return this.$store.getters.userStateArray('rutas'); },
            ruta(){return this.$store.getters.userStateFind('rutas','detalle'); },
        },
        mounted(){
            this.$store.dispatch('initData', [this.$f7]);
        },
        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },
            nuevo(){
                this.$store.commit('cleanForm');
                this.$store.commit('processRuteSession','/nuevo_evento_calendario')
            }
        }
    }
</script>