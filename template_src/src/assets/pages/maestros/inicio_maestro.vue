<template>
    <f7-page class="" id="inicio">
        <modal-mensaje 
            :texto="`¿Deseas reportar este contenido?`"
            :boton="'Reportar'"
            @click="toreportar()"
        />

        <div class="vista">
            <nav-bar tipo="inicio" title="Inicio" :backs="false" :logo="false" :profile="true"  />

            <div class="row w-100 m-0 border-b-gray01-1" >
                <div class="row w-100 m-0 px-3 py-3">
                    <div class="col my-auto px-0 pl-3 gray3-18">¿Estas en el plantel?</div>
                    <div class="col-auto my-auto px-0">
                        <toggle :v="'1'" :f="'0'" v-model="form.activo" />
                    </div>
                </div>
            </div>

            <div class="row w-100 m-0 px-3">
                <div class="row w-100 m-0 py-3">
                    <div class="col my-auto px-0 letra-gray4-19">Comunicados destacados</div>
                    <div class="col-auto my-auto px-0 letra-verde-17 fw-600" @click="router.navigate('/comunicados')" >Ver todos</div>
                </div>
            </div>

            <div class="contenedor-page-tabs back-color-blanco">

                <div class="row w-100 m-0">
                    <div class="row w-100 m-0" v-for=" f of comunicados " :key="f.id">
                        <comunicadoRow :data="f" />
                    </div>
                </div>
            </div>


            <tabs />
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
                form: {
                    activo: '1',
                }
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},

            comunicados(){return this.$store.getters.getCatalogo('comunicados')},
            
        },

        mounted(){
            this.$store.dispatch('initData', [this.$f7]);
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