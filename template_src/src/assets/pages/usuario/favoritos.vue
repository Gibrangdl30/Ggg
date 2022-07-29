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
            <nav-bar tipo="inicio" title="Favoritos" :fix="1" :backs="true"   />

            <div class="row w-100 m-0 px-3 py-2 ">
                <busquedaInput v-model="b" holder="Buscar inmueble" />
            </div>

            <div class="contenedor-page-tabs back-color-blanco">

                <div class="row w-100 m-0 pt-1 border-b-gray1-1 " v-if="0">
                    <div class="row w-100 m-0 px-3">
                        <div class="col-auto px-0 pb-1 letra-gray4-20 fw-600 mt-auto">Cerca de ti</div>
                        <div class="col-4 px-0 pb-1" @click="back('/inicio_mapa')" >
                            <botonApp texto="Ver Mapa" tipo="azul" radius="30px" />
                        </div>
                    </div>
                </div>

                <div class="row w-100 m-0 pt-2 pb-2"  >
                    <div class="row w-100 m-0" v-for=" f of bus" :key="f.id">
                        <postCard :data="f" v-model="notShow" />
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

            posts(){return this.$store.getters.postStateArray('posts').filter(p=>p.fav) },
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
            this.$store.commit('setLogin', 1);
            console.log("POST POST", this.posts, );
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