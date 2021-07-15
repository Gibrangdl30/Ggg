<template>
    <f7-page class="" id="inicio">
         <modal-mensaje @click="rechazar"
          :texto="'¿Deseas rechazar este viaje? No podras tomarlo nuevamente.'"
          :boton="'Aceptar'"
         />
        <div class="vista">
            <nav-bar tipo="inicio" :backs="true" :title="'Grupos'" :fix="1" />
            <div class="contenedor-page-tabs">
               
                <div class="row w-100 m-0" v-for="s of grupos" :key="s.id">
                    <gruposRow 
                        :data="s" 
                        ruta="/alumnos_maestro"
                    />
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
            grupos(){ return this.$store.getters.coorArray('grupos'); },
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