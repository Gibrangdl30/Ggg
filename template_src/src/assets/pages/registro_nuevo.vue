<template>
    <f7-page id="inicio">
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'Envianos tus datos'" :fix="1" />
            <div class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0 mt-3">
                    <!-- <div class="col-12 text-center pt-2 mb-3 position-relative">
                        <div class="w-30vw h-30vw mx-auto border-radius-30px border-blanco-3 overflow-hidden position-relative">
                            <uploadImagen class="border-radius-50 border-rojo-3" :user="false" v-model="form.foto" />
                        </div>
                        <div class="col-12 py-2 letra-gray3-14 text-center">Add a profile photo or image</div>
                    </div> -->
                    <div class="row w-100 m-0 px-3">
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="Nombre:" placeholder="" v-model="form.nombre" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="email" texto="Email:" placeholder="" v-model="form.email" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="tel" texto="Telefono:" placeholder="" v-model="form.telefono" :maxlength="10" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm :textarea="true" type="text" texto="Colegio:" placeholder="" v-model="form.colegio" />
                        </div>
                    </div>
                </div>

                <div class="row w-100 m-0 justify-content-center mt-4 pb-5">
                    <div class="col-12 py-2">
                        <botonApp tipo="verde" texto="Enviar" radius="30px" @click="save" />
                    </div>
                </div>
            </div>
        </div>
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
import Swiper from 'swiper';
    export default{
        components:{
            f7Page,
        },
        data(){
            return{

                generos:[
                    { id: 'masculino', nombre: 'Masculino'},
                    { id: 'femenino', nombre: 'Femenino'},
                ],

                form:{
                    nombre:     null,
                    email:      null,
                    telefono:   null,
                    colegio:   null,
                },

                confirm_password: null,
                acepto: false,
            }
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
        },
        methods:{
            save(){
                if(!this.form.nombre || !this.form.email || !this.form.colegio){
                    swal("","Por favor llena los campos","");
                    return;
                }
                this.$store.dispatch('userPostEnviarRegistro',[ this.form ]);
            }
        }
    }
</script>