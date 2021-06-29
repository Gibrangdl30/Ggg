<template>
    <f7-page id="inicio" >
        <modalQr :qr="codigo" />
        <div class="vista" v-vistak>
            <div v-if="$store.getters.deviceIos"  @click="$store.dispatch('scrollBottom','historilaccom')" class="w-45px h-45px border-radius-50 position-absolute bottom-8 right-44 opacity-7 back-color-gray1 justify-content-center text-center align-content-center z-index-10000 ">
                <icono icono="keyboard_arrow_down" clase="letra-blanco-45 pt-1px" />
            </div>

            <nav-bar tipo="inicio" :backs="true" :title="'Servicios por canjear'" :right="false" />
            <div id="historilaccom" class="contenedor-page">
               <div class="row w-100 m-0">
                   <div class="row w-100 m-0 mb-3 back-color-blanco" v-for="a of servicios " :key="a.id">
                        <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1" >
                            <div class="row w-100 m-0 py-2 border-b-gray0-1" >
                                <div class="col my-auto px-0 pl-3">
                                    <div class="row w-100 m-0 letra-azul1-18">Pedido ID #{{a.pedido.id}}</div>
                                    <div class="row w-100 m-0 ">
                                        <div class="col px-0 letra-gray4-17">Fecha:</div>
                                        <div class="col-auto px-0 letra-azul1-19 fw-800">{{[a.pedido.created, 'YYYY-MM-DD HH:mm:ss'] | moment('DD/MM/YY')}}</div>
                                    </div>
                                    <div class="row w-100 m-0 ">
                                        <div class="col px-0 letra-gray4-17">Total:</div>
                                        <div class="col-auto px-0 letra-gray4-19 fw-800">{{a.pedido.total | currency}}</div>
                                    </div>
                                    <div class="row w-100 m-0 " v-if="a.para_usuarios_id">
                                        <div class="col px-0 letra-gray4-17">Para:</div>
                                        <div class="col-auto px-0 letra-gray4-19 text-capitalize">{{a.para_usuario.nombre}}</div>
                                    </div>
                                    <!-- <div class="row w-100 m-0 letra-azul1-16 fw-600 justify-content-end text-right" v-if="a.por_qr == '1'" @click=" $store.commit('openModal',['modalQr']) ">Ver QR</div> -->
                                </div>
                            </div>
                            <div class="row w-100 m-0"></div>
                            <div class="row w-100 m-0 px-3 border-b-gray0-1">
                                <div class="row w-100 m-0 py-1">
                                    <div class="w-10vw h-10vw mb-auto">
                                        <imagen clase="border-radius-5px" :fit="true" :src="a.imagen" v-if="a.imagen" />
                                        <imagen clase="border-radius-5px" :fit="true" src="https://socialflow.app/backend/apiv1/imagenes/p1.png" v-else />
                                    </div>
                                    <div class="col my-auto px-0 pl-3">
                                        <div class="row w-100 m-0 letra-azul1-18">{{a.nombre}}</div>
                                        <div class="row w-100 m-0 letra-gray4-18 fw-800">{{a.precio | currency}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="row w-100 m-0 px-3 ">
                                <div class="row w-100 m-0 pt-2">
                                    <div class="row w-100 m-0 letra-gray3-18">Establecimiento</div>
                                </div>
                                <div class="row w-100 m-0 pb-1">
                                    <!-- <div class="w-10vw h-10vw mb-auto">
                                        <imagen clase="border-radius-5px" :fit="true" :src="a.imagen" v-if="a.imagen" />
                                        <imagen clase="border-radius-5px" :fit="true" src="https://socialflow.app/backend/apiv1/imagenes/p1.png" v-else />
                                    </div> -->
                                    <div class="col my-auto px-0">
                                        <div class="row w-100 m-0 letra-azul1-18 fw-800">{{a.local.tradename}}</div>
                                        <div class="row w-100 m-0 letra-gray4-16 ">Direccion: {{a.local.street}} {{a.local.num_int}}</div>
                                    </div>
                                </div>
                                <div class="row w-100 m-0 letra-azul1-16 fw-600 justify-content-end text-right" @click=" openQr(a) ">Ver QR</div>
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
const moment = require('moment')
    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                codigo: 'socialFlow',
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            historial(){return this.$store.getters.userStateArray('historial');},
            servicios(){return this.$store.getters.userStateArray('servicios');},
        },
        methods:{
            nuevo(id){
                this.$store.commit('setUsuarioData',['lista', id]);
                this.router.navigate('/regalos_listas');
            },
            openQr(a){
                this.codigo = a.code; 
                this.$store.commit('openModal',['modalQr'])
            },
            
        }
    }
</script>