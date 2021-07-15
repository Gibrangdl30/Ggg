<template>
    <f7-page class="" id="inicio">
         <modal-mensaje @click="rechazar"
          :texto="'¿Deseas rechazar este viaje? No podras tomarlo nuevamente.'"
          :boton="'Aceptar'"
         />
        <div class="vista">
            <nav-bar tipo="inicio" :backs="true" :title="'Alumnos'" :fix="1" />
            <div class="contenedor-page-tabs">
               
               <div class="row w-100 m-0 pt-3 px-3">
                   <div class="row w-100 m-0" v-if=" maestro && maestro.id " >
                        <div class="w-15vw h-15vw my-auto border-radius-50 overflow-hidden " >
                            <imagen clase="asd" :src="maestro.imagen" />
                        </div>
                        <div class="col px-0 my-auto">
                            <div class="row w-100 m-0 letra-gray3-17">Maestro</div>
                            <div class="row w-100 m-0 letra-gray4-19">{{maestro.name}}</div>
                        </div>
                    </div>
               </div>
                
                <div class="row w-100 m-0 py-4">
                    <div class="row w-100 m-0 py-2" v-for="a of alumnos" :key="a.id">
                        <hijosRow :data="a" :coor="true"   />
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
            grado(){ return this.$store.getters.coorFind('grados','grado'); },
            grupo(){ return this.$store.getters.coorFindInside('grados', 'grado', 'grupos', 'grupo' ); },
            maestro(){return this.grupo.maestro || {}},
            alumnos(){return this.grupo.alumnos || []},
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