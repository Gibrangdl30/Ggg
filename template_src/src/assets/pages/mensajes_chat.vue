<template>
    <f7-page>
        <modalUsuario :usuario="chat.usuario" />
        <div class="vista" v-vistak v-chatss >
            <nav-bar tipo="chat"  :backs="true" :title="chat.usuario.nombre" :usuario="chat.usuario" @call="llamar()" @perfil="verPerfil()" :show="chat.usuario.tipo == 'usuario'" />
            <div class="contenedor-page-tabs pb-10px" :id="'mensajes_'+chat.id">
                <template v-for="m of chat.mensajes">
                <div class="row w-100 m-0 px-3" :key="m.id" v-if="m.usuarios_id!=session.id">
                    <div class="p-2 my-2 mr-auto mensaje-usuario">
                        <div class="row m-0 justify-content-rigth">
                            <div class="col p-0 letra-gray-dark2-4-4vw white-space-preline">{{m.mensaje}}</div>
                        </div>
                        <div class="row w-100 px-2 m-0 my-auto pb-1 justify-content-end letra-gray-2-8vw">{{$store.getters.getFechaHora(m.fecha)}}</div>
                    </div>
                </div>
                <div class="row w-100 m-0 px-3" :key="m.id" v-if="m.usuarios_id==session.id">
                    <div class="w-auto p-2 my-2 ml-auto mensaje-propio">
                        <div class="row m-0 justify-content-rigth mb-1">
                            <div class="p-0 pr-2 letra-blanco-4-4vw white-space-preline">{{m.mensaje}}</div>
                        </div>
                        <div class="row px-2 m-0 my-auto py-0 justify-content-end letra-gray00-13">{{$store.getters.getFechaHora(m.fecha)}}</div>
                    </div>
                </div>
                </template>
            </div>
            <div class="row w-100 m-0 py-2 pb-ios-5 back-color-blanco border-t-appve-1">
                <div class="row w-100 m-0 pb-3">
                    <div class="col-9 px-1">
                        <inputForm type="text" placeholder="" v-model="mensaje" :disabled="false" @enter="enviarMensaje()" />
                    </div>
                    <div class="col-3 my-auto pl-0 pr-1">
                        <botonApp tipo="rojo" @click="enviarMensaje()" texto="Send" radius="35px" />
                    </div>
                </div>
            </div>
            <!-- <div class="row w-100 m-0 back-color-blanco" v-chatk ></div> -->
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
                mensajes:[{user:1, mensaje: '1'}],
                mensaje:null,
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            chat(){return this.$store.getters.getChat || {};},
            // usuario_bloqueado(){return this.$store.getters.getUsuarioBloqueado(this.chat.usuario.id)},
            // bloqueo_usuario(){return this.$store.getters.getBloqueoUsuario(this.chat.usuario.id)},
        },
        created() {
            if(device.platform == 'iOS'){
                console.log("TECLADO PARA CHATS IOS");
                Keyboard.shrinkView(true);
                // console.log("VOY NAVEGAMTO TO IOS", this.router);
                // this.router.navigate('/mensajes_chat_ios',{reloadCurrent: true});
            }
        },
        destroyed() {
            if(device.platform == 'iOS'){
                console.log("DESACTIVO TECLADO PARA CHATS IOS");
                Keyboard.disableScrollingInShrinkView(false);
                Keyboard.shrinkView(false);
            }
        },
        updated(){
            if(!this.chat.id){
                if(this.esAfiliado){
                    this.router.back('/inicio_afiliado');
                    return;
                }
                this.router.back('/incio');
                return;
            }
            this.resfreshScroll();
        },
        mounted(){
            this.resfreshScroll();
        },
        methods:{
            goTo(ruta){
                this.$f7.views.principal.router.navigate(ruta);
            },
            enviarMensaje(){
                if(!this.mensaje) return;
                this.$store.dispatch('postSaveMsn',[this.mensaje]);
                this.mensaje = null;
            },
            scroll(){
                $('#mensajes_'+this.chat.id).scrollTop($('#mensajes_'+this.chat.id)[0].scrollHeight);
            },
            resfreshScroll(){
                setTimeout(this.scroll, 300);
            },
            modalBloquearUsuario(bloqueado){
                this.bloqueado = bloqueado;
                this.$store.commit('openModal', ['modal_mensaje']);
            },
            bloquearUsuario(){
                this.$store.dispatch('postBloquearUsuario',[this.chat.usuario.id]);
            },
            llamar(){
                this.$store.dispatch('openBrowser',`tel:${this.chat.usuario.telefono}`)
            },
            verPerfil(){
                this.$store.commit('openModal',['modalUsuario']);
            }
        }
    }
</script>