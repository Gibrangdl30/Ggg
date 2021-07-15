<template>
    <f7-page id="inicio">
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" title="Agregar persona de confianza" :fix="1" />
            <div class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0 mt-3">
                    <div class="col-12 text-center pt-2 mb-3 position-relative">
                        <div class="w-30vw h-30vw mx-auto border-radius-50 border-verde-3 overflow-hidden position-relative">
                            <uploadImagen class="" :user="false" v-model="foto" />
                        </div>
                        <div class="col-12 py-2 letra-gray3-14 text-center">Agregar foto de la persona</div>
                    </div>

                    <div class="row m-0 w-100 px-3 mt-4">
                        <div class="col my-auto letra-gray3-16 p-0 pl-3">Es personal de apoyo</div>
                        <div class="col-auto my-auto px-0 pl-3 pr-2 my-auto" >
                            <toggle :v="1" :f="0"  />
                        </div>
                    </div>

                    <div class="row w-100 m-0 px-3">
                        <div class="col-12 mx-auto mt-4">
                            <selectForm 
                                texto="Relación"
                                llave="id" 
                                input="form" 
                                textcolor="verde2" 
                                :opciones="tipos_familia" 
                                v-model="form.type" 
                            />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="text" input="form"  textcolor="verde2" texto="Nombre:" placeholder="" v-model="form.name" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="email" input="form"  textcolor="verde2" texto="Correo:" placeholder="" v-model="form.email" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="tel" input="form"  textcolor="verde2" texto="Telefono:" placeholder="" v-model="form.phone" :maxlength="10" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="date" input="form"  textcolor="verde2" texto="Fecha de nacimiento:" placeholder="" v-model="form.date_birth" :maxlength="10" />
                        </div>
                        <div class="col-12 mt-4">
                            <div class="row w-100 m-0 pl-1 letra-verde-18">Agrega una identificación oficial.</div>
                            <div class="row w-100 m-0 pt-1">
                                <div class="w-20vw h-20vw">
                                    <uploadImagen class="border-gray01-1 border-radius-15px overflow-hidden" v-model="form.ine_imagen" />
                                </div>
                                <div class="w-20vw h-20vw mr-auto ml-2">
                                    <uploadImagen class="border-gray01-1 border-radius-15px overflow-hidden" v-model="form.ine_atras" />
                                </div>
                            </div>
                        </div>
                        <div class="col-12 mt-4">
                            <div class="row w-100 m-0 pl-1 letra-gray3-18">Sobre el vehículo</div>
                        </div>
                        <div class="col-12 mt-2">
                            <inputForm type="text" input="form"  textcolor="verde2" texto="Marca:" placeholder="" v-model="form.marca" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="text" input="form"  textcolor="verde2" texto="Modelo:" placeholder="" v-model="form.modelo" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="text" input="form"  textcolor="verde2" texto="Placas:" placeholder="" v-model="form.placas" />
                        </div>
                        
                    </div>
                </div>

                <div class="row m-0 w-100 px-3 mt-4">
                    <div class="col my-auto letra-gray3-16 p-0 pl-3">Acepto las reglas y políticas de las personas de confianza</div>
                    <!-- <div class="col my-auto letra-gray4-13 p-0 pl-3">He leído y acepto los <a class="color-azul1" href="/terminos_condiciones" >Términos y Condiciones</a> y el <a class="color-azul1" href="/aviso_privacidad" >Aviso de privacidad</a> de SocialFlow</div> -->
                    <div class="col-auto my-auto px-0 pl-3 pr-2 my-auto" >
                        <toggle :auto="true" :checked="acepto" @change="acepto = !acepto" />
                    </div>
                </div>

                <div class="row w-100 m-0 justify-content-center mt-4 pb-5">
                    <div class="col-12 py-2">
                        <botonApp tipo="verde" texto="Solicitar" radius="30px" @click="save" />
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
                    name:   null,
                    email:   null,
                    phone:   null,
                    type:   '1',
                    date_birth:   null,
                    ine_imagen:   null,
                    ine_atras:   null,
                    marca:   null,
                    modelo:   null,
                    placas:   null,
                    // apoyo:   null,
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
                if(!this.form.name || !this.form.email || !this.form.phone){
                    swal("","Llena todos los campos","");
                    return;
                }

                if(!this.form.date_birth ){
                    swal("","Ingresa la fecha de nacimiento","");
                    return;
                }
               
                if(!this.acepto){
                    swal("", "Debes aceptar las reglas y politicas de las personas de confianza","");
                    return;
                }
                
                this.$store.dispatch('userPostEnviarPersona',[this.form]);
            }
          
        }
    }
</script>