<template>
    <div class="page " id="inicio">
    <div class="page-content position-relative">

        <div class="vista h-100 position-relative" >
            <nav-bar tipo="logo" :no_border="1" title="" :backs="1" :logo="false" :profile="true"  />

            <div class="row w-100 m-0  " v-if="false" >
                <div class="row w-100 m-0  position-relative">
                    <div class="w-auto position-absolute left-10px top-37px" @click="router.back()">
                        <div class="row w-100 m-0">
                            <i class="f7-icons color-white letra-rojo2-30" >chevron_left</i>
                        </div>
                    </div>
                    <imagen clase="h-max-50vh" :fit="true" :src="platillo.imagen" />
                </div>
            </div>

            <template v-if="0">
                <div v-if="0" class="w-auto position-absolute left-10px top-45px z-1000000" @click="router.back()">
                    <div class="row w-100 m-0">
                        <i class="f7-icons color-white letra-rojo2-30" >chevron_left</i>
                    </div>
                </div>

                <div class="w-auto position-absolute right-30px top-10 z-1000000" @click="$store.dispatch('postAddFavorito',platillo)" v-if="1" >
                    <div class="row w-100 m-0" >
                        <icono icono="favorite" clase="letra-rojo2-35" v-if="$store.getters.stateDataFindFieldId('favoritos','producto_id', platillo.id)" />
                        <icono icono="favorite_border" clase="letra-rojo2-35" v-else />
                    </div>
                </div>
            </template>

            <div class=" contenedor-page-tabs h-100">
                <div class="row w-100 m-0 position-relative">
                    <productoComponent :full="true" :data="platillo" @set="set"/>
                </div>
            </div>

            <template v-if="platillo.sku && Number(platillo.width) && Number(platillo.weight) && Number(platillo.high) " >
                <template v-if=" Number(platillo.stock) " >
                    <template v-if="total" >
                        <div class="row w-100 m-0 back-color-rojo1 " v-if="1" @click="add()">
                            <div class="row w-100 m-0 pt-3 pb-4 px-3">
                                <div class="row w-100 m-0 px-3">
                                    <div class="col my-auto px-0 letra-blanco-22 fw-600 " >Agregar</div>
                                    <div class="col-auto my-auto px-0 letra-blanco-25 fw-800 ">{{total | currency}}</div>
                                </div>
                            </div>
                        </div>
                    </template>
                </template>
            </template>


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
            prods(){return this.$store.getters.info('productos'); },
            platillo(){return this.prods.find(w => w.id == this.$store.getters.carritoObject('prod').id) || {}},
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

                if(this.platillo.modelos && this.platillo.modelo.length){
                    if(!this.form.modelo){
                        swal("","Selecciona la talla/modelo para continuar","");
                        return;
                    }
                }

                console.log("ADDD", this.form);
                if(this.total){
                    this.form.distancia = 0;
                    this.$store.commit('addProductoCarrito',{prod: this.form, callback: ()=>{
                        this.$store.commit('openMsn',['¡Gracias! Los Producto(s) han sido agregados a tu carrito','Pagar y recibir',false,false]);
                        this.router.back('/consumos');
                    }});
                }
            }
        }
    }
</script>