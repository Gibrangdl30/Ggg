<template>
    <f7-page class="" id="inicio">

        <modal-mensaje 
            v-if="m==1"
            :titulo="`Este es un evento obligatorio`"
            :texto="`¿Delegar la asistencia a una persona de confianza?`"
            :boton="'yes'"
            @click="router.navigate('/usuarios_confianza_eventos')"
            @close="send(0)"
        />

        <modal-mensaje 
            v-if="m==2"
            :titulo="`Asistencia al evento`"
            :texto="`¿Deseas cancelar tu asistencia a este evento?`"
            :boton="'yes'"
            @click="sendX(0)"
        />

        <div v-if="$store.getters.deviceIos"  @click="$store.dispatch('scrollBottom','qwera85')" class="w-45px h-45px border-radius-50 position-absolute bottom-12 right-44 opacity-7 back-color-gray1 justify-content-center text-center align-content-center z-index-10000 ">
            <icono icono="keyboard_arrow_down" clase="letra-blanco-45 pt-1px" />
        </div>

        <div class="vista">

            <nav-bar tipo="inicio" :backs="true" title="Detalle evento"  />

            <div id="qwera85" class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0 border-b-gray0-1 border-t-gray0-1">

                    <div class="row w-100 m-0 px-3">
                        <div class="col-auto px-0 pr-3 border-r-gray0-1">
                            <div class="row w-100 m-0 letra-gray4-14 pt-5px text-capitalize justify-content-center text-center ">{{[evento.fecha, 'YYYY-MM-DD'] | moment('dddd')}}</div>
                            <div class="row w-100 m-0 letra-verde-38 text-capitalize justify-content-center text-center ">{{[evento.fecha, 'YYYY-MM-DD'] | moment('D')}}</div>
                            <div class="row w-100 m-0 letra-verde1-15 pb-5px text-capitalize justify-content-center text-center ">{{[evento.fecha, 'YYYY-MM-DD'] | moment('MMMM YYYY')}}</div>
                        </div>
                        <div class="col my-auto px-0 pl-3">
                            <div class="row w-100 m-0 letra-gray4-17">{{evento.name}}</div>
                            <div class="row w-100 m-0 py-5px letra-gray3-17">A las {{ [evento.hora, 'HH:mm:ss'] | moment('HH:mm [hrs]') }}</div>
                            <div class="row w-100 m-0 letra-verde-17">Tipo: {{ evento.tipo || 'Obligatorio' }}</div>
                        </div>
                    </div>

                </div>

                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 px-3 py-3">
                        <div class="col-auto px-0 letra-gray4-18">Asistencia</div>
                        <div class="col-auto px-0 ml-auto letra-verde-18 fw-600" v-if="invitacion && invitacion.id && invitacion.estatus == 'aceptado'">Confirmada</div>
                        <div class="col-auto px-0 ml-auto letra-rojo-18 fw-600" v-else-if="invitacion.estatus == 'rechazado'">No asistire</div>
                        <div class="col-auto px-0 ml-auto letra-gray3-18 fw-600" v-else >Pendiente</div>
                    </div>
                </div>

                <div class="row w-100 m-0" v-if="evento.whosummons">
                    <div class="row w-100 m-0 px-3 py-3 letra-gray3-18">
                        <div class="col-auto px-0">Quien convoca:</div>
                        <div class="col px-0 pl-2">{{evento.whosummons}}</div>
                    </div>
                </div>

                <div class="row w-100 m-0" v-if="evento.no_persons">
                    <div class="row w-100 m-0 px-3 py-2 letra-gray3-18">
                        <div class="col-auto px-0">Invitados extra por familia:</div>
                        <div class="col px-0 pl-2">{{evento.no_persons}}</div>
                    </div>
                </div>

                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 px-3 py-2 letra-gray3-18">
                        <div class="col-auto px-0">Lugar:</div>
                        <div class="col px-0 pl-2">{{evento.place}}</div>
                    </div>
                </div>

                <div class="row w-100 m-0 ">
                    <div class="row w-100 m-0 px-3 py-3 letra-gray3-18">
                        <div class="col px-0">{{evento.description}}</div>
                    </div>
                </div>

                <div class="row w-100 m-0" v-if="!invitacion || !invitacion.id">
                    <div class="row w-100 m-0 py-5 px-3">
                        <div class="col px-0 pr-2 " @click="m=1;$store.commit('op')" >
                            <botonApp texto="No asistiré" tipo="rojo" radius="30px" />
                        </div>
                        <div class="col px-0 pl-2 " @click="send(1)">
                            <botonApp texto="Asistiré" tipo="verde" radius="30px" />
                        </div>
                    </div>
                </div>

                <div class="row w-100 m-0" v-else>
                    <div class="row w-100 m-0 py-5 px-3" v-if="invitacion.estatus == 'aceptado'" >
                        <div class="col px-0 pr-2 " @click="m=2; $store.commit('op')" >
                            <botonApp texto="Cancelar asistencia" tipo="gris" radius="30px" />
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
                m: 1,
                hoy: moment().format('YYYY-MM-DD'),
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            eventos(){return this.$store.getters.userStateArray('eventos'); },
            evento(){return this.$store.getters.userStateFind('eventos','evento'); },
            invitacion(){return this.evento.invitacion || {} },
            grupo(){return this.$store.getters.userStateFind('eventos','evento'); },
        },
        mounted() {
            console.log("EVNETos", this.evento, this.invitacion);
        },
        methods:{
            go(ruta){
                this.router.navigate(ruta);
            },
            send(estatus){
                this.$store.dispatch('userPostActulizarInvitacion',[this.evento, estatus]);
            },
            sendX(estatus){
                this.$store.dispatch('userPostActulizarInvitacion',[this.evento, estatus, null, this.invitacion]);
            }
        }
    }
</script>