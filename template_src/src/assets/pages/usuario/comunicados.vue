<template>
    <f7-page class="" id="inicio">
        <div class="vista">
            <nav-bar tipo="inicio" title="Comunicados" :fix="1" :backs="true"   />

           

            <div class="contenedor-page-tabs back-color-negro">

                <div class="row w-100 m-0 pt-2 pb-2"  >
                    <div class="row w-100 m-0 px-3" v-for=" info of comunicados" :key="info.id">
                        <div  class="row w-100 m-0 my-2 border-gray0-1 border-radius-10px overflow-hidden "  @click="comentar(info)" >
                            <div class="row w-100 m-0 justify-content-center" :class="info.type == 's'?'app-degra ':''" >
                                <div class="row w-100 m-0 py-5px px-2 " >
                                    <div class="w-20vw h-20vw my-auto mt-2">
                                        <imagen clase="border-radius-10px" :src="info.imagen"  />
                                    </div>
                                    <div class="col px-0 pl-3 my-auto " >
                                        <div class="row w-100 m-0 letra-blanco-17 fw-600 " >{{info.titulo}}</div>
                                        <div class="row w-100 m-0  ">
                                            <div class="col-auto px-0 letra-blanco-16 ">{{[info.creado, 'YYYY-MM-DD HH:mm:ss'] |  moment('from') }}</div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>



            <tabs />
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
                // notShow:[],
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},

            comunicados(){return this.$store.getters.info('comunicados') },
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

            comentar(x){
                this.$store.commit('setStData', ['comunicado', x.id ] );
                this.router.navigate('/comunicado_detalle');
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