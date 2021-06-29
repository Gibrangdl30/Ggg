<template>
    <f7-page id="inicio" >
        <modalQr :qr="codigo" />
        <div class="vista" v-vistak>

            <nav-bar tipo="inicio" :backs="true" :title="'Detalle del codigo QR escaneado'" :right="false" />
            <div id="historilaccom" class="contenedor-page">
               <div class="row w-100 m-0">
                   <div class="row w-100 m-0 mb-3 back-color-blanco">
                        <div class="row w-100 m-0 px-3 py-2 border-b-gray0-1" >
                            <div class="row w-100 m-0 py-2 border-b-gray0-1" >
                                <div class="col my-auto px-0 pl-3">
                                    <div class="row w-100 m-0 letra-azul1-18">Pedido ID #{{servicioQR.pedido.id}}</div>
                                    <div class="row w-100 m-0 ">
                                        <div class="col px-0 letra-gray4-17">Fecha de compra en SocialFlow:</div>
                                        <div class="col-auto px-0 letra-azul1-19 fw-800">{{[servicioQR.pedido.created, 'YYYY-MM-DD HH:mm:ss'] | moment('DD/MM/YY')}}</div>
                                    </div>
                                    <div class="row w-100 m-0 ">
                                        <div class="col px-0 letra-gray4-17">Estatus del cupón:</div>
                                        <div class="col-auto px-0 letra-verde3-19 fw-800">Valido</div>
                                    </div>
                                    <div class="row w-100 m-0 ">
                                        <div class="col px-0 letra-gray4-17">Total:</div>
                                        <div class="col-auto px-0 letra-gray4-19 fw-800">{{servicioQR.pedido.total | currency}}</div>
                                    </div>
                                    <div class="row w-100 m-0 " v-if="servicioQR.para_usuarios_id">
                                        <div class="col px-0 letra-gray4-17">Para:</div>
                                        <div class="col-auto px-0 letra-gray4-19 text-capitalize">{{servicioQR.para_usuario.nombre}}</div>
                                    </div>
                                    <!-- <div class="row w-100 m-0 letra-azul1-16 fw-600 justify-content-end text-right" v-if="servicioQR.por_qr == '1'" @click=" $store.commit('openModal',['modalQr']) ">Ver QR</div> -->
                                </div>
                            </div>
                            <div class="row w-100 m-0 py-3 border-b-gray0-1">
                                <div class="row w-100 m-0 pb-1 letra-gray-18">Usuaro de SocialFlow que compro</div>
                                <div class="row w-100 m-0 ">
                                    <div class="w-20vw h-20vw my-auto">
                                        <imagen clase="border-radius-10px" :fit="true" :user="true" :src="usuario.foto" />
                                    </div>
                                    <div class="col px-0 my-auto pl-2">
                                        <div class="row w-100 m-0 letra-gray4-18">{{usuario.nombre}}</div>
                                        <div class="row w-100 m-0 letra-gray3-16">{{usuario.email}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="row w-100 m-0"></div>
                            <div class="row w-100 m-0 px-3 border-b-gray0-1">
                                <div class="row w-100 m-0 py-2">
                                    <div class="w-10vw h-10vw mb-auto">
                                        <imagen clase="border-radius-5px" :fit="true" :src="servicioQR.imagen" v-if="servicioQR.imagen" />
                                        <imagen clase="border-radius-5px" :fit="true" src="https://socialflow.app/backend/apiv1/imagenes/p1.png" v-else />
                                    </div>
                                    <div class="col my-auto px-0 pl-3">
                                        <div class="row w-100 m-0 letra-azul1-18">{{servicioQR.nombre}}</div>
                                        <div class="row w-100 m-0 letra-gray4-18 fw-800">{{servicioQR.precio | currency}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="row w-100 m-0 px-3 ">
                                <div class="row w-100 m-0 pt-2">
                                    <div class="row w-100 m-0 letra-gray3-18">Establecimiento</div>
                                </div>
                                <div class="row w-100 m-0 pb-1">
                                    <div class="col my-auto px-0">
                                        <div class="row w-100 m-0 letra-azul1-18 fw-800">{{local.tradename || 'No definido'}}</div>
                                        <div class="row w-100 m-0 letra-gray4-16 " v-if="local.tradename" >Direccion: {{local.street}} {{local.num_int}}</div>
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
            servicioQR(){return this.$store.getters.carritoObject('servicioQR');},
            local(){return this.servicioQR.local || {};},
            usuario(){return this.servicioQR.usuario || {};},
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