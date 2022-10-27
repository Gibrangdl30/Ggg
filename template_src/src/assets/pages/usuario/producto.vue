<template>
    <div class="page " id="inicio">
    <div class="page-content position-relative">

        <div class="vista h-100" v-vistak>
            <div class="row w-100 m-0  " v-if="false">
                <div class="row w-100 m-0  position-relative">
                    <div class="w-auto position-absolute left-10px top-37px" @click="router.back()">
                        <div class="row w-100 m-0">
                            <i class="f7-icons color-white letra-rojo2-30" >chevron_left</i>
                        </div>
                    </div>
                    <imagen clase="h-max-50vh" :fit="true" :src="platillo.imagen" />
                </div>
            </div>

            <div class="contenedor-page-tabs  pb-0 scroll-y ">
                <div class="row w-100 m-0">
                    <productoComponent :full="true" :data="platillo" @set="set"/>
                </div>
            </div>
            <div class="row w-100 m-0 back-color-rojo1" v-if="1" @click="add()">
                <div class="row w-100 m-0 pt-3 pb-4 px-3">
                    <div class="row w-100 m-0 px-3">
                        <div class="col my-auto px-0 letra-blanco-22 fw-600 " >Ordenar</div>
                        <div class="col-auto my-auto px-0 letra-blanco-25 fw-800 ">{{total | currency}}</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    </div>
</template>
<script>
import { f7Page } from 'framework7-vue';
const moment = require('moment')
    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                total: 0,
                form: {},
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            restaurante(){return this.$store.getters.restaurantesFind('restaurantes','restaurante') || {};},
            platillo(){return this.$store.getters.restaurantesFind('productos','platillo') || {}},
        },

        mounted(){
            console.log("MOANADO", this.platillo, );
        },

        methods:{
            set(platillo){
                this.total = platillo.total;
                this.form = platillo;
            },
            add(){
                if(!this.session.token){
                    this.$store.commit('openModal',['modalSession']);
                    return;
                }
                console.log("ADDD", this.form);
                if(this.total){
                    this.form.distancia = 0;
                    this.form.distancia = this.restaurante.distancia;
                    this.$store.commit('addProductoCarrito',{prod: this.form, callback: ()=>{
                        this.$store.commit('openMsn',['¡Gracias! Los Producto(s) han sido agregados a tu carrito','Pagar y recibir',false,false]);
                        this.router.back('/consumos');
                    }});
                }
            }
        }
    }
</script>