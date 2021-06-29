<template>
    <f7-page id="inicio">
        <seleccionar-imagen :updateImg="setImg"></seleccionar-imagen>
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'Edit profile'" />
            <div class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0">

                    <div class="row w-100 m-0 mt-3 px-3 justify-content-center">
                        <div class="col-auto px-0 text-center my-auto position-relative">
                            <div class="w-40vw h-40vw mx-auto border-radius-10 overflow-hidden" >
                                <uploadImagen class="border-rojo-3 border-radius-50 overflow-hidden" :user="false" v-model="form.foto" :imagen="foto" />
                            </div>
                        </div>
                    </div>

                    <div class="col-12 mt-3">
                        <inputForm type="text" texto="Name:" placeholder="" v-model="form.nombre" />
                    </div>
                    <div class="col-12 mt-3">
                        <inputForm type="tel" texto="Phone:" placeholder="" v-model="form.telefono" :maxlength="10" />
                    </div>
                    <!-- <div class="col-12 p-0 mt-5" @click="router.navigate('/cambiar_password')">
                        <div class="row m-0 w-100 px-3 py-2 justify-content-between border-b-gray1-1 border-t-gray1-1 ">
                            <div class="col-11 my-auto letra-gray-dark2-5-1vw p-0">Cambiar contraseña</div>
                            <div class="col-1 p-0"><img class="w-100 h-100" src="../iconos/ch_left.svg" alt=""></div>
                        </div>
                    </div> -->
                </div>
                <div class="row w-100 m-0 py-4 justify-content-center">
                    <div class="col-12 px-4 pt-4 pb-4">
                        <botonApp tipo="rojo" texto="save" @click="save" radius="10px" />
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
                fotoUpdate: false,
                form:{
                    id: this.$store.getters.getSession.id,
                    foto: this.$store.getters.getSession.fotos_id,
                    nombre: this.$store.getters.getSession.nombre,
                    email: this.$store.getters.getSession.email,
                    telefono: this.$store.getters.getSession.telefono,
                    fecha_nacimiento: this.$store.getters.getSession.fecha_nacimiento,
                    estado: this.$store.getters.getSession.estado,
                    ine_frente: this.$store.getters.getSession.ine_frente,
                    ine_atras: this.$store.getters.getSession.ine_atras,
                },
                foto: this.$store.getters.getSession.foto,

            }
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            estados(){return this.$store.getters.getCatalogo('estados');},
        },
        methods:{
            setImg(img){
                this.fotoUpdate = true;
                this.form.foto = img;
            },
            save(){
                if(!this.form.nombre){
                    swal("No puedes dejar campos vacios", "","info");
                    return;
                }
                this.$store.dispatch('postEditCuenta', [this.form, this.fotoUpdate]);
            },
        }
    }
</script>