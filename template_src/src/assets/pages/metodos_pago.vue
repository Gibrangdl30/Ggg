<template>
    <f7-page id="inicio">
        <div class="vista  ">
            <nav-bar tipo="inicio" :backs="true" :title="'Métodos de pago'" :fix="1" />

            <div class="row w-100 m-0 back-color-rojo py-10px " @click="goTo('/agregar_metodo_pago')">
                <div class="row w-100 m-0 px-3 letra-blanco-16 justify-content-center text-center ">
                    <div class="col-auto my-auto pr-0 pl-25px ml-auto pb-5px">Nuevo método de pago</div>
                    <div class="col-auto my-auto px-0 ml-auto"  >
                        <icono icono="add" clase="letra-blanco-30 fw-600" />
                    </div>
                </div>
            </div>

            <div class="contenedor-page  padding-bottom-90">
                <div class="row m-0 w-100 ">

                    <div class="row w-100 m-0  ">

                        <div class="col-12 p-0">
                            
                            <div class="row m-0 border-botom-gray border-b-gray3-1" v-for="m of tarjetas" :key="m.id" >
                                <div class="row m-0 w-100 justify-content-between py-2" >
                                    <div class="col px-0">
                                        <div class="row w-100 m-0 pl-2" @click="click(m.id)" >
                                            <div class="col-2 my-auto p-0" >
                                                <imagen  :src="m.brand.toLowerCase()" icono="1" formato="png" />
                                            </div>
                                            <div class="col my-auto letra-gray3-5-1vw px-2"  >**** {{m.ending}}</div>

                                            <div class="col-2 my-auto text-center px-0 pt-3px">
                                                <toggle :icon="2" :checked="metodo_pago == m.id"  />
                                            </div>
                                            <!-- {{ metodo_pago }} {{ m.id }} -->
                                        </div>
                                    </div>


                                    <div class="col-auto my-auto p-0 pr-3">
                                        <boton-icono @click="eliminarMetodoPago(m)" :noborder="true" icono="delete" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                data:{
                    mapa: null,
                    marcador:null,
                },
                some: null,
            } 
        },
        computed:{
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            metodos(){return this.$store.getters.getMetodos;},
            tarjetas(){return this.$store.getters.getMetodos},
            metodo_id(){return this.$store.getters.viajeObject('metodo_id')},
            metodo_pago(){return this.$store.getters.carritoObject('metodo_pago')},
        },
        mounted(){
        },
        methods:{

            set(id){
                if(this.metodo_pago != id){
                    this.$store.commit('setCarritosState',['metodo_pago',id]);
                }
            },

            goTo(ruta){
                this.router.navigate(ruta);
            },
            click(id){
                this.$store.commit('setCarritosState',['metodo_pago',id]);
                // this.router.back();
            },

            eliminarMetodoPago(metodo){
                this.$store.dispatch('postRemoveMetodoPago',metodo)
            },
            
            
        }
    }
</script>