<template>
    <f7-page class="" id="inicio">

        <div class="vista">
            <nav-bar tipo="inicio" title="NEW CHAT" :fix="1" :backs="true"   />

             <div class="row w-100 m-0" v-if="false" >
                <div class="row w-100 m-0">
                    <div class="col px-0" @click="t=1">
                        <div class="row w-100 m-0 border-azul1-1 justify-content-center text-center py-2"
                            :class="t==1?'back-color-azul1 letra-blanco-18':'letra-azul1-18'">Namee users</div>
                    </div>
                    <div class="col px-0" @click="t=2">
                        <div class="row w-100 m-0 border-azul1-1 justify-content-center text-center py-2"
                            :class="t==2?'back-color-azul1 letra-blanco-18':'letra-azul1-18'">PhoneBook</div>
                    </div>
                </div>
            </div>

            <div class="row w-100 m-0 border-b-gray0-2 ">
                <div class="row w-100 m-0 px-3 py-3">
                    <busquedaInput v-model="b" />
                </div>
            </div>

            <div class="contenedor-page-tabs back-color-blanco">

                <!-- <div class="row w-100 m-0 pt-2 px-4" v-show="t==1">
                    <div class="col-auto px-0" v-for="a of filtrado" :key="a.id">
                        <amigosRow :card="true"  :data="a" @click="init" />
                    </div>
                    <div class="col-auto px-0"  >
                        <div class="w-25vw py-1"></div>
                    </div>
                    <div class="col-auto px-0" >
                        <div class="w-25vw py-1"></div>
                    </div>
                </div> -->

                <div class="row w-100 m-0 pt-2 px-4" v-show="t==1">
                    <div class="row w-100 m-0" v-for="a of filtrado" :key="a.id">
                        <amigosRow :card="0"  :data="a" @click="init" />
                    </div>
                </div>
                
                <template v-if="b" >
                        
                    <!-- <div class="row w-100 m-0" v-if="!b">
                        <div class="row w-100 m-0 pt-3">
                            <div class="col-4 px-0 mx-auto">
                                <imagen :icono="true" src="sercon" />
                            </div>
                        </div>
                        <div class="row w-100 m-0 pt-3">
                            <div class="row w-100 m-0 letra-gray3-18 justify-content-center text-center ">Search for your contacts above.</div>
                        </div>
                    </div> -->

                    <div class="row w-100 m-0 pt-2 px-4 justify-content-space-evenly "  >
                        <div class="col-auto px-0" v-for="(a, x) of reducir" :key="x" >
                            <contactosRow :card="true" :data="a" @click="send" />
                        </div>
                        <div class="col-auto px-0"  >
                            <div class="w-25vw py-1"></div>
                        </div>
                        <div class="col-auto px-0" >
                            <div class="w-25vw py-1"></div>
                        </div>
                    </div>
                </template>


            </div>

            <div class="row w-100 m-0 border-t-gray0-1" v-show="t==1">
                <div class="row w-100 m-0 py-3 px-3">
                    <div class="col-7 mx-auto px-0" @click="go('/crear_grupo_chat')">
                        <botonApp texto="Create group" tipo="azul" radius="30px" />
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
                t:1,
                b: null,
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            amigos(){return this.$store.getters.userStateArray('amigos');},
            filtrado(){
                if(this.b){
                    return this.amigos.filter(x => { return x.nombre.toLowerCase().includes(this.b.toLowerCase()) || x.telefono.toLowerCase().includes(this.b.toLowerCase()) } )
                }
                return this.amigos;
            },
            contactos(){ return this.$store.getters.getCatalogo('contactos') },
            filtro(){
                if(this.b){
                    return this.contactos.filter(x => { return x.nombre.toLowerCase().includes(this.b.toLowerCase()) || x.telefono.toLowerCase().includes(this.b.toLowerCase()) } )
                }
                return [];
            },
            reducir(){
                return this.filtro.filter((x,i)=>{ return i < 15 });
            },
        },

        beforeCreate() {
            // this.$store.commit('initContactosAgenda');
        },

        mounted(){
            this.$store.dispatch('initData', [this.$f7]);
            // console.log("···············", this.zona);
        },

        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },

            init(u){
                console.log("INIT CHATD");
                this.$store.commit('goToChat',[u.id]);
            },

            send(s){
                if(!s.telefono){
                    swal("el numero de teléfono no es correcto");
                    return;
                }
                let texto = `Hello, I invite you to download the app Namee in https://namee.club`;
                texto = texto.replace(/ /g,'%20');
                // console.log("========>", texto);
                // let url = `https://api.whatsapp.com/send?phone=${s.telefono}&text=${texto}`;
                let url = `https://wa.me/${s.telefono}?text=${texto}`;
                try{
                    cordova.InAppBrowser.open(url, '_system');
                }catch(e){};
            },

        }
    }
</script>