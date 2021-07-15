<template>
    <f7-page class="" id="inicio">
        <div class="vista">            
            <nav-bar tipo="inicio" title="Calendario" :backs="true" :logo="false" :profile="true"  />

            <div class="row w-100 m-0">
                <div class="row w-100 m-0 py-2 ">
                    <div class="col px-0 px-2 " @click="t=1" >
                        <div class="row w-100 m-0 px-3 py-2 border-radius-30px justify-content-center text-center" :class="(t==1)?'blanco-18 back-color-verde1 border-verde1-1':'gray3-18 border-gray3-1'">Faltas</div>
                    </div>
                    <div class="col px-0 px-2 " @click="t=2" >
                        <div class="row w-100 m-0 px-3 py-2 border-radius-30px justify-content-center text-center " :class="(t==2)?'blanco-18 back-color-verde1 border-verde1-1':'gray3-18 border-gray3-1'">Recolecciones</div>
                    </div>
                </div>
            </div>

                <div class="contenedor-page-tabs back-color-blanco" v-if="t==1">
                    <div class="row w-100 m-0"  v-for="a of faltas" :key="a.id" >
                        <faltasRow :data="a" />
                    </div>
                </div>

                <div class="contenedor-page-tabs back-color-blanco" v-if="t==2">
                    <div class="row w-100 m-0"  v-for="a of recolecciones" :key="a.id" >
                        <recoleccionRow :data="a" />
                    </div>
                </div>
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
                t: 1,
                hoy: moment().format('YYYY-MM-DD'),
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            faltas(){return this.$store.getters.userStateArray('faltas'); },
            recolecciones(){return this.$store.getters.userStateArray('recolecciones'); },
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