<template>
    <f7-page class="" id="inicio">

        <div class="vista">
            <nav-bar tipo="logo" :no_border="1" title="" :backs="1" :logo="false" :profile="true"  />

            <div class="row w-100 m-0 px-3 py-2 " v-if="0" >
                <busquedaInput :close="1" v-model="b" holder="Buscar... " />
            </div>

                <div class="contenedor-page-tabs ">

                    <div class="row w-100 m-0 pt-4">
                        <div class="row w-100 m-0 pt-3">
                            <div class="w-40vw h-40vw mx-auto carta border-radius-50 overflow-hidden ">
                                <imagen :contain="0" :src="cats.imagen" />
                            </div>
                        </div>
                        <div class="row w-100 m-0 py-3 letra-negro-18 fw-800 justify-content-center text-center">{{cats.name}}</div>
                    </div>
             
                <div class="row w-100 m-0 pt-2"  >
                    <div class="row w-100 m-0 to-eventos_zonas" >

                        <div class="row w-100 m-0 py-2 justify-content-space-between " >
                            <div class="col px-0 py-2" @click="set2(e.id)" v-for=" (e,x) of subs" :key="e.id" >
                                <div class="row w-100 m-0 justify-content-center ">
                                    <div class="w-37vw h-37vw carta mx-1 border-radius-10px overflow-hidden">
                                        <imagen :src="e.imagen" />
                                    </div>
                                </div>
                                <div  class="row w-100 m-0 h-22px align-content-center">
                                    <div class="row w-100 m-0 letra-gray4-14 justify-content-center text-center">{{e.name}}</div>
                                </div>
                            </div>

                            <div class="col px-0 py-2"  >
                                <div class="row w-100 m-0 justify-content-center ">
                                    <div class="w-37vw h-37vw mx-1 border-radius-10px overflow-hidden">
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="row w-100 m-0 py-2"></div>
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
                ins: 0,
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

            cat(){return this.$store.getters.catalogoGetObject('cat') || null;},
            sub(){return this.$store.getters.catalogoGetObject('sub') || null;},
            categorias(){return this.$store.getters.info('categorias') },
            cats(){return this.categorias.find(w=>w.id == this.cat) || {}},
            subs(){return this.cats.subcat },

            prods(){return this.$store.getters.info('productos').filter(w=>0) },

            byCats(){
                console.log("CATS", this.cat);

                if(this.cat){
                    return this.$store.getters.info('productos').filter(s=>s.categorias.some(c=>c.id == this.cat));
                }
                return this.$store.getters.info('productos');
            },
            instalciones(){
                if(this.b){
                    return this.byCats.filter(w=>w.name.toLowerCase().includes( this.b.toLowerCase() )).filter((a,x)=>x < 50);;
                }
                return this.byCats.filter((a,x)=>x < 50);
            },
        },

        mounted(){
            this.$store.dispatch('initData', [this.$f7]);
        },

        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },

            set2(id){
                this.$store.commit('updateCatalogosState',['sub', id]);
                this.router.navigate('/subcategoria_productos');
            },

            input(id){
                this.$store.commit('updateCatalogosState',['cat', id]);
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