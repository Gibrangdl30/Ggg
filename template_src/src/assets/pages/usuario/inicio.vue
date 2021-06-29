<template>
    <f7-page class="" id="inicio">
        <modal-mensaje 
            :texto="`¿Deseas reportar este contenido?`"
            :boton="'Reportar'"
            @click="toreportar()"
        />

        <div class="vista">
            <nav-bar tipo="init" title="Patients" :backs="false" :logo="true" :profile="true" :chat="true" />

            <div class="row w-100 m-0">
                <div class="row w-100 m-0 px-3 py-3">
                    <busquedaInput v-model="b" holder="Search" />
                </div>
            </div>

            <div class="w-auto position-absolute bottom-10 right-3 z-index-10000000" @click="router.navigate('/registro_paciente')">
                <div class="w-50px h-50px back-color-verde border-radius-50">
                    <div class="row w-100 m-0 pt-5px justify-content-center text-center ">
                        <icono icono="add" clase="letra-blanco-40" />
                    </div>
                </div>
            </div>

            <div class="contenedor-page-tabs back-color-blanco">

                <div class="row w-100 m-0" v-if="!pacientes || !pacientes.length">
                    <div class="row w-100 m-0 pt-4" >
                        <div class="col-4 mx-auto px-0">
                            <imagen :icono="true" src="heart" />
                        </div>
                    </div>
                    <div class="row w-100 m-0 pt-3 letra-gray3-18 justify-content-center text-center ">You have no patients for now, please click on the green button to add one.</div>
                </div>

                <div class="row w-100 m-0">
                    <div class="row w-100 m-0" v-for=" f of search " :key="f.id">
                        <rowPaciente :select="true" :card="true" :data="f" />
                    </div>
                </div>
            </div>
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

            pacientes(){return this.$store.getters.pacienteStateArray('pacientes').filter(x=>x.status=='active');},
            search(){
                if(this.b){
                    return this.pacientes.filter(x=>{return x.name.toLowerCase().includes( this.b.toLowerCase() )});
                }
                return this.pacientes;
            }
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