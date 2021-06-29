<template>
    <f7-page id="inicio" >
        <modal-mensaje 
            :texto="`¿Deseas eliminar esta wishlist?`"
            :boton="'Aceptar'"
            @click="eliminar(data)"
        />
        <div class="vista" v-vistak>
            <div v-if="$store.getters.deviceIos"  @click="$store.dispatch('scrollBottom','deseo789')" class="w-45px h-45px border-radius-50 position-absolute bottom-15 right-44 opacity-7 back-color-gray1 justify-content-center text-center align-content-center z-index-10000 ">
                <icono icono="keyboard_arrow_down" clase="letra-blanco-45 pt-1px" />
            </div>

            <!-- <nav-bar tipo="inicio" :backs="true" :title="'Wishlist'" :right="true" icon="add" @right="router.navigate('/nueva_lista')" /> -->
            <nav-bar tipo="init" :backs="false" :logo="true" :profile="true" :chat="true" />
            <div class="row w-100 m-0">
                <div class="row w-100 m-0 back-color-azul1" @click="router.navigate('/nueva_lista')">
                    <div class="row w-100 m-0 letra-blanco-18 justify-content-center text-center py-12px">Crear nueva whislist</div>
                </div>
            </div>
            <div id="deseo789" class="contenedor-page">
                
               <div class="row w-100 m-0 px-2">
                   <div class="row w-100 m-0 my-2 border-radius-10px border-gray0-2 overflow-hidden" v-for="(a,x) of misListas " :key="x">
                        <div class="row w-100 m-0 border-b-gray0-1" >
                            <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1 back-color-gray00" >
                                <div class="w-12vw h-12vw my-auto">
                                    <imagen clase="border-radius-5px" v-if="!a.imagen" :fit="true" src="https://socialflow.app/backend/apiv1/imagenes/w1.jpg" />
                                    <imagen clase="border-radius-5px" v-else :fit="true" :create="true" :src="a.imagen" />
                                </div>
                                <div class="col my-auto px-0 pl-3">
                                    <div class="row w-100 m-0 letra-azul1-18">{{a.nombre}}</div>
                                </div>
                                <div class="col-auto my-auto px-0 pl-2" v-if="a.type == 'lista' ">
                                    <div class="row w-100 m-0" >
                                        <div class="w-37px border-radius-5px back-color-azul1 py-1 justify-content-center text-center" @click="nuevo(a.id)" >
                                            <icono icono="add" clase="letra-blanco-20 pt-4px" />
                                        </div>
                                    </div>
                                    <div class="row w-100 m-0 pt-2" >
                                        <div class="w-37px border-radius-5px back-color-gray3 py-1 justify-content-center text-center" @click=" toEliminar(a) " >
                                            <icono icono="delete" clase="letra-blanco-20 pt-4px" />
                                        </div>
                                    </div>
                                </div>
                                <div class="col-auto my-auto px-0 pl-2" v-if="a.type == 'listaFecha' ">
                                    <div class="row w-100 m-0" >
                                        <div class="w-37px border-radius-5px back-color-azul1 py-1 justify-content-center text-center" @click="nuevoF(a.id)" >
                                            <icono icono="add" clase="letra-blanco-20 pt-4px" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row w-100 m-0"></div>
                            <div class="row w-100 m-0" v-if="!a.productos || !a.productos.length">
                                <div class="row w-100 m-0 py-2 letra-gray3-16 text-center justify-content-center">No hay productos agregados</div>
                            </div>
                            <div class="row w-100 m-0 pb-4">
                                <div class="row w-100 m-0 pl-3 px-3 py-1" v-for="p of a.productos" :key="p.id" :class="(a.productos.length > 1)?'border-b-gray0-1':''">
                                    <div class="w-10vw h-10vw my-auto">
                                        <imagen clase="border-radius-50" :fit="true" :src="p.imagen" v-if="p.imagen" />
                                        <imagen clase="border-radius-50" :fit="true" src="https://socialflow.app/admin/apiv1/imagenes/p1.png" v-else />
                                    </div>
                                    <div class="col my-auto px-0 pl-3">
                                        <div class="row w-100 m-0 letra-azul1-18">{{p.nombre | truncate(25)}}</div>
                                        <div class="row w-100 m-0 letra-gray4-18"> {{p.precio | currency}} {{p.producto.currency}} x{{p.cantidad?p.cantidad:1}}</div>
                                        <div class="row w-100 m-0 letra-gray4-18"></div>
                                        <div class="row w-100 m-0 letra-verde6-18" v-if=" p.comprado && p.comprado.id ">Comprado</div>
                                    </div>
                                    <div class="col-auto my-auto px-0 pl-2" v-if="a.type == 'lista' " >
                                        <div class="row w-100 m-0 pt-2" >
                                            <div class="w-37px border-radius-5px back-color-rojo1 py-1 justify-content-center text-center" @click=" $store.dispatch('postEliminarProducto', p) ">
                                                <icono icono="delete" clase="letra-blanco-20 pt-4px" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-auto my-auto px-0 pl-2" v-if="a.type == 'listaFecha' " >
                                        <div class="row w-100 m-0 pt-2" >
                                            <div class="w-37px border-radius-5px back-color-rojo1 py-1 justify-content-center text-center" @click=" $store.dispatch('postEliminarProductoLista', p) ">
                                                <icono icono="delete" clase="letra-blanco-20 pt-4px" />
                                            </div>
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
const moment = require('moment')
    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                data: {},
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            misListas(){return this.$store.getters.userStateArray('misListas');},
            misFechas(){return this.$store.getters.userStateArray('misFechas').filter(x => { return x.productos && x.productos.length }); },

        },
        methods:{
            nuevo(id){
                this.$store.commit('setUsuarioData',['lista', id]);
                this.router.navigate('/regalos_listas');
            },

            toEliminar(a){
                this.data = a;
                this.$store.commit('openM');
            },

            eliminar(e){
                this.$store.dispatch('postBorrarLista',e);
            },

            nuevoF(x){
                this.$store.commit('setUsuarioData',['tipo', 'agregarRegaloFecha']); 
                this.$store.commit('setUsuarioData',['lista', x]);
                this.router.navigate('/regalos_listas');
            }
            
        }
    }
</script>