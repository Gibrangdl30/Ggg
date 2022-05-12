<template>
    <f7-page class="" id="inicio">
        <modalMensajeStatic
            v-if="modal"
            :texto="`calificar`"
            :oneButton="1"
            :boton="'Enviar'"
            @click="cal"
            @close="modal = 0"
        />
    
        <div class="vista">
            <nav-bar tipo="inicio" title="Fotos para mi" :backs="true" :fix="1" />

            <div class="contenedor-page-tabs back-color-blanco">

                <div class="row w-100 m-0">
                    <div class="row w-100 m-0" v-for=" f of posts" :key="f.id">
                        <div class="row w-100 m-0 px-3 py-2 border-b-gray1-1">
                            <amigosRow :data="f.usuario" :desc="1" :cal="1" @cal="modal = 1" :numero="f.fotos.length" @click="set" />
                        </div>
                        <!-- <postCard :data="f" v-model="notShow" /> -->
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
                b: null,
                modal: 0,
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

            posts(){return this.$store.getters.postStateArray('mispaparatz')},
            fil(){return this.posts.filter(s => s.para_id == this.session.id)},
        },

        mounted(){
            this.$store.dispatch('initData', [this.$f7]);
            console.log("POST POST", this.posts, );
        },

        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },

            cal(s){
                if(!s.cal){
                    swal("","Ingresa una calificación","");
                    return;
                }
                swal("","Calificación enviada","success");
                return;
            },

            set(x){
                console.log("SETTING id ", x);
                this.$store.commit('setPostState',['paparatz', x.id]);
                this.router.navigate('/fotos_de_paparatz');
            },

        }
    }
</script>