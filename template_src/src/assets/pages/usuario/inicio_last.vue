<template>
    <f7-page class="" id="inicio">
    <modalSerFotografo 
        :data="activo"
        :cancelado="1"
        :state="modal"
        @close="modal=false"
     />
        <div class="vista">
            <nav-bar tipo="logo" :no_border="1" title="Inicio" :backs="false" :logo="false" :profile="true"  />

            <div class="row w-100 m-0"  v-if="activo && activo.id" @click="modal=1">
                <div v-if="activo.papara && activo.papara.length" class="row w-100 m-0 letra-blanco-18 app-degra justify-content-center text-center py-3">Tienes {{activo.papara.length}} Paparatz tomandote fotos ¡Sonrie!</div>
                <!-- <div v-if="papa && papa.id" class="row w-100 m-0 letra-blanco-20 app-degra justify-content-center text-center py-3">{{papa.nombre}} es tu nuevo paparatz</div> -->
                <div v-else class="row w-100 m-0 letra-blanco-18 back-color-verde justify-content-center text-center py-3">
                    <div class="col-auto px-0 my-auto ">En espera de paparatz</div>
                    <div class="col-auto px-0 my-auto pl-2 ">
                        <div class="w-40px">
                            <imagen :icono="1" src="spinb" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="row w-100 m-0" v-else-if="asignado && asignado.id" >
                <uploadImagen :row="1" :texto="`¡Eres paparatz de ${user.nombre}, toma fotos!`" />
                <!-- <div class="row w-100 m-0 letra-blanco-20 app-degra justify-content-center text-center py-3">¡Eres paparatz de ${{user.nombre}}, toma fotos!</div> -->
            </div>
            <div class="row w-100 m-0" @click="router.navigate('/solicitud_fotografo')" v-else >
                <div class="row w-100 m-0 letra-blanco-18 back-color-negro justify-content-center text-center py-3">Solicita tus paparatz</div>
            </div>

            <div class="contenedor-page-tabs back-color-blanco">

                <div class="row w-100 m-0 border-b-gray0-2" v-if="0" >
                    <div class="row w-100 m-0 pl-2 pt-2">
                        <div class="row w-100 m-0">
                            <div class="col-auto px-0 " @click="go('/seleccionar_amigo_request')" v-if="false" >
                                <div class="w-13vw h-13vw mx-auto app-degra border-radius-50 ">
                                    <div class="row w-100 m-0 justify-content-center text-center pt-9px">
                                        <icono icono="add" clase="letra-blanco-35" />
                                    </div>
                                </div>
                                <div class="row w-100 m-0 justify-content-center text-center letra-gray2-14">Request</div>
                            </div>
                            <div class="row w-100 m-0 px-0 mr-auto" v-if="lastrequest && lastrequest.length">
                                <postRequestSlider   />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row w-100 m-0">
                    <div class="row w-100 m-0" v-for=" f of posts.filter(a => !notShow.includes(a.id) ).filter(w => !(w.usuarios_id == session.id && w.type == 's'))" :key="f.id">
                        <postCard :data="f" v-model="notShow" />
                    </div>
                </div>

            </div>

            <div class="w-16vw h-16vw position-absolute bottom-3 right-42 z-10000000000 " v-if="1" >
                <uploadImagen :custom="true" :post="true" />
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
                b: null,
                modal: null,
                c: 15,
                add: 5,
                zona: moment.tz.guess(),
                notShow:[],
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            init(){return this.$store.getters.userStateObject('init');},

            posts(){return this.$store.getters.postStateArray('posts')},
            activo(){return this.posts.find(x=>{return x.usuarios_id == this.session.id && x.type == 's'}) ||  {}},
            papa(){return this.activo.papa ||  {}},

            asignado(){return this.posts.find(x=>{return  x.type == 's' && x.papara.some(w=> w.usuarios_id == this.session.id ) }) ||  {}},
            user(){return this.asignado.usuario ||  {}},

            privados(){return this.$store.getters.postStateArray('privados')},
            lastrequest(){return this.$store.getters.userStateArray('lastrequest')},
        },

        mounted(){
            this.$store.dispatch('initData', [this.$f7]);
            console.log("POST POST", this.posts, );
        },

        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },

            reco(tipo = 1){
                this.$store.commit('setUsD',['tipo', tipo]);
                this.$store.commit('openModal',['modalHijosRecoleccion']);
            },

        }
    }
</script>