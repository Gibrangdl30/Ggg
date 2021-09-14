<template>
    <f7-page>
        <div class="vista">
            <nav-bar tipo="inicio" :backs="true" :title="'Validate your account'" :fix="1" />

            <div class="contenedor-page-tabs back-color-blanco position-relative">

                <div class="row w-100 m-0 justify-content-center">
                    <div class="col-6 px-1 pt-3">
                        <imagen clase="my-auto" :logo="3"  />
                    </div>
                </div>

                <div class="row w-100 m-0">
                    <div class="row w-100 m-0 letra-gray4-17 justify-content-center text-center ">Validate your account</div>
                    <div class="row w-100 m-0 px-4 letra-gray3-17 justify-content-center text-center ">We will send you a validation code to your number</div>
                </div>

                <div class="row w-100 m-0 pt-4 mt-3 justify-content-center">
                    <div class="col-11">
                        <inputForm 
                            texto="Validation code"
                            clase="text-center"
                            type="tel" 
                            placeholder="0 0 0 0" 
                            v-model="form.code"
                            :maxlength="4"
                            @enter="login"
                        />
                    </div>
                    
                    <div class="col-11 mt-3">
                        <div class="row m-0 w-100 mt-4 justify-content-center text-center ">
                            <p class="m-0 letra-gray4-16 text-center " >You didn´t receive your code <span class="letra-azul-16" >Resend</span> </p>
                        </div>
                    </div>

                    <div class="col-11 mt-5 " @click="login()">
                    <botonApp texto="Send code" tipo="azul" radius="30px" />
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
                    code: '',
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
                if(!this.form.code){
                    return;
                }
                this.$store.dispatch('userPostConfirmarTelefono',[this.form]);
            },
          
        }
    }
</script>