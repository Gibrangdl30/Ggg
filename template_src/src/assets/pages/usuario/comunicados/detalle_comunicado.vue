<template>
    <f7-page class="" id="inicio">
        <modal-mensaje 
            :texto="`¿Deseas reportar este contenido?`"
            :boton="'Reportar'"
            @click="toreportar()"
        />

        <div class="vista">
            <nav-bar tipo="inicio" title="Comunicado" :backs="true" :logo="false" :profile="true"  />

            <div class="contenedor-page-tabs back-color-blanco">

                <div class="row w-100 m-0">
                    <div class="row w-100 m-0">
                        <imagen :src="comunicado.imagen" />
                    </div>
                </div>

                <div class="row w-100 m-0 px-3">
                    <div class="row w-100 m-0 pt-4 letra-gray4-19 fw-600">{{comunicado.title}}</div>
                    <div class="row w-100 m-0 pt-4">
                        <div class="col px-0 my-auto letra-verde1-17 fw-600">{{comunicado.tipo || 'Importante'}}</div>
                        <div class="col-auto px-0 my-auto letra-verde-17 fw-600">{{[comunicado.created_at, 'YYYY-MM-DD HH:mm:ss'] | moment('from')}}</div>
                    </div>
                    <div class="row w-100 m-0 pt-4" v-html="comunicado.body"></div>
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
            comunicado(){return this.$store.getters.catalogoGetFind('comunicados','comunicado')},
            
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