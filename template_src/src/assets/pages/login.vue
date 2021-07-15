<template>
    <f7-page id="inicio">
        <div class="vista h-99vh">
        <div class="contenedor-page-tabs back-color-blanco position-relative">
            <div class="row w-100 m-0 justify-content-start pt-4">
            </div>
            <div class="row w-100 m-0 justify-content-center">
                <div class="col-8 px-1 pt-3">
                    <imagen clase="my-auto" :logo="true"  />
                </div>
            </div>
            <div class="row w-100 m-0 pt-4 mt-3 justify-content-center">
                <div class="col-11">
                    <inputForm texto="Email" input="form" type="email" textcolor="verde2" placeholder="email@ejemplo.com" v-model="form.email" />
                </div>
                <div class="col-11 mt-4">
                    <inputForm texto="Codigo de accesso" input="form" :password="true" textcolor="verde2" type="password" placeholder="********" v-model="form.password" @enter="login" />
                </div>

                <div class="col-11 mt-3 letra-verde-4-1vw text-center" @click="router.navigate('/recuperar_password')">¿Olvidaste tu contraseña?</div>

                <div class="col-11 mt-4 " @click="login()">
                   <botonApp texto="Entrar" tipo="verde" radius="30px" />
                </div>

                <div class="col-11 pt-2 ">
                    <div class="row w-100 m-0 justify-content-center mt-1" @click="router.navigate('/registro_nuevo')">
                        <div class="col-12 mt-3 text-center justify-content-center letra-gray3-18 ">¿No cuentas con acceso a AXIT?</div>
                    </div>
                </div>
                <div class="col-11 pt-2 ">
                    <div class="row w-100 m-0 justify-content-center mt-1" @click="open">
                        <div class="col-12 mt-3 text-center justify-content-center letra-gray3-18 ">¿Quieres que tu colegio pertenezca a AXIT? Solicita una demo</div>
                    </div>
                </div>

                <div class="col-11 pt-4 ">
                    <div class="row w-100 m-0 justify-content-center mt-1">
                        <div class="col-12 mt-3 text-center justify-content-center letra-verde-18 ">AXIT App S. de R.L. de C.V.</div>
                    </div>
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
                afiliado:{
                    email: 'jesus@sustam.com',
                    password: 'sustam',
                },
                estudio:{
                    email: 'sara@sustam.com',
                    password: 'sustam',
                },
                usuario:{
                    email: 'daniel@sustam.com',
                    password: '123456',
                }
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
                if(!this.form.email || !this.form.password){
                    swal("Ingrese email y contraseña", "" ,"warning");
                    return;
                }
                this.$store.dispatch('postLogin',[this.form]);
            },
            enter(f){
                this.$store.dispatch('postLogin',[f]);
            }
          
        }
    }
</script>