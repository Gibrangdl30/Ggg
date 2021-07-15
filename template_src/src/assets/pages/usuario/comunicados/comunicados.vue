<template>
    <f7-page class="" id="inicio">
        <modal-mensaje 
            :texto="`¿Deseas reportar este contenido?`"
            :boton="'Reportar'"
            @click="toreportar()"
        />

        <div class="vista">
            <nav-bar tipo="inicio" title="Comunicados" :backs="true" :logo="false" :profile="true"  />

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

            verRegalo(e){
                this.info = e;
                this.$store.commit('openModal',['modalRegalo']);
            },

            verEvento(e){
                this.$store.commit('setUsuarioData',['evento', e.id]);
                this.router.navigate('/detalle_eventos');
            },
            set(f){
                this.info = f;
                this.$store.commit('openModal', ['modalParty']);
            },
            verDeseos(e){
                this.$store.commit('setUsuarioData', ['amigo',e.amistad.id]);
                this.router.navigate('/deseos_amigos');
            },
            verDeseosFecha(e){
                this.$store.commit('setUsuarioData', ['amigo',e.id]);
                this.router.navigate('/deseos_fechas_amigos');
            },
            verDeseosLista(e){
                this.$store.commit('setUsuarioData', ['amigo',e.amistad.id]);
                this.$store.commit('setUsuarioData', ['detalle',e.id]);
                this.router.navigate('/deseos_amigo');
            },
            reportar(){
                this.$store.commit('openModal',['modalMensaje']);
            },
            toreportar(){
                swal("","Contenido reportado","success");
            },
            editarF(a){
                this.$store.commit('setUsuarioData',['fecha',a.id]);
                this.router.navigate('/editar_evento_fecha');
            },
            editarD(a){
                this.$store.commit('setUsuarioData',['lista',a.id]);
                this.$store.commit('setUsuarioData',['type',a.type]);
                console.log("TIPE", a.type);
                this.router.navigate('/detalle_lista');
            },
            
        }
    }
</script>