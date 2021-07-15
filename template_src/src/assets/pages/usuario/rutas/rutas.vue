<template>
    <f7-page class="" id="inicio">
        <div class="vista">
            <nav-bar tipo="inicio" title="Calendario" :backs="false" :logo="false" :profile="true"  />

            <div class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0 px-3 ">
                    <div class="row w-100 m-0 " v-for="r of rutas" :key="r.id">
                        <rutasRow 
                            url="detalle_ruta"
                            :data="r" 
                        />
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
            eventosDia(){return this.$store.getters.userStateArray('eventos').filter(x=>{return x.fecha == this.hoy });},
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