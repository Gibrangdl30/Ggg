<template>
    <f7-page class="back-color-rojo">
        <div class="vista h-100 back-color-rojo">
            <div class="contenedor-page back-color-rojo pb-10vh">

                <div class="row w-100 m-0 pt-4 pb-4">
                    <div class="row w-100 m-0 pt-3 pb-3">
                        <div class="col-5 mx-auto px-3">
                            <imagen :logo="3" />
                        </div>
                    </div>
                </div>

                <div class="row m-0 justify-content-center">
                    <template v-if="session.token">
                        <div class="row w-100 m-0 p-0 py-2 border-t-blanco-1 border-b-blanco-1" @click="main('/inicio')" >
                            <div class="row m-0 w-100 py-2 letra-blanco-20 fw-600 justify-content-center text-center">Patients</div>
                        </div>

                        <div class="row w-100 m-0 p-0 py-2 border-b-blanco-1" @click="goTo('/pacientes_desactivados')" >
                            <div class="row m-0 w-100 py-2 letra-blanco-20 fw-600 justify-content-center text-center">Discharged patients</div>
                        </div>

                        <div class="row w-100 m-0 p-0 py-2 border-b-blanco-1" @click="goTo('/chats')" >
                            <div class="row m-0 w-100 py-2 letra-blanco-20 fw-600 justify-content-center text-center">Chats</div>
                        </div>

                        <div class="row w-100 m-0 p-0 py-2 border-b-blanco-1" @click="goTo('/acercade')" >
                            <div class="row m-0 w-100 py-2 letra-blanco-20 fw-600 justify-content-center text-center">About us</div>
                        </div>

                        <div class="row w-100 m-0 p-0 py-2 border-b-blanco-1" @click="goTo('/mi_cuenta')" >
                            <div class="row m-0 w-100 py-2 letra-blanco-20 fw-600 justify-content-center text-center">My profile</div>
                        </div>
                       
                    </template>

                    <div class="row w-100 m-0 p-0 py-2 border-b-blanco-1">
                        <div class="row m-0 w-100 py-2 letra-blanco-20 justify-content-center text-center font-italics" @click="logout()">Logout</div>
                    </div>
                    <div class="row w-100 m-0 mt-3 py-3">
                        <div class="row w-100 m-0 letra-blanco-18 justify-content-center py-2">Jocose V.{{vr}}</div>
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