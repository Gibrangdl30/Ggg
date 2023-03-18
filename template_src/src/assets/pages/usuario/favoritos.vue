<template>
    <f7-page class="" id="inicio">
   
        <div class="vista">
            <nav-bar tipo="inicio" title="Favoritos" :fix="1" :backs="true"   />

            <div v-if="0" class="row w-100 m-0 px-3 py-2 ">
                <busquedaInput v-model="b" holder="Buscar..." />
            </div>

            <div class="contenedor-page-tabs back-color-blanco">

                <div class="row w-100 m-0" v-if="!instalciones || !instalciones.length">
                    <div class="row w-100 m-0 px-4 py-4 letra-gray3-18 justify-content-center text-center">Aquí aparecerán tus productos y servicios marcados con corazón.</div>
                </div>

                <div class="row w-100 m-0 pt-2 pb-2"  >
                    <div class="row w-100 m-0 px-3 to-eventos_zonas" v-for=" (e) of instalciones" :key="e.id">
                        <div class="row w-100 m-0 py-2" >
                            <instalcionesComponent :row="1"  :data="e"  />
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
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},

            cat(){return this.$store.getters.catalogoGetObject('cat') || null;},
            cat(){return null;},
            categorias(){return this.$store.getters.info('categorias') },
            favs(){return this.$store.getters.info('favoritos') },

            banners(){return this.$store.getters.info('banners') },

            byCats(){
                console.log("CATS", this.cat);

                if(this.cat){
                    return this.$store.getters.info('productos').filter(s=>this.favs.some(x=>x.producto_id == s.id)).filter(s=>s.categorias.some(c=>c.id == this.cat));
                }
                return this.$store.getters.info('productos').filter( s=>this.favs.some(x=>x.producto_id == s.id) );
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