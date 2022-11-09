<template>
    <f7-page class="" id="inicio">

        <div class="vista">
            <nav-bar tipo="logo" :no_border="1" title="" :backs="false" :logo="false" :profile="true"  />

            <div class="row w-100 m-0 px-3 py-2 " v-if="1" >
                <busquedaInput v-model="b" holder="Buscar... " />
            </div>

            <div class="contenedor-page-tabs ">
                <template  >
                    <div class="row w-100 m-0 pb-2" v-if="top && top.length" >
                        <div class="row w-100 m-0">
                            <banners :fotos="top" />
                        </div>
                    </div>
                    <div class="row w-100 m-0" v-if="left && left.length">
                        <div class="col-6 px-1" v-for="a of left" >
                            <div class="row w-100 m-0 pb-3"  >
                                <div class="row w-100 m-0">
                                    <imagen :src="a.imagen" />
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                
                <template >
                    <div class="row w-100 m-0" v-if="categorias && categorias.length" >
                        <div class="row w-100 m-0">
                            <categorias @input="input" :value="cat" :fotos="categorias" />
                        </div>
                    </div>
                </template>

                <div class="row w-100 m-0 pt-2 pb-2"  >
                    <div class="row w-100 m-0 px-3 to-eventos_zonas" v-for=" (e,x) of instalciones" :key="e.id">
                        <div class="row w-100 m-0 py-2" >
                            <instalcionesComponent :row="1"  :data="e"  />
                        </div>

                        <template v-if="x==4">
                            <div class="row w-100 m-0 py-2" v-if="bottom && bottom.length">
                                <div class="col-6 px-1" v-for="a of bottom" >
                                    <div class="row w-100 m-0 pb-3"  >
                                        <div class="row w-100 m-0">
                                            <imagen :src="a.imagen" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>

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
            categorias(){return this.$store.getters.info('categorias') },

            banners(){return this.$store.getters.info('banners') },
            top(){return this.banners.filter(s=>    s.device == '1' && s.section == '0')},
            left(){return this.banners.filter(s=>   s.section == '1')},
            bottom(){return this.banners.filter(s=>   s.section == '2' )},

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