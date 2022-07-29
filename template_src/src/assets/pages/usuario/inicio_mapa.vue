<template>
    <f7-page class="" id="inicio">
    <modalSerFotografo 
        :data="activo"
        :cancelado="1"
        :state="modal"
        @close="modal=false"
    />

    <modalMensajeStatic
        texto="Para mejorar tu experiencia en Paparatz debes de activar tu geo localizacion para esta app."
        oneButton="Acept"
        boton="Aceptar"
        v-if="0"
        @close="$store.commit('setLogin', 0)"
    />

    <modalMensajeStatic
        :texto="`¿Deseas dejar de ser paparatz de ${user.nombre}?`"
        boton="Aceptar"
        v-if="modal2"
        @close="modal2=0"
        @click="cancelar"
    />
        <div class="vista">
            <nav-bar tipo="logo" :no_border="1" title="Inicio" :backs="false" :logo="false" :profile="true"  />

            <div class="row w-100 m-0 py-2">
                <div  class="row w-100 m-0 py-1 px-1 justify-content-center  ">
                    <div class="col-auto px-0 ">
                        <div @click="cat = null" class="row w-100 m-0 border-radius-10px px-2 border-negro-1 " :class="cat==null?'back-color-negro':''" >
                            <div class="col-auto px-0 pt-3px">
                                <icono :icono="cat==null?'radio_button_checked':'radio_button_unchecked'" :class="cat==null?'letra-blanco-30':'letra-negro-30'" />
                            </div>
                            <div class="col px-2 pt-5px" :class="cat==null?'letra-blanco-18':'letra-gray3-18'" >Todos</div>
                        </div>
                    </div>
                    <div class="col-auto px-0 pl-1 ">
                        <div @click="cat = 1" class="row w-100 m-0 border-radius-10px px-2 border-negro-1 " :class="cat==1?'back-color-negro':''" >
                            <div class="col-auto px-0 pt-3px">
                                <icono :icono="cat==1?'radio_button_checked':'radio_button_unchecked'" :class="cat==1?'letra-blanco-30':'letra-negro-30'" />
                            </div>
                            <div class="col px-2 pt-5px" :class="cat==1?'letra-blanco-18':'letra-gray3-18'" >Venta</div>
                        </div>
                    </div>
                    <div class="col-auto px-0 pl-1 ">
                        <div @click="cat = 2" class="row w-100 m-0 border-radius-10px px-2 border-negro-1 " :class="cat==2?'back-color-negro':''" >
                            <div class="col-auto px-0 pt-3px">
                                <icono :icono="cat==2?'radio_button_checked':'radio_button_unchecked'" :class="cat==2?'letra-blanco-30':'letra-negro-30'" />
                            </div>
                            <div class="col px-2 pt-5px" :class="cat==2?'letra-blanco-18':'letra-gray3-18'" >Renta</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="contenedor-page-tabs back-color-blanco pb-0 ">

                <div class="row w-100 m-0 h-100 ">
                    <mapa :tipo="cat" />
                </div>
                
            </div>

            <div class="row w-100 m-0 pt-3"  v-if="0">
                <div class="row w-100 m-0"  v-for=" f of bus" :key="f.id">
                    <postCard :data="f" v-model="notShow" />
                </div>
            </div>

            <div class="row w-100 m-0" >
                <div class="row w-100 m-0 position-relative" >
                    <div class="row w-100 m-0 pt-2" >
                        <scollX cantidad="auto">
                            <div class="swiper-slide w-auto text-center" v-for="c of bus" :key="c.id" >
                                <div class="w-auto py-1 border-radius-50px">
                                    <div class="w-auto" >
                                        <postCard :card="1" :data="c" v-model="notShow" />
                                    </div>
                                </div>
                            </div>
                        </scollX>
                    </div>
                    <div class="w-auto px-0 position-absolute top--35px right-10px">
                        <div class="w-30vw" @click="go('/inicio')" >
                            <botonApp texto="Ver lista" tipo="azul" radius="30px" />
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
const moment = require('moment');

    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                b: null,
                cat: null,

                modal: null,
                modal2: null,
                c: 15,
                add: 5,
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},

            init(){return this.$store.getters.userStateObject('init');},
            notShow(){return this.$store.getters.userStateObject('notShow');},

            posts(){return this.$store.getters.postStateArray('posts')},
            bus(){
                if(this.b){
                    console.log("B", this.b);
                    return this.posts.filter( s=>s.nombre.toLowerCase().includes( this.b.toLowerCase() ) || s.direccion.toLowerCase().includes( this.b.toLowerCase() ) || s.colonia.toLowerCase().includes( this.b.toLowerCase() ) );
                }
                return this.posts;
            },

            solicitudes(){return this.posts.filter(p=>p.type == 's')},
            cards(){return this.posts.filter(p=>p.type != 's')},


            data(){return this.$store.getters.postStateArray('posts') },
            activo(){return this.data.find(x=>{return x.usuarios_id == this.session.id && x.type == 's'}) ||  {}},
            papa(){return this.activo.papa ||  {}},

            asignado(){return this.data.find(x=>{return  x.type == 's' && x.papara.some(w=> w.usuarios_id == this.session.id ) }) ||  {}},
            user(){return this.asignado.usuario ||  {}},

            privados(){return this.$store.getters.postStateArray('privados')},
            lastrequest(){return this.$store.getters.userStateArray('lastrequest')},
        },

        mounted(){
            this.$store.dispatch('initData', [this.$f7]);
        },

        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },
            back(ruta){
                this.router.back(ruta);
            },

            cancelar(){
                let form = this.asignado;
                form.cancelar = 1;
                this.$store.dispatch('userPostCrearPost',[ form ]);
                form.cancelar = 0;
            },

            reco(tipo = 1){
                this.$store.commit('setUsD',['tipo', tipo]);
                this.$store.commit('openModal',['modalHijosRecoleccion']);
            },

        }
    }
</script>