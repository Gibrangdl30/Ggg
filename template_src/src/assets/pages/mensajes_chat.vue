<template>
    <f7-page>
        <!-- <modalUsuario :usuario="chat.usuario" /> -->
        <div class="vista" v-vistak v-chatss >
            <nav-bar tipo="chat" v-if="chat.tipo == 'solo'" :backs="true"  :title="chat.usuario.nombre" :usuario="chat.usuario" @call="llamar()" @perfil="verPerfil()" :show="chat.usuario.tipo == 'usuario'" />
            <nav-bar tipo="chat" v-else :backs="true"  :title="chat.nombre"  />

            <div class="contenedor-page-tabs pb-10px" :id="'mensajes_'+chat.id">
                <template v-for="m of chat.mensajes">
                    <mensajeComponent :key="m.id" :data="m" :info="chat" />
                </template>
            </div>

            <div class="row w-100 m-0 py-2 pb-ios-5 back-color-blanco border-t-gray0-1 ">
                <div class="row w-100 m-0 pb-3 pt-3 position-relative">
                    <div class="w-12vw h-12vw position-absolute top--40px left-42 z-index-10000">
                        <uploadImagen :custom="true" @save="saveImagen" />
                    </div>
                    <div class="col-9 px-1">
                        <inputForm type="text" placeholder="" input="form" v-model="mensaje" :fixed="true" @enter="enviarMensaje()" />
                    </div>
                    <div class="col-3 my-auto pl-0 pr-1">
                        <botonApp tipo="azul" @click="enviarMensaje()" texto="Send" radius="35px" />
                    </div>
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
            if(this.$store.getters.deviceReady){
                if(device.platform == 'iOS'){
                    console.log("TECLADO PARA CHATS IOS");
                    Keyboard.shrinkView(true);
                }
            }
        },

        destroyed() {
            if(this.$store.getters.deviceReady){
                if(device.platform == 'iOS'){
                    console.log("DESACTIVO TECLADO PARA CHATS IOS");
                    Keyboard.disableScrollingInShrinkView(false);
                    Keyboard.shrinkView(false);
                }
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
            console.log("CHAT", this.chat);
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
            saveImagen(id){
                this.$store.dispatch('postSaveMsn',[id,'1']);
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