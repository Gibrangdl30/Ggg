<template>
    <f7-page class="" id="inicio">
    
        <div class="vista">
            <nav-bar tipo="inicio" title="Fotos tomadas" :backs="true" :fix="1" />

            <div class="contenedor-page-tabs back-color-blanco">

                <div class="row w-100 m-0">
                    <div class="row w-100 m-0" v-for=" f of posts" :key="f.id">
                        <postCard :select="1" @check="set" :check="seleccion.some(i=>{return i.id == f.id})" :data="f" v-model="notShow" />
                    </div>
                </div>

            </div>

            <div class="row w-100 m-0 back-color-blanco border-t-gray0-1 pb-3 " v-if="seleccion && seleccion.length" >
                <div class="row w-100 m-0 py-3">
                    <div class="col-11 px-0 mx-auto">
                        <botonApp @click="borr()" tipo="verde" texto="Eliminar imagenes" radius="20px" />
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
                modal: null,
                c: 15,
                add: 5,
                zona: moment.tz.guess(),
                notShow:[],
                seleccion: [],
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            init(){return this.$store.getters.userStateObject('init');},

            posts(){return (this.$store.getters.postStateFindKey('misclientes','paparatz','para_id') || {} ).fotos || []},

            // posts(){return this.$store.getters.postStateArray('misposts')},
            // fil(){return this.posts.filter(s => s.usuarios_id == this.session.id && s.type == 'f' && s.para_id != null )},

        },

        mounted(){
            this.$store.dispatch('initData', [this.$f7]);
            console.log("POST POST", this.$store.getters.postStateFindKey('misclientes','paparatz','para_id') );
        },

        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },

            set(u){
                let index = this.seleccion.findIndex(i=>{return i.id == u.id});
                if(index == -1){
                    this.seleccion.push(u);
                }
                else{
                    this.seleccion = this.seleccion.filter(x=>x.id != u.id);
                }
            },

            borr(){
                this.$store.dispatch('userPostBorrarVariosPost',[ this.seleccion ]);
            },

        }
    }
</script>