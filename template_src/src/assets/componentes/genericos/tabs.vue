<template>
<div class="row m-0 w-100 pt-8px pb-10px justify-content-space-between border-t-gray00-1" >
    <div class="row w-100 m-0 pb-3 pb-ios-20px">

        <div class="row w-100 m-0" v-if="user">

            <div class="col p-0 h-100" @click="goTo('/inicio')">
                <div class="row w-100 m-0 position-absolute left-0px top--6px z-10 justify-content-center">
                    <div class="w-60px h-60px mx-auto back-color-azul1 border-radius-50 " v-if="tabVisible=='inicio'"></div>
                </div>
                
                <div class="row w-100 m-0 position-relative z-200">
                    <div class="row w-100 m-0 justify-content-center">
                        <icono icono="home" :clase="(tabVisible=='inicio')?'letra-blanco-30':'letra-negro-30'" />
                    </div>
                    <div class="row w-100 m-0 justify-content-center " v-if="!onlyIcon">
                        <div :class="(tabVisible=='inicio')?'letra-blanco-2-6vw':'letra-gray3-2-6vw'" class="row w-100 m-0  m-0 text-center justify-content-center w-100"  >Inicio</div>
                    </div>
                </div>
            </div>

            <div class="col p-0 h-100" @click="goTo('/eventos')">
            <div class="row w-100 m-0 position-absolute left-0px top--6px z-10 justify-content-center">
                <div class="w-60px h-60px mx-auto back-color-azul1 border-radius-50 " v-if="tabVisible=='eventos'"></div>
            </div>
                <div class="row w-100 m-0 position-relative z-200">
                    <div class="row w-100 m-0 justify-content-center">
                        <icono icono="today" :clase="(tabVisible=='eventos')?'letra-blanco-30 pt-2px':'letra-negro-30 pt-2px'" />
                    </div>
                    <div class="row w-100 m-0 justify-content-center " v-if="!onlyIcon">
                        <div :class="(tabVisible=='eventos')?'letra-blanco-2-6vw':'letra-gray3-2-6vw'" class="row w-100 m-0 text-capitalize text-center justify-content-center w-100"  >eventos</div>
                    </div>
                </div>
            </div>

            <div class="col p-0 h-100" @click="goTo('/regalos')">
                <div class="row w-100 m-0 position-absolute left-0px top--6px z-10 justify-content-center">
                    <div class="w-60px h-60px mx-auto back-color-azul1 border-radius-50 " v-if="tabVisible=='regalos'"></div>
                </div>

                <div class="row w-100 m-0 position-relative z-200">
                    <div class="row w-100 m-0 justify-content-center">
                        <icono icono="redeem" :clase="(tabVisible=='regalos')?'letra-blanco-30':'letra-negro-30'" />
                    </div>
                    <div class="row w-100 m-0 justify-content-center " v-if="!onlyIcon">
                        <div :class="(tabVisible=='regalos')?'letra-blanco-2-6vw':'letra-gray3-2-6vw'" class="row w-100 m-0 text-capitalize text-center justify-content-center w-100"  >regalos</div>
                    </div>
                </div>
            </div>

            <div class="col p-0 h-100" @click="goTo('/carrito')">
                <div class="row w-100 m-0 position-absolute left-0px top--6px z-10 justify-content-center">
                    <div class="w-60px h-60px mx-auto back-color-azul1 border-radius-50 " v-if="tabVisible=='carrito'"></div>
                </div>

                <div class="row w-100 m-0 position-relative z-200">
                    <div class="row w-100 m-0 justify-content-center">
                        <icono icono="shopping_cart" :clase="(tabVisible=='carrito')?'letra-blanco-30':'letra-negro-30'" />
                    </div>
                    <div class="row w-100 m-0 justify-content-center " v-if="!onlyIcon">
                        <div :class="(tabVisible=='carrito')?'letra-blanco-2-6vw':'letra-gray3-2-6vw'" class="row w-100 m-0 text-capitalize text-center justify-content-center w-100"  >carrito</div>
                    </div>
                </div>
            </div>

            <div class="col p-0 h-100" @click="goTo('/mis_deseos')">
                <div class="row w-100 m-0 position-absolute left-0px top--6px z-10 justify-content-center">
                    <div class="w-60px h-60px mx-auto back-color-azul1 border-radius-50 " v-if="tabVisible=='mis_deseos'"></div>
                </div>
                
                <div class="row w-100 m-0 position-relative z-200">
                    <div class="row w-100 m-0 justify-content-center">
                        <icono icono="playlist_play" :clase="(tabVisible=='mis_deseos')?'letra-blanco-30':'letra-negro-30'" />
                    </div>
                    <div class="row w-100 m-0 justify-content-center " v-if="!onlyIcon">
                        <div :class="(tabVisible=='mis_deseos')?'letra-blanco-2-6vw':'letra-gray3-2-6vw'" class="row w-100 m-0 text-capitalize text-center justify-content-center w-100" >Wishlist</div>
                    </div>
                </div>
            </div>
        </div>
    
        <div class="row w-100 m-0" v-if="chofer">
            <div class="col p-0" @click="goTo('/inicio_chofer')">
                <div class="row w-100 m-0 justify-content-center">
                    <div class="row w-100 m-0 justify-content-center">
                        <icono icono="notifications_none" clase="letra-negro-30" />
                    </div>
                </div>
                <div class="row w-100 m-0 pt-8px" v-if="!onlyIcon">
                    <p class="letra-verde3-2-6vw m-0 text-center w-100" v-if="tabVisible=='inicio'">Inicio</p>
                    <p class="letra-gray2-2-6vw m-0 text-center w-100" v-else>Inicio</p>
                </div>
            </div>

            <div class="col p-0 h-100" @click="goTo('/historial_chofer')">
                <div class="row w-100 m-0 justify-content-center">
                    <icono icono="event_note" clase="letra-negro-30" />
                </div>
                <div class="row m-0 pt-8px" v-if="!onlyIcon">
                    <p class="letra-verde3-2-6vw m-0 text-center w-100" v-if="tabVisible=='buscar'">Buscar</p>
                    <p class="letra-gray2-2-6vw m-0 text-center w-100" v-else>Buscar</p>
                </div>
            </div>

            <div class="col p-0 h-100" @click="goTo('/mi_cuenta')">
                <div class="row w-100 m-0 justify-content-center">
                    <icono icono="person_outline" clase="letra-negro-30" />
                </div>
                <div class="row m-0 pt-8px" v-if="!onlyIcon">
                    <p class="letra-verde3-2-6vw m-0 text-center w-100" v-if="tabVisible=='mi_cuenta'">Mi cuenta</p>
                    <p class="letra-gray2-2-6vw m-0 text-center w-100" v-else>Mi cuenta</p>
                </div>
            </div>
        </div>

    </div>
