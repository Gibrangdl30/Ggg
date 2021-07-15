<template>
    <f7-page class="" id="inicio">
         <modal-mensaje @click="rechazar"
          :texto="'¿Deseas rechazar este viaje? No podras tomarlo nuevamente.'"
          :boton="'Aceptar'"
         />
        <div class="vista">
            <nav-bar tipo="inicio" :backs="false" :title="'Entradas y salidas'" :fix="1" />
            <div class="contenedor-page-tabs">
               
                <div class="row w-100 m-0 px-3 py-2"  @click="go('/ingresos_coor')" >
                    <div class="row w-100 m-0 px-15px py-15px border-gray01-1 border-radius-10px ">
                        <div class="row w-100 m-0 letra-gray4-20">Entradas</div>
                        <div class="row w-100 m-0 letra-verde1-17">Consulta de niños que ingresan al colegio</div>
                    </div>
                </div>

                <div class="row w-100 m-0 px-3 py-2" @click="go('/salidas_coor')" >
                    <div class="row w-100 m-0 px-15px py-15px border-gray01-1 border-radius-10px ">
                        <div class="row w-100 m-0 letra-gray4-20">Salidas</div>
                        <div class="row w-100 m-0 letra-verde1-17">Recolecciones de niños</div>
                    </div>
                </div>

                <div class="row w-100 m-0 px-3 py-2" @click="go('/agregar_acceso_terceros')">
                    <div class="row w-100 m-0 px-15px py-15px border-gray01-1 border-radius-10px ">
                        <div class="row w-100 m-0 letra-gray4-20">Acceso a terceros</div>
                        <div class="row w-100 m-0 letra-verde1-17">Otorga acceso a usuarios temporales</div>
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
                servicio: {},
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            grados(){ return this.$store.getters.coorArray('grados'); }
        },
        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },
            next(estatus){
               this.$store.dispatch('postActualizarPedido',estatus);
            },
            rechazar(){
                this.$store.commit('rechazarViaje', this.servicio);
            },
        }
    }
</script>