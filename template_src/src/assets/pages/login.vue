<template>
    <f7-page id="inicio">
        <div class="vista h-99vh">
        <div class="contenedor-page-tabs back-color-blanco position-relative">
            <div class="row w-100 m-0 justify-content-center">
                <imagen clase="my-auto" :logo="4"  />
            </div>

            <div class="row w-100 m-0 pt-4 mt-3 justify-content-center">
                <div class="col-11">
                    <inputForm 
                        texto="Phone number" 
                        type="tel" 
                        placeholder="" 
                        v-model="form.tel"
                        :maxlength="10"
                        @enter="login"
                    />
                </div>
                <div class="col-11 mt-4" v-if="false" > 
                    <inputForm texto="Password" :password="true" type="password" placeholder="********" v-model="form.password" @enter="login" />
                </div>

                <div class="col-11 mt-3 letra-azul-4-1vw text-center" v-if="false" @click="router.navigate('/recuperar_password')">¿Olvidaste tu contraseña?</div>

                <div class="col-11 mt-5"  >
                    <div class="row w-100 m-0 mt-1 justify-content-center " @click="router.navigate('/registro_corto')">
                        <div class="col-auto px-0 pr-1 letra-gray3-18">New here?</div>
                        <div class="col-auto px-0 letra-azul1-18">Create a new account</div>
                    </div>
                </div>

                <div class="col-11 mt-5 " @click="login()">
                   <botonApp texto="Start" tipo="azul" radius="30px" />
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
                    password: '',
                },
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
                // if(!this.form.password){
                //     return;
                // }
                this.$store.dispatch('userPostRegistoTelefono',[this.form, 'login']);
            },
            enter(f){
                this.$store.dispatch('postLogin',[f]);
            }
          
        }
    }
</script>