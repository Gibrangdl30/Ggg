<template>
    <f7-page id="inicio">
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" title="Acceso a tercero" :fix="1" />
            <div class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0 mt-3">
                    <div class="row w-100 m-0 px-3">
                        <!-- <div class="col-12 mx-auto mt-4">
                            <selectForm 
                                texto="Relación"
                                llave="id" 
                                input="form" 
                                textcolor="verde2" 
                                :opciones="tipos_familia" 
                                v-model="form.type" 
                            />
                        </div> -->
                        <div class="col-12 mt-4">
                            <inputForm type="text" input="form"  textcolor="verde2" texto="Nombre:" placeholder="" v-model="form.nombre" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="email" input="form"  textcolor="verde2" texto="Correo:" placeholder="" v-model="form.email" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="tel" input="form"  textcolor="verde2" texto="Telefono:" placeholder="" v-model="form.telefono" :maxlength="10" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="text" input="form"  textcolor="verde2" texto="Empresa:" placeholder="" v-model="form.empresa" />
                        </div>
                        <div class="col-12 mt-4">
                            <div class="row w-100 m-0 pl-1 letra-verde-18">Agrega una identificación oficial.</div>
                            <div class="row w-100 m-0 pt-1">
                                <div class="w-20vw h-20vw">
                                    <uploadImagen class="border-gray01-1 border-radius-15px overflow-hidden" v-model="form.ine" />
                                </div>
                                <div class="w-20vw h-20vw mr-auto ml-2">
                                    <uploadImagen class="border-gray01-1 border-radius-15px overflow-hidden" v-model="form.ine_atras" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row w-100 m-0 justify-content-center mt-4 pb-5">
                    <div class="col-12 py-2">
                        <botonApp tipo="verde" texto="Registrar acceso" radius="30px" @click="save" />
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
                foto: null,
                form:{
                    nombre:   null,
                    email:   null,
                    telefono:   null,
                    empresa:   null,
                    ine:   null,
                    ine_atras:   null,
                    school_id:   this.$store.getters.getSession.school_id,
                },
                confirm_password: null,
                acepto: false,
            }
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            tipos_familia(){return this.$store.getters.getCatalogo('tipos_familia');},
        },
        methods:{
            save(){
                if(!this.form.nombre || !this.form.email || !this.form.telefono){
                    swal("","Llena todos los campos","");
                    return;
                }
                this.$store.dispatch('userPostAccesoTercero',[this.form]);
            }
          
        }
    }
</script>