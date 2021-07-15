<template>
    <f7-page id="">
        <div class="vista">
            <nav-bar tipo="inicio" :backs="true" title="Quejas y sugerencias" :fix="1"  />
            <div class="contenedor-page-tabs back-color-blanco position-relative">
               
                <div class="row w-100 m-0 mt-3 justify-content-center">
                    
                    <div class="row w-100 m-0 pt-4">
                        <div class="col-11 mx-auto">
                            <inputForm  texto="Asunto" input="form" textcolor="verde2" v-model="form.asunto" />
                        </div>
                    </div>

                    <!-- <div class="row w-100 m-0 pt-4">
                        <div class="col-11 mx-auto">
                            <inputForm  texto="Categoría" input="form" textcolor="verde2" v-model="form.categoria" />
                        </div>
                    </div> -->

                    <div class="row w-100 m-0 pt-4">
                        <div class="col-11 mx-auto">
                            <inputForm :textarea="true" :rows="6" texto="Mensaje" input="form" textcolor="verde2" v-model="form.mensaje" />
                        </div>
                    </div>

                    <div class="row w-100 m-0 pt-5 pb-5">
                        <div class="col-11 mx-auto " @click="send()">
                            <botonApp texto="Enviar" tipo="verde" radius="30px" />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </f7-page>
</template>
<script>
import { f7Page } from 'framework7-vue';
const moment = require('moment')

    export default{
        components:{
            f7Page,
        },
        data(){
            return{
                form:{
                    asunto: null,
                    categoria: null,
                    mensaje: null,
                },
                usuarios:[],
                
            } 
        },
        computed: {
            router(){return this.$store.getters.getRouter;},
            session(){return this.$store.getters.getSession;},
            motivos(){return this.$store.getters.getCatalogo('motivos');},
            hijos(){return this.$store.getters.userStateArray('hijos');},
        },
        mounted() {
            this.$store.dispatch('initData', [this.$f7]);
        },
        methods:{
            send(){
                if(!this.form.asunto || !this.form.mensaje){
                    swal("", "Llena todos los campos para continuar" ,"");
                    return;
                }
                this.$store.dispatch('userPostEnviarQueja',[ this.form ]);
            },
            
            set(h){
                const index = this.usuarios.findIndex(x=>x == h.id);
                if(index == -1){
                    this.usuarios.push(h.id);
                }
                else{
                    this.usuarios = this.usuarios.filter(x=>x != h.id);
                }
                console.log("USUARIOS", this.usuarios);
            }
          
        }
    }
</script>