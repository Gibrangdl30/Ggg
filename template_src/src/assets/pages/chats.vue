<template>
    <f7-page >
        <modalMensajeStatic
            v-if="modal"
            :texto="`Si consideras que otro usuario de Paparatz mantiene un comportamiento inadecuado o que te incomoda puedes bloquearlo. Bloquear el usuario lo eliminará de tu cuenta y no podrás tener mas comunicación con el/ella.\n¿Deseas bloquear al usuario?`"
            :boton="'Aceptar'"
            @click="bloquear()"
            @close="modal=0"
        />

    <div class="vista">

        <nav-bar tipo="inicio" title="CHATS" :backs="true" :right="0" icon="newC" @right="router.navigate('/iniciar_chat_amigo')"  />

        <div id="chatsd" class="contenedor-page-tabs ">

            <div class="row w-100 m-0 mt-4 py-3" v-if="!chats || !chats.length" >
                <div class="col-10 mx-auto px-0 letra-gray3-18 justify-content-center text-center">No existen chat activos en este momento, acepta ser un Paparatz para que se active alguno.</div>
            </div>

            <div class="row w-100 m-0 back-color-blanco">

                <template v-for="c of chats">

                    <template  >
                        <div class="row w-100 m-0 py-2 border-b-gray0-1 position-relative " :key="c.id">
                            <div class="w-30px position-absolute right-10px top-5px z-10000000 " @click.stop="modal= !modal; user = c; ">
                                <div class="row w-100 m-0 justify-content-center">
                                    <icono icono="block" clase="letra-gray2-25" />
                                </div>
                            </div>

                            <div class="col-3 my-auto">
                                <div class="w-17vw h-17vw border-radius-50 overflow-hidden" >
                                    <img class="w-100 h-100" v-if="c.tipo == 'solo'" :src="c.usuario.foto || 'https://jocoseapp.com/apiv1/img/perfil.png'" alt="">
                                    <imagen class="" v-else :user="true" :create="true" :src="c.imagen_id" alt="" />
                                </div>
                            </div>
                            <div class="col-9 px-1" @click="goToDetelle(c.id)">
                                <div class="row w-100 m-0">
                                    <div class="col p-0 my-auto letra-gray-dark2-4-5vw fw-600" v-if="c.tipo == 'solo'">{{c.usuario.nombre}}</div>
                                    <div class="col p-0 my-auto letra-gray-dark2-4-5vw fw-600" v-else>{{c.nombre}}</div>
                                    <div class="col-1 p-0 my-auto">
                                        <img src="../iconos/ch_left.svg" alt="">
                                    </div>
                                </div>
                                <div class="row w-100 m-0" v-if="c.tipo == 'grupo'">
                                    <div class="row w-100 m-0 letra-gray3-16">{{integrantes(c) | truncate(39)}}</div>
                                </div>
                                <div class="row w-100 m-0 mt-1px">
                                    <template v-if="!c.leido">
                                        <div class="col-auto my-auto pr-1 px-0" v-if="getLastMensaje(c.mensajes).usuarios_id && getLastMensaje(c.mensajes).usuarios_id != session.id && !getLastMensaje(c.mensajes).leido" >
                                            <icono icono="fiber_manual_record" clase="letra-azul1-15 pt-5px" />
                                        </div>
                                    </template>
                                    <div class="col my-auto p-0 letra-azul1-16" v-if="getLastMensaje(c.mensajes).fecha" :class="( getLastMensaje(c.mensajes).usuarios_id == session.id)?'':(getLastMensaje(c.mensajes).leido)?'':'fw-800'" >
                                        <div class="row w-100 m-0 white-space-preline" v-if="getLastMensaje(c.mensajes).tipo == '1'">
                                            <p class="m-0 p-0 over-wrap" v-if="(getLastMensaje(c.mensajes).usuarios_id == session.id)">Enviaste una foto</p>
                                            <p class="m-0 p-0 over-wrap" v-else>Te enviaron una foto</p>
                                        </div>
                                        <div class="row w-100 m-0" v-else>
                                            <p class="m-0 p-0 over-wrap" >{{getLastMensaje(c.mensajes).mensaje | truncate(39)}} </p>
                                        </div>
                                    </div>
                                
                                </div>
                                <div class="row w-100 m-0 pr-3">
                                    <div class="col-auto p-0 my-auto ml-auto letra-gray3-11 text-right font-italic" v-if="getLastMensaje(c.mensajes).fecha">
                                        <p class="m-0 p-0 over-wrap" >{{ [ getLastMensaje(c.mensajes).fecha, 'YYYY-MM-DD HH:mm:ss'] | moment("from", "now") }}</p>
                                    </div>
                                </div>
                            </div>
                    </div>

                    </template>

                </template>

            </div>
        </div>

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
                modal: 0,
                user: {},
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            chats(){return this.$store.getters.getChats;},
            
            ordenar(){
                let a = [];
                this.chats.map(x=>{
                    x.momento = (x.mensajes[x.mensajes.length-1] || {}).fecha ||  x.creado;
                    a.push({ id: _.uniqueId('c_'), busqueda: x.usuario.nombre, momento: x.momento, chat: x, ids: x.id, mensajes: x.mensajes, usuario: x.usuario });
                });
                return a;
            },
            busqueda(){
                if(this.b){
                    return this.ordenar.filter(x => x.busqueda.toLowerCase().includes(this.b.toLowerCase()));
                }
                return this.ordenar;
            },
            integrantes(){
                return (g)=>{
                    let t = '';
                    g.usuarios.filter(x=>{return x.usuarios_id != this.session.id}).map((s,y)=>{
                        if(y < g.usuarios.length - 1){
                            t = t + s.nombre + ', ';
                        }
                    });
                    return t;
                }
            }
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
            bloquear(){
                this.$store.dispatch('postBorrarConversacion', [this.user, 1]);
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