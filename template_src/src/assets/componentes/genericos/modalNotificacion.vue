<template>
<!-- <transition name="custom"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster"> -->
    <div class="modal_aplicar w-100 m-0 p-0 justify-content-center px-2" v-if="state">
        <div class="row w-100 m-0px pt-40px">
            <div class="row w-100 m-0 mt-5 pt-3 px-2 justify-content-center" v-if="notificacion && notificacion.id" >
                <div class="col-10 px-0 back-color-blanco border-radius-15px overflow-hidden">
                    <div class="row w-100 m-0 px-0">
                        <div class="row w-100 m-0 pt-4 letra-gray4-19 fw-800 justify-content-center text-center" v-if="grupo && grupo.id">
                            <div class="row w-100 m-0 justify-content-center" v-if="notificacion.estatus == 'enviado'">Nuevo deposito del grupo</div>
                            <div class="row w-100 m-0 justify-content-center" v-if="notificacion.estatus == 'solicitado'">Tienes un cobro del grupo</div>
                        </div>
                        <div class="row w-100 m-0 pt-4 letra-gray4-19 fw-800 justify-content-center text-center" v-else>
                            <div class="row w-100 m-0 justify-content-center" v-if="notificacion.estatus == 'enviado'">Nuevo deposito</div>
                            <div class="row w-100 m-0 justify-content-center" v-if="notificacion.estatus == 'solicitado'">Nueva solicitud de deposito</div>
                        </div>
                        <div class="row w-100 m-0 pt-1 letra-appve-24 fw-800 justify-content-center text-center">
                            <div class="row w-100 m-0 justify-content-center">{{notificacion.cantidad | currency}}</div>
                        </div>
                        <div class="row w-100 m-0 pt-2 justify-content-center">
                            <div class="col-auto p-0 overflow-hidden" v-if="grupo && grupo.id">
                                 <div class="w-80px h-80px border-radius-50 overflow-hidden back-color-appve text-center">
                                    <icono icono="group" clase="letra-blanco-49 pt-8px" />
                                </div>
                            </div>
                            <div class="w-12vh h-12vh border-radius-50 border-appazu-3 overflow-hidden" v-else>
                                <!-- <imagen class="object-fit" :user="true" :src="notificacion.usuario.foto" v-if="notificacion.estatus == 'enviado'" /> -->
                                <!-- <imagen class="object-fit" :user="true" :src="notificacion.para_usuario.foto" v-if="notificacion.estatus == 'solicitado'" /> -->
                            </div>
                        </div>
                        <div class="row w-100 m-0" v-if="grupo && grupo.id">
                            <div class="row w-100 m-0 pt-2 justify-content-center text-center">
                                <div class="row w-100 m-0 justify-content-center letra-gray4-19 fw-800" >{{grupo.nombre}}</div>
                                <div class="row w-100 m-0 justify-content-center letra-gray3-16" v-if="notificacion.estatus == 'solicitado'">{{notificacion.para_usuario.nombre}}</div>
                                <div class="row w-100 m-0 justify-content-center letra-gray3-16" v-if="notificacion.estatus == 'enviado'">De: {{notificacion.usuario.nombre}}</div>
                            </div>
                        </div>
                        <div class="row w-100 m-0" v-else>
                            <div class="row w-100 m-0 pt-2 letra-gray4-19 fw-800 justify-content-center text-center">
                                <div class="row w-100 m-0 justify-content-center" v-if="notificacion.estatus == 'enviado'">{{notificacion.usuario.nombre}}</div>
                                <div class="row w-100 m-0 justify-content-center" v-if="notificacion.estatus == 'solicitado'">{{notificacion.para_usuario.nombre}}</div>
                            </div>
                            <div class="row w-100 m-0 letra-gray3-16 fw-800 justify-content-center text-center">
                                <div class="row w-100 m-0 justify-content-center" v-if="notificacion.estatus == 'enviado'">{{notificacion.usuario.email}}</div>
                                <div class="row w-100 m-0 justify-content-center" v-if="notificacion.estatus == 'solicitado'">{{notificacion.para_usuario.email}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="row w-100 m-0 justify-content-center">
                        <div class="col-11 px-0 pt-3 pb-4 px-1" @click="aceptar()">
                            <botonApp texto="Aceptar"  radius="30px" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


<!-- </transition> -->
</template>
<script>
export default {
    data(){
        return {
            name: 'modalNotificacion',
        };
    },
    props: [],
    computed: {
        state() {return this.$store.getters.getModal(this.name)},
        notificacion(){return this.$store.getters.enviosObject('movimiento') || {};},
        grupo(){return this.notificacion.grupo || {};},
    },
    methods:{
        closeModal(){
            this.$store.commit('closeModal', [this.name]);
        },
        aceptar(){
            this.$store.dispatch('postLeerTransaccion', this.notificacion);
            this.closeModal();
        },
    },
}
</script>