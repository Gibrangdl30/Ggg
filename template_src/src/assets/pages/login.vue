<template>
    <f7-page id="inicio">
        <div class="vista">
        <div class="contenedor-page-tabs position-relative">

            <div class="row w-100 m-0 pt-5 mt-3 justify-content-center">
                <div class="col-10 px-0 mx-auto">
                    <imagen clase="my-auto" :logo="2"  />
                </div>
            </div>

            <div class="row w-100 m-0 pt-4 mt-3 justify-content-center">
                <div class="col-11">
                    <inputForm 
                        texto="Correo" 
                        type="email" 
                        placeholder="" 
                        v-model="form.email"
                    />
                </div>
                <div class="col-11 mt-4" > 
                    <inputForm 
                        texto="Contraseña" 
                        :password="true" 
                        type="password" 
                        placeholder="********" 
                        v-model="form.password" 
                        @enter="enter" 
                    />
                </div>

                <div class="col-11 mt-3 letra-rojo1-18 text-left"  @click="router.navigate('/recuperar_password')">¿Olvidaste tu contraseña?</div>

                <div class="col-11 mt-5"  >
                    <div class="row w-100 m-0 mt-1 justify-content-center " @click="router.navigate('/registro')">
                        <div class="col-auto px-0 pr-1 letra-gray3-18">¿No estas registrado?</div>
                        <div class="col-auto px-0 letra-gray3-18">Crea una cuenta.</div>
                    </div>
                </div>

                <div class="col-11 mt-5 " @click="enter()">
                   <botonApp texto="Comenzar" tipo="app" radius="30px" />
                </div>
                <div class="col-11 mt-3 " v-if="0" @click="entrar()" >
                   <botonApp texto="Explorar" tipo="rojo" radius="30px" />
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
                    email: '',
                    password: '',
                },
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
        },
        beforeMount(){
            // console.log("LOGENADO",this.session.token);
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
                
                this.$store.dispatch('userPostRegistoTelefono',[this.form, 'login']);
            },
            enter(){
                if(!this.form.email){
                    return;
                }
                if(!this.form.password){
                    return;
                }
                this.$store.dispatch('postLogin',[this.form]);
            }
          
        }
    }
</script>