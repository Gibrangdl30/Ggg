<template>
    <f7-page >
    <div class="vista">

        <nav-bar tipo="inicio" title="Chats" :backs="false" :logo="false" :profile="true"  />

        <div id="chatsd" class="contenedor-page-tabs ">
            <div class="row w-100 m-0 back-color-blanco">

                <template v-for="c of busqueda">

                    <template v-if=" c.tipo == 'c' " >
                        <div class="row w-100 m-0 py-2 border-b-gray0-1" :key="c.id">
                        <div class="col-3 my-auto">
                            <div class="w-17vw h-17vw border-radius-50 overflow-hidden">
                                <img class="w-100 h-100" :src="c.usuario.foto || 'https://jocoseapp.com/apiv1/img/perfil.png'" alt="">
                            </div>
                        </div>
                        <div class="col-9 px-1" @click="goToDetelle(c.ids)">
                            <div class="row w-100 m-0">
                                <div class="col p-0 my-auto letra-gray-dark2-4-5vw fw-800">{{c.usuario.nombre}}</div>
                                <div class="col-1 p-0 my-auto">
                                    <img src="../iconos/ch_left.svg" alt="">
                                </div>
                            </div>
                            <div class="row w-100 m-0" v-if="c.usuario && c.usuario.grupo && c.usuario.grupo.id">
                                <div class="row w-100 m-0 justify-content-start " >
                                    <div class="col-auto px-0 letra-gray3-18">Grupo:</div>
                                    <div class="col-auto px-0 pl-2 letra-verde-18 fw-800">{{c.usuario.grupo.grade}}</div>
                                    <div class="col-auto px-0 pl-0 letra-verde-18 fw-800">-{{c.usuario.grupo.group}}</div>
                                </div>
                            </div>
                            <div class="row w-100 m-0 mt-1px">
                                <template v-if="!c.leido">
                                    <div class="col-auto my-auto pr-1 px-0" v-if="getLastMensaje(c.mensajes).usuarios_id && getLastMensaje(c.mensajes).usuarios_id != session.id" >
                                        <icono icono="fiber_manual_record" clase="letra-verde2-15 pt-5px" />
                                    </div>
                                </template>
                                <div class="col my-auto p-0 letra-verde2-16" v-if="getLastMensaje(c.mensajes).fecha" :class="(getLastMensaje(c.mensajes).usuarios_id == session.id)?'':' fw-800'" >{{getLastMensaje(c.mensajes).mensaje}}</div>
                                <div class="col-auto p-0 my-auto letra-gray3-11 text-right font-italic" v-if="getLastMensaje(c.mensajes).fecha">{{ [ getLastMensaje(c.mensajes).fecha, 'YYYY-MM-DD HH:mm:ss'] | moment("from", "now") }}</div>
                            </div>
                        </div>
                    </div>

                    </template>

                </template>

            </div>
        </div>

        <tabs />
    </div>
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
import Swiper from 'swiper';
    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                b: null,
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            chats(){return this.$store.getters.getChats;},
            
            ordenar(){
                let a = [];
                this.chats.map(x=>{
                    x.momento = (x.mensajes[x.mensajes.length-1] || {}).fecha || '1992-01-01 12:00:00';
                    a.push({ id: _.uniqueId('c_'), tipo: 'c', busqueda: x.usuario.nombre, momento: x.momento, chat: x, ids: x.id, mensajes: x.mensajes, usuario: x.usuario });
                });
                return a;
            },
            busqueda(){
                if(this.b){
                    return this.ordenar.filter(x => x.busqueda.toLowerCase().includes(this.b.toLowerCase()));
                }
                return this.ordenar;
            },
        },
        mounted() {
            console.log("CHATS", this.chats);
        },
        methods:{
            scroll(){
                $('#chatsd').animate({ scrollTop: 9999 }, 'slow');
            },
            goTo(ruta){
                this.router.navigate(ruta);
            },
            goToDetelle(id){
                this.$store.commit('selectChat', id)
                this.goTo('/mensajes_chat');
            },
            getLastMensaje(mensajes){
                return mensajes[mensajes.length-1] || {} ;
            },
            goToEvento(e){
                this.$store.commit('setUsuarioData',['evento', e.ids ]);
                if(e.tipo == '1'){
                    this.router.navigate('/mensajes_eventos');
                }
                else{
                    this.router.navigate('/mensajes_invitaciones');
                }
            }
        }
    }
</script>