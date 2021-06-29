<template>
<div class="transaccion componente row w-100 m-0 py-2">
    <div class="row w-100 m-0 border-b-gray1-1">
        <div class="row w-100 m-0 px-3 back-color-blanco justify-content-start">
            <div class="row w-100 m-0 pt-15px pb-10px justify-content-start">
                <div class="w-10vw my-auto px-1">
                    <imagen clase="" :icono="true" src="pin" />
                </div>
                <div class="col-auto my-auto pl-1">
                    <div class="row w-100 m-0 letra-gray4-16">Viaje #{{servicio.id}}</div>
                    <div class="row w-100 m-0 letra-gray3-13">{{servicio.calle}} - {{destino.calle}}</div>
                    <div class="row w-100 m-0 letra-gray3-15">{{[servicio.creado, 'YYYY-MM-DD HH:mm:ss'] | moment('HH:mm [hrs] DD/MM/YY')}}</div>
                </div>
            </div>
        </div>
       <div class="row w-100 m-0 pt-2 pb-3 px-2">

            <div class="row w-100 m-0 usuario" v-if="isChofer">
                <div class="col-auto my-auto px-0">
                    <div class="w-20vw h-20vw border-radius-10px overflow-hidden ">
                        <imagen :fit="true" :user="true" :src="usuario.foto" />
                    </div>
                </div>
                <div class="col my-auto pl-3 pr-0">
                    <div class="row w-100 m-0 letra-gray4-16 fw-800">{{usuario.nombre}}</div>
                    <div class="row w-100 m-0 letra-gray3-16 text-capitalize">{{servicio.tipo_pago}}</div>
                    <div class="row w-100 m-0 letra-gray3-16 justify-content-start" v-if="false">
                        <div class="col-auto my-auto px-0">
                            <div class="row w-100 m-0">
                                <div class="col-auto my-auto px-0">
                                    <icono icono="star" clase="letra-verde4-30" />
                                </div>
                                <div class="col-auto my-auto pl-2 pr-0 fw-800">{{'5'}}</div>
                            </div>
                        </div>
                        <div class="col-auto my-auto ml-auto px-0 pr-2">
                            <div class="row w-100 m-0 justify-content-start">
                                <div class="col-auto px-0">
                                    <div class="w-41px h-41px border-radius-50 back-color-verde4 text-center">
                                        <icono icono="chat_bubble_outline" class="letra-blanco-25 pt-6px" />
                                    </div>
                                </div>
                                <div class="col-auto px-0 pl-3" @click="$store.dispatch('call',usuario.tel)">
                                    <div class="w-41px h-41px border-radius-50 back-color-verde4 text-center">
                                        <icono icono="local_phone" class="letra-blanco-25 pt-6px" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row w-100 m-0 letra-verde4-18 fw-800">{{servicio.total_km | currency}} MXN</div>
                </div>
            </div>

            <div class="row w-100 m-0 " v-else>
                <div class="col-auto my-auto px-0">
                    <div class="w-20vw h-20vw border-radius-10px overflow-hidden ">
                        <imagen :fit="true" :user="true" :src="chofer.foto" />
                    </div>
                </div>
                <div class="col my-auto pl-3 pr-0">
                    <div class="row w-100 m-0 letra-gray4-16 fw-800">{{chofer.nombre}}</div>
                    <div class="row w-100 m-0 letra-gray3-16">Tarjeta</div>
                    <div class="row w-100 m-0 letra-gray3-16 justify-content-start" v-if="false">
                        <div class="col-auto my-auto px-0">
                            <div class="row w-100 m-0">
                                <div class="col-auto my-auto px-0">
                                    <icono icono="star" clase="letra-verde4-30" />
                                </div>
                                <div class="col-auto my-auto pl-2 pr-0 fw-800">{{'5'}}</div>
                            </div>
                        </div>
                        <div class="col-auto my-auto ml-auto px-0 pr-2">
                            <div class="row w-100 m-0 justify-content-start">
                                <div class="col-auto px-0">
                                    <div class="w-41px h-41px border-radius-50 back-color-verde4 text-center">
                                        <icono icono="chat_bubble_outline" class="letra-blanco-25 pt-6px" />
                                    </div>
                                </div>
                                <div class="col-auto px-0 pl-3" @click="$store.dispatch('call',chofer.tel)">
                                    <div class="w-41px h-41px border-radius-50 back-color-verde4 text-center">
                                        <icono icono="local_phone" class="letra-blanco-25 pt-6px" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row w-100 m-0 letra-verde4-18 fw-800">{{servicio.total_km | currency}} MXN</div>
                </div>
            </div>

            <div class="row w-100 m-0 pt-3" v-if="take">
                <div class="row w-100 m-0 justify-content-center">
                    <div class="col-8 px-1" @click="tomar()">
                        <botonApp texto="Tomar viaje" tipo="verde" radius="30px" />
                    </div>
                    <div class="col-4 px-1" @click="rechazar()">
                        <botonApp texto="Rechazar" tipo="azul" radius="30px" />
                    </div>
                </div>
            </div>

            <div class="row w-100 m-0 pt-2" v-else>
                <div class="col pl-2 pr-0">
                    <div class="row w-100 m-0 letra-gray4-16 fw-800">{{'Honda Civic'}}</div>
                    <div class="row w-100 m-0 letra-gray3-16">{{'Color plata'}}</div>
                    <div class="row w-100 m-0 letra-gray3-16">{{'Placas XCV-5647'}}</div>
                </div>
                <div class="col-auto px-0">
                    <div class="w-35vw">
                        <imagen src="https://miviaapp.com/appfiles/city.png" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
const moment = require('moment');
export default {
    data(){
        return {
        };
    },
    props:[
        'data',
        'isChofer',
        'take',
    ],
    computed:{
        servicio(){return this.data || {};},
        usuario(){return this.servicio.usuario || {}},
        chofer(){return this.servicio.chofer || {}},
        destino(){return this.servicio.destino || {}},
    },
    methods:{
        click(){
            this.$emit('click');
        },
        tomar(){
            this.$store.dispatch('postTomarViaje', this.servicio.id);
        },
        rechazar(){
            this.$store.commit('openModal',['modalMensaje']);
            this.$emit('input',this.servicio);
            // this.$store.commit('rechazarViaje', this.servicio);
        },
    },
}
</script>