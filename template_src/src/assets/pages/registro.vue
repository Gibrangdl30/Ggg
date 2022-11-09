<template>
    <f7-page id="inicio">
        
        <div class="vista " v-vistak>

            <nav-bar tipo="inicio" :backs="true" :title="'Crear una cuenta'" :fix="1"  />

            <div class="contenedor-page-tabs  ">

                <div class="row w-100 m-0 mt-3">
                    <!-- <div class="col-12 pt-2 ">
                        <div class="row w-100 m-0 letra-gray4-18 justify-content-center text-center">Crea una nueva cuenta</div>
                        <div class="row w-100 m-0 px-4 pt-2 letra-gray3-16 justify-content-center text-center">Llena los campos siguientes para conocer mas de ti</div>
                    </div> -->
                    <!-- <div class="col-12 text-center pt-3 mb-3 position-relative">
                        <div class="w-30vw h-30vw mx-auto border-gray3-3 overflow-hidden position-relative">
                            <uploadImagen class="border-radius-10px border-negro-2" :user="false" v-model="form.foto" />
                        </div>
                        <div class="col-12 py-2 letra-gray3-14 text-center">Agrega una foto de perfil</div>
                    </div> -->
                    <div class="row w-100 m-0 px-3">
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="Nombre:" placeholder="" v-model="form.nombre" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="email" texto="Correo:" placeholder="" v-model="form.email" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="tel" texto="Telefono:" placeholder="" v-model="form.telefono" :maxlength="10" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="password" :password="true"  texto="Contraseña:" placeholder="" v-model="form.password" />
                        </div>
                        <div class="col-12 mt-4" v-if="0">
                            <inputForm type="password" :password="true"  texto="Confirma Contraseña:" placeholder="" v-model="confirm_password" />
                        </div>

                    </div>
                </div>

                <div class="row m-0 w-100 px-3 mt-4">
                    <div class="col my-auto letra-gray3-13 p-0 pl-3">He leído y acepto los <a class="color-gray3 fw-600" href="/terminos_condiciones" >Términos y Condiciones</a> y el 
                    <a class="color-gray3 fw-600" href="/aviso_privacidad" >Aviso de privacidad</a> de México Limited</div>

                    <div class="col-auto my-auto px-0 pl-3 pr-2 my-auto" >
                        <toggle :icon="1"  :auto="0" v-model="acepto" :v="1" :f="0" />
                    </div>
                </div>

                <div class="row w-100 m-0 justify-content-center mt-4 pb-5">
                    <div class="col-12 py-2">
                        <botonApp tipo="app" texto="Crea una cuenta" radius="30px" @click="save" />
                    </div>
                </div>

                <div class="row w-100 m-0 py-3"></div>
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
                    foto:           null,
                    nombre:         null,
                    email:          null,
                    telefono:       null,
                    password:       null,
                },
                confirm_password: null,
                acepto: false,
                acepto2: false,
                acepto3: false,
            }
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            health(){return this.$store.getters.getCatalogo('health');},
        },
        methods:{
            save(){
                if(!this.form.nombre || !this.form.email || !this.form.password){
                    swal("","Llena todos los campos","");
                    return;
                }
                // if(this.form.password != this.confirm_password){
                //     swal("", "Passwords do not match","");
                //     return;
                // }
                if(!this.acepto){
                    swal("", "Debes aceptar los terminos y condiciones","");
                    return;
                }
                this.$store.dispatch('postRegistro',this.form);
            }
          
        }
    }
</script>