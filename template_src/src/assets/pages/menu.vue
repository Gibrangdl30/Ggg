<template>
    <f7-page class="back-color-blanco">
        <div class="vista h-100 back-color-blanco">
            <div class="contenedor-page back-color-blanco pb-10vh">

                <div class="row w-100 m-0 pt-4 pb-4">
                    <div class="row w-100 m-0 pt-3 pb-3">
                        <div class="h-29vw w-29vw mx-auto">
                            <imagen clase="border-radius-50 overflow-hidden" :fit="true" :perfil="true" alt="" />
                        </div>
                    </div>
                </div>

                <div class="row m-0 justify-content-center">
                    <template v-if="!session.token">
                        <div class="row w-100 m-0 px-3 py-2" @click="tologin()" >
                            <div class="col-auto px-0 my-auto">
                                <icono icono="person_outline" clase="letra-gray3-30" />
                            </div>
                            <div class="col px-0 mb-auto pl-3">
                                <div class="row m-0 w-100 letra-gray3-20 fw-600">Iniciar sesión</div>
                            </div>
                        </div>
                    </template>
                    <template v-if="session.token">
                        <div class="row w-100 m-0 px-3 py-2" @click="goTo('/mi_cuenta')" >
                            <div class="col-auto px-0 my-auto">
                                <icono icono="person_outline" clase="letra-gray3-30" />
                            </div>
                            <div class="col px-0 mb-auto pl-3">
                                <div class="row m-0 w-100 letra-gray3-20 fw-600">Mi cuenta</div>
                            </div>
                        </div>

                        <div class="row w-100 m-0 px-3 py-2" @click="goTo('/metodos_pago')" >
                            <div class="col-auto px-0 my-auto">
                                <icono icono="credit_card" clase="letra-gray3-30" />
                            </div>
                            <div class="col px-0 mb-auto pl-3">
                                <div class="row m-0 w-100 letra-gray3-20 fw-600">Mis métodos de pago</div>
                            </div>
                        </div>
                        
                        <div class="row w-100 m-0 px-3 py-2" @click="goTo('/mis_boletos')" >
                            <div class="col-auto px-0 my-auto">
                                <icono icono="event" clase="letra-gray3-30" />
                            </div>
                            <div class="col px-0 mb-auto pl-3">
                                <div class="row m-0 w-100 letra-gray3-20 fw-600">Mis reservaciones</div>
                            </div>
                        </div> 
                        
                        <div class="row w-100 m-0 px-3 py-2" @click="goTo('/mis_compras')" >
                            <div class="col-auto px-0 my-auto">
                                <icono icono="shopping_bag" clase="letra-gray3-30" />
                            </div>
                            <div class="col px-0 mb-auto pl-3">
                                <div class="row m-0 w-100 letra-gray3-20 fw-600">Mis compras</div>
                            </div>
                        </div>

                        <div class="row w-100 m-0 px-3 py-2" @click="goTo('/terminos_condiciones')" >
                            <div class="col-auto px-0 my-auto">
                                <icono icono="library_books" clase="letra-gray3-30" />
                            </div>
                            <div class="col px-0 mb-auto pl-3">
                                <div class="row m-0 w-100 letra-gray3-20 fw-600">Terminos y condiciones</div>
                            </div>
                        </div>

                        <div class="row w-100 m-0 border-b-gray1-1 "></div>

                        <div class="row w-100 m-0 pt-2 px-3 py-2" @click="logout()" >
                            <div class="col-auto px-0 my-auto">
                                <div class="w-30px">
                                    <imagen icono="1" src="logou" />
                                </div>
                            </div>
                            <div class="col px-0 mb-auto pl-3">
                                <div class="row m-0 w-100 letra-rojo-20 fw-600">Cerrar session</div>
                            </div>
                        </div>

                    </template>

                    <!-- <div class="row w-100 m-0 p-0 py-2 border-b-negro-1">
                        <div class="row m-0 w-100 py-2 letra-negro-20 justify-content-center text-center font-italics" @click="logout()">Logout</div>
                    </div>
                    <div class="row w-100 m-0 mt-3 py-3">
                        <div class="row w-100 m-0 letra-negro-18 justify-content-center py-2">Jocose V.{{vr}}</div>
                    </div> -->
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
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            vr(){return this.$store.getters.vr;},
            session(){return this.$store.getters.getSession;},
            saldo(){return this.$store.getters.enviosObject('saldo');},
        },
        methods:{
            close(){
                console.log("CLOSING");
                this.$f7.panel.close('right', true);
                // this.$store.commit('openMenuRight');
            },

            tologin(){
                this.close();
                this.$store.commit('changeView','login');
            },

            main(ruta){
                this.router.back(ruta,{force:true});
                this.close();
            },
            goTo(ruta){
                this.router.navigate(ruta);
                this.close();
            },
            logout(){
                this.close();
                this.$store.commit('logout');
            }
        }
    }
</script>