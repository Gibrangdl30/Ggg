<template>
    <f7-page>
        <div class="vista">
            <nav-bar tipo="inicio" :backs="true" :title="'Create a new account'" :fix="1" />

            <div class="contenedor-page-tabs back-color-blanco position-relative">

                <div class="row w-100 m-0 justify-content-center">
                    <div class="col-6 px-1 pt-3">
                        <imagen clase="my-auto" :logo="3"  />
                    </div>
                </div>

                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 letra-gray4-17 justify-content-center text-center ">Create a new account!</div>
                    <div class="row w-100 m-0 px-4 letra-gray3-17 justify-content-center text-center ">Write a new username and your phone number and enjoy the namme community</div>
                </div>

                <div class="row w-100 m-0 pt-4 mt-3 justify-content-center">
                    <div class="col-11">
                        <inputForm 
                            texto="Phone number" 
                            type="tel" 
                            placeholder="" 
                            v-model="form.tel"
                            :maxlength="10"
                        />
                    </div>
                    
                    <div class="col-11 mt-3">
                        <div class="row m-0 w-100 mt-4">
                            <div class="col my-auto letra-gray3-16 p-0">
                                <p class="m-0" >I agree the EULA in order to accept <span class="letra-azul-16" @click="router.navigate('/terminos_condiciones')" >Terms and conditions</span> </p>
                            </div>
                            <div class="col-auto my-auto px-0 pl-2 my-auto" @click="acepto = !acepto" >
                                <icono icono="done" clase="letra-azul1-30" v-if="acepto" />
                                <icono icono="radio" clase="letra-gray3-30" v-else />
                                <!-- <toggle :auto="true" :checked="acepto" @change="acepto = !acepto" /> -->
                            </div>
                        </div>
                    </div>

                    <div class="col-11 mt-5 " @click="login()">
                    <botonApp texto="Create new account" tipo="azul" radius="30px" />
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
                form:{
                    tel: '',
                },
                acepto: false,
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
        },
        beforeMount(){
            console.log("LOGENADO",this.session.token);
            if(this.session.token){
                this.$store.commit('changeViewByTipe');
            }
        },
        mounted() {
            this.$store.dispatch('initData', [this.$f7]);
        },
        methods:{
            back(){
                this.router.back('/slider_home',{force:true});
            },
            entrar(){
               this.$store.commit('changeView','usuario');
            },
            open(){
                this.$store.dispatch('openBrowser', 'https://axitapp.online');
            },
            login(){
                if(!this.form.tel){
                    return;
                }
                if(!this.acepto){
                    swal("", "You must agree Terms and conditions","");
                    return;
                }
                this.$store.dispatch('userPostRegistoTelefono',[this.form]);
            },
            enter(f){
                this.$store.dispatch('postLogin',[f]);
            }
          
        }
    }
</script>