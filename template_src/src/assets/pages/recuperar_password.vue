<template>
    <f7-page id="inicio">
        <nav-bar tipo="inicio" :backs="true" :no_border="false" />
        <div class="contenedor-page back-color-blanco">
            <div class="row w-100 m-0 justify-content-center mt-3 pt-4">
                <div class="col-4">
                    <imagen clase="my-auto" :logo="true"  />
                </div>
            </div>
            
            <div class="row w-100 m-0 mt-4">
                <div class="col-10 mx-auto letra-gray3-18 mb-3 pl-3 text-center">Ingresa tu correo y te enviaremos instrucciones para recuperarla.</div>
                <div class="col-12 my-auto">
                    <p class="letra-gray-light-3-8vw m-0 mb-2 pl-1">Email</p>
                    <input type="email" class="regular-input w-100 m-0" placeholder="" v-model="form.email">
                </div>
            </div>
            <div class="row w-100 m-0 justify-content-center mt-5 pt-2">
                <div class="col-12">
                    <botonApp @click="post()" tipo="azul" texto="Enviar" radius="30px" />
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
                }
            } 
        },
        computed: {
            session(){return this.$store.getters.getSession;}
        },
        mounted() {
            this.$store.dispatch('initData', [this.$f7]);
        },
        methods:{

            post(){
                if(!this.form.email){
                    swal("Ingresa un email", "" ,"warning");
                    return;
                }
                this.$store.dispatch('postrecoverPassword',[this.form]);
            }
          
        }
    }
</script>