</div>  
</template>
<script>
export default {
    data(){
        return {
            active: 'inicio',
            onlyIcon: false,
        }
    },
    props: [
    ],
    computed:{
        router(){return this.$store.getters.getRouter;},
        session(){return this.$store.getters.getSession;},
        user(){return this.$store.getters.user || !this.session.token;},
        chofer(){return this.$store.getters.chofer;},
        repa(){return this.$store.getters.repa;},

        rutaVisible(){
            switch(this.$store.getters.getRuta.url){
                case '/mensajes_chat': return false;
                default: return true;
            }
        },
        tabVisible(){
            switch(this.$store.getters.getRuta.url){
                case '/inicio': 
                case '/pedidos_chef': 
                case '/pedidos_repa': 
                    this.active = 'inicio';
                    break;
                case '/eventos': 
                    this.active = 'eventos';
                    break;
                case '/carrito': 
                    this.active = 'carrito';
                    break;
                case '/chats': 
                    this.active = 'chats';
                    break;
                case '/regalos': 
                    this.active = 'regalos';
                    break;
                case '/mis_deseos': 
                    this.active = 'mis_deseos';
                    break;
                case '/mi_cuenta': 
                    this.active = 'mi_cuenta';
                    break;
            }
            return this.active;
        }

    },
    created(){
        console.log("UISER", this.user);
    },
    methods:{
        goTo(ruta){
            if(ruta == '/chats' || ruta == '/mi_cuenta'){
                if(!this.session.token){
                    this.$store.commit('openModal',['modalSession']);
                    return;
                }
            }
            this.router.navigate(ruta, {reloadCurrent: true});
            this.$store.dispatch('synchronizeData');
        },
    },
    }
</script>