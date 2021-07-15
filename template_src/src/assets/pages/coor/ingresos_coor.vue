<template>
    <f7-page class="" id="inicio">
        <modal-mensaje @click="rechazar"
        :texto="'¿Deseas rechazar este viaje? No podras tomarlo nuevamente.'"
        :boton="'Aceptar'"
        />
        <modalCoorRecoleccionHijos
            v-if="reco && reco.id"
            :data="reco"
        />
        <div class="vista">
            <nav-bar tipo="inicio" :backs="false" :title="'Entradas'" :fix="1" />
            <div class="row w-100 m-0">
                <div class="row w-100 m-0 py-2 "  @click="$store.dispatch('trySync')">
                    <div class="col px-0 px-2 " @click="t=1" >
                        <div class="row w-100 m-0 px-3 py-2 border-radius-30px justify-content-center text-center" :class="(t==1)?'blanco-18 back-color-verde1 border-verde1-1':'gray3-18 border-gray3-1'">Al momento</div>
                    </div>
                    <div class="col px-0 px-2 " @click="t=2" >
                        <div class="row w-100 m-0 px-3 py-2 border-radius-30px justify-content-center text-center " :class="(t==2)?'blanco-18 back-color-verde1 border-verde1-1':'gray3-18 border-gray3-1'">Historial</div>
                    </div>
                </div>
            </div>

            <div class="contenedor-page-tabs" v-if="t==1">
               
                <div class="row w-100 m-0" v-for="x of entrantes" :key="x.id">
                    <recoleccionRow :data="x" @click="next"  />
                </div>
                
            </div>

            <div class="contenedor-page-tabs" v-if="t==2">
               
                <div class="row w-100 m-0" v-for="x of historial" :key="x.id">
                    <recoleccionRow :data="x" :historial="t==2" />
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
                t:1,
                reco: {},
                modal: 'modalCoorRecoleccionHijos',
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            recolecciones(){ return this.$store.getters.coorArray('recolecciones').filter(x=>x.tipo=='i'); },
            entrantes(){ return this.recolecciones.filter(x=>x.estatus != 'terminado' && x.estatus != 'cancelado'); },
            historial(){ return this.recolecciones.filter(x=> x.estatus == 'terminado' ); },
        },
        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },
            next(reco){
                this.reco = reco;
                this.$store.commit('openModal',[this.modal]);
            },
            rechazar(){
                this.$store.commit('rechazarViaje', this.servicio);
            },
        }
    }
</script>