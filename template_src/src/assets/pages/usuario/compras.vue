<template>
    <f7-page class="" id="inicio">

        <div class="vista">
            <nav-bar tipo="logo" :no_border="1" title="Tienda" :backs="false" :logo="false" :profile="true"  />

            <div class="row w-100 m-0 px-3 py-2 " v-if="1" >
                <busquedaInput v-model="b" holder="Buscar... " />
            </div>

            <div class="row w-100 m-0">
                <div class="row w-100 m-0 pl-3 ">
                    <categorias v-model="cat" />
                </div>
            </div>

            <div class="contenedor-page-tabs ">
                <template v-if="0" >
                    <div class="row w-100 m-0" v-if="banners && banners.length" >
                        <div class="row w-100 m-0">
                            <banners :fotos="banners" />
                        </div>
                    </div>
                </template>

                <div class="row w-100 m-0 pt-2 pb-2"  >
                    <div class="row w-100 m-0 px-3" v-for=" (e) of byCat" :key="e.id">
                        <div class="row w-100 m-0 py-2" >
                            <productoComponent :data="e"  />
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
                ins: 0,
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

            banners(){return this.$store.getters.info('banners') },
            prodx(){
                return this.$store.getters.info('productos') 
            },
            productos(){
                if(this.b){
                    return this.prodx.filter(s=>s.nombre.toLowerCase().includes(this.b.toLowerCase()) || s.descripcion.toLowerCase().includes(this.b.toLowerCase()))
                }
                return this.prodx
            },
            byCat(){
                if(this.cat){
                    return this.productos.filter(s=>s.categorias_id == this.cat)
                }
                return this.productos;
            }
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