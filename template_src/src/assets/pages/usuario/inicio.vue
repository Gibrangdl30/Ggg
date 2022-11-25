<template>
    <f7-page class="" id="inicio">

        <div class="vista">
            <nav-bar tipo="logo" clase="back-color-negro" :no_border="1" title="" :backs="false" :logo="false" :profile="true"  />

            <div class="row w-100 m-0 px-3 py-2 back-color-negro" v-if="1" >
                <busquedaBlack :close="1" v-model="b" holder="Buscar... " />
            </div>

            <div class="contenedor-page-tabs ">
                <template v-if="!b" >
                    <div class="row w-100 m-0 pb-2" v-if="top && top.length" >
                        <div class="row w-100 m-0">
                            <banners :fotos="top" />
                        </div>
                    </div>
                    {{top.length}}
                </template>
                
                <template v-if="!b" >
                    <div class="row w-100 m-0 py-2" v-if="categorias && categorias.length" >
                        <div class="row w-100 m-0">
                            <categoriasSubs @input="input" :value="cat" :fotos="categorias" />
                        </div>
                    </div>
                </template>

                

                <div class="row w-100 m-0 pt-2 pb-2"  >

                    <template v-if="!cat && !sub && !b">
                        <div class="row w-100 m-0 px-3">
                            <div class="row w-100 m-0 letra-negro-19 fw-600">Productos populares </div>
                            <div class="row w-100 m-0 px-3 to-eventos_zonas" v-for=" (e,x) of imp" :key="e.id">
                                <div class="row w-100 m-0 py-2" >
                                    <instalcionesComponent :row="1"  :data="e"  />
                                </div>
                            </div>
                        </div> 


                        <div class="row w-100 m-0" v-if="left && left.length">
                            <div class="col-12 px-0" v-for="a of left" @click="ver(a)" >
                                <div class="row w-100 m-0 pb-3"  >
                                    <div class="row w-100 m-0">
                                        <imagen :id="a.id" :src="a.imagen" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="row w-100 m-0 px-3 pt-4">
                            <div class="row w-100 m-0 letra-negro-19 fw-600">No te puedes perder </div>
                            <div class="row w-100 m-0 px-3 to-eventos_zonas" v-for=" (e,x) of pop" :key="e.id">
                                <div class="row w-100 m-0 py-2" >
                                    <instalcionesComponent :row="1"  :data="e"  />
                                </div>
                            </div>
                        </div>

                        <template>
                            <div class="row w-100 m-0 py-2" v-if="bottom && bottom.length">
                                <div class="col-12 px-0" v-for="a of bottom" @click="ver(a)" >
                                    <div class="row w-100 m-0 pb-3"  >
                                        <div class="row w-100 m-0">
                                            <imagen :src="a.imagen" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        
                    </template>


                    <!-- <div class="row w-100 m-0 px-3 letra-negro-19 fw-600">No te puedes perder </div> -->
                    <template v-if="cat || sub || b" >
                        <div class="row w-100 m-0 px-3 pt-4 to-eventos_zonas" v-for=" (e,x) of instalciones" :key="e.id">
                            <div class="row w-100 m-0 py-2" >
                                <instalcionesComponent :row="1"  :data="e"  />
                            </div>

                            <template v-if="x==4 && 0">
                                <div class="row w-100 m-0 py-2" v-if="bottom && bottom.length">
                                    <div class="col-12 px-0" v-for="a of bottom" >
                                        <div class="row w-100 m-0 pb-3"  >
                                            <div class="row w-100 m-0">
                                                <imagen :src="a.imagen" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>

                        </div>
                    </template>

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
            cat(){return null;},
            sub(){return this.$store.getters.catalogoGetObject('sub') || null;},
            sub(){return null;},

            categorias(){return this.$store.getters.info('categorias') },

            banners(){return this.$store.getters.info('banners') },
            top(){return this.banners.filter(s=>  s.device == '0' && s.section == '0')},
            left(){return this.banners.filter(s=> s.section == '1')},
            bottom(){return this.banners.filter(s=> s.device == '0' && s.section == '2' )},

            imp(){return this.$store.getters.info('productos').filter(w=>w.outstanding == '1')},
            pop(){return this.$store.getters.info('productos').filter(w=>w.outstandingtwo == '1')},

            prods(){return this.$store.getters.info('productos').filter(w=>w.outstanding == '0' && w.outstandingtwo == '0')},

            byCats(){
                console.log("CATS", this.cat);
                if(this.b){
                    return this.prods;
                }
                if(this.sub){
                    return this.prods.filter(s=>s.subcat.some(c=>c.id == this.sub));
                }
                if(this.cat){
                    return this.prods.filter(s=>s.categorias.some(c=>c.id == this.cat));
                }
                return this.prods;
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
            setTimeout(()=>{
                this.$store.commit('closeModal',['loader', 1]);
            },1000*3);
        },

        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },

            input([id, x]){
                this.$store.commit('updateCatalogosState',['cat', id]);
                this.$store.commit('updateCatalogosState',['sub', x]);
            },

            back(ruta){
                this.router.back(ruta);
            },

            ver(a){
                if(a.url){
                    let x = a.url.split('-');
                    console.log("x",x);
                    x = x[x.length - 1];
                    console.log("x2",x);
                    if(x){
                        if(a.url.includes('categoria')){
                            this.$store.commit('updateCatalogosState',['cat', x]);
                            this.$store.commit('updateCatalogosState',['sub', null]);
                            this.router.navigate('/subcategoria_productos');
                        }
                        if(a.url.includes('producto')){
                            this.$store.commit('setCarritosState',['prod',{ id: x}]);
                            this.router.navigate('/producto');
                        }
                    }
                }
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