<template>
    <f7-page id="inicio">
        <div class="vista" v-vistak>
            <nav-bar tipo="inicio" :backs="true" :title="'Sing up for free account'"/>
            <div class="contenedor-page-tabs back-color-blanco">
                <div class="row w-100 m-0 mt-3">
                    <div class="col-12 text-center pt-2 mb-3 position-relative">
                        <div class="w-30vw h-30vw mx-auto border-radius-30px border-blanco-3 overflow-hidden position-relative">
                            <uploadImagen class="border-radius-50 border-rojo-3" :user="false" v-model="form.foto" />
                        </div>
                        <div class="col-12 py-2 letra-gray3-14 text-center">Add a profile photo or image</div>
                    </div>
                    <div class="row w-100 m-0 px-3">
                        <div class="col-12 mt-4">
                            <inputForm type="text" texto="Name:" placeholder="" v-model="form.nombre" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="email" texto="Email:" placeholder="" v-model="form.email" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="tel" texto="Phone:" placeholder="" v-model="form.telefono" :maxlength="10" />
                        </div>
                        <div class="col-12 mt-4">
                            <selectForm type="text" texto="Hospital/HealthCare Facility:" nombre="name" :opciones="health" v-model="form.hospital_id" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="password" texto="Password:" placeholder="" v-model="form.password" />
                        </div>
                        <div class="col-12 mt-4">
                            <inputForm type="password" texto="Confirm password:" placeholder="" v-model="confirm_password" />
                        </div>
                        
                    </div>
                </div>

                <div class="row m-0 w-100 px-3 mt-4">
                    <div class="col my-auto letra-gray3-16 p-0 pl-3">Accept polices and privacy</div>
                    <!-- <div class="col my-auto letra-gray4-13 p-0 pl-3">He leído y acepto los <a class="color-azul1" href="/terminos_condiciones" >Términos y Condiciones</a> y el <a class="color-azul1" href="/aviso_privacidad" >Aviso de privacidad</a> de SocialFlow</div> -->
                    <div class="col-auto my-auto px-0 pl-3 pr-2 my-auto" >
                        <toggle :auto="true" :checked="acepto" @change="acepto = !acepto" />
                    </div>
                </div>

                <div class="row w-100 m-0 justify-content-center mt-4 pb-5">
                    <div class="col-12 py-2">
                        <botonApp tipo="rojo" texto="Sing up for free" radius="30px" @click="save" />
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
                    foto:  null,
                    nombre:     this.$store.getters.getFormRegistro.nombre,
                    email:      this.$store.getters.getFormRegistro.email,
                    telefono:   this.$store.getters.getFormRegistro.telefono,
                    password:   this.$store.getters.getFormRegistro.password,
                    genero:   'femenino',
                    hospital_id:   null,
                },
                confirm_password: null,
                acepto: false,
            }
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            health(){return this.$store.getters.getCatalogo('health');},
        },
        methods:{
            save(){
                if(!this.form.nombre || !this.form.email || !this.form.password){
                    swal("","Please fill all fields","");
                    return;
                }
                if( !this.form.hospital_id ){
                    swal("","You must select a hospital","");
                    return;
                }

                if(this.form.password != this.confirm_password){
                    swal("", "Passwords do not match","");
                    return;
                }
                if(!this.acepto){
                    swal("", "You must agree polices and privacy","");
                    return;
                }
                
                this.$store.dispatch('postRegistro',this.form);
            }
          
        }
    }
</script>