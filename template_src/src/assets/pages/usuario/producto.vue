<template>
    <div v-if="!platillo" />

    <div v-else class="page " id="inicio">
        <div class="page-content position-relative">

            <modalMensajeStatic 
                v-if="modal==1"
                texto="mensajeCreador"
                boton="Enviar"
                @click="send"
                @close="modal = 0"
            />

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
                        <productoComponent :full="true" :data="{...platillo}" @set="set" />
                    </div>
                </div>

                <template v-if="total" >
                    <template v-if="prod.sku && Number(prod.width) && Number(prod.weight) && Number(prod.high) " >
                        <template v-if=" Number(prod.stock) " >
                                <div class="row w-100 m-0 back-color-rojo1 " v-if="1" @click="add()">
                                    <div class="row w-100 m-0 pt-3 pb-4 px-3">
                                        <div class="row w-100 m-0 px-3">
                                            <div class="col my-auto px-0 letra-blanco-22 fw-600 " >Agregar</div>
                                            <div class="col-auto my-auto px-0 letra-blanco-25 fw-800 ">{{ total | currency}}</div>
                                        </div>
                                    </div>
                                </div>
                        </template>
                    </template>
                    <template v-else >
                        <div class="row w-100 m-0 back-color-rojo1 " >
                            <div class="row w-100 m-0 pb-4">
                                <div class="row w-100 m-0 pt-3 letra-blanco-16 justify-content-center text-center " >Producto temporalmente no disponible para la venta</div>
                                <div class="row w-100 m-0 pt-2 px-3">
                                    <div @click="modal=1" class="row w-100 m-0 py-1 back-color-rojo justify-content-center text-center letra-blanco-18 border-radius-10px">Avísale a este creador que te interesa</div>
                                </div>
                            </div>
                        </div>
                    </template>
                </template>


            </div>

        </div>
    </div>
</template>
<script>
import { f7Page } from 'framework7-vue';
import axios from 'axios';


const moment = require('moment')
    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                modal: 0,
                total: 0,
                prod: {},
                form: {},
                platillo: null,
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            prods(){return this.$store.getters.info('productos'); },
            // platillo(){
            //     return this.prods.find(w => {
            //         console.log(w.id, '===', this.$store.getters.carritoObject('prod').id);

            //         return w.id == this.$store.getters.carritoObject('prod').id
            //     }) || {}
            // },
        },

        async created () {
            const productPromise = await axios.get(`https://mexicolimited.com/api/product/${this.$store.getters.carritoObject('prod').id}`)
                .catch((error) => {
                    console.log(error);
                    throw new Error("Error al cargar el producto");
                });
                
            this.platillo = productPromise.data;
        },

        methods:{
            set(platillo){
                this.prod       = platillo.info;
                this.total      = platillo.total;
                this.form       = platillo;
            },

            send(form){
                console.log("FORM", form);
                if(!form.name || !form.email || !form.phone || !form.msg){
                    swal("","Ingresa todos los campos, para enviar","");
                    return;
                }
                form.producto_id = this.platillo.id;
                this.$store.dispatch('actionEnviarContacto',[ form ]);
            },

            add(){
                if(!this.session.token){
                    this.$store.commit('openModal',['modalSession']);
                    return;
                }

                if(this.platillo.modelos && this.platillo.modelos.length){
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